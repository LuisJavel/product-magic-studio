export default function ResultGallery({ designs, imageUrl, onEdit }) {
  if (!designs || designs.length === 0) {
    return (
      <div className="mb-12">
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">No hay diseños generados aún.</p>
        </div>
      </div>
    );
  }

  const formatMap = {
    instagram: '1080 x 1080 px',
    story: '1080 x 1920 px',
    banner: '1920 x 600 px'
  };

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {designs.map((design) => (
          <span
            key={design.id}
            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
          >
            {design.name}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
            onClick={() => onEdit(design)}
          >
            <div className={`aspect-square bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center w-full h-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 mx-auto mb-3 bg-white/30 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={design.imageUrl || imageUrl} 
                      alt={design.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <p className="text-white/90 text-sm font-medium">{design.name}</p>
                  <p className="text-white/70 text-xs mt-1">{design.description}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-xs font-medium">{formatMap[design.type] || '1080 x 1080 px'}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm shadow-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{design.name}</h3>
              <p className="text-sm text-gray-500">{design.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}