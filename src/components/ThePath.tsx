import { motion } from "framer-motion";

const steps = [
    { num: "01", title: "Discovery", desc: "Understanding your family's needs, your timeline, and your vision for the future." },
    { num: "02", title: "Curation", desc: "We parse the market to find opportunities that match your criteria, including exclusive off-market listings." },
    { num: "03", title: "Strategy", desc: "Crafting a competitive offer or marketing plan designed to stand out and secure the best possible terms." },
    { num: "04", title: "Success", desc: "Guiding you through every detail of the closing process, ensuring a smooth transition to your next chapter." }
];

export default function ThePath() {
    return (
        <section className="bg-white py-32 px-6 md:px-12 border-b border-neutral-100">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
                    <div className="max-w-xl">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent border-l-2 border-accent pl-4 mb-6 block">Process</span>
                        <h2 className="text-5xl md:text-6xl font-serif text-black leading-none">
                            A Simplified <br /> <span className="text-neutral-400">Path Home</span>
                        </h2>
                    </div>
                    <div className="max-w-lg">
                        <p className="text-neutral-500 font-light text-lg leading-relaxed">
                            Real estate can be complex. We make it simple, transparent, and rewarding. A structured approach to your next chapter.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className={`group relative pt-12 pr-8 ${index !== steps.length - 1 ? 'border-r border-neutral-100' : ''}`}
                        >
                            {/* Top Line Indicator */}
                            <div className="absolute top-0 left-0 w-8 h-1 bg-black group-hover:w-full group-hover:bg-accent transition-all duration-500" />

                            <div className="mb-8">
                                <span className="text-4xl font-serif text-neutral-900 group-hover:text-accent transition-colors duration-300 block mb-2">{step.num}</span>
                            </div>

                            <h3 className="text-2xl font-serif mb-4 text-black">{step.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
