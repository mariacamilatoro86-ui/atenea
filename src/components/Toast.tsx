import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible?: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible = true, onClose }) => {
  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#ffffff] text-[#f0ece2] dark:text-[#f0ece2] border border-[#ffb598]/30 shadow-2xl flex items-center gap-2.5 transition-all duration-300 animate-fade-in cursor-pointer pointer-events-auto"
    >
      <span className="material-symbols-outlined text-[18px] text-[#ffb598]">{icon}</span>
      <span className="text-xs font-medium tracking-wide">{message}</span>
    </div>
  );
};

