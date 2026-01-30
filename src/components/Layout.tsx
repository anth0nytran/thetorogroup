import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Navigation - Fixed & Dynamic */}
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-300",
                scrolled ? "bg-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/10" : "bg-transparent py-8"
            )}>
                <div
                    onClick={() => scrollToSection('home')}
                    className="text-xl font-serif font-bold tracking-tighter cursor-pointer text-white mix-blend-difference"
                >
                    The Toro Group Corp.
                </div>

                <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-white mix-blend-difference">
                    <button onClick={() => scrollToSection('stats')} className="hover:text-neutral-300 transition-colors relative group">
                        Why Us
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollToSection('team')} className="hover:text-neutral-300 transition-colors relative group">
                        Team
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </button>
                    <button onClick={() => scrollToSection('areas')} className="hover:text-neutral-300 transition-colors relative group">
                        Areas
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className={cn(
                            "px-6 py-2 border transition-all duration-300",
                            scrolled
                                ? "border-white text-white hover:bg-white hover:text-black"
                                : "border-white bg-white text-black hover:bg-transparent hover:text-white"
                        )}
                    >
                        Contact
                    </button>
                </div>

                <button className="md:hidden uppercase text-xs tracking-widest font-bold text-white mix-blend-difference">
                    Menu
                </button>
            </nav>

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
                            <p className="text-neutral-600 text-[10px] uppercase tracking-widest font-bold">
                                DRE# 012345678 • Est. 2026
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-8">Navigation</h4>
                            <ul className="space-y-4 text-sm text-neutral-300">
                                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button></li>
                                <li><button onClick={() => scrollToSection('stats')} className="hover:text-white transition-colors">Why Us</button></li>
                                <li><button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">Team</button></li>
                                <li><button onClick={() => scrollToSection('areas')} className="hover:text-white transition-colors">Areas</button></li>
                                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
                            </ul>
                        </div>

                        {/* Legal / Resources */}
                        <div className="col-span-1 md:col-span-3">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-8">Legal</h4>
                            <ul className="space-y-4 text-sm text-neutral-300">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Fair Housing Notice</a></li>
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
                            {/* Socials placeholder */}
                            <span className="text-[10px] text-neutral-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Instagram</span>
                            <span className="text-[10px] text-neutral-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Facebook</span>
                            <span className="text-[10px] text-neutral-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
