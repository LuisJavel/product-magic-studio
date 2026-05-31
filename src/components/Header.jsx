import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';

export default function Header({ onNavigate, currentPage }) {
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    onNavigate('home');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-gray-900">Product Magic Studio</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('home')} className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Inicio
              </button>
              {isAuthenticated && (
                <button onClick={() => onNavigate('create')} className={`text-sm font-medium transition-colors ${currentPage === 'create' ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  Crear diseño
                </button>
              )}
              <button onClick={() => onNavigate('catalog')} className={`text-sm font-medium transition-colors ${currentPage === 'catalog' ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Catálogo
              </button>
              <button onClick={() => onNavigate('pricing')} className={`text-sm font-medium transition-colors ${currentPage === 'pricing' ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Precios
              </button>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-violet-600 font-medium">
                        {profile?.full_name?.[0] || user?.email?.[0] || 'U'}
                      </span>
                    </div>
                    <span className="hidden sm:block">{profile?.full_name || user?.email?.split('@')[0]}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                      <button
                        onClick={() => { onNavigate('create'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Crear diseño
                      </button>
                      <button
                        onClick={() => { onNavigate('results'); setShowUserMenu(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Mis diseños
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Iniciar sesión
                  </button>
                  <button 
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Comenzar gratis
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}

      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)} 
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}
    </>
  );
}