-- Product Magic Studio Database Schema
-- Migration: 001_initial_schema.sql

-- ============================================
-- TABLES
-- ============================================

-- User Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Style Templates
CREATE TABLE IF NOT EXISTS public.style_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    gradient_start TEXT NOT NULL,
    gradient_end TEXT NOT NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Designs
CREATE TABLE IF NOT EXISTS public.designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_image_id UUID REFERENCES public.product_images(id) ON DELETE SET NULL,
    style_id UUID REFERENCES public.style_templates(id) ON DELETE SET NULL,
    title TEXT,
    design_type TEXT NOT NULL,
    gradient_start TEXT NOT NULL,
    gradient_end TEXT NOT NULL,
    customization_data JSONB,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_product_images_user_id ON public.product_images(user_id);
CREATE INDEX IF NOT EXISTS idx_designs_user_id ON public.designs(user_id);
CREATE INDEX IF NOT EXISTS idx_designs_product_image_id ON public.designs(product_image_id);
CREATE INDEX IF NOT EXISTS idx_designs_style_id ON public.designs(style_id);
CREATE INDEX IF NOT EXISTS idx_designs_status ON public.designs(status);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger for profiles updated_at
CREATE OR REPLACE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for designs updated_at
CREATE OR REPLACE TRIGGER designs_updated_at
    BEFORE UPDATE ON public.designs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and modify their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Product Images: Users can only see and manage their own images
CREATE POLICY "Users can view own product images" ON public.product_images
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own product images" ON public.product_images
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own product images" ON public.product_images
    FOR DELETE USING (auth.uid() = user_id);

-- Style Templates: Everyone can view, only admins can modify
CREATE POLICY "Everyone can view style templates" ON public.style_templates
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert style templates" ON public.style_templates
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Only admins can update style templates" ON public.style_templates
    FOR UPDATE USING (false);

CREATE POLICY "Only admins can delete style templates" ON public.style_templates
    FOR DELETE USING (false);

-- Designs: Users can only see and manage their own designs
CREATE POLICY "Users can view own designs" ON public.designs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own designs" ON public.designs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own designs" ON public.designs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own designs" ON public.designs
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Style Templates
-- ============================================

INSERT INTO public.style_templates (name, description, category, gradient_start, gradient_end, icon) VALUES
    ('Instagram Post', 'Perfect for social media posts', 'social', 'from-pink-500', 'to-rose-500', 'instagram'),
    ('Instagram Story', 'Optimized for stories', 'social', 'from-violet-600', 'to-purple-700', 'story'),
    ('Banner', 'Wide format for headers', 'banner', 'from-blue-500', 'to-cyan-500', 'banner'),
    ('Facebook Post', 'Standard Facebook format', 'social', 'from-blue-600', 'to-indigo-600', 'facebook'),
    ('Twitter Post', 'Optimized for tweets', 'social', 'from-sky-500', 'to-blue-500', 'twitter'),
    ('Pinterest Pin', 'Vertical Pinterest format', 'social', 'from-red-500', 'to-pink-500', 'pinterest')
ON CONFLICT DO NOTHING;