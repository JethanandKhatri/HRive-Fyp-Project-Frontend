import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ruewgiljaznyllyqmrep.supabase.co'
// Prevent crash if key is missing by using a placeholder. Auth will fail but app will load.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'PLACEHOLDER_KEY_TO_PREVENT_CRASH'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// Full Edge Functions base URL (avoid relative /functions calls returning Netlify 404 HTML)
export const SUPABASE_FUNCTIONS_BASE = `${supabaseUrl}/functions/v1`
