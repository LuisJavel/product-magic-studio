import { supabase } from '../lib/supabase/client';

export const styleTemplatesService = {
  async getTemplates(category = null) {
    let query = supabase
      .from('style_templates')
      .select('*')
      .eq('is_active', true);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('name');
    
    if (error) throw error;
    return data;
  },

  async getTemplate(templateId) {
    const { data, error } = await supabase
      .from('style_templates')
      .select('*')
      .eq('id', templateId)
      .single();
    
    if (error) throw error;
    return data;
  },
};