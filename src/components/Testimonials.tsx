import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        quote: "Jack's team handled our complex trust sale with absolute professionalism. The marketing was cinematic, and the negotiation was fierce.",
        author: "The Sterling Family",
        location: "Emerald Bay, Laguna Beach",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 2,
        quote: "We interviewed five agents. The Toro Group was the only one who came with a strategy, not just a sales pitch. They executed perfectly.",
        author: "Michael & Sarah Chen",
        location: "Newport Coast",
        rating: "5.0",
        source: "Google"
    },
    {
        id: 3,
        quote: "Unmatched market knowledge. They found us an off-market gem in a zero-inventory market. Truly grateful for their persistence.",
        author: "David Reynolds",
        location: "Corona Del Mar",
        rating: "5.0",
        source: "Direct"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    return (
        <section className="bg-white border-b-2 border-black">
            <div className="flex flex-col lg:flex-row min-h-[700px]">

                {/* Left Image Side - Static for now, could also carousel if desired */}
                <div className="lg:w-1/2 relative min-h-[400px] lg:h-auto overflow-hidden bg-neutral-100 border-r-2 border-black">
                    <img
                        src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2673&auto=format&fit=crop"
                        alt="Luxury Lifestyle in Newport Beach"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Right Content Side - Carousel */}
                <div className="lg:w-1/2 bg-white text-black p-8 md:p-24 flex flex-col justify-center relative">

                    <div className="mb-12">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-4 block border-l-2 border-black pl-4">Client Stories</span>
                    </div>

                    <div className="relative overflow-hidden min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <div className="flex gap-1 mb-8 text-accent">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>

                                <h2 className="text-2xl md:text-4xl font-serif leading-tight mb-12">
                                    "{reviews[currentIndex].quote}"
                                </h2>

                                <div>
                                    <h4 className="font-serif text-xl text-black font-bold">{reviews[currentIndex].author}</h4>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2 font-bold">{reviews[currentIndex].location}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="mt-16 flex items-center gap-8 border-t-2 border-neutral-100 pt-8 w-full justify-between md:justify-start">
                        <div className="flex gap-4">
                            <button
                                onClick={prevReview}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-none disabled:opacity-50"
                                aria-label="Previous Review"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextReview}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-none"
                                aria-label="Next Review"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-right">
                            <span className="text-xs font-bold tracking-[0.2em] text-neutral-400">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
