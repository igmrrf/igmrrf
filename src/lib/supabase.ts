import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
    throw new Error('Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing.');
  } else {
    // During build phase (prerendering) or development, we can use placeholders
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase environment variables are missing. Some features will not work.');
    }
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
