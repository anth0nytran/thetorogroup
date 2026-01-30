import { Button } from "./ui/button";

export default function ContactForm() {
    return (
        <section id="contact" className="bg-white py-32 px-6 md:px-12 relative border-t-2 border-black">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24">

                {/* Left Side: Info */}
                <div className="lg:w-1/3">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-6 block border-l-2 border-black pl-4">Inquiry</span>
                    <h2 className="text-5xl md:text-7xl font-serif mb-12 text-black leading-none">
                        Start The <br /> Conversation.
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">Office</h4>
                            <p className="text-lg font-serif">Newport Beach, California</p>
                        </div>
                        <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">Contact</h4>
                            <p className="text-lg font-serif">714.732.1429</p>
                            <p className="text-lg font-serif">jack@soldbytoro.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-2/3">
                    <form className="space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">First Name</label>
                                <input
                                    type="text"
                                    className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 absolute -top-3 left-0 bg-white pr-2">Message</label>
                            <textarea
                                rows={1}
                                className="w-full border-b-2 border-neutral-200 py-4 text-xl font-serif focus:border-black focus:outline-none transition-all bg-transparent placeholder-transparent resize-none min-h-[60px]"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="pt-8 flex justify-end">
                            <Button size="lg" className="bg-black text-white px-12 py-8 rounded-none text-xs tracking-[0.2em] font-bold uppercase hover:bg-neutral-800 transition-all w-full md:w-auto">
                                Submit Inquiry
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
