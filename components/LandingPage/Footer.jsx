'use client';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

function Footer() {
    return (
        <div className="bg-[#647B51] text-white h-[350px] flex flex-col justify-between p-3">
            <div className="flex justify-between mx-16">
                <div className='flex flex-col justify-between'>
                    <div className='flex justify-center items-center text-3xl h-full'>
                        Logo
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Contact</h3>
                        <p className="text-sm">Email: support@example.com</p>
                        <p className="text-sm">Phone: (123) 456-7890</p>
                    </div>
                </div>

                <div className="text-center mt-8 text-xl italic">
                    <blockquote className="font-semibold text-2xl px-24">
                        “Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds. Choose to nurture positivity and resilience.”
                    </blockquote>
                </div>

                <div>
                    <h3 className="text-2xl font-bold">Services</h3>
                    <ul className="text-sm">
                        <li className='pb-1'>AI Chatbot</li>
                        <li className='pb-1'>Therapist</li>
                        <li className='pb-1'>Assessment</li>
                        <li className='pb-1'>Journals</li>
                        <li className='pb-1'>Quotes</li>
                        <li className='pb-1'>Games</li>
                    </ul>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-center">Stay Connected</h3>
                <div className="flex justify-center mt-2">
                    <a href="#" className="mx-2"><FaFacebook size={24} /></a>
                    <a href="#" className="mx-2"><FaTwitter size={24} /></a>
                    <a href="#" className="mx-2"><FaInstagram size={24} /></a>
                    <a href="#" className="mx-2"><FaLinkedin size={24} /></a>
                </div>
            </div>

            <div className="text-center mb-4 text-sm">
                © {new Date().getFullYear()} Your Company. All Rights Reserved.
            </div>
        </div>
    );
}

export default Footer;
