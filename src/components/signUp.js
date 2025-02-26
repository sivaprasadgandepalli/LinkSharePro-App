import React, { useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import signInImg from "../assets/svgs/Sign up-rafiki.svg";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/auth';
import { validateEmail, validatePassword } from '../helpers/validation';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const navigate = useNavigate();
    const { loading, setLoading } = useAuth();
    const [Credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...Credentials, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = Credentials;
        const isPasswordValid = validatePassword(password);
        if (!email || !password || !confirmPassword) {
            return toast.error("Please fill all the required fields.")
        }
        else if (!validateEmail(email)) {
            return toast.error("Provided email is invalid.")
        }
        else if (!isPasswordValid.valid) {
            return toast.error(isPasswordValid.message);
        }
        else if (password !== confirmPassword) {
            return toast.error("Both password and confirmPassword must be same.")
        }
        setLoading(true);

        try {
            const res = await axios.post("https://linksharepro-app-backend.onrender.com/auth/signup", Credentials);
            if (res.status === 200) {
                toast.success("Account created successfully.");
                setCredentials({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate("/");
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Error occurred: ", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full bg-white min-h-[100dvh] flex items-center'>
            <div className='lg:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 '>
                <div className='w-full'>
                    <img src={signInImg} alt='sign in' />
                </div>
                <div className='px-3 py-3 md:px-5 md:py-5 ms-auto'>
                    <form onSubmit={handleCreate}>
                        <h2 className='font-[Roboto] font-bold text-4xl antialiased'>Sign Up</h2>
                        <p className='font-[poppins] mt-5 text-sm'>Add your details below to get back into the app</p>
                        <div className='space-y-2 mt-5 mb-2'>
                            <label>Email Address</label>
                            <div className='flex items-center border-[2px] border-gray-300 rounded-md pl-2  gap-x-2 hover:shadow-[0_0_6px_#4299e1] hover:border-blue-300'>
                                <MdOutlineEmail className='text-[1.325rem] antialiased my-2' />
                                <input type='email' value={Credentials.email} onChange={handleChange} name='email' className='focus:outline-none flex-grow' />
                            </div>
                        </div>
                        <div className='space-y-2 mb-2'>
                            <label>Password</label>
                            <div className='flex items-center border-[2px] border-gray-300 rounded-md pl-2 gap-x-2 hover:shadow-[0_0_6px_#4299e1] hover:border-blue-300'>
                                <MdLockOutline className='text-[1.325rem] antialiased my-2' />
                                <input type='password' value={Credentials.password} onChange={handleChange} name='password' className='focus:outline-none h-full flex-grow' />
                            </div>
                        </div>
                        <div className='space-y-2 mb-2'>
                            <label>Confirm Password</label>
                            <div className='flex items-center border-[2px] border-gray-300 rounded-md pl-2 gap-x-2 hover:shadow-[0_0_6px_#4299e1] hover:border-blue-300'>
                                <MdLockOutline className='text-[1.325rem] antialiased my-2' />
                                <input type='password' value={Credentials.confirmPassword} onChange={handleChange} name='confirmPassword' className='focus:outline-none h-full flex-grow ' />
                            </div>
                        </div>
                        <button type='submit' className='text-center w-full bg-blue-700 text-white rounded-md py-2 mt-5 mb-3 hover:bg-blue-500 transition duration-200 delay-150'>
                            {loading ? <PulseLoader color='skyblue' size="8px" /> : "Sign Up"}
                        </button>
                        <p className='text-center'>Already have an account? <Link to='/' className='text-blue-600 font-medium'>Login</Link></p>
                    </form>
                </div>
            </div>


        </div>
    )
}
