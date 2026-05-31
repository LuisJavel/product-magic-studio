import { useState } from 'react';

const formatMap = {
  instagram: { size: '1080 x 1080 px', ratio: '1:1' },
  story: { size: '1080 x 1920 px', ratio: '9:16' },
  banner: { size: '1920 x 600 px', ratio: '16:5' }
};

export default function ResultGallery({ designs, imageUrl, onEdit }) {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [filter, setFilter] = useState('all');

  if (!designs || designs.length === 0) {
    return (
      <div className="mb-12">
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No hay diseños generados</h3>
          <p className="text-gray-500">Sube una imagen para comenzar</p>
        </div>
      </div>
    );
  }

  const filteredDesigns = filter === 'all' 
    ? designs 
    : designs.filter(d => d.type === filter);

  const handleDownload = (design) => {
    const link = document.createElement('a');
    link.href = design.imageUrl || imageUrl;
    link.download = `design-${design.type}-${design.id}.png`;
    link.click();
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Catálogo de Diseños</h2>
          <p className="text-gray-500">{designs.length} diseños generados</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['all', 'instagram', 'story', 'banner'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className={`aspect-square bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center w-full h-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 mx-auto mb-3 bg-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={design.imageUrl || imageUrl} 
                      alt={design.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <p className="text-white/90 text-sm font-medium">{design.name}</p>
                </div>
              </div>
              
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {design.type}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {formatMap[design.type]?.ratio || '1:1'}
                </span>
              </div>
              
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {formatMap[design.type]?.size || '1080 x 1080 px'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{design.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  design.error 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {design.error ? 'Error' : 'Listo'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{design.description}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(design)}
                  className="flex-1 px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button
                  onClick={() => handleDownload(design)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}