import React, { useState } from 'react';
import MobileMockup from '../components/mobileMockup';
import Modal from '../components/modal';
import { useFetchLinks } from '../hooks/fetchLinks';
import MyLink from '../components/myLink';
import empty_img from "../assets/svgs/illustration-empty.svg";
export default function MyLinks() {
    const [showModal, setShowModal] = useState(false);
    const { allLinks, setAllLinks } = useFetchLinks();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (
        <div className='w-full mb-5 overflow-hidden relative'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:w-[88%] mx-auto items-start'>
                <div className='w-full bg-white py-10 lg:py-5'>
                    <MobileMockup allLinks={allLinks} />
                </div>
                <div className='bg-white px-5 pb-5 pt-[1.9rem]'>
                    <h2 className='font-[roboto] font-[550] text-3xl md:text-[2rem] '>Customize your links</h2>
                    <p className='my-2'>Add/edit/remove your links below and then share all your profiles with the world.</p>
                    <button className='w-full border-2 text-blue-600 border-blue-500 rounded-md py-2 mt-3 hover:bg-blue-500 hover:text-white transition-all duration-300 delay-150' onClick={handleOpenModal}>+Add new link</button>
                    {
                        allLinks?.length > 0 ? <div className='my-2 bg-gray-50 w-full flex flex-col gap-y-3 p-3 mt-5 flex-grow'>
                            {
                                allLinks?.map((item, index) => (
                                    <MyLink item={item} index={index} key={item._id} />
                                ))
                            }
                        </div> : 
                        <div className='mt-7 mb-5 flex flex-col gap-y-3'>
                            <img src={empty_img} className='mx-auto' />
                            <h2 className='font-bold text-center text-3xl'>Let's get you started</h2>
                            <p className='text-center md:px-3'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                        </div>
                    }
                </div>
                <Modal show={showModal} onClose={handleCloseModal} title="My Modal" />
            </div>
        </div>
    );
}
