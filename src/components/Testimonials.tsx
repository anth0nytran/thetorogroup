import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        quote: "Jack has been very responsive and kept us in the loop on every detail during our home search. He knows the home buying process inside and out and leaves no stones left unturned. He is quick to answer any questions we have.",
        author: "Tyler",
        location: "Home Search in AZ 85295",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 2,
        quote: "Seth was unbelievable for the start, he revolves your journey around your timeline and looks out for exactly what you’re looking for. Seth provided options based on what I was looking for. He is up to date with everything and doesn’t take more than 15 minutes to reply.",
        author: "Manuel",
        location: "Bought in Compton, CA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 3,
        quote: "Sebastián did an amazing job helping me purchase my home. I was able to stay in the area I wanted and worked with me to get a monthly payment that was in my budget. He had a lot of knowledge and knew his way around the town very well.",
        author: "CeciliaSaidenDavis",
        location: "Bought in Central City East, LA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 4,
        quote: "Jack was incredible! I tried another agent before him who was not working in the best interests of my family. Once I found Jack, things took off and fast. We submitted an offer and he got it accepted immediately.",
        author: "Ben & Jenna",
        location: "Homestead North, Maricopa",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 5,
        quote: "Seth was great to work with. He did an outstanding job in helping us find the right property. He was so informative, easy to communicate with, and very responsive. He wanted to make sure we were happy with our choice.",
        author: "ivettesantiagomeans",
        location: "Showed home in CA 90715",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 6,
        quote: "Sebastian was such a pleasure and amazing to work with. We met him when we viewed our first property and ended up helping us as both seller and buyer. His ability to meet our needs at every step was unparalleled.",
        author: "Celina Carey",
        location: "Bought and Sold in 2024",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 7,
        quote: "Jack made my SO and I’s first buying experience a memorable, positive and practically stress free process with his good moral and dedication. Jack made us feel like valued people; we felt prioritized and important all through the process.",
        author: "Zillow User",
        location: "Homestead North, Maricopa",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 8,
        quote: "Seth is an excellent agent. I am from out of state, looking to buy my first home. Seth is very responsive and accommodating. I've only had availability in the mornings to meet, and live in a different time zone, yet he has met me each time with excitement and patience.",
        author: "Logan Meadows",
        location: "Showed home in CA 91335",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 9,
        quote: "Sebastian did an outstanding job. Very knowledgeable. Great guy. Our first time and he showed the property so well and didn’t give my wife and I any pressures or pushy feelings. Answered all of our questions and made sure we were aware of the market & everything.",
        author: "lifechen18",
        location: "Northeast, Anchorage, AK",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 10,
        quote: "Jack Toro is an amazing realtor. He really listened to our wants and needs and then provided listings appropriate for us. He is very professional and personable. He earned our trust knowing he was looking out for our best interest.",
        author: "Wally Hardwick",
        location: "San Marcos, Chandler",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 11,
        quote: "Seth was amazing to work with. Whenever I had questions or simply needed advice on the best course of action, Seth was consistent and thorough in his responses. You can tell he really cares and is invested in finding the right home for you.",
        author: "xtaltong",
        location: "Consulted in CA 90701",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 12,
        quote: "We had the pleasure of having Sebastian help us buy our first home. He was super dedicated and responsive the whole way through, and you could feel how invested he was in making sure that we landed the property that was right for us.",
        author: "mogueljulio",
        location: "Bought in Topanga, CA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 13,
        quote: "Jack goes above and beyond for his clients giving a VIP experience. Jack ensures to hold your hand through the entire process making sure you understand everything before agreeing or signing documents. Jack treats you as if you are his own family.",
        author: "Simone Levine",
        location: "Tolleson, AZ",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 14,
        quote: "Seth was great! Very personable and a good listener. He was regularly available when I contacted him with questions and he really put in the work to help us find what we were looking for.",
        author: "ArlingtonSimoneInc",
        location: "Showed home in CA 91335",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 15,
        quote: "Sebastian showed my wife and I a ton of homes and helped us create a detailed plan to get us prepared to buy our first home. We can’t wait until the time is right to buy. Definitely will be recommending Sebastian to our friends and family.",
        author: "fyt6d8k8pd",
        location: "Showed home in CA 90404",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 16,
        quote: "Seth was fantastic to work with! He was super responsive and understanding. As a first time homebuyer he did a great job at navigating the process for me and answer any of the 1000 random questions I had with promptness.",
        author: "mackenzienframe",
        location: "Bought in Valencia, CA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 17,
        quote: "I couldn’t recommend Sebastian enough. He is the best! My fiancé and I found a beautiful home with him. He is extremely knowledgeable in Real Estate and knows the Market very well. He is also very Professional and keeps up with all the Real Estate Market Trends.",
        author: "aliensfrommarz",
        location: "Showed home in 2024",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 18,
        quote: "Seth was a joy to connect with during my home search! He was not only personable and warm, but his understanding of the home buying process helped me to feel comfortable and confident while navigating the market.",
        author: "zippyhw",
        location: "Showed home in Los Angeles, CA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 19,
        quote: "Sebastian Street helped me by showing homes in the area I was interested in and was very knowledgeable and professional! He is very responsive and quick to reply. He made the process of searching for homes a smooth and easy experience.",
        author: "y9xxmdddpy",
        location: "Hayden, AL",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 20,
        quote: "Extremely transparent and friendly person to work with. He rolled with every change I made to my budget/plans and didn't try to push me into anything. This was my first time buying a house and I thoroughly enjoyed the experience.",
        author: "Samar Mathur",
        location: "Bought in AZ 85201",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 21,
        quote: "Sebastian did an outstanding job in helping me purchase my condo. He was very timely, responsive, and knowledgeable. After explaining to him what I was looking for, he presented me with multiple properties, leading to the discovery of the perfect home!!",
        author: "Alejandra Zugasti",
        location: "Bought in Chino Hills, CA",
        rating: "5.0",
        source: "Zillow"
    },
    {
        id: 22,
        quote: "Sebastian was outstanding in helping us with the purchase of our home. He did not miss a beat and was in constant contact with other agencies to make sure we closed on time. He was professional, prompt, and committed to his clients.",
        author: "zuser20161017101804419",
        location: "Bought in Hesperia, CA",
        rating: "5.0",
        source: "Zillow"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    return (
        <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-white border-b-2 border-black">
            <div className="flex flex-col lg:flex-row min-h-[700px]">

                {/* Left Image Side - Static for now, could also carousel if desired */}
                <div className="lg:w-1/2 relative min-h-[400px] lg:h-auto overflow-hidden bg-neutral-100 border-r-2 border-black">
                    <img
                        src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2673&auto=format&fit=crop"
                        alt="Luxury Lifestyle in Newport Beach"
                        loading="lazy"
                        decoding="async"
                        width={2673}
                        height={1800}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Right Content Side - Carousel */}
                <div className="lg:w-1/2 bg-white text-black p-8 md:p-24 flex flex-col justify-center relative">

                    <div className="mb-12">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-4 block border-l-2 border-black pl-4">Client Stories</p>
                        <h2 id="testimonials-heading" className="sr-only">Client Testimonials</h2>
                    </div>

                    <div className="relative overflow-hidden min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <div className="flex gap-1 mb-8 text-accent">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>

                                <blockquote className="text-2xl md:text-4xl font-serif leading-tight mb-12">
                                    "{reviews[currentIndex].quote}"
                                </blockquote>

                                <div>
                                    <h4 className="font-serif text-xl text-black font-bold">{reviews[currentIndex].author}</h4>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 mt-2 font-bold">{reviews[currentIndex].location}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="mt-16 flex items-center gap-8 border-t-2 border-neutral-100 pt-8 w-full justify-between md:justify-start">
                        <div className="flex gap-4">
                            <button
                                onClick={prevReview}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-none disabled:opacity-50"
                                aria-label="Previous Review"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextReview}
                                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 rounded-none"
                                aria-label="Next Review"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="text-right">
                            <span className="text-xs font-bold tracking-[0.2em] text-neutral-400">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
