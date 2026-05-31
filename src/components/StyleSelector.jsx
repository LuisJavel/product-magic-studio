export default function StyleSelector({ onStyleSelect }) {
  const styles = [
    {
      id: 'minimalist',
      name: 'Minimalista premium',
      description: 'Diseño limpio con fondo blanco, perfecto para marcas de lujo',
      icon: '✨',
      gradient: 'from-gray-100 to-gray-200'
    },
    {
      id: 'promo',
      name: 'Oferta promocional',
      description: 'Diseño llamativo con badges y precios destacados',
      icon: '🏷️',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'catalog',
      name: 'Catálogo elegante',
      description: 'Presentación sofisticada ideal para catálogos de moda',
      icon: '📸',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Elige un estilo</h2>
      <p className="text-gray-500 text-center mb-8">Selecciona el estilo que mejor se adapte a tu producto</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div
            key={style.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-violet-200 transition-all cursor-pointer group hover:shadow-xl hover:-translate-y-1"
            onClick={() => onStyleSelect(style.id)}
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {style.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">{style.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{style.description}</p>
            <button className="w-full px-4 py-2 bg-violet-50 text-violet-600 font-medium rounded-lg hover:bg-violet-100 transition-colors">
              Generar diseño
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}