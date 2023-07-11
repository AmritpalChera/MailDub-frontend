import Head from 'next/head'
import Link from 'next/link'
import supabase from '@/utils/setup/supabase';
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/features/UserSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoReturnDownBackOutline } from 'react-icons/io5';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  };

  const formSubmitted = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    const status = await supabase.auth.signInWithPassword({ email: formProps.email, password: formProps.password });
    
    if (status?.error) {
      console.log(status.error.message)
      setError(status.error.message);
      return;
    }

    const user = status?.data?.user;
    dispatch(setUserData({ ...user }));
    if (!user?.customer) {
      router.push('/checkout');
    } else router.push('/manage')
  }

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
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        
        <form onSubmit={formSubmitted} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <p className="mt-0 text-sm text-center text-red-700">
            {error}
            </p>
          </div>
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
        <button onClick={signInWithGoogle} className="my-6 flex w-full items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-medium  shadow-one hover:text-primary border-2 border-gray">
          <span className="mr-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_95:967)">
                <path
                  d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                  fill="#4285F4"
                />
                <path
                  d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                  fill="#34A853"
                />
                <path
                  d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_95:967">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
            Sign in with Google
        </button>
      </AuthLayout>
    </>
  )
}
