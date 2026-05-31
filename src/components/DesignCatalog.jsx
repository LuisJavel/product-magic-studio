import { useState } from 'react';

const initialDesigns = [
  {
    id: 1,
    title: 'Zapatillas Running Pro',
    price: '$89.99',
    type: 'instagram',
    gradient: 'from-pink-500 to-rose-500',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Camiseta Premium Cotton',
    price: '$45.00',
    type: 'banner',
    gradient: 'from-blue-500 to-cyan-500',
    date: '2024-01-14'
  },
  {
    id: 3,
    title: 'Bolso de cuero elegante',
    price: '$129.00',
    type: 'catalog',
    gradient: 'from-violet-500 to-purple-600',
    date: '2024-01-13'
  },
  {
    id: 4,
    title: 'Auriculares Wireless Pro',
    price: '$159.00',
    type: 'instagram',
    gradient: 'from-gray-700 to-gray-900',
    date: '2024-01-12'
  }
];

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'banner', label: 'Tienda online' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'promo', label: 'Oferta' }
];

export default function DesignCatalog({ onEdit }) {
  const [designs, setDesigns] = useState(initialDesigns);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDesigns = activeFilter === 'all' 
    ? designs 
    : designs.filter(d => d.type === activeFilter);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tu catálogo de diseños</h2>
        <p className="text-gray-500">Todos tus diseños guardados en un solo lugar</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredDesigns.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No hay diseños</h3>
          <p className="text-gray-500">Crea tu primer diseño para verlo aquí</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onEdit(design)}
            >
              <div className={`aspect-square bg-gradient-to-br ${design.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/30 rounded-lg" />
                    <p className="text-white/80 text-xs font-medium">{design.title}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full capitalize">
                    {design.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{design.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-violet-600 font-semibold">{design.price}</p>
                  <p className="text-xs text-gray-400">{design.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <button className="px-8 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors">
          Generar otro diseño
        </button>
      </div>
    </div>
  );
}