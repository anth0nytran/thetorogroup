import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";

const services = [
    { value: "", label: "Select a Service" },
    { value: "buying", label: "Buying" },
    { value: "selling", label: "Selling" },
    { value: "relocation", label: "Relocation" },
    { value: "distressed", label: "Distressed Properties" }
];

// Format phone number as user types
const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Validate phone has 10 digits
const isValidPhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10;
};

export default function ContactForm() {
    const formStartedAtRef = useRef<number>(Date.now());
    const [honeypot, setHoneypot] = useState({
        website: "",
        company_url: "",
        fax: "",
        address2: ""
    });
    const [selectedService, setSelectedService] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // Validation states
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Listen for URL hash changes to pre-select service
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#contact-", "");
            if (["buying", "selling", "relocation", "distressed"].includes(hash)) {
                setSelectedService(hash);
            }
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Listen for custom event from Expertise cards
    useEffect(() => {
        const handleServiceSelect = (event: Event) => {
            const customEvent = event as CustomEvent<{ service?: string }>;
            const service = customEvent.detail?.service;
            if (typeof service === "string") {
                setSelectedService(service);
            }
        };
        window.addEventListener("selectService", handleServiceSelect);
        return () => window.removeEventListener("selectService", handleServiceSelect);
    }, []);

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    // Validation checks
    const namePattern = /^[A-Za-z\s\-']{2,50}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isFirstNameValid = namePattern.test(firstName);
    const isLastNameValid = namePattern.test(lastName);
    const isEmailValid = emailPattern.test(email);
    const isPhoneValid = isValidPhone(phone);

    const getInputClass = (isValid: boolean, fieldName: string) => {
        const base = "w-full border-b-2 py-4 text-xl font-serif focus:outline-none transition-all bg-transparent";
        if (!touched[fieldName]) return `${base} border-neutral-200 focus:border-black`;
        return isValid
            ? `${base} border-green-500 focus:border-green-600`
            : `${base} border-red-400 focus:border-red-500`;
    };

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Touch all fields to show validation errors
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            service: true
        });

        // Validate all
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || !selectedService) {
            setErrorMessage("Please fill out all required fields correctly.");
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    service: selectedService,
                    message,
                    page: window.location.href,
                    ...honeypot,
                    _ts: formStartedAtRef.current
                })
            });

            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                if (res.status === 404) {
                    throw new Error("Contact API route not found. Run with `vercel dev` so /api/send is available.");
                }
                throw new Error(`Unexpected server response (${res.status}).`);
            }

            const data = await res.json();

            if (res.ok && data.ok) {
                setStatus("success");
                // Reset form
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
                setMessage("");
                setSelectedService("");
                setTouched({});
                setHoneypot({ website: "", company_url: "", fax: "", address2: "" });
                formStartedAtRef.current = Date.now();
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            if (error instanceof Error && error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to send. Please try again later.");
            }
        }
    };

    return (
        <section id="contact" aria-labelledby="contact-heading" className="bg-white py-32 px-6 md:px-12 relative border-t-2 border-black">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24">

                {/* Left Side: Info */}
                <div className="lg:w-1/3">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6 block border-l-2 border-black pl-4">Inquiry</span>
                    <h2 id="contact-heading" className="text-5xl md:text-7xl font-serif mb-12 text-black leading-none">
                        Start The <br /> Conversation.
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">Office</h4>
                            <p className="text-lg font-serif">Newport Beach, California</p>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">Contact</h4>
                            <p className="text-lg font-serif">714.732.1429</p>
                            <p className="text-lg font-serif">jack@soldbytoro.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-2/3">
                    {status === "success" ? (
                        <div className="bg-neutral-50 p-12 text-center border-l-4 border-black">
                            <h3 className="text-3xl font-serif mb-4">Message Sent</h3>
                            <p className="text-neutral-500 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-neutral-600 transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-16">
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="website-field">Website</label>
                                <input
                                    id="website-field"
                                    name="website"
                                    type="text"
                                    value={honeypot.website}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    onChange={(event) => setHoneypot((prev) => ({ ...prev, website: event.target.value }))}
                                />
                                <label htmlFor="company-url-field">Company URL</label>
                                <input
                                    id="company-url-field"
                                    name="company_url"
                                    type="text"
                                    value={honeypot.company_url}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    onChange={(event) => setHoneypot((prev) => ({ ...prev, company_url: event.target.value }))}
                                />
                                <label htmlFor="fax-field">Fax</label>
                                <input
                                    id="fax-field"
                                    name="fax"
                                    type="text"
                                    value={honeypot.fax}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    onChange={(event) => setHoneypot((prev) => ({ ...prev, fax: event.target.value }))}
                                />
                                <label htmlFor="address2-field">Address 2</label>
                                <input
                                    id="address2-field"
                                    name="address2"
                                    type="text"
                                    value={honeypot.address2}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    onChange={(event) => setHoneypot((prev) => ({ ...prev, address2: event.target.value }))}
                                />
                            </div>

                            {/* Service Selection */}
                            <div className="group relative">
                                <label htmlFor="service" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">I'm Interested In</label>
                                <select
                                    id="service"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent cursor-pointer appearance-none"
                                >
                                    {services.map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>
                                {touched.service && !selectedService && (
                                    <p className="text-xs text-red-500 mt-2 absolute">Please select a service</p>
                                )}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="group relative">
                                    <label htmlFor="first-name" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">First Name</label>
                                    <input
                                        id="first-name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onBlur={() => handleBlur('firstName')}
                                        autoComplete="given-name"
                                        className={getInputClass(isFirstNameValid, 'firstName')}
                                        placeholder="First Name"
                                    />
                                    {touched.firstName && !isFirstNameValid && (
                                        <p className="text-xs text-red-500 mt-2">Letters only, min 2 characters</p>
                                    )}
                                </div>
                                <div className="group relative">
                                    <label htmlFor="last-name" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Last Name</label>
                                    <input
                                        id="last-name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onBlur={() => handleBlur('lastName')}
                                        autoComplete="family-name"
                                        className={getInputClass(isLastNameValid, 'lastName')}
                                        placeholder="Last Name"
                                    />
                                    {touched.lastName && !isLastNameValid && (
                                        <p className="text-xs text-red-500 mt-2">Letters only, min 2 characters</p>
                                    )}
                                </div>
                            </div>

                            <div className="group relative">
                                <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    autoComplete="email"
                                    className={getInputClass(isEmailValid, 'email')}
                                    placeholder="Email Address"
                                />
                                {touched.email && !isEmailValid && (
                                    <p className="text-xs text-red-500 mt-2">Please enter a valid email address</p>
                                )}
                            </div>

                            <div className="group relative">
                                <label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onBlur={() => handleBlur('phone')}
                                    autoComplete="tel"
                                    placeholder="(555) 555-5555"
                                    className={getInputClass(isPhoneValid, 'phone')}
                                />
                                {touched.phone && !isPhoneValid && (
                                    <p className="text-xs text-red-500 mt-2">Please enter a 10-digit phone number</p>
                                )}
                            </div>

                            <div className="group relative">
                                <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Message</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={1}
                                    className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent resize-none min-h-[60px]"
                                    placeholder="How can we help?"
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
                            )}

                            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-xs text-neutral-400">Takes less than 30 seconds</p>
                                <Button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    size="lg"
                                    className="bg-black text-white px-12 py-8 rounded-none text-xs tracking-[0.2em] font-bold uppercase hover:bg-neutral-800 transition-all w-full md:w-auto disabled:opacity-50"
                                >
                                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
