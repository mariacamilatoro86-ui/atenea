import React, { useState } from 'react';

interface PostalModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  author: string;
  bookTitle: string;
  page?: string;
  onToast: (msg: string, icon?: string) => void;
}

export const PostalModal: React.FC<PostalModalProps> = ({
  isOpen,
  onClose,
  quote,
  author,
  bookTitle,
  page = 'Pág. 142',
  onToast
}) => {
  const [themeStyle, setThemeStyle] = useState<'nocturna' | 'pergamino' | 'terracota' | 'marmol'>('nocturna');
  const [aspect, setAspect] = useState<'9:16' | '1:1'>('9:16');

  if (!isOpen) return null;

  const handleDownload = () => {
    onToast('Postal tipográfica generada y guardada en alta resolución', 'download_done');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleCopy = () => {
    onToast('Enlace de la postal copiado al portapapeles', 'content_copy');
  };

  const getCardBg = () => {
    switch (themeStyle) {
      case 'pergamino':
        return 'bg-[#27211a] text-[#dec2a7] border-[#6c3d17]/50';
      case 'terracota':
        return 'bg-gradient-to-b from-[#3a1d13] to-[#1e110c] text-[#ffdbce] border-[#e07a4f]/40';
      case 'marmol':
        return 'bg-gradient-to-b from-[#21242d] to-[#13151c] text-[#f0ece2] border-[#373940]';
      case 'nocturna':
      default:
        return 'bg-gradient-to-b from-[#181a24] via-[#111319] to-[#0c0e14] text-[#f0ece2] border-[#ffb598]/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#191b21] dark:bg-[#191b21] light:bg-[#fcf9f1] border border-[#282a30] dark:border-[#282a30] light:border-[#e5e2da] rounded-2xl p-5 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#282a30] dark:border-[#282a30] light:border-[#e5e2da]">
          <div className="flex items-center gap-2 text-[#ffb598]">
            <span className="material-symbols-outlined text-xl">palette</span>
            <h3 className="font-serif text-lg font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
              Formato Editorial para Redes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#282a30] flex items-center justify-center text-[#dcc1b7] hover:text-[#f0ece2]"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Style Controls */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#9ea2ae] font-medium">Atmósfera Cromática</span>
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setAspect('9:16')}
                className={`px-2 py-0.5 rounded ${aspect === '9:16' ? 'bg-[#ffb598] text-[#370e00] font-semibold' : 'text-[#9ea2ae]'}`}
              >
                9:16 Historia
              </button>
              <button
                onClick={() => setAspect('1:1')}
                className={`px-2 py-0.5 rounded ${aspect === '1:1' ? 'bg-[#ffb598] text-[#370e00] font-semibold' : 'text-[#9ea2ae]'}`}
              >
                1:1 Cuadrada
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setThemeStyle('nocturna')}
              className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                themeStyle === 'nocturna' ? 'border-[#ffb598] bg-[#282a30] text-[#ffb598] font-bold' : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
              }`}
            >
              Nocturna
            </button>
            <button
              onClick={() => setThemeStyle('terracota')}
              className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                themeStyle === 'terracota' ? 'border-[#ffb598] bg-[#3a1d13] text-[#ffb598] font-bold' : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
              }`}
            >
              Terracota
            </button>
            <button
              onClick={() => setThemeStyle('pergamino')}
              className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                themeStyle === 'pergamino' ? 'border-[#ffb598] bg-[#27211a] text-[#dec2a7] font-bold' : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
              }`}
            >
              Pergamino
            </button>
            <button
              onClick={() => setThemeStyle('marmol')}
              className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                themeStyle === 'marmol' ? 'border-[#ffb598] bg-[#21242d] text-[#f0ece2] font-bold' : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
              }`}
            >
              Mármol
            </button>
          </div>
        </div>

        {/* Live Postal Canvas Preview */}
        <div className="my-4 flex justify-center">
          <div
            className={`w-full max-w-[280px] ${
              aspect === '9:16' ? 'aspect-[9/16]' : 'aspect-square'
            } rounded-xl p-5 border shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${getCardBg()}`}
          >
            {/* Ambient watermarks */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ffb598]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-3 left-4 text-[42px] font-serif opacity-20 select-none leading-none">“</div>

            {/* Top brand stamp */}
            <div className="flex items-center justify-between text-[10px] tracking-widest uppercase opacity-75 font-sans z-10">
              <span className="flex items-center gap-1 font-semibold text-[#ffb598]">
                <span className="material-symbols-outlined text-xs">local_library</span>
                Atenea Biblioteca
              </span>
              <span>{page}</span>
            </div>

            {/* Body Quote */}
            <div className="my-auto py-2 z-10">
              <blockquote className="font-serif text-[15px] leading-relaxed italic text-balance">
                "{quote}"
              </blockquote>
            </div>

            {/* Author Attribution & Seal */}
            <div className="pt-2 border-t border-white/10 flex items-end justify-between z-10">
              <div className="flex flex-col">
                <span className="font-serif text-sm font-semibold text-[#ffb598]">{author}</span>
                <span className="text-[10px] opacity-80 truncate max-w-[150px]">{bookTitle}</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-black/40 text-[9px] font-mono tracking-widest text-[#fcb887] border border-white/10">
                #IV-882
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#282a30]">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#f0ece2] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copiar Enlace</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#e07a4f] hover:bg-[#fcb887] hover:text-[#370e00] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-[#e07a4f]/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Descargar Postal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
