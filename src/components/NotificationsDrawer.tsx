import React from 'react';
import { ScreenType } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Préstamo próximo a vencer',
      desc: 'Tu préstamo de «La sombra del viento» vence en 3 días. Puedes renovarlo ahora.',
      time: 'Hace 30 min',
      icon: 'schedule',
      color: 'text-amber-400',
      actionScreen: 'prestamos' as ScreenType,
      actionLabel: 'Ver en préstamos'
    },
    {
      id: 'notif-2',
      title: 'Reserva lista para retiro',
      desc: 'El tomo «Ficciones» de Jorge Luis Borges ya está asignado a tu taquilla en Claustro Mayor.',
      time: 'Hace 2 horas',
      icon: 'verified',
      color: 'text-emerald-400',
      actionScreen: 'prestamos' as ScreenType,
      actionLabel: 'Ver reserva'
    },
    {
      id: 'notif-3',
      title: 'Círculo Literario: Pedro Páramo',
      desc: 'Este jueves 17 a las 18:30h iniciamos la tertulia con el Prof. Mario Valenzuela.',
      time: 'Ayer',
      icon: 'groups',
      color: 'text-[#ffb598]',
      actionScreen: 'comunidad' as ScreenType,
      actionLabel: 'Ir a evento'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm mt-14 bg-[#191b21] border border-[#282a30] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#282a30] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb598] text-xl">notifications</span>
            <h3 className="font-serif text-base font-semibold text-[#f0ece2]">Notificaciones</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] text-[#9ea2ae] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div className="divide-y divide-[#282a30] max-h-96 overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="p-3.5 hover:bg-[#1e2029] transition-colors flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold flex items-center gap-1 ${n.color}`}>
                  <span className="material-symbols-outlined text-sm">{n.icon}</span>
                  {n.title}
                </span>
                <span className="text-[10px] text-[#9ea2ae]">{n.time}</span>
              </div>
              <p className="text-xs text-[#dcc1b7] leading-relaxed">{n.desc}</p>
              <button
                onClick={() => {
                  onNavigate(n.actionScreen);
                  onClose();
                }}
                className="self-start text-[11px] text-[#ffb598] hover:underline font-medium mt-1 flex items-center gap-0.5"
              >
                <span>{n.actionLabel}</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#13151b] text-center border-t border-[#282a30]">
          <span className="text-[11px] text-[#9ea2ae]">Atenea Biblioteca Nocturna • Todas las alertas leídas</span>
        </div>
      </div>
    </div>
  );
};
