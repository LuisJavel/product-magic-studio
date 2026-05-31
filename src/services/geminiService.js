import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;

function getGeminiModel() {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }
  
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

export async function generateDesignSuggestions(productImage, style = null) {
  try {
    const model = getGeminiModel();
    
    const prompt = `Eres un diseñador gráfico profesional especializado en crear diseños de marketing para productos de comercio electrónico.
    
Analiza la imagen del producto proporcionada y genera sugerencias de diseño para crear materiales promocionales.

Para cada diseño, especifica:
1. Tipo de diseño (Instagram Post, Story, Banner, etc.)
2. Colores dominantes y complementarios (en formato Tailwind CSS como "from-pink-500 to-rose-500")
3. Texto sugerido para el título del producto
4. Descripción breve del estilo general

Responde en formato JSON con un array de 3 diseños:
[
  {
    "type": "instagram",
    "gradient_start": "from-pink-500",
    "gradient_end": "to-rose-500",
    "title": "Nombre del producto",
    "description": "Descripción del estilo"
  }
]

Solo responde con el JSON, sin texto adicional.`;

    const imageParts = await fileToGenerativePart(productImage);
    
    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [
      { type: 'instagram', gradient_start: 'from-pink-500', gradient_end: 'to-rose-500', title: 'Diseño 1', description: 'Estilo moderno' },
      { type: 'story', gradient_start: 'from-violet-600', gradient_end: 'to-purple-700', title: 'Diseño 2', description: 'Estilo vibrante' },
      { type: 'banner', gradient_start: 'from-blue-500', gradient_end: 'to-cyan-500', title: 'Diseño 3', description: 'Estilo profesional' }
    ];
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw error;
  }
}

export async function enhanceProductImage(imageData, enhancement = 'vibrant') {
  try {
    const model = getGeminiModel();
    
    const prompt = `Mejora esta imagen de producto para que se vea más profesional y atractiva para marketing.
    
Opciones de mejora:
- "vibrant": Aumenta la saturación y viveza de colores
- "bright": Mejora el brillo y contraste
- "professional": Ajuste profesional con iluminación mejorada

Aplica el enhancement: ${enhancement}

La imagen ya tiene el fondo eliminado, así que solo mejora los colores y la apariencia del producto.

Responde con la imagen mejorada en base64 o como URL de datos.`;

    const imageParts = await fileToGenerativePart(imageData);
    
    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Image enhancement error:', error);
    return imageData;
  }
}

export async function generateMarketingText(productDescription, context = 'social_media') {
  try {
    const model = getGeminiModel();
    
    const prompt = `Eres un experto en copywriting para comercio electrónico.
    
Basándote en esta descripción de producto: "${productDescription}"
    
Genera textos de marketing para: ${context}

Incluye:
1. Un título atractivo (máximo 5 palabras)
2. Una descripción breve (máximo 20 palabras)
3. Un call-to-action (máximo 5 palabras)

Responde en formato JSON:
{
  "title": "Título atractivo",
  "description": "Descripción breve",
  "cta": "Call to action"
}

Solo responde con el JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      title: 'Producto Increíble',
      description: 'La mejor calidad que encontrarás',
      cta: 'Compra ahora'
    };
  } catch (error) {
    console.error('Text generation error:', error);
    return {
      title: 'Producto Increíble',
      description: 'La mejor calidad que encontrarás',
      cta: 'Compra ahora'
    };
  }
}

async function fileToGenerativePart(imageData) {
  const response = await fetch(imageData);
  const blob = await response.blob();
  
  const base64 = await blobToBase64(blob);
  const mimeType = blob.type || 'image/png';
  
  return {
    inlineData: {
      data: base64,
      mimeType
    }
  };
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}