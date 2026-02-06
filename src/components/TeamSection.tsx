import { motion } from "framer-motion";


const team = [
    {
        name: "Jack Toro",
        role: "Team Leader",
        image: "/jack.webp",
        stats: "6 Years Experience",
        specialties: "Buyer's Agent, Listing Agent, Relocation, Commercial Properties",
        zillow: "https://www.zillow.com/profile/Jack%20Toro"
    },
    {
        name: "Sebastian Street",
        role: "Senior Associate",
        image: "/sebastian.webp",
        stats: "4 Years Experience",
        specialties: "Buyer's Agent, Listing Agent",
        zillow: "https://www.zillow.com/profile/sebastianstreetrlty"
    },
    {
        name: "Seth Bewley",
        role: "Junior Associate",
        image: "/seth.webp",
        stats: "2 Years Experience",
        specialties: "Buyer's Agent, Listing Agent, Property Management",
        zillow: "https://www.zillow.com/profile/sethbewley"
    }
];

export default function TeamSection() {
    return (
        <section id="team" className="bg-white py-32 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 block">The Team</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-black leading-none">
                            World-Class Service.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-[1400px] mx-auto">
                    {team.map((member, index) => {
                        // Custom transforms to normalize head sizes
                        let imageStyle = {};
                        if (member.name.includes("Sebastian")) {
                            imageStyle = { transform: "scale(1.6) translateY(8%)" };
                        } else if (member.name.includes("Jack")) {
                            imageStyle = { transform: "scale(1.15) translateY(2%)" };
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative cursor-pointer"
                            >
                                <div className="overflow-hidden mb-6 aspect-[3/4] bg-neutral-100 relative">
                                    <img
                                        src={member.image}
                                        alt={`Portrait of ${member.name}, ${member.role} at The Toro Group`}
                                        style={imageStyle}
                                        loading="lazy"
                                        decoding="async"
                                        width={600}
                                        height={800}
                                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${!member.name.includes("Sebastian") && !member.name.includes("Jack") ? 'group-hover:scale-105' : ''}`}
                                    />
                                </div>

                                <div className="border-l border-black pl-4 transition-all duration-300 group-hover:pl-6 group-hover:border-accent">
                                    <h3 className="text-2xl font-serif text-black group-hover:text-accent transition-colors">{member.name}</h3>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1 mb-3">{member.role}</p>

                                    {/* Minimal Stats & Links */}
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">{member.stats}</p>
                                        {member.specialties && (
                                            <p className="text-[10px] text-neutral-400 leading-relaxed max-w-[80%] line-clamp-1">{member.specialties}</p>
                                        )}
                                        {member.zillow && member.zillow !== "#" && (
                                            <a
                                                href={member.zillow}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-accent mt-2 transition-colors"
                                            >
                                                View Zillow Profile</a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

