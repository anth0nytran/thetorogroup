import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const stats = [
    { label: "Team Sales", value: "418", desc: "Last 12 Months" },
    { label: "Total Team Sales", value: "5,091", desc: "Lifetime" },
    { label: "Price Range", value: "$10k - $8.5M", desc: "Represented" },
    { label: "Average Price", value: "$695k", desc: "Sold Homes" },
];

const activity = [
    { address: "123 Coastal Way", city: "Newport Beach", price: "$4,200,000", status: "Sold", date: "Jan 12, 2026" },
    { address: "456 Hillside Drive", city: "Laguna Niguel", price: "$1,850,000", status: "In Escrow", date: "Jan 08, 2026" },
    { address: "789 Park Avenue", city: "Irvine", price: "$2,100,000", status: "Just Listed", date: "Jan 03, 2026" },
    { address: "321 Ocean Blvd", city: "Corona Del Mar", price: "$6,500,000", status: "Sold", date: "Dec 15, 2025" },
];

export default function StatsActivity() {
    return (
        <section id="stats" className="flex flex-col xl:flex-row-reverse bg-white items-start">

            {/* Left Section: High-Impact Architectural Visual */}
            <div className="w-full h-[50vh] xl:w-1/2 xl:h-screen xl:sticky xl:top-0 overflow-hidden bg-neutral-900 relative">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                    alt="Modern Luxury Estate in Orange County"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute bottom-0 left-0 p-8 md:p-24 z-10">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 md:mb-6 block border-l-2 border-accent pl-4">Est. 2026</span>
                    <h2 className="text-4xl md:text-5xl xl:text-7xl font-serif text-white leading-tight mb-0 md:mb-6">
                        Orange County, <br /> California.
                    </h2>
                </div>
            </div>

            {/* Right Section: Corporate Data Grid */}
            <div className="w-full xl:w-1/2 bg-white flex flex-col justify-center py-16 px-6 md:px-24">

                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4 block border-l-2 border-accent pl-4">Market Authority</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
                        Deep Roots. <br /> <span className="text-neutral-400 italic">Proven Results.</span>
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-16 mb-16 md:mb-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group border-t-2 border-black pt-6"
                        >
                            <h3 className="text-4xl md:text-6xl font-light font-serif mb-3 text-black group-hover:text-accent transition-colors duration-300">{stat.value}</h3>
                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">{stat.label}</p>
                            <p className="text-[10px] text-neutral-400">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Transactions Table */}
                <div>
                    <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
                        <h3 className="text-lg md:text-xl font-serif text-black uppercase tracking-widest font-bold">Live Activity Ledger</h3>
                        <button className="text-[10px] uppercase tracking-widest text-black hover:text-accent transition-colors flex items-center gap-2 font-bold group">
                            View Full History <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Category Headers (Desktop) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-[10px] uppercase tracking-widest text-black font-bold px-4">
                        <div className="col-span-4">Location</div>
                        <div className="col-span-3">Service</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-2 text-right">Value</div>
                    </div>

                    <div className="grid grid-cols-1 divide-y-2 divide-neutral-100">
                        {/* Rows */}
                        {activity.map((item, index) => (
                            <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-4 py-6 md:py-6 items-start md:items-center cursor-default hover:bg-neutral-50 transition-colors -mx-4 px-4 rounded-lg border-b border-neutral-100 md:border-b-0 last:border-0 group">

                                {/* Mobile Top Row: City & Price */}
                                <div className="flex md:contents justify-between w-full items-start">
                                    <div className="col-span-4">
                                        <h4 className="font-serif text-lg text-black group-hover:text-accent transition-colors duration-300">{item.city}</h4>
                                        <p className="text-xs text-neutral-500 mt-1">{item.address}</p>
                                    </div>

                                    {/* Mobile Only Price (Hidden on Desktop) */}
                                    <div className="md:hidden text-right">
                                        <p className="font-mono text-black font-medium">{item.price}</p>
                                    </div>
                                </div>

                                <div className="col-span-3 hidden md:block">
                                    <span className="text-xs text-neutral-400">Residential Sales</span>
                                </div>
                                <div className="col-span-3 mt-2 md:mt-0">
                                    <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full ${item.status === 'Sold' ? 'bg-accent/10 text-accent' : 'bg-neutral-100 text-neutral-500 border border-neutral-200'}`}>{item.status}</span>
                                </div>

                                {/* Desktop Only Price */}
                                <div className="col-span-2 text-right hidden md:block">
                                    <p className="font-mono text-black">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
