import React, { useState } from 'react';
import { FaEdit, FaGithub, FaFacebook, FaInstagramSquare, FaGoogle, FaLinkedin, FaTwitter, FaCodepen, FaGitlab } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from '../contexts/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyLink({ item, index}) {
    const { loading, setLoading, flag, setFlag, getCurrentUser } = useAuth();
    const currentUser = getCurrentUser();
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedLink, setEditedLink] = useState({ platformName: item.platformName, Url: item.Url });

    if (!currentUser) {
        console.error('No current user found');
        return null;
    }

    const id = currentUser._id;
    const platformTypes = [
        { name: 'GitHub' },
        { name: 'Linkedin' },
        { name: 'Facebook' },
        { name: 'Twitter' },
        { name: 'Instagram' },
        { name: 'Codepen' },
        { name: 'Google' },
        { name: 'GitLab' }
    ];

    const deleteLink = async (linkId) => {
        try {
            setLoading(true);
            const res = await axios.post("https://linksharepro-app-backend.onrender.com/links/removeLink", { linkId, id });
            if (res.status === 200) {
                setFlag(!flag);
                toast.success("Link deleted successfully!");
            } else {
                toast.error("Failed to delete link.");
            }
        } catch (error) {
            console.log("Error occurred: ", error);
            toast.error("Error occurred. Can't delete now.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            const res = await axios.post("https://linksharepro-app-backend.onrender.com/links/updateLink", { linkId: item._id, id, ...editedLink });
            if (res.status === 200) {
                setFlag(!flag);
                toast.success("Link updated successfully!");
                setIsEditing(false);
            } else {
                toast.error("Failed to update link.");
            }
        } catch (error) {
            console.log("Error occurred: ", error);
            toast.error("Error occurred. Can't update now.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLink({ ...editedLink, [name]: value });
    };

    return (
        <div className=''>
            <div className='flex items-center justify-between mb-2'>
                <span className='text-gray-900 font-semibold'>Link#{index + 1}</span>
                <div className='flex gap-x-1 items-center'>
                    {isEditing ? (
                        <button onClick={handleSaveClick} className='cursor-pointer bg-emerald-100 text-green-800 font-semibold px-2 text-[.8rem] py-[.2rem] rounded-3xl'>Save</button>
                    ) : (
                        <FaEdit onClick={handleEditClick} className='cursor-pointer' />
                    )}
                    <MdDelete onClick={() => deleteLink(item._id)} className='cursor-pointer' />
                </div>
            </div>

            <div className='flex flex-col gap-y-1'>
                <label htmlFor="platform">Platform:</label>
                <select
                    id="platform"
                    name="platformName"
                    className='py-2 pl-2 w-full border-2 rounded-md focus:outline-none hover:shadow-[0_0_5px_#4299e1] hover:border-blue-300 transition duration-200 delay-150'
                    value={editedLink.platformName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                >
                    <option value="">Select Platform</option>
                    {platformTypes.map((platform) => (
                        <option key={platform.name} value={platform.name}>
                            {platform.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-y-1 mt-1'>
                <label htmlFor='url'>Link</label>
                <input
                    type='url'
                    name='Url'
                    placeholder='Copy & paste link here'
                    className='w-full py-2 pl-2 border-2 rounded-md focus:outline-none hover:shadow-[0_0_5px_#4299e1] hover:border-blue-300 transition duration-200 delay-150'
                    value={editedLink.Url}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                />
            </div>
        </div>
    );
}
