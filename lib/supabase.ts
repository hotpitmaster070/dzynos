import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("SUPABASE ENV IS MISSING! Check Vercel Settings -> Environment Variables")
}

export const supabase = createClient(supabaseUrl!, supabaseKey!)
