import Image from 'next/image';
import React, { useState } from 'react';
import Modal from 'react-modal';
import VideoImage from '@/images/screenshots/vidImage.png';

import { Button } from '@/components/Button'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/UserSlice';
import Link from 'next/link';

Modal.defaultStyles.overlay.backgroundColor = '#00000060';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    margin: '0px',
    border: '0px',
    borderRadius: '24px',
    overflow: 'hidden'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

export function BaseModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className='pb-24'>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="https://chrome.google.com/webstore/detail/maildub/hkdlodgnnioibefcbkcjfhkfbpmpnhbe" className="relative getStartedButton overflow-clip hover:text-white hover:bg-slate-900 transition-all" >
          <span className="absolute inset-x-0 h-1 bottom-0 bg-blue-600"></span>
          Download NOW
        </Button>
        <Button
          onClick={openModal}
          variant="outline"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
          >
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">Watch video</span>
        </Button>
      </div>
      {/* <div className='flex justify-center mt-12'>
        <Link href="https://forms.gle/4aqjyYwTYjbQbyWw9" target='blank' className='w-full text-center text-blue-600 font-bold text-sm underline'>
          Feedback
        </Link>
      </div> */}
      <div className='w-full flex justify-center pt-24'>
        <div onClick={openModal} className=' max-w-4xl rounded-xl overflow-hidden flex justify-center mt-6 mb-16 cursor-pointer shadow-2xl shadow-gray-300 hover:shadow-gray-700 '>
          <Image src={VideoImage} className='w-full  rounded-xl  ' width={2000} height={2000} alt="maildub" />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="MailDub - Tool to turn your emails into marketing content in one click"
      >
        <div className='relative w-full rounded-3xl overflow-hidden'>
          <iframe
            allowFullScreen
            allow='autoplay; fullscreen; picture-in-picture'
            src='https://player.vimeo.com/video/841952254?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0'
            className='w-[300px] h-[170px] md:w-[600px] md:h-[340px]  lg:w-[890px] lg:h-[500px] rounded-3xl overflow-hidden'
          />
        </div>
      </Modal>
    </div>
  );
}
