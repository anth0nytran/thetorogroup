import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="bg-white">
            <div className="flex flex-col lg:flex-row min-h-[800px]">

                {/* Left Image Side */}
                <div className="lg:w-1/2 relative min-h-[500px] lg:h-auto overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2673&auto=format&fit=crop"
                        alt="Lifestyle"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Right Content Side */}
                <div className="lg:w-1/2 bg-neutral-950 text-white p-12 md:p-24 flex flex-col justify-center relative">
                    <Quote className="w-16 h-16 text-accent/20 absolute top-12 left-12" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-8 block">Client Stories</span>

                        <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-12">
                            "Jack's team handled our complex trust sale with absolute professionalism. The marketing was cinematic, and the negotiation was fierce."
                        </h2>

                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-serif text-xl font-bold">
                                S
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-white">The Sterling Family</h4>
                                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">Emerald Bay, Laguna Beach</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-20 flex gap-12 border-t border-white/10 pt-8">
                        <div className="text-center group cursor-default">
                            <span className="block text-3xl font-serif text-white group-hover:text-accent transition-colors duration-300">5.0</span>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Zillow Rating</span>
                        </div>
                        <div className="text-center group cursor-default">
                            <span className="block text-3xl font-serif text-white group-hover:text-accent transition-colors duration-300">100+</span>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">5-Star Reviews</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
