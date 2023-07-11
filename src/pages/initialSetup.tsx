import supabase from '@/utils/setup/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/features/UserSlice';
import { protectedRoutes } from '@/utils/misc';

interface SetupProps {
  children: any
}

export default function Setup({children}: SetupProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userSession1 = async () => {
    const routename = router.pathname.toLowerCase();
    if (routename !== '/') setLoading(true);
    const session = await supabase.auth.getSession();
    // const customer = await supabase.from('customers').select().single();
    const user = session?.data?.session?.user;
    if (user) {
      let dataToSet = { ...user, loaded: true, customer: {} }
      const customer = await supabase.from('customers').select().eq('userId', user?.id).single();
      if (customer.data) dataToSet = { ...dataToSet, customer: customer.data };
      dispatch(setUserData(dataToSet));
      const signinRedirect = localStorage.getItem('signinRedirect');
      localStorage.removeItem('signinRedirect');
      setLoading(false);
      if (signinRedirect) {
        router.push(signinRedirect);
        return;
      }
    } else {
      // user does not exists, see if they're trying to access protected route
      if (protectedRoutes.includes(routename)) {
        localStorage.setItem('signinRedirect', routename);
        setLoading(false);
        router.push('/login');
      }
    }
    setLoading(false);
    // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
    // Include a property about the signup, like the Signup Type
  }

  useEffect(() => {
    userSession1();
  }, [supabase, router]);

  if (localStorage.getItem('signinRedirect')) {
    return (
      <div className='flex w-full h-full justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    children
  )
};
