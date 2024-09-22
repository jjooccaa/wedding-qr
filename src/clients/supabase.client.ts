import { createClient } from "@supabase/supabase-js";

const REACT_APP_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY);
