import React, { useState } from 'react';
import { ScreenType, Highlight } from '../types';

interface AnnotationEditorScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onSaveHighlight?: (hl: Partial<Highlight>) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const AnnotationEditorScreen: React.FC<AnnotationEditorScreenProps> = ({
  onBack,
  onNavigate,
  onSaveHighlight,
  onToast
}) => {
  const [semanticColor, setSemanticColor] = useState<'terracotta' | 'parchment' | 'sage' | 'lapis'>('terracotta');
  const [semanticLabel, setSemanticLabel] = useState('Cita Memorable');
  const [noteText, setNoteText] = useState(
    'Este pasaje encapsula la transición de la oralidad a la permanencia física de la escritura. Conectar con el debate del Club sobre el rol de la biblioteca de Alejandría.'
  );
  const [tags, setTags] = useState<string[]>(['Oralidad', 'Historia del Libro', 'Alejandría']);
  const [shareCommunity, setShareCommunity] = useState(true);
  const [audience, setAudience] = useState<'club' | 'public' | 'private'>('club');
  const [isSaving, setIsSaving] = useState(false);
  const [showTagPrompt, setShowTagPrompt] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const palette = [
    { id: 'terracotta', label: 'Cita Memorable', name: 'Ámbar', bg: 'bg-[#e07a4f]', border: 'border-l-4 border-[#e07a4f]' },
    { id: 'parchment', label: 'Idea Clave', name: 'Pergamino', bg: 'bg-[#fcb887]', border: 'border-l-4 border-[#fcb887]' },
    { id: 'sage', label: 'Vocabulario / Estilo', name: 'Salvia', bg: 'bg-[#aa9179]', border: 'border-l-4 border-[#aa9179]' },
    { id: 'lapis', label: 'Referencia Externa', name: 'Lapislázuli', bg: 'bg-[#4f5e81]', border: 'border-l-4 border-[#4f5e81]' }
  ];

  const handleSelectPalette = (item: typeof palette[0]) => {
    setSemanticColor(item.id as any);
    setSemanticLabel(item.label);
    onToast(`Tono semántico: ${item.label}`, 'palette');
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      const clean = newTagInput.trim().replace(/^#/, '');
      if (!tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setNewTagInput('');
      setShowTagPrompt(false);
      onToast(`Etiqueta #${clean} añadida`, 'label');
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (onSaveHighlight) {
        onSaveHighlight({
          note: noteText,
          color: semanticColor,
          colorLabel: semanticLabel,
          tags: tags.map((t) => `#${t}`),
          isPrivate: audience === 'private'
        });
      }
      onToast('¡Anotación guardada en tu pergamino marginal!', 'done_all');
      setTimeout(() => {
        onNavigate('subrayados');
      }, 500);
    }, 600);
  };

  const handleDelete = () => {
    if (window.confirm('¿Deseas eliminar esta nota marginal?')) {
      onToast('Anotación eliminada', 'delete');
      onNavigate('subrayados');
    }
  };

  const currentPaletteItem = palette.find((p) => p.id === semanticColor) || palette[0];

  return (
    <div className="flex flex-col w-full pb-28 pt-16 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Pasaje Seleccionado Card */}
      <div className="relative bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] rounded-2xl p-4 sm:p-5 mb-4 shadow-xl border border-[#282a30] overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#ffb598]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[#ffb598] dark:text-[#ffb598] light:text-[#914722]">
            <span className="material-symbols-outlined text-[18px]">format_quote</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Pasaje Seleccionado</span>
          </div>
          <span className="text-[10px] text-[#9ea2ae] bg-[#282a30] dark:bg-[#282a30] light:bg-[#e5e2da] px-2 py-0.5 rounded font-medium">
            Pág. 142
          </span>
        </div>

        <blockquote
          className={`font-serif text-base sm:text-lg text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] italic leading-relaxed pl-3 transition-all duration-300 ${currentPaletteItem.border}`}
        >
          “Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.”
        </blockquote>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#282a30]/50 text-xs text-[#9ea2ae]">
          <span className="font-serif italic text-sm text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
            El infinito en un junco
          </span>
          <span>Irene Vallejo</span>
        </div>
      </div>

      {/* Tono & Semántica */}
      <div className="bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] rounded-2xl p-4 mb-4 shadow-md border border-[#282a30]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-[10px] uppercase tracking-wider text-[#9ea2ae] font-semibold">Tono &amp; Semántica</span>
          <span className="text-xs font-semibold text-[#ffb598] dark:text-[#ffb598] light:text-[#914722]">
            {semanticLabel}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {palette.map((item) => {
            const isSelected = semanticColor === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPalette(item)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-[#282a30] border-[#ffb598] shadow-sm'
                    : 'bg-[#14161d] border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`w-6 h-6 rounded-full ${item.bg} flex items-center justify-center shadow-sm`}>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[15px] text-[#1a0800] font-bold">check</span>
                  )}
                </span>
                <span className="text-[10px] text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] font-medium truncate w-full text-center">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nota Reflexiva */}
      <div className="bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] rounded-2xl p-4 mb-4 shadow-md border border-[#282a30]">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="reflexive-note" className="text-[10px] uppercase tracking-wider text-[#9ea2ae] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#ffb598]">edit_note</span>
            Nota Reflexiva
          </label>
          <span className="text-[10px] text-[#9ea2ae] font-mono">
            {noteText.length} / 500
          </span>
        </div>

        <div className="relative bg-[#0c0e14] dark:bg-[#0c0e14] light:bg-white rounded-xl p-3 border border-[#282a30] focus-within:border-[#e07a4f]">
          <textarea
            id="reflexive-note"
            rows={3}
            maxLength={500}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Escribe aquí tu análisis o reflexión sobre este fragmento..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] placeholder:text-[#9ea2ae]/50 resize-none outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2 border-t border-[#282a30]/50 text-xs">
            <div className="flex items-center gap-1 text-[#9ea2ae]">
              <button
                type="button"
                onClick={() => setNoteText((prev) => prev + ' *[cursiva]* ')}
                className="p-1 rounded hover:bg-[#282a30] hover:text-[#ffb598] transition-colors"
                title="Formato cursiva"
              >
                <span className="material-symbols-outlined text-[16px]">format_italic</span>
              </button>
              <button
                type="button"
                onClick={() => setNoteText((prev) => prev + ' [vínculo al cap. III] ')}
                className="p-1 rounded hover:bg-[#282a30] hover:text-[#ffb598] transition-colors"
                title="Vínculo cruzado"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
              </button>
              <button
                type="button"
                onClick={() => setNoteText((prev) => prev + ' [cita: Alejandría] ')}
                className="p-1 rounded hover:bg-[#282a30] hover:text-[#ffb598] transition-colors"
                title="Citar capítulo"
              >
                <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
              </button>
            </div>

            <span className="text-[10px] text-[#dec2a7] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb598] animate-pulse" />
              Borrador autoguardado
            </span>
          </div>
        </div>
      </div>

      {/* Etiquetas Temáticas */}
      <div className="bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] rounded-2xl p-4 mb-4 shadow-md border border-[#282a30]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] uppercase tracking-wider text-[#9ea2ae] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#fcb887]">label</span>
            Etiquetas Temáticas
          </span>
          <span className="text-[10px] text-[#9ea2ae]">{tags.length} activas</span>
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#282a30] text-[#ffb598] text-xs font-medium"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(idx)}
                className="hover:text-red-400 flex items-center ml-0.5"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setShowTagPrompt(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14161d] hover:bg-[#282a30] text-[#9ea2ae] hover:text-[#ffb598] text-xs transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Añadir</span>
          </button>
        </div>

        {/* Tag Prompt Input */}
        {showTagPrompt && (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="Nueva etiqueta (ej: Papiro)"
              className="flex-1 bg-[#0c0e14] border border-[#282a30] rounded-lg px-2.5 py-1.5 text-xs text-[#f0ece2] outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-1.5 bg-[#e07a4f] text-[#1a0800] text-xs font-bold rounded-lg"
            >
              Añadir
            </button>
            <button
              onClick={() => setShowTagPrompt(false)}
              className="px-2 py-1.5 text-xs text-[#9ea2ae]"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Compartir en Atenea */}
      <div className="bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] rounded-2xl p-4 mb-6 shadow-md border border-[#282a30]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="font-serif text-base font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#ffb598]">groups</span>
              Compartir en Atenea
            </span>
            <span className="text-[11px] text-[#9ea2ae]">Visibilidad comunitaria para lectores afines</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shareCommunity}
              onChange={(e) => setShareCommunity(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#282a30] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-[#e07a4f] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>

        {shareCommunity && (
          <div className="mt-3 pt-2 border-t border-[#282a30]/60 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#9ea2ae] block font-semibold">
              Audiencia Destino
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#0c0e14]">
              <button
                type="button"
                onClick={() => setAudience('club')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                  audience === 'club'
                    ? 'bg-[#282a30] text-[#ffb598] shadow-sm'
                    : 'text-[#9ea2ae] hover:text-[#f0ece2]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                <span>Club Clásicos</span>
              </button>

              <button
                type="button"
                onClick={() => setAudience('public')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                  audience === 'public'
                    ? 'bg-[#282a30] text-[#ffb598] shadow-sm'
                    : 'text-[#9ea2ae] hover:text-[#f0ece2]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">public</span>
                <span>Público</span>
              </button>

              <button
                type="button"
                onClick={() => setAudience('private')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                  audience === 'private'
                    ? 'bg-[#282a30] text-[#ffb598] shadow-sm'
                    : 'text-[#9ea2ae] hover:text-[#f0ece2]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Privado</span>
              </button>
            </div>

            <p className="text-[11px] text-[#9ea2ae] italic pt-1 leading-relaxed">
              Los miembros del "Club de Clásicos" podrán debatir sobre tu nota al llegar a esta página.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDelete}
          className="w-1/3 py-3 px-3 rounded-xl bg-[#282a30] hover:bg-[#33353b] text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
          <span>Eliminar</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="w-2/3 py-3 px-4 rounded-xl bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#e07a4f]/25 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isSaving ? 'progress_activity' : 'bookmark'}
          </span>
          <span>{isSaving ? 'Anotando en pergamino...' : 'Guardar Anotación'}</span>
        </button>
      </div>
    </div>
  );
};
