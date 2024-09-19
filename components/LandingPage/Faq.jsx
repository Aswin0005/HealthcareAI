'use client'
import { useState } from 'react';
import Image from 'next/image';
import peopleonhill from "../../public/people-on-hill.png";
import garden from "../../public/garden.png";
import cloud1 from "../../public/cloud1.png";
import cloud2 from "../../public/cloud2.png";
import smallTree from "../../public/smallTree.png";
import dog from "../../public/dog.png";
import crow from "../../public/crow.png";

const faqData = [
    {
        question: "How does the AI chatbot work?",
        answer: "Our AI chatbot is designed to provide immediate support for various mental health concerns such as stress, depression, relationship problems and many more."
    },
    {
        question: "What should I do if the AI chatbot isn't enough for me?",
        answer: "If you find that the AI chatbot isn't meeting your needs or if you're experiencing severe issues, you can easily connect with a licensed therapist through our platform. Our therapists are available to provide professional guidance and support."
    },
    {
        question: "Can I use the platform for free?",
        answer: "We offer a range of free resources including access to the AI chatbot, motivational quotes, and interactive journals. However, certain features like one-on-one therapy sessions requires payment."
    },
    {
        question: "How do I book a session with a therapist?",
        answer: "To book a session with a therapist, simply navigate to the 'Therapists' section on our platform, choose a therapist that fits your needs, and select a convenient time for your session. You'll be able to complete the booking process online."
    },
    {
        question: "How do our games promote mental health?",
        answer: "We offer a variety of games designed to help with relaxation, stress relief, and mental wellness."
    },
    {
        question: "What are interactive journals, and how do they help?",
        answer: "Interactive journals are digital tools that help you track your thoughts, feelings, and progress over time and helps to gain insights on your mental health journey."
    },
    {
        question: "How is my personal information kept confidential on your platform?",
        answer: "We take your privacy and confidentiality very seriously. Our platform uses advanced security measures, including JWT (JSON Web Token) encryption, to protect your personal information."
    }
];

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="min-h-screen bg-yellow-50">
            <div className="p-8 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-800 text-center my-16">Frequently Asked Questions</h2>
                <div className="space-y-0">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`border-t border-slate-400 ${index === faqData.length - 1 ? 'border-b' : ''}`}
                        >
                            <button
                                className="w-full text-left flex justify-between items-center py-4 px-6 focus:outline-none"
                                onClick={() => handleToggle(index)}
                            >
                                <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                                {openIndex === index ? (
                                    <svg
                                        className="w-6 h-6 text-gray-600 transition-transform"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 15l-7-7-7 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-6 h-6 text-gray-600 transition-transform"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                )}
                            </button>
                            <div
                                className={`px-6 pb-4 text-gray-700 ${openIndex === index ? 'block' : 'hidden'}`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='relative'>
                <Image src={garden} alt="Garden" className='w-full' />
                <Image src={peopleonhill} alt="People on Hill" className='h-[400px] w-[1200px] absolute top-20 left-52' />
                <Image src={cloud1} alt="Cloud 1" className='absolute -top-[300px] w-[300px] h-82' />
                <Image src={cloud2} alt="Cloud 2" className='absolute -top-[400px] right-0 w-[400px] h-82' />
                <Image src={smallTree} alt="Small Tree" className='absolute -top-[85px] right-1 h-64 w-64' />
                <Image src={smallTree} alt="Small Tree" className='absolute top-[4px] right-[135px] h-32 w-32' />
                <Image src={dog} alt="Dog" className='absolute h-40 w-64 top-[230px] left-52' />
                <Image src={crow} alt="Crow" className='absolute h-40 w-64 -top-[40px] left-20' />
            </div>
        </section>
    );
}

export default Faq;
