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

            <footer className="bg-black text-white py-12 px-6 md:px-12 border-t border-neutral-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-serif font-bold mb-2">The Toro Group Corp.</h3>
                        <p className="text-neutral-500 text-xs uppercase tracking-widest">Luxury Real Estate • DRE# 012345678</p>
                    </div>

                    <div className="flex gap-8 text-neutral-400">
                        {/* Social placeholders */}
                        <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">IG</span>
                        <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">FB</span>
                        <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">LI</span>
                    </div>

                    <div className="text-right flex flex-col gap-1 text-xs text-neutral-500">
                        <a href="tel:7147321429" className="hover:text-white transition-colors">714.732.1429</a>
                        <a href="mailto:jack@soldbytoro.com" className="hover:text-white transition-colors">jack@soldbytoro.com</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
