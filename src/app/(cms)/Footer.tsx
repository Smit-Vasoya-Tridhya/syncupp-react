import React from 'react';
import Image from 'next/image';
import Logo from '../../../public/assets/images/logo.png';
import Link from 'next/link';
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div>
        <>
        <div className='bg-white lg:py-24 py-10 border-b-2 border-gradientcolor2'>
            <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                <div className="flex items-center justify-center">
                    <a href="#">
                        <Image src={Logo} className="" alt="Logo" />
                    </a>
                </div>
                <ul className='pt-7 flex justify-center sm:flex-row flex-col'>
                    <li className='lg:px-14 md:px-6 px-3 sm:border-r border-lightblack leading-3'><Link href="#" className='text-lightblack font-inter leading-normal text-base'>FAQ</Link></li>
                    <li className='lg:px-14 md:px-6 px-3 sm:border-r border-lightblack leading-normal'><Link href="#" className='text-lightblack font-inter leading-normal text-base'>Contact us</Link></li>
                    <li className='lg:px-14 md:px-6 px-3 sm:border-r border-lightblack leading-normal'><Link href="#" className='text-lightblack font-inter leading-normal text-base'>Affiliate Program</Link></li>
                    <li className='lg:px-14 md:px-6 px-3 sm:border-r border-lightblack leading-normal'><Link href="#" className='text-lightblack font-inter leading-normal text-base'>Teams and condition</Link></li>
                    <li className='lg:px-14 md:px-6 px-3 leading-normal'><Link href="#" className='text-lightblack font-inter leading-normal text-base'>Privacy Policy</Link></li>
                </ul>
            </div>
        </div>
        <div>
            <div className='max-w-screen-xl mx-auto w-full xl:px-0 px-4'>
                <div className='flex md:justify-between justify-center lg:py-6 py-3 md:flex-row flex-col gap-4'>
                    <div>
                        <span>© 2023 SyncUpp</span>
                    </div>
                    <div>
                        <ul className='flex lg:gap-8 gap-4 md:justify-end justify-center'>
                            <li><Link href="#"><FaFacebookSquare className='bg-gradientcolor2 text-2xl text-midpurple'/></Link></li>
                            <li><Link href="#"><FaTwitterSquare className='bg-gradientcolor2 text-2xl text-midpurple'/></Link></li>
                            <li><Link href="#"><FaInstagramSquare className='bg-gradientcolor2 text-2xl text-midpurple'/></Link></li>
                            <li><Link href="#"><FaLinkedin className='bg-gradientcolor2 text-2xl text-midpurple'/></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    </div>
  )
}

export default Footer