import Head from 'next/head'
import Link from 'next/link'
import supabase from '@/utils/setup/supabase';
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserData } from '../redux/features/UserSlice';
import { useEffect } from 'react';

export default function Login() {

  const { email } = useSelector(selectUser);

  useEffect(() => {
    console.log('email: ', email)
  }, [email])
  return (
    <>
      <Head>
        <title>Sign In - MailDub</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Checkout - $19.99/Month
            </h2>
          </div>
        </div>
        
      </AuthLayout>
    </>
  )
}
