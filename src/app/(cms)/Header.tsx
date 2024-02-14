import React from 'react';
import 'flowbite';
import { Navbar} from 'flowbite-react';
import Image from 'next/image';
import Logo from '../../../public/assets/images/logo.png';

const Header = () => {
  return (<>
    <Navbar className="bg-white borderl-none borderr-none bordert-none p-0 border-b border-purple">
      <div className="relative max-w-screen-xl flex flex-wrap items-center sm:justify-between justify-center mx-auto w-full md:py-5 lg:px-0 px-4 lg:mb-0 mb-4">
        <a href="#" className="flex items-center rtl:space-x-reverse lg:order-2 lg:pr-[6%]">
          <Image src={Logo} className="" alt="Logo" />
        </a>
        <div className="flex lg:order-3 rtl:space-x-reverse gap-5 items-center">
            <button type="button" className="text-purple bg-lightpurple px-4 py-3 uppercase font-bold lg:text-base text-sm md:leading-6 rounded">Sign Up</button>
            <button type="button" className="text-white bg-purple px-4 py-3 uppercase font-bold lg:text-base text-sm md:leading-6 rounded">Start free trial</button>
            <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
        </div>
        <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1 lg:static absolute lg:bg-transparent bg-white left-0 right-0 lg:px-0 px-4 top-full" id="navbar-cta">
          <ul className="flex flex-col rtl:space-x-reverse lg:flex-row md:gap-12 gap-4 ">
            <li>
              <a href="#" className="block font-inter font-normal text-lg md:leading-5 text-lightblack hover:text-darkpurple capitalize" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block font-inter font-normal text-lg md:leading-5 text-lightblack hover:text-darkpurple capitalize ">Features</a>
            </li>
            <li>
              <a href="#" className="block font-inter font-normal text-lg md:leading-5 text-lightblack hover:text-darkpurple capitalize ">Price</a>
            </li>
            <li>
              <a href="#" className="block font-inter font-normal text-lg md:leading-5 text-lightblack hover:text-darkpurple capitalize ">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>

  </>
  )
}

export default Header