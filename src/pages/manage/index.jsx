import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/features/UserSlice';

export default function Login() {

  const { email } = useSelector(selectUser);

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
              href="https://billing.stripe.com/p/login/test_5kA16j8kV96S5MccMM?email=cheraamritpal@gmail.com"
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
