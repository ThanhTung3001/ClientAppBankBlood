import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight,AiOutlineTwitter,AiFillInstagram } from 'react-icons/ai';
import { SiZalo } from "react-icons/si";
//SiZalo
import {BsBrowserSafari} from 'react-icons/bs';
import { Logo } from '../Logo';
// import { Logo } from '../../Logo';
export  const Footer = () => (
    <div id="footer" >
        <div className="container flex justify-between">
            <div className="w-1/2 sm:w-1/4 p-2">
                <div className="flex flex-col">
                    <p className="title text-2xl font-bold text-white pb-0 mb-1 sm:mb-3">
                        About Us
                    </p>
                    <p className="pt-0 sm:pt-2 text-gray-200">
                        An award winning agency based
                        in London. difference. An award
                        winning agency based in
                    </p>
                    <div className="flex flex-row mt-2 pt-0 sm:mt-3 justify-start">
                         <Link className='bg-[#2754fe] btn btn-primary btn-social mr-0 sm:mr-3'><BsBrowserSafari color='white' size={18}/></Link>
                         <Link className='bg-[#20a1f2] btn btn-primary btn-social m-1 sm:mr-3'><AiOutlineTwitter color='white' size={18}/></Link>
                         <Link className=' btn btn-primary btn-social zalo mr-3'><AiFillInstagram color='white' size={18}/></Link>
                    </div>
                </div>
            </div>
            <div className="w-1/2 sm:w-1/5 p-2">
                <div className="flex flex-col">
                    <p className="title text-2xl font-bold text-white mb-0">
                        Links
                    </p>
                    <Link to={'/'}>
                        <p className=" sm:pt-2 text-gray-200 hover:text-red-400">
                            Home
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            About
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            Services
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            Blog
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            Contact
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            Event
                        </p>
                    </Link>
                    <Link to={'/'}>
                        <p className="sm:pt-2 text-gray-200 hover:text-red-400">
                            Appointment
                        </p>
                    </Link>
                </div>
            </div>   <div className="w-1/2 sm:w-1/4 p-2">
                <div className="flex flex-col">
                    <p className="title text-2xl font-bold text-white mb-1 sm:mb-3">
                        Contact
                    </p>
                    <p className=" pt-0 sm:pt-2 text-gray-200">
                        Contact@bloodbank.vn
                    </p>
                    <p className=" p-0 text-gray-200 mb-0">
                        Info@bloodbank.vn
                    </p>
                    <p className="mt-3 sm:mt-4 title text-2xl font-bold text-white mb-0 sm:mb-3">
                        Phone
                    </p>
                    <p className="text-gray-200">
                        +84359254498
                    </p>
                </div>
            </div>   <div className="w-1/2 sm:w-2/5 p-2">
                <div className="flex flex-col">
                    <p className="title text-2xl font-bold text-white mb-0 sm:mb-3">
                        Subcribe Now
                    </p>
                    <p className="pt-2 text-gray-200">
                        An award winning agency based in London.
                        Wedesign beautiful products make a
                        difference.
                    </p>
                        <div className="mt-2 sm:mt-8 bg-white p-0 sm:pt-3 rounded-md">
                            <Logo />

                        </div>
                </div>
            </div>
        </div>
    </div>
)
