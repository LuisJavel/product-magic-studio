const REMOVE_BG_API_URL = 'https://api.remove.bg/v1.0/removebg';
const REMOVE_BG_API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY;

export async function removeBackground(imageFile) {
  if (!REMOVE_BG_API_KEY || REMOVE_BG_API_KEY === 'your-remove-bg-api-key-here') {
    console.warn('Remove.bg API key not configured. Using original image.');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');
    formData.append('format', 'png');

    const response = await fetch(REMOVE_BG_API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY
      },
      body: formData
    });

    if (response.status === 402) {
      console.error('Remove.bg API: Insufficient credits.');
      return { error: 'insufficient_credits', message: 'Credits exhausted. Please add credits to your Remove.bg account.' };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Remove.bg API error: ${response.status} - ${errorText}`);
    }

    const blob = await response.blob();
    return new File([blob], imageFile.name.replace(/\.[^.]+$/, '.png'), {
      type: 'image/png'
    });
  } catch (error) {
    console.error('Background removal failed:', error);
    return { error: 'failed', message: error.message };
  }
}

export async function removeBackgroundFromDataURL(dataURL) {
  try {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: 'image/png' });
    return await removeBackground(file);
  } catch (error) {
    console.error('Background removal from DataURL failed:', error);
    return null;
  }
}