import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/"/g, '') || "https://vujamdesjosylizgntvw.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.replace(/"/g, '') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1amFtZGVzam9zeWxpemdudHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyOTAwOTIsImV4cCI6MjA5NDg2NjA5Mn0.KLIPelghdMNt9AcytYrKdSXqe-BdRJyGgKVRQoYjNkY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
