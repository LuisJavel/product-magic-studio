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

const DESIGN_PROMPTS = [
  {
    id: 1,
    name: 'Premium Ecommerce',
    description: 'Composición de lujo',
    prompt: `Crea una imagen publicitaria profesional de alta calidad para comercio electrónico. 
Caracteristicas obligatoria:
- El producto debe ser el SUJETO PRINCIPAL, conservando exactamente su forma, color, marca y todos los detalles
- Iluminación de estudio profesional con reflejos suaves
- Sombras suaves y naturales sobre superficie clara
- Fondo limpio y elegante (blanco o gris muy claro)
- Estilo minimalista de marca de lujo
- La imagen debe verse como una foto de producto profesional de tienda online premium
NO agregues texto, logos o información adicional. Solo el producto en la composición indicada.`
  },
  {
    id: 2,
    name: 'Social Media',
    description: 'Promoción para redes',
    prompt: `Crea una pieza promocional llamativa para redes sociales.
Caracteristicas obligatorias:
- El producto debe ser el SUJETO PRINCIPAL, conservando exactamente su forma, color, marca y todos los detalles
- Fondo moderno con gradiente o colores vibrantes
- Composición dinámica con ángulo interesante
- Espacio visual预留 para agregar precio y oferta
- Estilo comercial atractivo para anuncios
- Colores llamativos pero profesionales
NO agregues texto, precio o descuentos. Solo el producto en la composición indicada.`
  },
  {
    id: 3,
    name: 'Catálogo Digital',
    description: 'Estilo marketplace',
    prompt: `Crea una imagen tipo catálogo digital profesional.
Caracteristicas obligatorias:
- El producto debe ser el SUJETO PRINCIPAL, conservando exactamente su forma, color, marca y todos los detalles
- Fondo limpio completamente blanco
- Composición centrada y equilibrada
- Iluminación realista con softbox profesional
- Acabado ultra profesional para ecommerce y marketplace
- La calidad debe ser fotografica comercial de alta gama
NO agregues texto, sombras extremas ni efectos. Solo el producto en la composición indicada.`
  }
];

export async function generateDesignVariations(productImageData) {
  try {
    const model = getGeminiModel();
    const variations = [];

    for (const designPrompt of DESIGN_PROMPTS) {
      try {
        const imagePart = await fileToGenerativePart(productImageData);
        
        const fullPrompt = `${designPrompt.prompt}

IMPORTANTE: El producto en la imagen que te envío es el producto real que debes usar. Mira cuidadosamente los colores, forma, marca y detalles del producto. Debes preservar TODO exactamente igual, solo cambiar el fondo, iluminación y composición según lo indicado arriba.`;

        const result = await model.generateContent([fullPrompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        let imageUrl = null;
        
        if (text.includes('data:image') || text.includes('http')) {
          const urlMatch = text.match(/(data:image\/[^;]+;base64,[A-Za-z0-9+/=]+|https?:\/\/[^\s"]+\.(?:png|jpg|jpeg|webp)[^\s"]*)/gi);
          if (urlMatch) {
            imageUrl = urlMatch[0];
          }
        }

        variations.push({
          id: designPrompt.id,
          name: designPrompt.name,
          description: designPrompt.description,
          prompt: designPrompt.prompt,
          imageUrl: imageUrl || productImageData,
          gradient: getGradientForStyle(designPrompt.id),
          type: getTypeForStyle(designPrompt.id)
        });

      } catch (error) {
        console.error(`Error generating variation ${designPrompt.id}:`, error);
        variations.push({
          id: designPrompt.id,
          name: designPrompt.name,
          description: designPrompt.description,
          prompt: designPrompt.prompt,
          imageUrl: productImageData,
          gradient: getGradientForStyle(designPrompt.id),
          type: getTypeForStyle(designPrompt.id),
          error: true
        });
      }
    }

    return variations;
  } catch (error) {
    console.error('Generate design variations error:', error);
    throw error;
  }
}

function getGradientForStyle(styleId) {
  const gradients = {
    1: 'from-slate-100 to-gray-200',
    2: 'from-violet-600 to-purple-600',
    3: 'from-blue-500 to-cyan-500'
  };
  return gradients[styleId] || 'from-gray-500 to-gray-600';
}

function getTypeForStyle(styleId) {
  const types = {
    1: 'instagram',
    2: 'story',
    3: 'banner'
  };
  return types[styleId] || 'instagram';
}

export async function enhanceWithGemini(productImageData, style) {
  try {
    const model = getGeminiModel();
    
    const enhancementPrompts = {
      premium: `Mejora esta imagen de producto para que se vea como una fotografía de estudio profesional para marca de lujo. 
El producto debe permanecer exacto - misma forma, color, marca, detalles.
Agrega: iluminación de estudio profesional, sombras suaves naturales, fondo limpio (blanco o gris claro), estilo minimalista de lujo.
La calidad debe ser fotográfico comercial premium.`,
      
      social: `Transforma esta imagen en una pieza promocional para redes sociales.
El producto debe permanecer exacto - misma forma, color, marca, detalles.
Agrega: fondo moderno con colores vibrantes o gradiente atractivo, composición dinámica, estilo comercial llamativo.
La imagen debe estar lista para agregar precio y oferta encima.`,
      
      catalog: `Mejora esta imagen para que se vea como una foto de catálogo profesional para marketplace.
El producto debe permanecer exacto - misma forma, color, marca, detalles.
Agrega: fondo 100% blanco, iluminación realista tipo softbox, composición centrada, acabado de fotografía comercial profesional.
Calidad lista para Amazon, MercadoLibre, Shopify, etc.`
    };

    const imagePart = await fileToGenerativePart(productImageData);
    const result = await model.generateContent([
      enhancementPrompts[style] || enhancementPrompts.premium,
      imagePart
    ]);
    
    const response = await result.response;
    const text = response.text();

    if (text.includes('data:image') || text.includes('http')) {
      const urlMatch = text.match(/(data:image\/[^;]+;base64,[A-Za-z0-9+/=]+|https?:\/\/[^\s"]+\.(?:png|jpg|jpeg|webp)[^\s"]*)/gi);
      if (urlMatch) {
        return urlMatch[0];
      }
    }

    return productImageData;
  } catch (error) {
    console.error('Enhancement error:', error);
    return productImageData;
  }
}

export async function generateDesignSuggestions(productImage, style = null) {
  try {
    const model = getGeminiModel();
    
    const prompt = `Analiza esta imagen de producto y genera sugerencias de diseño para materiales promocionales.

Responde en formato JSON con array de 3 diseños:
[
  {
    "type": "instagram|story|banner",
    "gradient_start": "from-XXXXX",
    "gradient_end": "to-XXXXX", 
    "title": "Nombre sugerido",
    "description": "Descripción del estilo"
  }
]

Solo responde con el JSON.`;

    const imageParts = await fileToGenerativePart(productImage);
    
    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [
      { type: 'instagram', gradient_start: 'from-pink-500', gradient_end: 'to-rose-500', title: 'Diseño Premium', description: 'Estilo lujo' },
      { type: 'story', gradient_start: 'from-violet-600', gradient_end: 'to-purple-700', title: 'Oferta Especial', description: 'Redes sociales' },
      { type: 'banner', gradient_start: 'from-blue-500', gradient_end: 'to-cyan-500', title: 'Catálogo', description: 'Marketplace' }
    ];
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw error;
  }
}

export async function generateMarketingText(productDescription, context = 'social_media') {
  try {
    const model = getGeminiModel();
    
    const prompt = `Eres un experto en copywriting para comercio electrónico.
    
Basándote en esta descripción de producto: "${productDescription}"
    
Genera textos de marketing para: ${context}

Responde en formato JSON:
{
  "title": "Título atractivo",
  "description": "Descripción breve",
  "cta": "Call to action"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { title: 'Producto Increíble', description: 'La mejor calidad', cta: 'Compra ahora' };
  } catch (error) {
    console.error('Text generation error:', error);
    return { title: 'Producto Increíble', description: 'La mejor calidad', cta: 'Compra ahora' };
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