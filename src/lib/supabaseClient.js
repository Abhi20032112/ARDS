import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aubpldpmfgabofwyieae.supabase.co'; // ← paste your URL here
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1YnBsZHBtZmdhYm9md3lpZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODkxNTMsImV4cCI6MjA2ODI2NTE1M30.OOH916NlzYpnrenyU5auzBBp6U0bI9KBQbzApQQwn48'; // ← paste your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
