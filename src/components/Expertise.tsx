import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const expertise = [
    {
        title: "Buying",
        subtitle: "Acquisition Strategy",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        desc: "Access to off-market listings and a strategy that secures your dream home.",
        service: "buying"
    },
    {
        title: "Selling",
        subtitle: "Maximum Valuation",
        image: "/assets/expertise_selling.webp",
        desc: "Positioning your asset for maximum value through cinematic marketing.",
        service: "selling"
    },
    {
        title: "Relocation",
        subtitle: "Concierge Transition",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop",
        desc: "Seamless transitions for executives moving to Southern California.",
        service: "relocation"
    },
    {
        title: "Distressed",
        subtitle: "Short Sale Specialist",
        image: "/assets/expertise_distressed.webp",
        desc: "Navigating complex financial situations with discretion and speed.",
        service: "distressed"
    }
];

export default function Expertise() {
    const handleCardClick = (service: string) => {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Dispatch custom event to pre-select service
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('selectService', { detail: { service } }));
            }, 500);
        }
    };

    return (
        <section id="services" aria-labelledby="services-heading" className="bg-white pb-32 pt-20 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 px-0 md:px-4">
                    <div className="max-w-xl">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent border-l-2 border-accent pl-4 mb-4 block">Our Specialties</span>
                        <h2 id="services-heading" className="text-4xl md:text-7xl font-serif text-black leading-[0.9]">
                            Expertise & <br /> <span className="italic text-neutral-400">Focus</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-left md:text-right text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-medium mt-6 md:mt-0">
                        We specialize in high-stakes transactions across the residential spectrum.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto lg:h-[700px]">
                    {expertise.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => handleCardClick(item.service)}
                            className="group relative h-[500px] lg:h-full border-r border-white/20 lg:border-r-0 overflow-hidden cursor-pointer"
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={`Luxury Real Estate ${item.title} Services`}
                                loading="lazy"
                                decoding="async"
                                width={600}
                                height={800}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.subtitle}</span>
                                <div className="h-px w-8 bg-accent mb-4 group-hover:w-full transition-all duration-500" />
                                <h3 className="text-4xl font-serif text-white mb-4">{item.title}</h3>
                                <p className="text-neutral-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 max-w-xs">
                                    {item.desc}
                                </p>

                                {/* CTA on hover */}
                                <div className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                                    <span className="text-xs uppercase tracking-widest font-bold text-white">Get Started</span>
                                    <ArrowRight className="w-4 h-4 text-accent" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
