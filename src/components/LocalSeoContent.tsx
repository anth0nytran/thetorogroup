import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
    {
        question: "Which Orange County neighborhoods does The Toro Group serve?",
        answer:
            "The team works throughout Orange County, including Newport Beach, Laguna Beach, Corona Del Mar, Irvine, Huntington Beach, and Dana Point."
    },
    {
        question: "Can The Toro Group help with both buying and selling?",
        answer:
            "Yes. Services include buyer strategy, listing strategy, negotiations, marketing, and contract-to-close support for both sides of the transaction."
    },
    {
        question: "Do you support relocation clients moving to Orange County?",
        answer:
            "Yes. Relocation support includes neighborhood guidance, market education, and timeline planning to make your move efficient and low-stress."
    },
    {
        question: "Do you help with distressed property and short sale scenarios?",
        answer:
            "Yes. The team can advise on distressed situations and short sale pathways with a practical and confidential process."
    }
];

export default function LocalSeoContent() {
    return (
        <section id="faq" className="bg-white text-black py-24 px-6 md:px-12 border-t border-neutral-200">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                {/* Left Column: Authority Content */}
                <div className="lg:col-span-4 space-y-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4 block border-l-2 border-black pl-4">
                            Real Estate Services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-black">
                            Trusted <span className="italic text-neutral-500">Advisors</span> For Buyers, Sellers, & Relocation.
                        </h2>
                    </div>

                    <div className="space-y-6 text-neutral-600 font-light leading-relaxed">
                        <p>
                            The Toro Group Corp is an Orange County real estate team helping clients buy and sell homes in Newport Beach, Laguna Beach, Corona Del Mar, Irvine, Huntington Beach, and Dana Point.
                        </p>
                        <p>
                            Whether you are moving up, downsizing, investing, or relocating to the coast, our process is built around pricing accuracy, negotiation strength, and clear communication.
                        </p>
                        <p>
                            We combine local market expertise with data-backed strategy to position listings for visibility and to help buyers compete intelligently in fast-moving neighborhoods.
                        </p>
                    </div>
                </div>

                {/* Right Column: Minimalist Accordion */}
                <div className="lg:col-span-8">
                    <h3 className="text-xl font-serif text-black mb-8 pb-4 border-b border-black">Common Questions</h3>
                    <div className="divide-y divide-neutral-200">
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left group-hover:bg-neutral-50 transition-colors px-2"
                aria-expanded={isOpen}
            >
                <span className="font-serif text-xl md:text-2xl text-black group-hover:text-black/70 transition-colors pr-8">
                    {question}
                </span>
                <span className="flex-shrink-0 text-black">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-8 text-neutral-600 font-light leading-relaxed text-lg max-w-3xl px-2">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
