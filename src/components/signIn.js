import React, { useState } from 'react';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import signInImg from "../assets/svgs/Mobile login-rafiki.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../helpers/validation';
import axios from 'axios';
import { useAuth } from '../contexts/auth';
import PulseLoader from "react-spinners/PulseLoader";
import '../App.css';
export default function SignIn() {
    const { loading, setLoading, login } = useAuth();
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials({ ...loginCredentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginCredentials;

        if (!email || !password) {
            toast.error("Please provide valid credentials.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Email must be a valid one.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5555/auth/signin", loginCredentials);
            if (res.status === 200) {
                login(res.data.user, res.data.token);
                toast.success("Logged in successfully.");
                setLoginCredentials({
                    email: '',
                    password: ''
                });
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Error occurred: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full bg-white min-h-[100dvh] flex items-center'>
            <div className='lg:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
                <div className='w-full'>
                    <img src={signInImg} alt='sign in' />
                </div>
                <div className='px-3 py-3 md:px-5 md:py-5 ms-auto'>
                    <form onSubmit={handleLogin}>
                        <h2 className='font-[Roboto] font-bold text-4xl antialiased'>Sign In</h2>
                        <p className='font-[Poppins] mt-5 text-sm'>Add your details below to get back into the app</p>
                        <div className='space-y-2 mt-5 mb-2'>
                            <label>Email Address</label>
                            <div className='flex items-center border-[2px] border-gray-300 rounded-md pl-2 gap-x-2 hover:shadow-[0_0_5px_#4299e1] hover:border-blue-300'>
                                <MdOutlineEmail className='text-[1.325rem] antialiased my-2' />
                                <input
                                    type='email'
                                    value={loginCredentials.email}
                                    name='email'
                                    className='focus:outline-none flex-grow'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='space-y-2 mb-2'>
                            <label>Password</label>
                            <div className='flex items-center border-[2px] border-gray-300 rounded-md pl-2 gap-x-2 hover:shadow-[0_0_5px_#4299e1] hover:border-blue-300'>
                                <MdLockOutline className='text-[1.325rem] antialiased my-2' />
                                <input
                                    type='password'
                                    value={loginCredentials.password}
                                    name='password'
                                    className='focus:outline-none h-full flex-grow '
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='text-center w-full bg-blue-700 text-white rounded-md py-2 mt-2 mb-3 hover:bg-blue-500 transition duration-200 delay-150'
                        >
                            {loading ? <PulseLoader color='skyblue' size="8px" /> : "Login"}
                        </button>
                        <p className='text-center'>
                            Don't have an account? <Link to='/signUp' className='text-blue-600 font-medium'>Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
