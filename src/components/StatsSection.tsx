import { motion } from "framer-motion";

const stats = [
    { label: "Team Sales", value: "418", sub: "Last 12 Months" },
    { label: "Total Team Sales", value: "5,091", sub: "Lifetime" },
    { label: "Price Range", value: "$10k - $8.5M", sub: "Represented" },
    { label: "Average Price", value: "$695k", sub: "Sold Homes" },
];

export default function StatsSection() {
    return (
        <section id="stats" className="relative py-32 px-6 md:px-12 text-white overflow-hidden">
            {/* Background with dark overlay for robustness */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                    alt="City Structure"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/90" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-white/10 md:divide-x">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-5xl md:text-7xl font-serif text-white">{stat.value}</span>
                            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">{stat.label}</span>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">{stat.sub}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md">
                        <span className="h-3 w-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                        <span className="text-sm tracking-widest font-medium uppercase text-white">
                            Official Zillow Premier Agent
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
