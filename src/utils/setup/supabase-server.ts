import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'


// create supabase client
const supabase = createServerComponentSupabaseClient({
  headers: () => new Headers(),
  cookies: () => new RequestCookies(new Headers()),
});
export default supabase;