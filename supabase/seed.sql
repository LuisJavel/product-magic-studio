-- Seed data for style templates (run after migrations)
-- This file runs automatically after db reset

INSERT INTO public.style_templates (name, description, category, gradient_start, gradient_end, icon) VALUES
    ('Instagram Post', 'Perfect for social media posts', 'social', 'from-pink-500', 'to-rose-500', 'instagram'),
    ('Instagram Story', 'Optimized for stories', 'social', 'from-violet-600', 'to-purple-700', 'story'),
    ('Banner', 'Wide format for headers', 'banner', 'from-blue-500', 'to-cyan-500', 'banner'),
    ('Facebook Post', 'Standard Facebook format', 'social', 'from-blue-600', 'to-indigo-600', 'facebook'),
    ('Twitter Post', 'Optimized for tweets', 'social', 'from-sky-500', 'to-blue-500', 'twitter'),
    ('Pinterest Pin', 'Vertical Pinterest format', 'social', 'from-red-500', 'to-pink-500', 'pinterest')
ON CONFLICT DO NOTHING;