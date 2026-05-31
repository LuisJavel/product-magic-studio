import { useState } from 'react';
import { generateDesignVariations } from '../services/geminiService';

const styleOptions = [
  {
    id: 'premium',
    name: 'Premium Ecommerce',
    description: 'Iluminación de estudio con sombras suaves',
    icon: '✨',
    gradient: 'from-slate-200 via-gray-100 to-white'
  },
  {
    id: 'social',
    name: 'Redes Sociales',
    description: 'Diseño llamativo con colores vibrantes',
    icon: '📱',
    gradient: 'from-violet-600 to-purple-600'
  },
  {
    id: 'catalog',
    name: 'Catálogo Digital',
    description: 'Fondo limpio profesional',
    icon: '📸',
    gradient: 'from-blue-500 to-cyan-500'
  }
];

export default function StyleSelector({ productImage, onGenerate }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep(0);

    const steps = [
      { text: 'Analizando imagen...', delay: 500 },
      { text: 'Generando diseño Premium...', delay: 1500 },
      { text: 'Generando diseño Social...', delay: 2500 },
      { text: 'Generando diseño Catálogo...', delay: 3500 },
      { text: '¡Completado!', delay: 4000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
    }

    try {
      const variations = await generateDesignVariations(productImage);
      onGenerate(variations);
    } catch (error) {
      console.error('Generation error:', error);
      const fallbackVariations = [
        { id: 1, name: 'Premium Ecommerce', description: 'Estilo lujo', imageUrl: productImage, gradient: 'from-slate-200 to-gray-300', type: 'instagram' },
        { id: 2, name: 'Redes Sociales', description: 'Promoción', imageUrl: productImage, gradient: 'from-violet-600 to-purple-600', type: 'story' },
        { id: 3, name: 'Catálogo Digital', description: 'Marketplace', imageUrl: productImage, gradient: 'from-blue-500 to-cyan-500', type: 'banner' }
      ];
      onGenerate(fallbackVariations);
    }
  };

  if (isGenerating) {
    const stepLabels = [
      'Analizando imagen...',
      'Generando diseño Premium...',
      'Generando diseño Social...',
      'Generando diseño Catálogo...',
      '¡Completado!'
    ];

    return (
      <div className="mb-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-violet-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {stepLabels[currentStep]}
              </h2>
              <p className="text-gray-500">Creando diseños profesionales...</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {stepLabels.map((label, index) => (
                <div key={index} className={`flex items-center gap-3 ${index <= currentStep ? '' : 'opacity-40'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    index < currentStep ? 'bg-green-500' : index === currentStep ? 'bg-violet-600' : 'bg-gray-200'
                  }`}>
                    {index < currentStep ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${index === currentStep ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                    )}
                  </div>
                  <span className={`text-sm ${index === currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / stepLabels.length) * 100}%` }}
              />
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {styleOptions.map((style) => (
          <div
            key={style.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-violet-200 transition-all"
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl mb-4`}>
              {style.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">{style.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{style.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 shadow-xl">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <img 
              src={productImage} 
              alt="Tu producto" 
              className="w-16 h-16 object-contain rounded-lg bg-white/50" 
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Generar 3 diseños</h3>
          <p className="text-white/80 mb-6">Premium, Social y Catálogo</p>
          <button
            onClick={handleGenerate}
            className="px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generar con IA ahora
          </button>
        </div>
      </div>
    </div>
  );
}