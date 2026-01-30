import { Button } from "./ui/button";

export default function ContactForm() {
    return (
        <section id="contact" className="bg-white py-32 px-6 md:px-12 relative">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-5xl md:text-6xl font-serif mb-8 text-black leading-tight">
                        Let's Start <br /> The Conversation.
                    </h2>
                    <div className="space-y-2 text-neutral-500">
                        <p>Newport Beach, CA</p>
                        <p>714.732.1429</p>
                        <p>jack@soldbytoro.com</p>
                    </div>
                </div>

                <div className="lg:w-2/3">
                    <form className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group">
                                <input
                                    type="text"
                                    className="w-full border-b border-neutral-300 py-4 text-lg focus:border-black focus:outline-none transition-colors bg-transparent placeholder-neutral-300"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="text"
                                    className="w-full border-b border-neutral-300 py-4 text-lg focus:border-black focus:outline-none transition-colors bg-transparent placeholder-neutral-300"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <input
                                type="email"
                                className="w-full border-b border-neutral-300 py-4 text-lg focus:border-black focus:outline-none transition-colors bg-transparent placeholder-neutral-300"
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="group">
                            <textarea
                                rows={1}
                                className="w-full border-b border-neutral-300 py-4 text-lg focus:border-black focus:outline-none transition-colors bg-transparent placeholder-neutral-300 resize-none min-h-[60px]"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button size="lg" className="bg-black text-white px-16 py-8 rounded-none text-sm tracking-[0.2em] font-bold uppercase hover:bg-neutral-800 transition-all">
                                Submit Inquiry
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
