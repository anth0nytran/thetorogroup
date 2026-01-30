import { motion } from "framer-motion";

const areas = [
    { name: "Newport Beach", image: "https://images.unsplash.com/photo-1495150487053-53d8544d6731?q=80&w=2670&auto=format&fit=crop" },
    { name: "Irvine", image: "https://images.unsplash.com/photo-1627916603767-1755a5b58300?q=80&w=2670&auto=format&fit=crop" },
    { name: "Huntington Beach", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db48c?q=80&w=2670&auto=format&fit=crop" },
    { name: "Laguna Beach", image: "https://images.unsplash.com/photo-1518182170546-07fa6ee16161?q=80&w=2670&auto=format&fit=crop" },
    { name: "Corona Del Mar", image: "https://images.unsplash.com/photo-1688649807212-32b0dcecc478?q=80&w=2671&auto=format&fit=crop" },
    { name: "Dana Point", image: "https://images.unsplash.com/photo-1667503723386-b4fe13009774?q=80&w=2670&auto=format&fit=crop" }
];

export default function ServiceAreas() {
    return (
        <section id="areas" className="bg-neutral-900 text-white py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">Prime Territories</h2>
                    <p className="text-neutral-400 font-light text-lg max-w-xl">
                        Representing the finest properties across Southern California's most coveted coastal communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areas.map((area, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
                        >
                            <img
                                src={area.image}
                                alt={area.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <h3 className="text-3xl font-serif font-medium tracking-wide text-white drop-shadow-md group-hover:scale-110 transition-transform duration-500">{area.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
