import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  // If in immersive reading mode, don't show the bottom navigation
  if (currentScreen === 'lector') return null;

  const navItems: Array<{ id: ScreenType; label: string; icon: string }> = [
    { id: 'explorar', label: 'Explorar', icon: 'explore' },
    { id: 'catalogo', label: 'Catálogo', icon: 'local_library' },
    { id: 'subrayados', label: 'Subrayados', icon: 'ink_highlighter' },
    { id: 'prestamos', label: 'Préstamos', icon: 'bookmark' },
    { id: 'comunidad', label: 'Comunidad', icon: 'groups' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#111319]/90 dark:bg-[#111319]/90 light:bg-[#fcf9f1]/90 backdrop-blur-xl border-t border-[#282a30] dark:border-[#282a30] light:border-[#e5e2da] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 transition-all gap-0.5 ${
                isActive
                  ? 'text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] font-semibold scale-105'
                  : 'text-[#9ea2ae] dark:text-[#9ea2ae] light:text-[#54433c] hover:text-[#ffb598] opacity-75 hover:opacity-100'
              }`}
            >
              <span
                className="material-symbols-outlined text-[23px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
