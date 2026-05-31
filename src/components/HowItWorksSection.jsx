export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Sube tu foto',
      description: 'Selecciona una imagen de tu producto desde tu dispositivo.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    },
    {
      number: '02',
      title: 'Elige el estilo',
      description: 'Navega por nuestras plantillas y escoge la que más te guste.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    },
    {
      number: '03',
      title: 'Personaliza',
      description: 'Ajusta colores, añade tu texto y haz los cambios que necesites.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    },
    {
      number: '04',
      title: 'Descarga',
      description: 'Obtén tu diseño en alta calidad y listo para usar.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
            Simple y rápido
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crea diseños profesionales en 4 pasos simples
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-violet-400 to-purple-400 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
                  
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden mt-2">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="bg-white/50 backdrop-blur rounded-lg p-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg mx-auto" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}