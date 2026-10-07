# Supabase setup

1. Create a Supabase project.
2. In SQL Editor, run `supabase/schema.sql`.
3. In Authentication → Users, create your admin email/password.
4. Add these Vercel environment variables for Production, Preview and Development:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Redeploy.

Then open /admin/login, sign in, select Semester + Branch, paste each Google Drive folder URL and press Save.

Drive URLs are stored in `subject_drive_links` and the existing subject `driveUrl` remains a fallback until a database URL is saved.
