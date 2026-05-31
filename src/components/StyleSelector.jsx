import { useState } from 'react';
import { generateDesignVariations } from '../services/geminiService';

const styleOptions = [
  {
    id: 'premium',
    name: 'Premium Ecommerce',
    description: 'Iluminación de estudio, sombras suaves, fondo limpio estilo lujo',
    icon: '✨',
    gradient: 'from-gray-100 to-gray-200',
    geminiStyle: 'premium'
  },
  {
    id: 'social',
    name: 'Redes Sociales',
    description: 'Fondo moderno, colores vibrantes, espacio para precio y oferta',
    icon: '📱',
    gradient: 'from-violet-600 to-purple-600',
    geminiStyle: 'social'
  },
  {
    id: 'catalog',
    name: 'Catálogo Digital',
    description: 'Fondo blanco, composición centrada, acabado profesional',
    icon: '📸',
    gradient: 'from-blue-500 to-cyan-500',
    geminiStyle: 'catalog'
  }
];

export default function StyleSelector({ productImage, onGenerate }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = async (style) => {
    setIsGenerating(true);
    setSelectedStyle(style.id);
    setGenerationProgress(0);

    try {
      setGenerationProgress(10);
      const variations = await generateDesignVariations(productImage);
      
      setGenerationProgress(100);
      
      onGenerate(variations);
    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      setSelectedStyle(null);
    }
  };

  if (isGenerating) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Generando diseños con IA...</h2>
        <p className="text-gray-500 text-center mb-8">Creando las 3 variaciones profesionales de tu producto</p>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-violet-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin" />
              </div>
            </div>
            
            <div className="space-y-3">
              <ProgressStep active={true} label="Analizando producto..." />
              <ProgressStep active={generationProgress >= 30} label="Generando diseño Premium..." />
              <ProgressStep active={generationProgress >= 60} label="Generando diseño Social..." />
              <ProgressStep active={generationProgress >= 90} label="Generando diseño Catálogo..." />
              <ProgressStep active={generationProgress >= 100} label="¡Completado!" />
            </div>
            
            <div className="mt-6">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Elige un estilo</h2>
      <p className="text-gray-500 text-center mb-8">Selecciona cómo quieres que se vea tu diseño</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styleOptions.map((style) => (
          <div
            key={style.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-violet-200 transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1"
            onClick={() => handleGenerate(style)}
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {style.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">{style.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{style.description}</p>
            <button className="w-full px-4 py-2 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 transition-colors">
              Generar con IA
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          💡 La IA creará 3 variaciones profesionales de tu producto automáticamente
        </p>
      </div>
    </div>
  );
}

function ProgressStep({ active, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-violet-600' : 'bg-gray-200'}`}>
        {active ? (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </div>
      <span className={`text-sm ${active ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}