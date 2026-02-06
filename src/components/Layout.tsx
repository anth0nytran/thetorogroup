import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Navigation - Fixed & Dynamic */}
            <nav aria-label="Primary navigation" className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300",
                scrolled ? "bg-black/90 backdrop-blur-md py-2 shadow-lg border-b border-white/10" : "bg-transparent py-6"
            )}>
                <a
                    href="#home"
                    onClick={(event) => {
                        event.preventDefault();
                        scrollToSection('home');
                    }}
                    className="cursor-pointer mix-blend-difference"
                >
                    <img
                        src="/logo.svg"
                        alt="The Toro Group Corp logo"
                        width={1563}
                        height={1563}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="h-16 md:h-24 w-auto object-contain brightness-0 invert"
                    />
                </a>

                <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-white mix-blend-difference">
                    <a
                        href="#stats"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToSection('stats');
                        }}
                        className="hover:text-neutral-300 transition-colors relative group"
                    >
                        Why Us
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                    <a
                        href="#team"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToSection('team');
                        }}
                        className="hover:text-neutral-300 transition-colors relative group"
                    >
                        Team
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                    <a
                        href="#areas"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToSection('areas');
                        }}
                        className="hover:text-neutral-300 transition-colors relative group"
                    >
                        Areas
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                    <a
                        href="#contact"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToSection('contact');
                        }}
                        className={cn(
                            "px-6 py-2 border transition-all duration-300",
                            scrolled
                                ? "border-white text-white hover:bg-white hover:text-black"
                                : "border-white bg-white text-black hover:bg-transparent hover:text-white"
                        )}
                    >
                        Contact
                    </a>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden uppercase text-xs tracking-widest font-bold text-white mix-blend-difference"
                >
                    Menu
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-black text-white flex flex-col p-6 md:p-12"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xl font-serif font-bold">The Toro Group</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                                <X className="w-8 h-8 text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8 items-start">
                            {['home', 'stats', 'team', 'areas', 'contact'].map((section, i) => (
                                <motion.a
                                    key={section}
                                    href={`#${section}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        scrollToSection(section);
                                    }}
                                    className="text-4xl font-serif hover:text-neutral-400 transition-colors capitalize"
                                >
                                    {section === 'stats' ? 'Why Us' : section}
                                </motion.a>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Contact</p>
                            <a href="tel:7147321429" className="block text-xl font-serif mb-1">714.732.1429</a>
                            <a href="mailto:jack@soldbytoro.com" className="block text-sm text-neutral-400">jack@soldbytoro.com</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Mobile CTA Bar */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300",
                scrolled && !mobileMenuOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-accent p-4 flex items-center justify-between">
                    <span className="text-white text-sm font-bold">Ready to get started?</span>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors"
                    >
                        Book Consultation
                    </button>
                </div>
            </div>

            <main>
                {children}
            </main>

            <footer className="bg-neutral-950 text-white pt-24 pb-12 px-6 md:px-12 border-t border-neutral-800">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">

                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-4">
                            <h3 className="text-2xl font-serif font-bold mb-6">The Toro Group Corp.</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
                                Representing the finest estates in Newport Beach, Laguna Beach, and Corona Del Mar. A legacy of precision, discretion, and record-breaking results.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Jack Toro</p>
                                    <p className="text-[10px] text-neutral-500">CA DRE 02198741 • AZ License SA691674000</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Sebastian Street</p>
                                    <p className="text-[10px] text-neutral-500">CA DRE 02208742</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Seth Bewley</p>
                                    <p className="text-[10px] text-neutral-500">CA DRE 02239999</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-8">Navigation</h4>
                            <ul className="space-y-4 text-sm text-neutral-300">
                                <li><a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection('home'); }} className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#stats" onClick={(event) => { event.preventDefault(); scrollToSection('stats'); }} className="hover:text-white transition-colors">Why Us</a></li>
                                <li><a href="#team" onClick={(event) => { event.preventDefault(); scrollToSection('team'); }} className="hover:text-white transition-colors">Team</a></li>
                                <li><a href="#areas" onClick={(event) => { event.preventDefault(); scrollToSection('areas'); }} className="hover:text-white transition-colors">Areas</a></li>
                                <li><a href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection('contact'); }} className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Areas */}
                        <div className="col-span-1 md:col-span-3">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-8">Areas</h4>
                            <ul className="space-y-4 text-sm text-neutral-300">
                                <li><span className="cursor-default">Newport Beach</span></li>
                                <li><span className="cursor-default">Irvine</span></li>
                                <li><span className="cursor-default">Huntington Beach</span></li>
                                <li><span className="cursor-default">Laguna Beach</span></li>
                                <li><span className="cursor-default">Corona Del Mar</span></li>
                                <li><span className="cursor-default">Dana Point</span></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-span-1 md:col-span-3 text-right md:text-right">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-8">Inquiries</h4>
                            <div className="space-y-2">
                                <a href="tel:7147321429" className="block text-2xl font-serif hover:text-neutral-300 transition-colors">714.732.1429</a>
                                <a href="mailto:jack@soldbytoro.com" className="block text-lg text-neutral-400 hover:text-white transition-colors">jack@soldbytoro.com</a>
                            </div>
                            <div className="mt-8">
                                <p className="text-sm text-neutral-500">
                                    123 Pacific Coast Highway <br />
                                    Newport Beach, CA 92660
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                            © 2026 The Toro Group Corp. All Rights Reserved.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="https://quicklaunchweb.us"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-neutral-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors"
                            >
                                Website by <span className="font-bold">QuickLaunchWeb</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
