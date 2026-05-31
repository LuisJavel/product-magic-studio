const PIXIAN_API_URL = 'https://api.pixian.ai/api/v2/remove-background';
const PIXIAN_API_KEY = import.meta.env.VITE_PIXIAN_API_KEY;

export async function removeBackground(imageFile) {
  if (!PIXIAN_API_KEY) {
    console.warn('Pixian API key not configured. Using original image.');
    return imageFile;
  }

  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(PIXIAN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(PIXIAN_API_KEY + ':')
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Pixian API error: ${response.status}`);
    }

    const blob = await response.blob();
    return new File([blob], imageFile.name.replace(/\.[^.]+$/, '.png'), {
      type: 'image/png'
    });
  } catch (error) {
    console.error('Background removal failed:', error);
    throw error;
  }
}

export async function removeBackgroundFromDataURL(dataURL) {
  const response = await fetch(dataURL);
  const blob = await response.blob();
  const file = new File([blob], 'image.png', { type: 'image/png' });
  return removeBackground(file);
}