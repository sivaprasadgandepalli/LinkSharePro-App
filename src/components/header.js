import React, { useState, useEffect } from 'react';
import { FaLink, FaRegUserCircle } from "react-icons/fa";
import logo from "../assets/link-logo-removebg-.png";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from '../contexts/auth';
import '../App.css';

export default function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const toggleNavbar = () => {
        setOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <div className='w-full relative p-2'>
            <nav className='flex items-center justify-between py-3 px-3 md:px-5 bg-white'>
                {/* logo and text */}
                <div className='flex items-center gap-x-1'>
                    <img src={logo} className='h-12 w-12' alt="Logo" />
                    <span className='font-[roboto] font-bold text-[1.3rem] md:text-2xl antialiased text-[#071C3B]'>LinkShare<span className='text-blue-600'>PRO</span></span>
                </div>

                {/* toggle icon */}
                {
                    open ? <RxCross1 className='text-3xl ms-auto block md:hidden cursor-pointer font-bold' onClick={toggleNavbar} /> : <RiMenu3Fill className='text-3xl ms-auto block md:hidden cursor-pointer' onClick={toggleNavbar} />
                }

                {/* desktop navbar */}
                <div className='gap-x-1 font-[poppins] hidden md:flex'>
                    <NavLink
                        exact="true"
                        to="/"
                        className={({ isActive }) => isActive ? 'flex items-center gap-1 py-2 px-[0.9rem] rounded-md transition duration-150 bg-blue-200 text-blue-800' : 'flex items-center gap-1 py-2 px-[0.9rem] rounded-md transition duration-150 bg-white text-black hover:bg-blue-100 hover:text-blue-900'}
                    >
                        <FaLink /> Links
                    </NavLink>
                    <NavLink
                        exact="true"
                        to="/profile"
                        className={({ isActive }) => isActive ? 'flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 bg-blue-200 text-blue-800' : 'flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 bg-white text-black hover:bg-blue-100 hover:text-blue-900'}
                    >
                        <FaRegUserCircle /> Profile
                    </NavLink>
                    <NavLink
                        exact="true"
                        to="/preview"
                        className={({ isActive }) => isActive ? 'flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 bg-blue-200 text-blue-800' : 'flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 bg-white text-black hover:bg-blue-100 hover:text-blue-900'}
                    >
                        Preview
                    </NavLink>
                    <button
                        className='flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 font-[500] bg-white text-red-600 hover:bg-red-200 hover:text-red-900'
                        onClick={handleLogout}
                    >
                        Sign out<IoIosLogOut />
                    </button>
                </div>
            </nav>

            {/* mobile navbar */}
            <div className={`bg-white mt-1 mb-1 overflow-hidden transition-width duration-200 delay-150 ease-in-out ${open ? "max-h-screen" : "max-h-0"}`}>
                <NavLink
                    exact="true"
                    to="/"
                    className={({ isActive }) => isActive ? 'flex m-1 items-center py-2 px-[0.9rem] bg-blue-200 text-blue-800 transition-background duration-150' : 'flex m-1 items-center py-2 px-[0.9rem] bg-white text-black hover:bg-blue-100 transition-background duration-150'}
                >
                    <GoChevronRight /> Links
                </NavLink>
                <NavLink
                    exact="true"
                    to="/profile"
                    className={({ isActive }) => isActive ? 'flex m-1 items-center py-2 px-[0.9rem] bg-blue-200 text-blue-800 transition-background duration-150' : 'flex m-1 items-center py-2 px-[0.9rem] bg-white text-black hover:bg-blue-100 transition-background duration-150'}
                >
                    <GoChevronRight /> Profile
                </NavLink>
                <NavLink
                    exact="true"
                    to="/preview"
                    className={({ isActive }) => isActive ? 'flex m-1 items-center py-2 px-[0.9rem] bg-blue-200 text-blue-800 transition-background duration-150' : 'flex m-1 items-center py-2 px-[0.9rem] bg-white text-black hover:bg-blue-100 transition-background duration-150'}
                >
                    <GoChevronRight /> Preview
                </NavLink>
                <button
                    className='flex items-center gap-1 transition px-[0.9rem] rounded-md duration-150 font-[500] bg-white text-red-600 hover:bg-red-200 hover:text-red-900'
                    onClick={handleLogout}
                >
                    Sign out<IoIosLogOut />
                </button>
            </div>
        </div>
    );
}
