import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, LinkedinIcon, EmailIcon, TwitterIcon, FacebookIcon, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { platformTypes } from './mobileMockup';
export default function ShareModal({ isOpen, onClose, shareUrl }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 w-full bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-5 rounded-md w-80 flex flex-col items-center justify-center'>
        <h2 className='text-center text-xl font-bold mb-4'>Share this link on:</h2>
        <div className='flex gap-x-2 mx-auto mb-3'>
          <WhatsappShareButton url={shareUrl} >
            <WhatsappIcon className='h-10 w-10 rounded-full'/>
          </WhatsappShareButton>
          <FacebookShareButton url={shareUrl} >
            <FacebookIcon className='h-10 w-10 rounded-full'/>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} >
           <TwitterIcon className='h-10 w-10 rounded-full'/>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} >
            <LinkedinIcon className='h-10 w-10 rounded-full'/>
          </LinkedinShareButton>
          <EmailShareButton url={shareUrl} >
            <EmailIcon className='h-10 w-10 rounded-full'/>
          </EmailShareButton>
        </div>
        <button onClick={onClose} className='block mt-2 w-full md:w-[80%] py-2 px-3 border-2 border-red-600 rounded-md text-center hover:bg-red-600 hover:text-white transition delay-150 duration-300'>
          Cancel
        </button>
      </div>
    </div>
  );
}
