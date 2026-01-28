import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 mt-10">
            {/* 1. max-w-7xl: Limits the width exactly like the Navbar.
        2. mx-auto: Centers the container.
        3. px-6: Matches the horizontal padding of your Navbar.
      */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* ---- Left Side ---- */}
                    <div className="md:w-1/3 space-y-6">
                        {/* The Logo here will now start at the same X-coordinate as the Navbar logo */}
                        <img
                            src={logo}
                            alt="SkillBridge"
                            className="h-14 w-auto rounded-full object-contain"
                        />
                        <p className="text-sm leading-relaxed text-gray-500">
                            SkillBridge helps students bridge the gap between academic learning and
                            industry skills.
                        </p>
                    </div>

                    {/* ---- Right Side Group ---- */}
                    <div className="flex flex-1 justify-between md:justify-around">
                        {/* Company Links */}
                        <div>
                            <p className="text-sm font-bold mb-6 text-black uppercase">Company</p>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="hover:text-blue-600 cursor-pointer">Home</li>
                                <li className="hover:text-blue-600 cursor-pointer">Contributors</li>
                                <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <p className="text-sm font-bold mb-6 text-black uppercase">
                                Get In Touch
                            </p>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li>+91 8920103876</li>
                                <li>+91 8755671186</li>
                                <li className="text-blue-500">SkillBridge@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ---- Copyright ---- */}
                <div className="mt-16 pt-8 border-t border-gray-100 text-sm text-center text-gray-400">
                    <p>© 2026 SkillBridge. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
