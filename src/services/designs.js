import { supabase } from '../lib/supabase/client';

export const designsService = {
  async createDesign(designData) {
    const { data, error } = await supabase
      .from('designs')
      .insert(designData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getDesigns(userId) {
    const { data, error } = await supabase
      .from('designs')
      .select('*, product_images(storage_path), style_templates(name, category)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getDesign(designId) {
    const { data, error } = await supabase
      .from('designs')
      .select('*, product_images(storage_path), style_templates(*)')
      .eq('id', designId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateDesign(designId, updates) {
    const { data, error } = await supabase
      .from('designs')
      .update(updates)
      .eq('id', designId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteDesign(designId) {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', designId);
    
    if (error) throw error;
  },
};