import { motion } from "framer-motion";

export default function TrustedBy() {
    const partners = [
        "EHOMES",
        "REDFIN",
        "ZILLOW",
        "REALTOR.COM",
        "TRULIA",
        "HOMES.COM",
        "APARTMENTS.COM",
        "MOVOTO",
        "LOOPNET",
    ];

    return (
        <section className="bg-neutral-50 py-10 px-6 border-b border-black/5">
            <div className="max-w-[1800px] mx-auto flex flex-col items-center">
                <div className="flex items-center gap-4 mb-8 opacity-40">
                    <div className="h-px w-8 md:w-16 bg-black" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black block text-center whitespace-nowrap">
                        In Partnership With
                    </span>
                    <div className="h-px w-8 md:w-16 bg-black" />
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-24 w-full">
                    {partners.map((partner, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-neutral-400 font-serif text-lg md:text-xl font-medium tracking-tight hover:text-black transition-colors duration-500 cursor-default uppercase text-center"
                        >
                            {partner}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
