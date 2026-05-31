export default function PricingPreview() {
  const plans = [
    {
      id: 'free',
      name: 'Gratis',
      price: '$0',
      period: 'para siempre',
      description: 'Perfecto para probar la herramienta',
      features: [
        '3 diseños de prueba',
        'Calidad estándar',
        'Solo formato Instagram',
        'Marca de agua incluida'
      ],
      cta: 'Comenzar gratis',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: 'por mes',
      description: 'Para creadores y pequeñas tiendas',
      features: [
        'Diseños ilimitados',
        'Alta calidad HD',
        'Todos los formatos',
        'Sin marca de agua',
        'Exportar en PNG y JPG'
      ],
      cta: 'Ir a Pro',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      price: '$49',
      period: 'por mes',
      description: 'Para tiendas y equipos',
      features: [
        'Todo lo de Pro',
        'Catálogo ilimitado',
        'Marca personalizada',
        'API access',
        'Soporte prioritario',
        'Colaboración en equipo'
      ],
      cta: 'Elegir Business',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Planes simples y transparentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Sin sorpresas, cancela cuando quieras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all ${
                plan.popular ? 'border-violet-500 scale-105' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-violet-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}