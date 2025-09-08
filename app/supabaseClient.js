import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://whulchwxpwdoxemyovgg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodWxjaHd4cHdkb3hlbXlvdmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTY5NDQsImV4cCI6MjA3Mjc3Mjk0NH0.txMxllLrf5y9m5EXjdJiLVA4jrpO579e-mH87kOD4Yk'

// السطر الجديد
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'public' } 
});

