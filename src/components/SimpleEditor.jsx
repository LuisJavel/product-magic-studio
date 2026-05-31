import { useState } from 'react';

const colors = [
  { id: 'violet', hex: '#7c3aed', name: 'Violeta' },
  { id: 'blue', hex: '#3b82f6', name: 'Azul' },
  { id: 'green', hex: '#10b981', name: 'Verde' },
  { id: 'orange', hex: '#f97316', name: 'Naranja' },
  { id: 'red', hex: '#ef4444', name: 'Rojo' },
  { id: 'pink', hex: '#ec4899', name: 'Rosa' },
  { id: 'gray', hex: '#6b7280', name: 'Gris' },
  { id: 'black', hex: '#1f2937', name: 'Negro' },
];

export default function SimpleEditor({ design, productImage, onClose, onSave }) {
  const [title, setTitle] = useState('Zapatillas Running Pro');
  const [price, setPrice] = useState('$89.99');
  const [promoText, setPromoText] = useState('¡oferta especial!');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
    if (onSave) onSave({ title, price, promoText, color: selectedColor });
  };

  const handleDownload = () => {
    alert('Descarga iniciada (simulado)');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900">Editar diseño</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className={`aspect-square rounded-2xl bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                      <img src={productImage} alt="Product" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                      <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                      <p className="text-2xl font-bold text-violet-600">{price}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                        {promoText}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">{design.format}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título del producto</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="Nombre del producto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="$0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texto promocional</label>
                <input
                  type="text"
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="¡Oferta especial!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color principal</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`color-option w-10 h-10 rounded-full border-2 transition-all ${selectedColor.id === color.id ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar imagen
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Guardar en catálogo
                </button>
              </div>

              {showSaveSuccess && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-center font-medium animate-fade-in">
                  ¡Diseño guardado correctamente!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}