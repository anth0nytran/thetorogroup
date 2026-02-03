import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BookingCTAProps {
    text?: string;
    buttonText?: string;
    variant?: "dark" | "light";
}

export default function BookingCTA({
    text = "Ready to Begin Your Journey?",
    buttonText = "Schedule a Consultation",
    variant = "dark"
}: BookingCTAProps) {
    const isDark = variant === "dark";

    return (
        <section className={`py-12 ${isDark ? "bg-neutral-900" : "bg-neutral-50 border-t border-b border-neutral-200"}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`text-2xl md:text-3xl font-serif ${isDark ? "text-white" : "text-black"}`}
                >
                    {text}
                </motion.h3>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className={`px-8 py-3 uppercase tracking-widest text-xs font-bold border flex items-center gap-3 transition-colors duration-300
                        ${isDark
                            ? "bg-transparent border-white/20 text-white hover:bg-white hover:text-black"
                            : "bg-black text-white border-black hover:bg-accent hover:border-accent hover:text-white"
                        }`}
                >
                    {buttonText} <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </section>
    );
}
