import React from 'react';
import { ScreenType } from '../types';
import { MEMBER_PROFILE } from '../data/mockData';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  theme,
  onToggleTheme,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2
}) => {
  const isSubScreen = ['detalle-libro', 'editor-anotacion', 'detalle-cita', 'lector'].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'detalle-libro': return 'Detalle Del Libro';
      case 'editor-anotacion': return 'Editor De Anotación';
      case 'detalle-cita': return 'Detalle De Cita Y Nota';
      case 'lector': return 'Lector Atenea';
      case 'subrayados': return 'Mis Subrayados';
      case 'prestamos': return 'Mesa de Préstamos';
      case 'comunidad': return 'Agenda Cultural';
      case 'catalogo': return 'Catálogo General';
      default: return 'Atenea Biblioteca';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#111319]/90 dark:bg-[#111319]/90 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-xl border-b border-[#282a30]/60 dark:border-[#282a30]/60 light:bg-[#fcf9f1]/90 light:border-[#e5e2da]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Back or Brand */}
        <div className="flex items-center gap-2">
          {isSubScreen ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onBack || (() => onNavigate('explorar'))}
                aria-label="Volver"
                className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] hover:bg-[#1d1f26] dark:hover:bg-[#1d1f26] light:hover:bg-[#ebe8e0] transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
              <h1 className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] truncate max-w-[210px] sm:max-w-xs">
                {getScreenTitle()}
              </h1>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('explorar')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <img
                src="https://lh3.googleusercontent.com/d/1O5D6k8_gO1i8f2-iN74uQx_hRjTzJb-l"
                alt="Logo Atenea Biblioteca"
                className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_2px_8px_rgba(255,181,152,0.2)] group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif text-[21px] text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold tracking-tight leading-none">
                  Atenea
                </span>
                <span className="text-[10px] font-sans text-[#fcb887] dark:text-[#fcb887] light:text-[#4f5e81] uppercase tracking-[0.2em] font-medium leading-none mt-1">
                  Biblioteca
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Center / Secondary quick navigation for desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onNavigate('explorar')}
            className={`transition-colors ${currentScreen === 'explorar' ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold' : 'text-[#9ea2ae] hover:text-[#f0ece2]'}`}
          >
            Explorar
          </button>
          <button
            onClick={() => onNavigate('catalogo')}
            className={`transition-colors ${currentScreen === 'catalogo' ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold' : 'text-[#9ea2ae] hover:text-[#f0ece2]'}`}
          >
            Catálogo
          </button>
          <button
            onClick={() => onNavigate('subrayados')}
            className={`transition-colors ${currentScreen === 'subrayados' ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold' : 'text-[#9ea2ae] hover:text-[#f0ece2]'}`}
          >
            Subrayados
          </button>
          <button
            onClick={() => onNavigate('prestamos')}
            className={`transition-colors ${currentScreen === 'prestamos' ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold' : 'text-[#9ea2ae] hover:text-[#f0ece2]'}`}
          >
            Préstamos
          </button>
          <button
            onClick={() => onNavigate('comunidad')}
            className={`transition-colors ${currentScreen === 'comunidad' ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold' : 'text-[#9ea2ae] hover:text-[#f0ece2]'}`}
          >
            Comunidad
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme switcher */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno'}
            title={theme === 'dark' ? 'Modo Atenea Nocturna (Activo)' : 'Modo Atenea Biblioteca (Activo)'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#dcc1b7] dark:text-[#dcc1b7] light:text-[#54433c] hover:text-[#ffb598] hover:bg-[#1d1f26] dark:hover:bg-[#1d1f26] light:hover:bg-[#ebe8e0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notificaciones"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#dcc1b7] dark:text-[#dcc1b7] light:text-[#54433c] hover:text-[#ffb598] hover:bg-[#1d1f26] dark:hover:bg-[#1d1f26] light:hover:bg-[#ebe8e0] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e07a4f] ring-2 ring-[#111319]" />
            )}
          </button>

          {/* Profile button */}
          <button
            onClick={onOpenProfile}
            aria-label="Perfil de lector"
            className="w-10 h-10 rounded-full p-0.5 flex items-center justify-center hover:opacity-90 transition-opacity ring-1 ring-[#e07a4f]/40 ml-1"
          >
            <img
              src={MEMBER_PROFILE.avatar}
              alt="Elena Morales"
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

      </div>
    </header>
  );
};
