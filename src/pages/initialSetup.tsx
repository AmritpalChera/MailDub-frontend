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
  const userSession1 = async () => {
    const routename = router.pathname.toLowerCase();
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
      if (signinRedirect) {
        router.push(signinRedirect);
        return;
      }
    } else {
      // user does not exists, see if they're trying to access protected route
      if (protectedRoutes.includes(routename)) {
        localStorage.setItem('signinRedirect', routename);
        router.push('/login');
      }
    }
    // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
    // Include a property about the signup, like the Signup Type
  }

  useEffect(() => {
    userSession1();
  }, [supabase, router]);

  return (
    children
  )
};
