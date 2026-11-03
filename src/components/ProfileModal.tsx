import React from 'react';
import { MEMBER_PROFILE } from '../data/mockData';
import { ScreenType } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  theme,
  onToggleTheme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#191b21] dark:bg-[#191b21] light:bg-[#fcf9f1] border border-[#282a30] dark:border-[#282a30] light:border-[#e5e2da] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#282a30] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb598] text-xl">person</span>
            <h3 className="font-serif text-lg font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
              Perfil de Lector
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] text-[#9ea2ae] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Member Card Glance */}
          <div className="flex items-center gap-3.5 bg-[#14161d] p-3.5 rounded-xl border border-[#282a30]">
            <img
              src={MEMBER_PROFILE.avatar}
              alt={MEMBER_PROFILE.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#e07a4f]/50"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-base font-semibold text-[#f0ece2] truncate">{MEMBER_PROFILE.name}</h4>
                <span className="px-1.5 py-0.5 rounded bg-[#e07a4f]/20 text-[#ffb598] text-[10px] uppercase font-bold">
                  {MEMBER_PROFILE.tier}
                </span>
              </div>
              <p className="text-xs font-mono text-[#fcb887] mt-0.5">{MEMBER_PROFILE.membershipNumber}</p>
              <p className="text-[11px] text-[#9ea2ae] mt-1">Socio desde {MEMBER_PROFILE.joinedDate}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1e2029] p-3 rounded-xl text-center border border-[#282a30]">
              <span className="text-xl font-serif font-bold text-[#ffb598]">{MEMBER_PROFILE.activeLoansCount}</span>
              <p className="text-[10px] text-[#9ea2ae] uppercase tracking-wider mt-0.5">En préstamo</p>
            </div>
            <div className="bg-[#1e2029] p-3 rounded-xl text-center border border-[#282a30]">
              <span className="text-xl font-serif font-bold text-[#fcb887]">{MEMBER_PROFILE.readThisYear}</span>
              <p className="text-[10px] text-[#9ea2ae] uppercase tracking-wider mt-0.5">Leídos 2024</p>
            </div>
            <div className="bg-[#1e2029] p-3 rounded-xl text-center border border-[#282a30]">
              <span className="text-xl font-serif font-bold text-[#78c991]">96%</span>
              <p className="text-[10px] text-[#9ea2ae] uppercase tracking-wider mt-0.5">Meta Anual</p>
            </div>
          </div>

          {/* Reading Goal Progress */}
          <div className="bg-[#1e2029] p-3.5 rounded-xl border border-[#282a30] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#f0ece2] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ffb598]">emoji_events</span>
                Reto Anual 2024
              </span>
              <span className="text-[#ffb598] font-bold">24 de 25 libros</span>
            </div>
            <div className="w-full h-2 bg-[#121319] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#e07a4f] to-[#ffb598] rounded-full" style={{ width: '96%' }} />
            </div>
            <p className="text-[11px] text-[#9ea2ae] italic">¡Solo te falta 1 libro para completar tu meta anual!</p>
          </div>

          {/* Badges Earned */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#9ea2ae] font-semibold">Distinciones de Atenea</span>
            <div className="grid grid-cols-3 gap-2">
              {MEMBER_PROFILE.badgesEarned.map((b, idx) => (
                <div key={idx} className="bg-[#14161d] p-2.5 rounded-xl border border-[#282a30] flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#331c13] text-[#fcb887] flex items-center justify-center mb-1">
                    <span className="material-symbols-outlined text-base">{b.icon}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#f0ece2] line-clamp-1 leading-tight">{b.title}</span>
                  <span className="text-[9px] text-[#9ea2ae] line-clamp-2 mt-0.5 leading-snug">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links & Preferences */}
          <div className="pt-2 border-t border-[#282a30] space-y-2">
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#1e2029] hover:bg-[#282a30] text-xs text-[#f0ece2] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ffb598]">
                  {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                </span>
                <span>Atmósfera visual: {theme === 'dark' ? 'Atenea Nocturna' : 'Atenea Biblioteca (Claro)'}</span>
              </div>
              <span className="text-[11px] text-[#ffb598] font-semibold">Cambiar</span>
            </button>

            <button
              onClick={() => {
                onNavigate('prestamos');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#1e2029] hover:bg-[#282a30] text-xs text-[#f0ece2] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#fcb887]">badge</span>
                <span>Ver Carnet Digital y Códigos de Kiosco</span>
              </div>
              <span className="material-symbols-outlined text-sm text-[#9ea2ae]">chevron_right</span>
            </button>

            <button
              onClick={() => {
                onNavigate('subrayados');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#1e2029] hover:bg-[#282a30] text-xs text-[#f0ece2] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#78c991]">ink_highlighter</span>
                <span>Mi Archivo Marginal (42 citas guardadas)</span>
              </div>
              <span className="material-symbols-outlined text-sm text-[#9ea2ae]">chevron_right</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
