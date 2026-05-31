import { supabase } from '../lib/supabase/client';

export const productImagesService = {
  async uploadImage(userId, file, filePath) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    return data;
  },

  async getImageUrl(storagePath) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .createSignedUrl(storagePath, 3600);
    
    if (error) throw error;
    return data.signedUrl;
  },

  async saveImageRecord(userId, imageData) {
    const { data, error } = await supabase
      .from('product_images')
      .insert({
        user_id: userId,
        storage_path: imageData.path,
        file_name: imageData.name,
        file_size: imageData.size,
        mime_type: imageData.type,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserImages(userId) {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async deleteImage(imageId) {
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId);
    
    if (error) throw error;
  },
};