import { createClient } from '@supabase/supabase-js';

const defaultSupabaseUrl = 'https://eqvlpbmzcymqhsxlnvgb.supabase.co';
const defaultSupabaseAnonKey = 'sb_publishable_xsHCyvgdL3lK_0sKCADQ8A_zPQdYXmA';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || defaultSupabaseUrl;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || defaultSupabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'x-client-info': 'ards-netlify-contact-form',
      },
    },
  },
);
