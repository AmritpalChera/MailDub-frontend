import 'focus-visible'
import '@/styles/tailwind.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Provider } from 'react-redux';
import store from "@/redux/store";
import supabase from '@/utils/setup/supabase';
import Setup from './initialSetup';

export default function App({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <Setup>
          <Component {...pageProps} />
        </Setup>
      </Provider>
    </SessionContextProvider>
  );
}
