import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserData } from '@/redux/features/UserSlice';
import { useEffect } from 'react';
import { IoReturnDownBackOutline } from 'react-icons/io5';
export default function Login() {

  const { email, id } = useSelector(selectUser);

  useEffect(() => {
    console.log('email: ', email)
  }, [email]);
  
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
          <Link href="/" aria-label="Home" className='flex mt-4'>
              <IoReturnDownBackOutline />
              <span className='ml-2 text-sm font-bold text-gray-700'>Return</span>
          </Link>
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900">
              Checkout - $19.99/Month
            </h2>
          </div>
        </div>
        <form action="/api/stripe/create-checkout-session" method="POST" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            name="email"
            value={email || 'hello'}
            type="input"
            readOnly={true}
          />
          <TextField
            value="basic"
            name="lookup_key"
            type="hidden"
          />
          <TextField
            value={id}
            name="userId"
            type="hidden"
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Checkout<span aria-hidden="true"> &rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
