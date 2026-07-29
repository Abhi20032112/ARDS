# Supabase Contact Setup

1. Create or open your Supabase project.
2. Open SQL Editor and run `supabase/contact_leads.sql`.
3. In Vercel, add these environment variables:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

4. Redeploy the frontend on Vercel.
5. Submit a test lead from `/contact`.
6. Check Supabase Table Editor -> `contact_leads`.

Security notes:

- Use only the anon key in Vercel frontend variables.
- Never add the Supabase service role key to Vercel frontend variables.
- RLS allows anonymous users to insert new leads only.
- Authenticated Supabase users can read and update leads from the Supabase dashboard or admin tools.

Frontend files added:

- `src/lib/supabase.ts`
- `src/services/contact.ts`
- `src/hooks/useContact.ts`
- `src/components/ContactForm.tsx`
- `src/types/contact.ts`
- `supabase/contact_leads.sql`
