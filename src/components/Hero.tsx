import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Hero() {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="home" className="relative h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
            {/* Full Color Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                    alt="Luxury Estate"
                    className="w-full h-full object-cover scale-105 animate-slow-zoom"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-10 max-w-4xl"
                >
                    <div>
                        <h2 className="text-sm md:text-base tracking-[0.4em] font-bold uppercase text-white/90 mb-4 border-l-2 border-accent pl-4">
                            Orange County • Est. 2026
                        </h2>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                            THE TORO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">GROUP</span> CORP.
                        </h1>
                    </div>

                    <p className="max-w-xl text-lg md:text-2xl font-light text-white/90 leading-relaxed drop-shadow-md border-l border-white/20 pl-6">
                        Guided by experience. Driven by results. We help you navigate the luxury market with confidence and clarity.
                    </p>

                    <div className="pt-4 flex flex-col md:flex-row gap-6">
                        <Button
                            size="lg"
                            onClick={scrollToContact}
                            className="bg-accent text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-xl border border-transparent hover:border-white"
                        >
                            Start Your Journey
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => document.getElementById('areas')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-none px-12 py-8 text-sm tracking-widest uppercase font-bold backdrop-blur-md"
                        >
                            View Our Work
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-white mix-blend-difference z-20"
            >
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Scroll to Explore</span>
                <div className="h-[2px] w-24 bg-accent" />
            </motion.div>
        </div>
    );
}
