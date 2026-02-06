# Production SEO + GSC Checklist

## 1) Environment Variables (Vercel)
Set these in Vercel Project Settings -> Environment Variables:

- `RESEND_API_KEY`
- `LEAD_TO_EMAIL`
- `LEADS_BCC_EMAIL` (optional)
- `SITE_URL` (recommended): `https://soldbytoro.com`
- `ALLOWED_ORIGINS` (recommended): `https://soldbytoro.com,https://www.soldbytoro.com`

## 2) Deploy

- Deploy with `npm run build` (runs `prebuild`, which regenerates `public/sitemap.xml` and `public/robots.txt`).
- Confirm `https://soldbytoro.com/sitemap.xml` returns `200`.
- Confirm `https://soldbytoro.com/robots.txt` returns `200`.

## 3) Google Search Console (No Analytics Required)

- Add property in Google Search Console.
- Prefer **Domain property** + DNS TXT verification at your DNS provider.
- After verification, submit sitemap:
  - `https://soldbytoro.com/sitemap.xml`
- Request indexing for the homepage URL:
  - `https://soldbytoro.com/`

## 4) Post-Deploy Verification

- Use URL Inspection in GSC for `https://soldbytoro.com/` and confirm:
  - Canonical is self-referencing
  - Page is indexable
  - Structured data is detected
- Check Rich Results Test for schema validation.
- Check PageSpeed Insights and track:
  - LCP
  - INP
  - CLS

## 5) Ongoing SEO Operations

- Refresh homepage transaction/testimonial content monthly.
- Keep visible FAQ content aligned with JSON-LD FAQ schema.
- Add dedicated service-area pages over time (separate URLs) for stronger long-tail local rankings.
