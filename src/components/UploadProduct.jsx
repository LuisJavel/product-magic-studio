import { useState, useRef } from 'react';

export default function UploadProduct({ onImageUploaded }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onImageUploaded(e.target.result);
      }, 2500);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('No se pudo acceder a la cámara');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setPreview(imageData);
    setShowCamera(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onImageUploaded(imageData);
    }, 2500);
  };

  const closeCamera = () => {
    setShowCamera(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!preview ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`drop-zone rounded-2xl border-2 border-dashed p-12 text-center transition-all ${isDragging ? 'border-violet-500 bg-violet-50' : 'border-gray-200'}`}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-violet-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Arrastra tu imagen aquí
            </h3>
            <p className="text-gray-500 mb-6">o selecciona una opción abajo</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Subir imagen
              </button>
              <button
                onClick={startCamera}
                className="w-full sm:w-auto px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tomar foto
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <p className="mt-6 text-sm text-gray-400">
              La IA eliminará el fondo y preparará tu producto para diseñarlo
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <LoadingState />
      ) : showCamera ? (
        <CameraView 
          videoRef={videoRef} 
          onCapture={capturePhoto} 
          onClose={closeCamera} 
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Vista previa</h3>
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img src={preview} alt="Preview" className="w-full h-auto object-contain max-h-96" />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => { setPreview(null); }}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cambiar imagen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  const steps = [
    { text: 'Eliminando fondo...', progress: 33 },
    { text: 'Analizando producto...', progress: 66 },
    { text: 'Generando diseños...', progress: 100 }
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
      <div className="w-24 h-24 mx-auto mb-8 relative">
        <div className="absolute inset-0 border-4 border-violet-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {steps[currentStep].text}
      </h3>
      <p className="text-gray-500 mb-6">Esto solo tardará unos segundos</p>
      <div className="max-w-xs mx-auto">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-500"
            style={{ width: `${steps[currentStep].progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function CameraView({ videoRef, onCapture, onClose }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="relative rounded-xl overflow-hidden bg-black mb-6">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline
          className="w-full h-auto"
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onCapture}
          className="px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2"
        >
          <span className="w-3 h-3 bg-white rounded-full" />
          Capturar
        </button>
      </div>
    </div>
  );
}