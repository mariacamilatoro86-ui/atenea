import React, { useState, useMemo } from 'react';
import { Highlight, Book, ScreenType } from '../types';
import { initialHighlights, mockBooks } from '../data/mockData';

interface HighlightsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectBook: (book: Book) => void;
  onSelectHighlight: (highlight: Highlight) => void;
  onOpenPostal: (highlight: Highlight) => void;
  onShowToast: (msg: string) => void;
  highlights?: Highlight[];
}

export const HighlightsScreen: React.FC<HighlightsScreenProps> = ({
  onNavigate,
  onSelectBook,
  onSelectHighlight,
  onOpenPostal,
  onShowToast,
  highlights: customHighlights,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('all');
  const [selectedToneFilter, setSelectedToneFilter] = useState<string>('all');
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);

  const highlights = customHighlights || initialHighlights;

  // Filter highlights
  const filteredHighlights = useMemo(() => {
    return highlights.filter(hl => {
      // Book filter
      if (selectedBookFilter !== 'all') {
        if (selectedBookFilter === 'infinito' && !hl.bookTitle.includes('infinito')) return false;
        if (selectedBookFilter === 'sombra' && !hl.bookTitle.includes('sombra')) return false;
        if (selectedBookFilter === 'paramo' && !hl.bookTitle.includes('Páramo')) return false;
      }

      // Tone filter
      if (selectedToneFilter === 'citas' && hl.noteType === 'hipotesis') return false;
      if (selectedToneFilter === 'ideas' && hl.noteType !== 'hipotesis') return false;
      if (selectedToneFilter === 'referencias' && hl.noteType !== 'referencia') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuote = hl.quote.toLowerCase().includes(q);
        const matchesBook = hl.bookTitle.toLowerCase().includes(q);
        const matchesNote = hl.note?.toLowerCase().includes(q);
        const matchesTags = hl.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesQuote && !matchesBook && !matchesNote && !matchesTags) return false;
      }

      return true;
    });
  }, [highlights, selectedBookFilter, selectedToneFilter, searchQuery]);

  const handleExportMarkdown = () => {
    const markdownContent = `# Atenea Biblioteca - Archivo Marginal de Lectura
**Titular**: Elena Morales Ruiz
**Exportado**: ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}

---

${filteredHighlights.map(hl => `
### ${hl.bookTitle} (Cap. ${hl.chapter}, pág. ${hl.page})
> "${hl.quote}"

${hl.note ? `**Nota marginal (${hl.noteTitle || 'Reflexión'})**: ${hl.note}` : ''}
${hl.tags.length ? `*Etiquetas*: ${hl.tags.map(t => `#${t}`).join(' ')}` : ''}
*Fecha*: ${hl.date} | *Tono*: ${hl.colorLabel}

---
`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Atenea_Subrayados_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Archivo .md generado y descargado con éxito');
  };

  const handleOpenBookReader = (hl: Highlight) => {
    const book = mockBooks.find(b => b.id === hl.bookId) || mockBooks[0];
    onSelectBook(book);
    onSelectHighlight(hl);
    onNavigate('lector');
  };

  const handleEditNote = (hl: Highlight) => {
    onSelectHighlight(hl);
    onNavigate('editor-anotacion');
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4">
      {/* Search Bar with Literary Feel */}
      <div className="w-full relative">
        <div className="bg-[#191b21] dark:bg-[#191b21] bg-white border border-[#282a30]/60 dark:border-[#282a30]/60 rounded-xl p-2 flex items-center shadow-md">
          <span className="material-symbols-outlined text-primary text-[20px] ml-1 mr-2 select-none">
            search
          </span>
          <input
            className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
            id="search-input"
            placeholder="Buscar en tus subrayados, ideas o etiquetas..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary mr-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            title="Filtros avanzados"
            onClick={() => onShowToast('Filtro semántico activo')}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Metric Overview Banner */}
      <div className="bg-[#1d1f26] dark:bg-[#1d1f26] bg-[#fbf8f4] border border-[#282a30]/40 rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between text-on-surface">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
              Tu Archivo Marginal
            </span>
            <div className="flex items-center gap-2 mt-1 font-title-md text-title-md">
              <span className="text-on-surface font-semibold">42</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">pasajes</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface font-semibold">14</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">notas</span>
              <span className="text-outline-variant">•</span>
              <span className="text-on-surface font-semibold">6</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">en clubes</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#282a30] dark:bg-[#282a30] bg-[#ede8e1] flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-[20px]">history_edu</span>
          </div>
        </div>
      </div>

      {/* Horizontal Filter: Books */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Libros
          </span>
          <button
            onClick={() => onNavigate('catalogo')}
            className="font-label-sm text-label-sm text-primary hover:underline"
          >
            Ver catálogo
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar" id="book-filters">
          <button
            onClick={() => setSelectedBookFilter('all')}
            className={`whitespace-nowrap font-label-md text-label-md px-3 py-1.5 rounded-full shadow-sm transition-all ${
              selectedBookFilter === 'all'
                ? 'bg-primary-container text-white'
                : 'bg-[#282a30] text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Todos (42)
          </button>
          <button
            onClick={() => setSelectedBookFilter('infinito')}
            className={`whitespace-nowrap font-label-md text-label-md px-3 py-1.5 rounded-full transition-all ${
              selectedBookFilter === 'infinito'
                ? 'bg-primary-container text-white'
                : 'bg-[#282a30] text-on-surface-variant hover:text-on-surface'
            }`}
          >
            El infinito en un junco (18)
          </button>
          <button
            onClick={() => setSelectedBookFilter('sombra')}
            className={`whitespace-nowrap font-label-md text-label-md px-3 py-1.5 rounded-full transition-all ${
              selectedBookFilter === 'sombra'
                ? 'bg-primary-container text-white'
                : 'bg-[#282a30] text-on-surface-variant hover:text-on-surface'
            }`}
          >
            La sombra del viento (15)
          </button>
          <button
            onClick={() => setSelectedBookFilter('paramo')}
            className={`whitespace-nowrap font-label-md text-label-md px-3 py-1.5 rounded-full transition-all ${
              selectedBookFilter === 'paramo'
                ? 'bg-primary-container text-white'
                : 'bg-[#282a30] text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Pedro Páramo (9)
          </button>
        </div>
      </div>

      {/* Filter: Highlight Palette & Meaning */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        <button
          onClick={() => setSelectedToneFilter(selectedToneFilter === 'citas' ? 'all' : 'citas')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors shadow-sm ${
            selectedToneFilter === 'citas'
              ? 'bg-[#282a30] ring-1 ring-secondary text-on-surface'
              : 'bg-[#191b21] dark:bg-[#191b21] bg-white border border-[#282a30]/40 text-on-surface'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm">Citas clave (24)</span>
        </button>
        <button
          onClick={() => setSelectedToneFilter(selectedToneFilter === 'ideas' ? 'all' : 'ideas')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors shadow-sm ${
            selectedToneFilter === 'ideas'
              ? 'bg-[#282a30] ring-1 ring-primary text-on-surface'
              : 'bg-[#191b21] dark:bg-[#191b21] bg-white border border-[#282a30]/40 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
          <span className="font-label-sm text-label-sm">Preguntas e Ideas (11)</span>
        </button>
        <button
          onClick={() => setSelectedToneFilter(selectedToneFilter === 'referencias' ? 'all' : 'referencias')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors shadow-sm ${
            selectedToneFilter === 'referencias'
              ? 'bg-[#282a30] ring-1 ring-tertiary text-on-surface'
              : 'bg-[#191b21] dark:bg-[#191b21] bg-white border border-[#282a30]/40 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
          <span className="font-label-sm text-label-sm">Referencias (7)</span>
        </button>
      </div>

      {/* Highlights List */}
      <div className="flex flex-col space-y-4 mt-1" id="cards-container">
        {filteredHighlights.length === 0 ? (
          <div className="p-8 text-center bg-[#1d1f26] rounded-xl border border-white/5">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">menu_book</span>
            <p className="font-headline-sm text-on-surface">No se encontraron pasajes</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Prueba cambiando los filtros o el texto de búsqueda.
            </p>
          </div>
        ) : (
          filteredHighlights.map((hl) => {
            const isInfinito = hl.bookTitle.includes('infinito');
            const isSombra = hl.bookTitle.includes('sombra');
            const isParamo = hl.bookTitle.includes('Páramo');

            const borderColor = hl.color === 'terracotta'
              ? 'bg-secondary'
              : hl.color === 'parchment'
              ? 'bg-primary-container'
              : hl.color === 'sage'
              ? 'bg-emerald-500'
              : 'bg-sky-500';

            const dotColor = hl.color === 'terracotta'
              ? 'bg-secondary'
              : hl.color === 'parchment'
              ? 'bg-primary-container'
              : hl.color === 'sage'
              ? 'bg-emerald-400'
              : 'bg-sky-400';

            return (
              <article
                key={hl.id}
                className="bg-[#1d1f26] dark:bg-[#1d1f26] bg-[#fdfbf7] border border-[#282a30]/60 rounded-xl p-4 shadow-md flex flex-col space-y-3 relative group transition-all"
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`w-2 h-2 rounded-full ${dotColor} inline-block`}></span>
                    <span className="font-title-lg text-body-sm text-secondary font-medium">
                      {hl.bookTitle}
                    </span>
                    <span className="text-outline-variant font-body-sm text-body-sm">•</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {hl.chapter ? `Cap. ${hl.chapter}, ` : ''}pág. {hl.page}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 relative">
                    {hl.isPrivate ? (
                      <span className="bg-[#282a30] text-on-surface-variant text-[10px] font-label-sm uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span className="material-symbols-outlined text-[11px]">lock</span>
                        Privada
                      </span>
                    ) : (
                      <span className="font-label-sm text-label-sm text-outline">{hl.date}</span>
                    )}
                    <button
                      onClick={() => setShowOptionsId(showOptionsId === hl.id ? null : hl.id)}
                      className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                      title="Más opciones"
                    >
                      <span className="material-symbols-outlined text-[16px]">more_vert</span>
                    </button>

                    {showOptionsId === hl.id && (
                      <div className="absolute right-0 top-8 z-20 bg-[#161820] border border-[#282a30] rounded-xl p-1 shadow-xl min-w-[160px]">
                        <button
                          onClick={() => {
                            onOpenPostal(hl);
                            setShowOptionsId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-[#282a30] rounded-lg flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[14px] text-primary">photo_camera</span>
                          Crear postal (9:16)
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(`«${hl.quote}» — ${hl.bookTitle}`);
                            onShowToast('Cita copiada al portapapeles');
                            setShowOptionsId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-[#282a30] rounded-lg flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                          Copiar cita
                        </button>
                        <button
                          onClick={() => {
                            onSelectHighlight(hl);
                            onNavigate('detalle-cita');
                            setShowOptionsId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-on-surface hover:bg-[#282a30] rounded-lg flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[14px]">forum</span>
                          Ver debate en comunidad
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Literary Quote */}
                <blockquote
                  onClick={() => {
                    onSelectHighlight(hl);
                    onNavigate('detalle-cita');
                  }}
                  className="bg-[#0c0e14]/60 dark:bg-[#0c0e14]/60 bg-[#f4eee6] rounded-lg p-3 relative cursor-pointer hover:bg-[#0c0e14]/80 transition-colors"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${borderColor} rounded-l-lg`}></div>
                  <p className="font-body-lg text-body-lg text-on-surface pl-2 italic font-headline-md leading-relaxed">
                    «{hl.quote}»
                  </p>
                </blockquote>

                {/* Connected Marginal Note */}
                {hl.note ? (
                  <div className="bg-[#282a30]/90 dark:bg-[#282a30]/90 bg-[#eee8df] rounded-lg p-2.5 flex items-start gap-2 shadow-inner">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 select-none">
                      {hl.noteType === 'hipotesis' ? 'lightbulb' : 'edit_note'}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-label-sm text-label-sm text-primary font-semibold">
                        {hl.noteTitle || 'Nota Marginal'}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                        {hl.note}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Social / Club Badge */}
                {hl.clubName ? (
                  <div className="bg-secondary-container/40 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">diversity_3</span>
                      <span className="font-label-sm text-label-sm text-on-secondary-container font-medium">
                        {hl.clubName}
                      </span>
                    </div>
                    {hl.clubMatches ? (
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">
                        {hl.clubMatches} coincidencias
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {/* Quick Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditNote(hl)}
                      className="bg-[#282a30] hover:bg-[#373940] text-on-surface font-label-md text-label-md px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {hl.note ? 'edit' : 'add_comment'}
                      </span>
                      <span>{hl.note ? 'Editar nota' : 'Añadir nota'}</span>
                    </button>
                    <button
                      onClick={() => onOpenPostal(hl)}
                      className="bg-[#282a30] hover:bg-[#373940] text-on-surface font-label-md text-label-md px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      title="Compartir o exportar fragmento"
                    >
                      <span className="material-symbols-outlined text-[14px]">ios_share</span>
                      <span>Compartir</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleOpenBookReader(hl)}
                    className="text-primary hover:text-secondary-fixed-dim font-label-md text-label-md flex items-center gap-1 transition-colors"
                  >
                    <span>Ver en libro</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Bottom Action Bar / Quick Archival Access */}
      <div className="pt-2 flex items-center gap-3">
        {/* Export Button */}
        <button
          onClick={handleExportMarkdown}
          className="flex-1 bg-[#282a30] hover:bg-[#373940] text-on-surface font-title-md text-body-sm py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-white/5"
        >
          <span className="material-symbols-outlined text-primary text-[18px]">download_for_offline</span>
          <span>Exportar a Markdown / PDF</span>
        </button>
        {/* New Marginal Note Floating-Style Trigger */}
        <button
          onClick={() => {
            onSelectHighlight(highlights[0]);
            onNavigate('editor-anotacion');
          }}
          className="bg-primary hover:bg-primary-container text-on-primary font-title-md text-body-sm py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">ink_pen</span>
          <span className="font-semibold">Nueva Nota</span>
        </button>
      </div>
    </div>
  );
};
