import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/UserSlice';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import GmailLogo from '@/images/logos/gmail.svg';
import Image from 'next/image'

export default function Manage() {

  const { email } = useSelector(selectUser);

  const paymentLink = process.env.NODE_ENV === 'development' ? "https://billing.stripe.com/p/login/test_5kA16j8kV96S5MccMM" : "https://billing.stripe.com/p/login/fZe9EbeDJ4QagNyeUU"

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
          <Link href="https://chrome.google.com/webstore/detail/maildub/hkdlodgnnioibefcbkcjfhkfbpmpnhbe" target='blank'>
            <button className="my-6 mt-12 flex w-full items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-medium  shadow-one hover:text-primary border-2 border-gray">
              <span className="mr-3">
              <Image src={GmailLogo} width={20} height={20} />
              </span>
                Install Now
            </button>
          </Link>
          <Link href="https://forms.gle/4aqjyYwTYjbQbyWw9" target='blank' className='w-full text-center text-blue-600 font-bold text-sm underline'>
            Feedback
          </Link>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Manage MailDub Payments
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Change or Cancel Plan. View Previous Payments
            </p>
            <TextField
              label="Email address"
              id="email"
              name="email"
              value={email}
              type="email"
              autoComplete="email"
              disabled
              className='mt-6'
            />

            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full mt-4"
              target='blank'
              href={paymentLink}
            >
              <span>
                Manage <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </div>
        
      </AuthLayout>
    </>
  )
}
