'use client';
import Image from 'next/image';
import box1Before from "../../public/box1Before.png";
import box1After from "../../public/box1After.png";
import box3Before from "../../public/box3Before.png";
import box3After from "../../public/box3After.png";
import box2Before from "../../public/box2Before.png";
import box2After from "../../public/box2After.png";

function Services() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50">
            <div className="p-8 rounded-lg text-center">
                <h1 className="text-5xl font-light mb-4">You deserve to be happy.</h1>
                <h3 className="text-2xl text-gray-600 mb-16">What type of help are you looking for?</h3>
                <div className="flex gap-12 justify-center">
                    <div className="group bg-[#397A4A] w-[340px] h-72 relative flex items-center justify-center rounded-xl overflow-hidden hover:scale-95 transition duration-250 hover:border-4 hover:border-[#397A4A]">
                        <h2 className="absolute top-8 left-9 text-2xl text-white">AI Chatbot</h2>
                        <p className="absolute top-16 left-9 text-white">Talk to AI Friend</p>
                        <div className="h-32 w-96 rounded-full bg-[#b9e26b] border-12 border-[#397A4A] absolute -bottom-20 left-10"></div>
                        <Image src={box1Before} alt="Before" className="absolute right-0 bottom-4 group-hover:hidden" />
                        <Image src={box1After} alt="After" className="absolute right-3 -bottom-3 hidden group-hover:block" />
                    </div>
                    <div className="group bg-[#457777] w-[340px] h-72 relative flex items-center justify-center rounded-xl overflow-hidden hover:scale-95 transition duration-250 hover:border-4 hover:border-[#457777]">
                        <h2 className="absolute top-8 left-9 text-2xl text-white">Therapist Support</h2>
                        <p className="absolute top-16 left-9 text-white">Book a Session</p>
                        <div className="h-32 w-96 rounded-full bg-[#91CDCC] border-12 border-[#397A4A] absolute -bottom-20 left-10"></div>
                        <Image src={box2Before} alt="Before" className="absolute right-2 bottom-0 group-hover:hidden" layout="fill" objectFit="cover" />
                        <Image src={box2After} alt="After" className="absolute right-2 bottom-0 hidden group-hover:block" layout="fill" objectFit="cover" />
                    </div>
                    <div className="group bg-[#A75D00] w-[340px] h-72 relative flex items-center justify-center rounded-xl overflow-hidden hover:scale-95 transition duration-250 hover:border-4 hover:border-[#A75D00]">
                        <h2 className="absolute top-8 left-9 text-2xl text-white">Others</h2>
                        <p className="absolute top-16 left-9 text-white">Games, Journals, etc..</p>
                        <div className="h-32 w-96 rounded-full bg-[#F1DB69] border-12 border-[#A75D00] absolute -bottom-20 left-10"></div>
                        <Image src={box3Before} alt="Before" className="absolute right-2 bottom-0 group-hover:hidden" />
                        <Image src={box3After} alt="After" className="absolute right-2 bottom-0 hidden group-hover:block" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
