# Supabase Contact Setup

1. Create or open your Supabase project.
2. Open SQL Editor and run `supabase/contact_leads.sql`.
3. In Netlify, add these environment variables in Site configuration -> Environment variables:

```env
VITE_SUPABASE_URL=https://eqvlpbmzcymqhsxlnvgb.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xsHCyvgdL3lK_0sKCADQ8A_zPQdYXmA
```

4. Redeploy the frontend on Netlify.
5. Submit a test lead from `/contact`.
6. Check Supabase Table Editor -> `contact_leads`.

Security notes:

- Use only the anon key in Netlify frontend variables.
- Never add the Supabase service role key to Netlify frontend variables.
- RLS allows anonymous users to insert new leads only.
- Authenticated Supabase users can read and update leads from the Supabase dashboard or admin tools.

Frontend files added:

- `src/lib/supabase.ts`
- `src/services/contact.ts`
- `src/hooks/useContact.ts`
- `src/components/ContactForm.tsx`
- `src/types/contact.ts`
- `supabase/contact_leads.sql`
