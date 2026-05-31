export { supabase } from '../lib/supabase/client';
export { authService } from './auth';
export { profilesService } from './profiles';
export { designsService } from './designs';
export { productImagesService } from './productImages';
export { styleTemplatesService } from './styleTemplates';
export { removeBackground, removeBackgroundFromDataURL } from './backgroundRemoval';
export { generateDesignSuggestions, generateDesignVariations, enhanceWithGemini, generateMarketingText } from './geminiService';