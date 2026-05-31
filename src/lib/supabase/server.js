import { createServerClient } from '@supabase/ssr';
import { parse } from 'cookie';

export async function createClient(request, reply) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const cookies = parse(request.headers.cookie || '');

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(cookies).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          reply.setCookie(name, value, {
            path: options?.path || '/',
            httpOnly: options?.httpOnly ?? true,
            secure: options?.secure ?? true,
            sameSite: options?.sameSite ?? 'lax',
            maxAge: options?.maxAge,
          });
        });
      },
    },
  });
}