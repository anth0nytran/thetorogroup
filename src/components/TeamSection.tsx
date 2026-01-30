import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const team = [
    {
        name: "Member Name",
        role: "Principal / Founder",
    },
    {
        name: "Member Name",
        role: "Senior Associate",
    },
    {
        name: "Member Name",
        role: "Luxury Specialist",
    },
    {
        name: "Member Name",
        role: "Operations Director",
    }
];

export default function TeamSection() {
    return (
        <section id="team" className="bg-white py-32 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 block">The Collective</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-black leading-none">
                            Global Reach, <br /> <span className="text-neutral-400">Boutique Service.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative cursor-pointer"
                        >
                            {/* Placeholder Image Container */}
                            <div className="overflow-hidden mb-6 aspect-[3/4] bg-neutral-100 flex items-center justify-center relative group-hover:bg-neutral-200 transition-colors duration-500">
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-300 group-hover:text-accent transition-colors duration-500">
                                    <HelpCircle strokeWidth={0.5} className="w-24 h-24" />
                                </div>
                            </div>

                            <div className="border-l border-black pl-4 transition-all duration-300 group-hover:pl-6 group-hover:border-accent">
                                <h3 className="text-2xl font-serif text-black group-hover:text-accent transition-colors">{member.name}</h3>
                                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
