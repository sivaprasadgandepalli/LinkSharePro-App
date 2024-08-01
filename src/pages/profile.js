import React, { useState, useRef, useEffect } from 'react';
import MobileMockup from '../components/mobileMockup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../helpers/validation';
import axios from 'axios';
import { useAuth } from '../contexts/auth';
import { useFetchLinks } from '../hooks/fetchLinks';
import PulseLoader from "react-spinners/PulseLoader";
export default function Profile() {
    const inputRef = useRef(null);
    const { allLinks } = useFetchLinks();
    const { loading, setLoading, getCurrentUser } = useAuth();
    const id = getCurrentUser()._id;
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName } = user;
        if (!firstName || !lastName) {
            toast.error("Please provide all necessary details.");
        }
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5555/auth/updateProfile",{...user,id});
            if (res.status === 200) {
                console.log(res.data);
                sessionStorage.setItem('user', JSON.stringify(res.data));
                toast.success("Profile updated successfully.");
                setUser({
                    firstName: '',
                    lastName: '',
                    email: ''
                });
            }
            else {
                toast.error("Failed to update profile.try again later.")
            }
        } catch (error) {
            console.log("error updating profile", error);
            toast.error("Error occurred while updating profile.")
        }
        finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            console.log(`selected file ${file.name}`);
        }
    }
    const selectFile = () => {
        inputRef.current.click();
    }
    return (
        <div className='w-full mb-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:w-[88%] mx-auto'>
                {/* mockup */}
                <div className='w-full bg-white py-10 lg:py-7'>
                    <MobileMockup allLinks={allLinks} />
                </div>

                {/* personal details */}
                <div className='bg-white px-5 pt-[1.9rem]'>
                    <h2 className='font-[roboto] font-[550] text-3xl md:text-[2rem] antialiased'>Profile details</h2>
                    <p className='my-2'>Please add your details to create a personal touch to your profile.</p>
                    <div className='p-[.7rem] bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3 items-center mt-5 rounded-md'>
                        <span className='text-center'>Profile picture</span>
                        <input type='file' ref={inputRef} className='hidden' onChange={handleFileChange} />
                        <div className='h-[9rem] w-full bg-blue-200 rounded-md flex items-center justify-center'>
                            <span className='text-blue-700 cursor-pointer' onClick={selectFile}>+Upload Image</span>
                        </div>
                        <p className='text-sm px-2'>Image must be below 1024x1024. Use PNG or JPG format</p>
                    </div>
                    <div className='p-[1rem] bg-gray-100 my-4'>
                        <form onSubmit={handleSubmit}>

                            <div className='flex flex-col gap-y-2 mb-2'>
                                <label>First name*</label>
                                <input
                                    type='text'
                                    value={user.firstName || ''}
                                    name="firstName"
                                    placeholder='Enter your first name..'
                                    className='focus:outline-none pl-2 py-2'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex flex-col gap-y-2 mb-2'>
                                <label>Last name*</label>
                                <input
                                    type='text'
                                    value={user.lastName || ''}
                                    name="lastName"
                                    placeholder='Enter your last name..'
                                    className='focus:outline-none pl-2 py-2'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='flex flex-col gap-y-2 mb-3'>
                                <label>New email</label>
                                <input
                                    type='email'
                                    value={user.email || ''}
                                    name="email"
                                    placeholder='Enter your email..'
                                    className='focus:outline-none pl-2 py-2'
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full py-2 bg-blue-400 mt-5 rounded-md text-blue-50 hover:bg-white hover:text-blue-500 hover:border-[1px] hover:border-blue-500 transition-all duration-300 delay-200'
                            >
                                {loading ? <PulseLoader color='skyblue' size="8px" /> : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
