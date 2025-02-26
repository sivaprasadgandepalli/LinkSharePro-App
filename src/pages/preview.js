import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MobileMockup from "../components/mobileMockup";
import { useAuth } from '../contexts/auth';
import { useFetchLinks } from '../hooks/fetchLinks';
import { platformTypes } from '../components/mobileMockup';
import { IoIosShareAlt } from "react-icons/io";
import ShareModal from '../components/ShareModal'; // Import the ShareModal component
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import user_img from "../assets/user_placeholder.png";
export default function Preview() {
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const { allLinks } = useFetchLinks();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const location = useLocation();

  const isPublicView = new URLSearchParams(location.search).get('view') === 'public';

  useEffect(() => {
    if (currentUser && isPublicView) {
      const firstName = currentUser.firstName || '';
      const lastName = currentUser.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const userName = fullName ? fullName : '';
      document.title = `${userName}'s Links`;
    } else {
      document.title = 'Preview';
    }
  }, [currentUser, isPublicView]);

  if (!currentUser) {
    console.error('No current user found');
    return null;
  }

  const id = currentUser._id;
  const firstName = currentUser.firstName || '';
  const lastName = currentUser.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const userName = fullName ? fullName : '';

  const handleShareClick = (linkAddr) => {
    const publicUrl = `${window.location.origin}${window.location.pathname}?view=public`;
    setShareUrl(publicUrl);
    setShowShareModal(true);

    navigator.clipboard.writeText(linkAddr)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy link.');
      });
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setShareUrl('');
  };

  return (
    <div className='w-full relative'>
      <div className='md:bg-blue-500 w-full relative h-[18rem] sm:p-5 rounded-b-3xl'>
        {!isPublicView && (
          <div className='bg-white flex items-center justify-between p-3 rounded-md'>
            <Link to="/" className='border-[1px] border-blue-600 py-2 px-3 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition delay-150 duration-300'>Back to Editor</Link>
            <button
              className='bg-blue-600 py-2 px-3 rounded-md text-white hover:bg-white hover:border-[1px] border-blue-600 hover:text-blue-600 transition delay-150 duration-300'
              onClick={handleShareClick}
            >
              Share link
            </button>
          </div>
        )}
        <div className='mx-auto w-[18rem] bg-white h-[32rem] rounded-[1.6rem] p-2 overflow-hidden mt-[3rem]'>
          <div className='mx-auto flex flex-col w-full bg-white h-full rounded-[1.4rem] relative px-3'>
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
                    <IoIosShareAlt className='text-gray-100 ml-auto cursor-pointer' onClick={() => handleShareClick(item.Url)} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ShareModal isOpen={showShareModal} onClose={handleCloseShareModal} shareUrl={shareUrl} />
    </div>
  );
}
