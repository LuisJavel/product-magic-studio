const placeholderDesigns = [
  {
    id: 1,
    type: 'instagram',
    title: 'Diseño para Instagram',
    format: '1080 x 1080 px',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    pattern: 'dots'
  },
  {
    id: 2,
    type: 'story',
    title: 'Historia / Anuncio',
    format: '1080 x 1920 px',
    gradient: 'from-violet-600 to-purple-700',
    pattern: 'gradient'
  },
  {
    id: 3,
    type: 'banner',
    title: 'Banner ecommerce',
    format: '1920 x 600 px',
    gradient: 'from-blue-500 to-cyan-500',
    pattern: 'waves'
  }
];

export default function ResultGallery({ imageUrl, onEdit }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Tus diseños generados</h2>
      <p className="text-gray-500 text-center mb-8">Haz clic en cualquier diseño para editarlo</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {placeholderDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
            onClick={() => onEdit(design)}
          >
            <div className={`aspect-square bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-3 bg-white/30 rounded-lg flex items-center justify-center">
                    <img src={imageUrl} alt="Product" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">{design.title}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-xs font-medium">{design.format}</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
                  Editar diseño
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{design.title}</h3>
              <p className="text-sm text-gray-500">{design.format}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}