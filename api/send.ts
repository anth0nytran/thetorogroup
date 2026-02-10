import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export const config = {
    runtime: "nodejs"
};

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 50;
const MAX_SERVICE_LENGTH = 80;
const MAX_PAGE_URL_LENGTH = 2048;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const DUPLICATE_WINDOW_MS = 6 * 60 * 60 * 1000;
const DUPLICATE_MAX_HITS = 2;

const ALLOWED_SERVICES = new Set(["buying", "selling", "relocation", "distressed"]);
const SERVICE_LABELS: Record<string, string> = {
    buying: "Buying",
    selling: "Selling",
    relocation: "Relocation",
    distressed: "Distressed Properties"
};

type RateLimitState = {
    count: number;
    resetAt: number;
};

type DuplicateSubmissionState = {
    count: number;
    resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitState>();
const duplicateSubmissionStore = new Map<string, DuplicateSubmissionState>();

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
        switch (char) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            default:
                return char;
        }
    });

const normalize = (value: unknown) =>
    typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";

const compactText = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

const pickField = (data: Record<string, unknown>, keys: string[]) => {
    for (const key of keys) {
        const value = normalize(data[key]);
        if (value) return value;
    }
    return "";
};

const getHeaderValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] || "" : value || "";

const parseRequestBody = (req: VercelRequest): Record<string, unknown> | null => {
    if (!req.body) return {};

    if (typeof req.body === "string") {
        try {
            const parsed = JSON.parse(req.body);
            return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
        } catch {
            return null;
        }
    }

    if (typeof req.body === "object") {
        return req.body as Record<string, unknown>;
    }

    return {};
};

const normalizeOrigin = (value: string) => value.replace(/\/+$/, "").toLowerCase();

const isAllowedOrigin = (req: VercelRequest) => {
    const origin = normalizeOrigin(getHeaderValue(req.headers.origin));
    if (!origin) return true;

    const configuredOrigins = normalize(process.env.ALLOWED_ORIGINS)
        .split(",")
        .map((entry) => normalizeOrigin(entry.trim()))
        .filter(Boolean);

    const host = getHeaderValue(req.headers["x-forwarded-host"]) || getHeaderValue(req.headers.host);
    const proto = getHeaderValue(req.headers["x-forwarded-proto"]) || "https";

    const hostOrigins = host
        ? [
            normalizeOrigin(`${proto}://${host}`),
            normalizeOrigin(`https://${host}`),
            normalizeOrigin(`http://${host}`)
        ]
        : [];

    const allowedOrigins = new Set([...configuredOrigins, ...hostOrigins].filter(Boolean));
    if (allowedOrigins.size === 0) return true;

    return allowedOrigins.has(origin);
};

const getClientIp = (req: VercelRequest) => {
    const forwardedFor = getHeaderValue(req.headers["x-forwarded-for"]);
    if (forwardedFor) {
        const firstIp = forwardedFor.split(",")[0]?.trim();
        if (firstIp) return firstIp;
    }

    const realIp = getHeaderValue(req.headers["x-real-ip"]);
    if (realIp) return realIp;

    return req.socket?.remoteAddress || "unknown";
};

const isRateLimited = (clientIp: string) => {
    const now = Date.now();
    const current = rateLimitStore.get(clientIp);

    if (!current || current.resetAt <= now) {
        rateLimitStore.set(clientIp, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS
        });
        return false;
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }

    current.count += 1;
    rateLimitStore.set(clientIp, current);

    // Opportunistic cleanup to cap memory growth in long-lived instances.
    if (rateLimitStore.size > 2000) {
        for (const [ip, state] of rateLimitStore.entries()) {
            if (state.resetAt <= now) {
                rateLimitStore.delete(ip);
            }
        }
    }

    return false;
};

const isLikelyDuplicateSubmission = (submissionKey: string) => {
    const now = Date.now();
    const current = duplicateSubmissionStore.get(submissionKey);

    if (!current || current.resetAt <= now) {
        duplicateSubmissionStore.set(submissionKey, {
            count: 1,
            resetAt: now + DUPLICATE_WINDOW_MS
        });
        return false;
    }

    current.count += 1;
    duplicateSubmissionStore.set(submissionKey, current);

    if (duplicateSubmissionStore.size > 2000) {
        for (const [key, state] of duplicateSubmissionStore.entries()) {
            if (state.resetAt <= now) {
                duplicateSubmissionStore.delete(key);
            }
        }
    }

    return current.count > DUPLICATE_MAX_HITS;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Cache-Control", "no-store");

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed." });
    }

    if (!isAllowedOrigin(req)) {
        return res.status(403).json({ ok: false, error: "Origin not allowed." });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
        return res.status(429).json({ ok: false, error: "Too many requests. Please try again shortly." });
    }

    const contentType = getHeaderValue(req.headers["content-type"]);
    if (contentType && !contentType.includes("application/json")) {
        return res.status(415).json({ ok: false, error: "Unsupported content type. Use application/json." });
    }

    const data = parseRequestBody(req);
    if (data === null) {
        return res.status(400).json({ ok: false, error: "Invalid JSON payload." });
    }

    // Tier 1 spam protection
    const honeypotFields = ["website", "company_url", "fax", "address2"];
    for (const field of honeypotFields) {
        if (pickField(data, [field])) {
            return res.status(200).json({ ok: true });
        }
    }

    const formTimestamp = pickField(data, ["_ts"]);
    if (formTimestamp) {
        const submissionTime = parseInt(formTimestamp, 10);
        const timeDiff = Date.now() - submissionTime;
        const minSubmissionTimeMs = 3000;
        if (!Number.isNaN(submissionTime) && timeDiff < minSubmissionTimeMs) {
            return res.status(200).json({ ok: true });
        }
    }

    const firstName = pickField(data, ["firstName", "first_name"]);
    const lastName = pickField(data, ["lastName", "last_name"]);
    const email = pickField(data, ["email", "emailAddress"]);
    const phone = pickField(data, ["phone", "phoneNumber"]);
    const service = pickField(data, ["service", "serviceNeeded"]);
    const message = pickField(data, ["message", "details"]);
    const page = pickField(data, ["page", "pageUrl", "page_url"]);
    const normalizedService = compactText(service);

    if (!firstName || !lastName || !email || !phone || !service) {
        return res.status(400).json({
            ok: false,
            error: "Missing required fields: First Name, Last Name, Email, Phone, and Service are required."
        });
    }

    if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
        return res.status(400).json({ ok: false, error: "Name fields are too long." });
    }

    if (service.length > MAX_SERVICE_LENGTH) {
        return res.status(400).json({ ok: false, error: "Service field is too long." });
    }

    if (!ALLOWED_SERVICES.has(normalizedService)) {
        return res.status(400).json({ ok: false, error: "Please select a valid service option." });
    }

    if (page.length > MAX_PAGE_URL_LENGTH) {
        return res.status(400).json({ ok: false, error: "Page URL is too long." });
    }

    const namePattern = /^[A-Za-z\s\-']{2,50}$/;
    if (!namePattern.test(firstName)) {
        return res.status(400).json({
            ok: false,
            error: "First Name should contain only letters, spaces, and hyphens (2-50 characters)."
        });
    }

    if (!namePattern.test(lastName)) {
        return res.status(400).json({
            ok: false,
            error: "Last Name should contain only letters, spaces, and hyphens (2-50 characters)."
        });
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
        return res.status(400).json({ ok: false, error: "Please enter a valid 10-digit phone number." });
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    if (message && message.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ ok: false, error: "Message is too long. Please keep it under 5000 characters." });
    }

    const duplicateMessageFingerprint = compactText(message)
        .replace(/https?:\/\/\S+|www\.\S+/g, "")
        .slice(0, 280);
    const duplicateKey = `${email.toLowerCase()}|${phoneDigits}|${normalizedService}|${duplicateMessageFingerprint || "-"}`;
    if (isLikelyDuplicateSubmission(duplicateKey)) {
        return res.status(200).json({ ok: true });
    }

    const fullName = `${firstName} ${lastName}`;
    const combinedText = `${firstName} ${lastName} ${email} ${normalizedService} ${message}`.toLowerCase();
    const messageText = message.toLowerCase();

    const urlPattern = /https?:\/\/|www\./gi;
    const urlCount = (combinedText.match(urlPattern) || []).length;
    if (urlCount > 2) {
        return res.status(200).json({ ok: true });
    }

    const spamKeywords = [
        "crypto", "bitcoin", "ethereum", "nft",
        "casino", "poker", "gambling", "bet ",
        "viagra", "cialis", "pharmacy",
        "seo services", "backlinks", "web traffic",
        "nigerian prince", "lottery winner", "congratulations you won",
        "click here now", "act now", "limited time",
        "work from home", "make money fast", "earn $$"
    ];
    if (spamKeywords.some((keyword) => combinedText.includes(keyword))) {
        return res.status(200).json({ ok: true });
    }

    const agencySpamPhrases = [
        "marketing agency",
        "digital marketing",
        "seo agency",
        "seo expert",
        "seo specialist",
        "web design agency",
        "website design",
        "website redesign",
        "website development",
        "google ads",
        "facebook ads",
        "instagram ads",
        "lead generation",
        "book more appointments",
        "appointment setting",
        "cold outreach",
        "link building",
        "guest post",
        "improve your rankings",
        "rank your website",
        "increase your traffic",
        "grow your business",
        "virtual assistant services",
        "outsourced callers"
    ];
    const agencySignalCount = agencySpamPhrases.reduce(
        (count, phrase) => count + (combinedText.includes(phrase) ? 1 : 0),
        0
    );
    if (agencySignalCount >= 2) {
        return res.status(200).json({ ok: true });
    }

    const messageUrlCount = (messageText.match(urlPattern) || []).length;
    if (messageUrlCount > 0 && agencySignalCount > 0) {
        return res.status(200).json({ ok: true });
    }

    if (message && message.length > 20) {
        const upperCount = (message.match(/[A-Z]/g) || []).length;
        const letterCount = (message.match(/[a-zA-Z]/g) || []).length;
        if (letterCount > 0 && upperCount / letterCount > 0.7) {
            return res.status(200).json({ ok: true });
        }
    }

    const nonAsciiPattern = /[^\p{ASCII}]/gu;
    const nonAsciiCount = (combinedText.match(nonAsciiPattern) || []).length;
    if (combinedText.length > 0 && nonAsciiCount / combinedText.length > 0.3) {
        return res.status(200).json({ ok: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;

    if (!resendApiKey || !toEmail) {
        return res.status(500).json({ ok: false, error: "Server misconfigured. Missing RESEND_API_KEY or LEAD_TO_EMAIL." });
    }

    const timestamp = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short"
    }).format(new Date());

    const safeName = fullName || "Website Form";
    const safeService = SERVICE_LABELS[normalizedService] || service || "Website Form";
    const subject = `New Lead | ${safeService} | ${safeName}`;

    const pageUrlIsDev =
        !!page &&
        (/localhost/i.test(page) || /127\.0\.0\.1/.test(page) || /0\.0\.0\.0/.test(page));
    const pageUrlDisplay = page ? (pageUrlIsDev ? `${page} (dev link)` : page) : "";
    const phoneLink = (() => {
        if (!phone) return "";
        if (phone.trim().startsWith("+")) {
            return phone.replace(/[^\d+]/g, "");
        }
        const digits = phone.replace(/\D/g, "");
        if (!digits) return "";
        if (digits.length === 10) return `+1${digits}`;
        if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
        return digits;
    })();

    const escapedMessage = message ? escapeHtml(message).replace(/\n/g, "<br />") : "";

    const brandName = "The Toro Group Corp.";
    const brandColor = "#000000";
    const brandAccent = "#333333";

    const html = `
  <div style="background-color:#f3f4f6;margin:0;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      New quote request from ${escapeHtml(safeName)} - tap to call now.
    </span>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 10px 25px rgba(17,24,39,0.08);overflow:hidden;">
      <tr>
        <td style="background:#ffffff;color:#111827;padding:18px 20px;border-top:6px solid ${brandColor};border-bottom:1px solid #f1f5f9;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size:16px;font-weight:700;letter-spacing:0.3px;">${brandName}</td>
              <td align="right">
                <span style="display:inline-block;background:${brandColor};color:#ffffff;font-weight:700;font-size:12px;padding:6px 10px;border-radius:999px;letter-spacing:1px;">NEW LEAD</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 20px 16px;">
          <div style="font-size:24px;font-weight:800;margin:0 0 6px;">${escapeHtml(safeName)}</div>
          <div style="font-size:16px;color:#374151;font-weight:600;margin:0 0 4px;">${escapeHtml(safeService)}</div>
          <div style="font-size:12px;color:#6b7280;">${escapeHtml(timestamp)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:0 0 10px;">
                <a href="tel:${escapeHtml(phoneLink || phone)}" style="display:block;background:${brandColor};color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;text-align:center;padding:14px 18px;border-radius:10px;">
                  Hold to Call Lead
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 10px;">
                <a href="mailto:${escapeHtml(email)}" style="display:block;background:#f3f4f6;color:#111827;text-decoration:none;font-weight:700;font-size:14px;text-align:center;padding:14px 18px;border-radius:10px;border:1px solid #e5e7eb;">Email Lead</a>
              </td>
            </tr>
            ${pageUrlDisplay ? `
            <tr>
              <td style="padding:0;">
                <a href="${page}" style="font-size:12px;color:${brandAccent};text-decoration:none;">View Page</a>
              </td>
            </tr>
            ` : ""}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#f9fafb;padding:14px 16px;font-weight:700;border-bottom:1px solid #e5e7eb;">Lead Details</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                  <tr><td style="padding:10px 0;color:#6b7280;width:120px;">Name</td><td style="padding:10px 0;color:#111827;font-weight:600;">${escapeHtml(safeName)}</td></tr>
                  <tr><td style="padding:10px 0;color:#6b7280;">Phone</td><td style="padding:10px 0;"><a href="tel:${escapeHtml(phoneLink || phone)}" style="color:#111827;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a></td></tr>
                  <tr><td style="padding:10px 0;color:#6b7280;">Email</td><td style="padding:10px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#111827;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td></tr>
                  <tr><td style="padding:10px 0;color:#6b7280;">Service</td><td style="padding:10px 0;color:#111827;font-weight:600;">${escapeHtml(safeService)}</td></tr>
                  ${pageUrlDisplay ? `<tr><td style="padding:10px 0;color:#6b7280;">Page URL</td><td style="padding:10px 0;"><a href="${page}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(pageUrlDisplay)}</a></td></tr>` : ""}
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;vertical-align:top;">Message</td>
                    <td style="padding:10px 0;color:#111827;">
                      ${escapedMessage ? `<div style="font-weight:500;">${escapedMessage}</div>` : `<div style="font-style:italic;color:#6b7280;">No message provided.</div>`}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 22px;">
          <div style="border-left:4px solid ${brandColor};padding:10px 12px;background:#f9fafb;border-radius:8px;font-size:12px;color:#6b7280;">
            This lead came from your website form.
            <span style="display:block;margin-top:4px;color:#9ca3af;">
              Website by <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;text-decoration:underline;">QuickLaunchWeb</a>
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
  `;

    const text = `
New Lead from ${brandName}
timestamp: ${timestamp}
name: ${safeName}
phone: ${phone}
email: ${email}
service: ${safeService}
message: ${message || "(none)"}
  `.trim();

    const resend = new Resend(resendApiKey);
    const bcc = process.env.LEADS_BCC_EMAIL
        ? process.env.LEADS_BCC_EMAIL.split(",").map((entry) => entry.trim()).filter(Boolean)
        : undefined;

    try {
        const { error: sendError } = await resend.emails.send({
            from: "The Toro Group | New Lead <leads@quicklaunchweb.us>",
            to: [toEmail],
            bcc,
            replyTo: email || undefined,
            subject,
            text,
            html
        });

        if (sendError) {
            console.error("Resend Error:", sendError);
            return res.status(500).json({ ok: false, error: "Failed to send email." });
        }
    } catch (error) {
        console.error("Unhandled Resend exception:", error);
        return res.status(500).json({ ok: false, error: "Failed to send email." });
    }

    return res.status(200).json({ ok: true });
}
