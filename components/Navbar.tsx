'use client';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMultiply} from '@fortawesome/free-solid-svg-icons'

type Props = {}

export default function Navbar({}: Props) {
    
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;
        if(clientWidth < 768) {
            setIsOpen(false);
        }
        return () => {
            setIsOpen(true);
        }
    }, []);

    return (
        <nav className="bg-white fixed top-0 inset-x-0 px-8 py-3 w-full shadow-sm shadow-[#1026490F] z-20 flex justify-between items-center">
            <img src="/logo.svg" alt="logo" className="h-6" />
            <div style={isOpen ? {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            } : {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0% 0)"
            }} className='bg-white absolute md:static inset-x-0 transition-all md:shadow-none shadow-md shadow-[#1026490F] top-12 z-10 py-4 md:py-0 flex flex-col md:flex-row gap-6 items-center'>
                <a href="#" className="font-semibold">Crypto Taxes</a>
                <a href="#" className="font-semibold">Free Tools</a>
                <a href="#" className="font-semibold">Resource Center</a>
                <a href="#" className="font-semibold px-5 bg-gradient-to-r from-blue_light to-blue_dark rounded-lg py-1.5 text-white">Get Started</a>
            </div>
            <button className='md:hidden' onClick={()=>setIsOpen(!isOpen)}>
                <FontAwesomeIcon className='h-6 w-6' icon={isOpen ? faMultiply : faBars} />
            </button>
        </nav>
    )
}