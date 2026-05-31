# Supabase Configuration

## 1. Create a project at https://supabase.com

## 2. Get your credentials from the dashboard:
   - Go to Settings > API
   - Copy the "Project URL" and "anon public" key

## 3. Add credentials to .env file:
   ```
   cp .env.example .env
   # Then edit .env with your actual credentials
   ```

## 4. Run the database migrations:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of supabase/migrations/001_initial_schema.sql
   - Run each migration in order

## 5. Enable Row Level Security (RLS)
   - Go to Authentication > Users in your dashboard
   - Make sure RLS is enabled on all tables

## 6. Configure Storage (for product images)
   - Go to Storage in your dashboard
   - Create a bucket named "product-images"
   - Set up appropriate access policies