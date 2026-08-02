# Alpenrose GenAI function

This Supabase Edge Function keeps the Gemini API key outside the browser.

```powershell
npx supabase login
npx supabase link --project-ref eqvlpbmzcymqhsxlnvgb
npx supabase secrets set GEMINI_API_KEY=YOUR_KEY
npx supabase secrets set GEMINI_MODEL=gemini-2.5-flash
npx supabase functions deploy alpenrose-consultant --no-verify-jwt
```

The public website uses the Supabase publishable key to invoke the function. The function validates and limits input length. For a high-traffic launch, add CAPTCHA and durable per-IP rate limiting before increasing the model quota.
