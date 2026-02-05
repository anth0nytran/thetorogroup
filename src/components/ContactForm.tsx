import { Button } from "./ui/button";
import { useState, useEffect } from "react";

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
        const handleServiceSelect = (e: CustomEvent) => {
            setSelectedService(e.detail.service);
        };
        window.addEventListener("selectService" as any, handleServiceSelect as any);
        return () => window.removeEventListener("selectService" as any, handleServiceSelect as any);
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

    return (
        <section id="contact" className="bg-white py-32 px-6 md:px-12 relative border-t-2 border-black">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24">

                {/* Left Side: Info */}
                <div className="lg:w-1/3">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6 block border-l-2 border-black pl-4">Inquiry</span>
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 text-black leading-none">
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
                    <form className="space-y-16">
                        {/* Service Selection */}
                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">I'm Interested In</label>
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent cursor-pointer appearance-none"
                            >
                                {services.map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onBlur={() => handleBlur('firstName')}
                                    pattern="[A-Za-z\s\-']{2,50}"
                                    title="Please enter a valid name (letters, spaces, hyphens only)"
                                    className={getInputClass(isFirstNameValid, 'firstName')}
                                    placeholder="First Name"
                                />
                                {touched.firstName && !isFirstNameValid && firstName && (
                                    <p className="text-xs text-red-500 mt-2">Letters only, min 2 characters</p>
                                )}
                            </div>
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onBlur={() => handleBlur('lastName')}
                                    pattern="[A-Za-z\s\-']{2,50}"
                                    title="Please enter a valid name (letters, spaces, hyphens only)"
                                    className={getInputClass(isLastNameValid, 'lastName')}
                                    placeholder="Last Name"
                                />
                                {touched.lastName && !isLastNameValid && lastName && (
                                    <p className="text-xs text-red-500 mt-2">Letters only, min 2 characters</p>
                                )}
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleBlur('email')}
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title="Please enter a valid email address"
                                className={getInputClass(isEmailValid, 'email')}
                                placeholder="Email Address"
                            />
                            {touched.email && !isEmailValid && email && (
                                <p className="text-xs text-red-500 mt-2">Please enter a valid email address</p>
                            )}
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                onBlur={() => handleBlur('phone')}
                                placeholder="(555) 555-5555"
                                className={getInputClass(isPhoneValid, 'phone')}
                            />
                            {touched.phone && !isPhoneValid && phone && (
                                <p className="text-xs text-red-500 mt-2">Please enter a 10-digit phone number</p>
                            )}
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={1}
                                className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent resize-none min-h-[60px]"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-neutral-400">Takes less than 30 seconds</p>
                            <Button size="lg" className="bg-black text-white px-12 py-8 rounded-none text-xs tracking-[0.2em] font-bold uppercase hover:bg-neutral-800 transition-all w-full md:w-auto">
                                Submit Inquiry
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
