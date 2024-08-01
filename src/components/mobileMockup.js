import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaFacebook, FaInstagramSquare, FaGoogle, FaLinkedin, FaTwitter, FaCodepen, FaGitlab } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useAuth } from '../contexts/auth';
import axios from 'axios';
import user_img from "../assets/user_placeholder.png"

export const platformTypes = [
    { name: 'GitHub', Icon: FaGithub, color: "bg-black" },
    { name: 'Linkedin', Icon: FaLinkedin, color: "bg-blue-500" },
    { name: 'Facebook', Icon: FaFacebook, color: "bg-blue-700" },
    { name: 'Twitter', Icon: FaTwitter, color: "bg-blue-900" },
    { name: 'Instagram', Icon: FaInstagramSquare, color: "bg-pink-600" },
    { name: 'Codepen', Icon: FaCodepen, color: "bg-teal-400" },
    { name: 'Google', Icon: FaGoogle, color: "bg-gray-500" },
    { name: 'GitLab', Icon: FaGitlab, color: "bg-orange-600" }
];
export default function MobileMockup({ allLinks }) {
    const { getCurrentUser } = useAuth();
    const currentUser = getCurrentUser();

    if (!currentUser) {
        console.error('No current user found');
        return null;
    }

    const id = currentUser._id;
    const firstName = currentUser.firstName || '';
    const lastName = currentUser.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const userName = fullName ? fullName : '';

    

    return (
        <div className='w-full flex items-center py-3'>
            <div className='mx-auto w-[17rem] bg-white h-[32rem] rounded-[2.5rem] border-[2px] p-2 overflow-hidden'>
                <div className='mx-auto flex flex-col w-full bg-white h-full rounded-[2rem] border-[2px] relative px-3'>
                    <div className='w-[7rem] h-[1.8rem] rounded-[.7rem] border-[2px] border-t-transparent relative mx-auto -mt-[0.28rem] bg-white'></div>
                    <img src={user_img} className='w-[7rem] h-[7rem] flex-shrink-0  mx-auto mt-5 rounded-full'/>
                    <div className='flex flex-col gap-y-1 mt-4 mb-3'>
                        <div className='w-full mx-auto rounded-full'>
                            {userName ? (
                                <p className='text-center font-semibold text-lg'>{userName}</p>
                            ) : (
                                <div className='w-full h-[1rem] bg-gray-200 mx-auto rounded-full'></div>
                            )}
                        </div>
                        <div className='mx-auto rounded-full'>
                            {currentUser.email ? (
                                <p className='text-sm'>{currentUser.email.toLowerCase()}</p>
                            ) : (
                                <div className='w-full h-[.6rem] bg-gray-200 mx-auto rounded-full'></div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-[.4rem] overflow-y-scroll mb-5 no-scrollbar'>
                        {allLinks?.map((item) => {
                            const platform = platformTypes.find(platform => platform.name === item.platformName);
                            if (!platform) return null; 
                            const { Icon, color } = platform;
                            return (
                                <div key={item._id} className={`flex items-center px-2 py-[.450rem] rounded-md gap-x-2 mt-2 w-full ${color}`}>
                                    <Icon className='text-xl text-white' />
                                    <p className='text-white'>{item.platformName}</p>
                                    <a href={item.Url} target='_blank' rel='noopener noreferrer' className='ml-auto'><FaArrowRight className='text-gray-100' /></a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
