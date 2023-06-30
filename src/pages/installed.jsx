"use client";  
/*global chrome*/
import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Logo } from '@/components/Logo'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { selectUser } from '../redux/features/UserSlice';
import Image from 'next/image';
import GmailLogo from '@/images/logos/gmail.svg';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

 
  
  const sendTokenToChromeExtension = async ({ extensionId, userId }) => {
    chrome.runtime?.sendMessage(extensionId, { userId }, response => {
      if (!response.success) {
        console.log('error sending message', response);
        return response;
      }
      console.log('Sucesss ::: ', response.message)
    });
  };

  useEffect(() => {
    if (user.id) {
      // get customer and see if they are signed in
      sendTokenToChromeExtension({extensionId: 'ealjelfhcklhoidkongmdalegoghhjhi', userId: user.id})
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Thank You - MailDub</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Thank you for using MailDub
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Your extention is setup and ready for use.
            </p>
          </div>
        </div>
        
        <button className="my-6 flex w-full items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-medium  shadow-one hover:text-primary border-2 border-gray">
          <span className="mr-3">
            <Image src={GmailLogo} width={30} height={20} className='h-4'/>
          </span>
            Continue to Gmail 
        </button>
      </AuthLayout>
    </>
  )
}
