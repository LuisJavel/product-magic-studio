import { useState } from 'react';

export default function HeroSection({ onNavigate }) {
  const [isHovering, setIsHovering] = useState(false);

  const features = [
    { icon: '⚡', text: 'Diseño en segundos' },
    { icon: '🎨', text: '50+ plantillas' },
    { icon: '📱', text: 'Todos los formatos' }
  ];

  const exampleDesigns = [
    { type: 'Instagram', gradient: 'from-pink-500 to-rose-500', badge: 'Popular' },
    { type: 'Story', gradient: 'from-violet-600 to-purple-700', badge: 'Nuevo' },
    { type: 'Banner', gradient: 'from-blue-500 to-cyan-500', badge: null },
    { type: 'Catálogo', gradient: 'from-amber-500 to-orange-500', badge: null }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              Potenciado por Inteligencia Artificial
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
              Convierte una simple foto de producto en{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                diseños listos para vender
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Sube una imagen, elimina el fondo automáticamente y genera diseños profesionales para redes sociales, catálogo o tienda online en segundos.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button 
                onClick={() => onNavigate('create')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 transition-all"
              >
                Crear diseño gratis
              </button>
              <button 
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-violet-300 hover:text-violet-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver cómo funciona
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl transform rotate-6 scale-105 opacity-20" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Vista previa</h3>
                  <span className="text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-full">En tiempo real</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {exampleDesigns.map((design, index) => (
                    <div 
                      key={index}
                      className={`aspect-square bg-gradient-to-br ${design.gradient} rounded-xl p-4 relative cursor-pointer transform hover:scale-105 transition-transform`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {design.badge && (
                        <span className="absolute -top-2 -right-2 text-xs bg-white text-gray-900 px-2 py-0.5 rounded-full shadow-md">
                          {design.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-lg" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-white/90 text-xs font-medium">{design.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Diseño generado</p>
                      <p className="text-xs text-gray-500">Hace 2 segundos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500 mb-6">Usado por equipos de empresas como</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['TiendaTech', 'ModaPlus', 'StyleHub', 'RetailPro', 'ShopWave'].map((brand, index) => (
              <span key={index} className="text-lg font-semibold text-gray-400">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}