import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hober:bg-opacity-80 transition cursor-pointer'>
        <FaFeather size={24} color='white' />
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
