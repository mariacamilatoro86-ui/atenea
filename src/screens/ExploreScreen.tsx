import React, { useState } from 'react';
import { Book, ScreenType } from '../types';
import { BOOKS_DATA, ACTIVE_LOANS } from '../data/mockData';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectBook: (book: Book) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onSelectBook,
  onToast
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLoans, setActiveLoans] = useState(ACTIVE_LOANS);
  const [savedBooks, setSavedBooks] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fiction', label: 'Ficción' },
    { id: 'history', label: 'Historia & Ensayo' },
    { id: 'science', label: 'Ciencia' },
    { id: 'audio', label: 'Audiolibros' },
    { id: 'new', label: 'Novedades' }
  ];

  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeCategory === 'fiction') return b.category.includes('Ficción');
    if (activeCategory === 'history') return b.category.includes('Historia');
    if (activeCategory === 'audio') return b.formats.audio.available;
    return true;
  });

  const handleRenewLoan = (id: string) => {
    setActiveLoans((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, daysRemaining: l.daysRemaining + 15, dueDate: '30 de Octubre (+15d)', renewedCount: l.renewedCount + 1 }
          : l
      )
    );
    onToast('¡Préstamo renovado con éxito! +15 días añadidos', 'auto_stories');
  };

  const handleToggleBookmark = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = savedBooks[book.id];
    setSavedBooks((prev) => ({ ...prev, [book.id]: !current }));
    onToast(
      !current ? `«${book.title}» añadido a tu lista de lectura` : `Eliminado de tu lista`,
      !current ? 'bookmark_added' : 'bookmark_remove'
    );
  };

  return (
    <div className="flex flex-col w-full pb-24 pt-16">
      {/* Greeting & Hall Status */}
      <section className="px-4 sm:px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] tracking-tight">
              Buenos días, Elena 👋
            </h1>
            <p className="text-sm text-[#9ea2ae] dark:text-[#9ea2ae] light:text-[#54433c] mt-0.5">
              ¿Qué historia te acompañará hoy?
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#ebe8e0] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] rounded-full shadow-sm">
            <span className="material-symbols-outlined text-[17px] text-[#78c991]" style={{ fontVariationSettings: "'FILL' 1" }}>
              eco
            </span>
            <span className="text-[11px] font-semibold text-[#78c991] uppercase tracking-wider">
              Sala Abierta
            </span>
          </div>
        </div>
      </section>

      {/* Integrated Search Bar */}
      <section className="px-4 sm:px-6 pt-3 pb-1">
        <div className="relative flex items-center w-full bg-[#191b21] dark:bg-[#191b21] light:bg-white border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all focus-within:border-[#e07a4f]/70 focus-within:shadow-[0_0_15px_rgba(224,122,79,0.2)]">
          <span className="material-symbols-outlined text-[#9ea2ae] ml-4 mr-2 text-[22px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, autor, ISBN o temática..."
            className="w-full py-3 pr-2 text-sm text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] placeholder:text-[#6f7380] bg-transparent outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 mr-2 text-[#9ea2ae] hover:text-[#f0ece2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('catalogo')}
            aria-label="Filtros avanzados"
            className="p-2 mr-2 text-[#9ea2ae] hover:text-[#ffb598] rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </section>

      {/* Active Loan Widget */}
      {activeLoans.length > 0 && (
        <section className="px-4 sm:px-6 pt-4">
          <div className="bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f6f3eb] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] p-4 rounded-xl shadow-md flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#e07a4f]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#2a2220] border border-[#4e2d1f] flex items-center justify-center text-[#ffb598] flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_stories
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] uppercase tracking-wider">
                      Préstamo Activo
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e07a4f]" />
                    <span className="text-[11px] text-[#9ea2ae]">
                      Vence en {activeLoans[0].daysRemaining} días
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] leading-tight mt-0.5 truncate">
                    {activeLoans[0].title}
                  </h4>
                  <p className="text-xs text-[#9ea2ae] truncate">
                    {activeLoans[0].author} • {activeLoans[0].location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRenewLoan(activeLoans[0].id)}
                className="px-3.5 py-1.5 bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] text-xs font-semibold rounded-lg shadow-sm active:scale-95 transition-all flex-shrink-0"
              >
                {activeLoans[0].renewedCount > 0 ? '¡Renovado!' : 'Renovar'}
              </button>
            </div>

            {/* Time progress bar */}
            <div className="relative z-10 pt-1">
              <div className="flex justify-between items-center mb-1 text-[11px] text-[#9ea2ae]">
                <span>Período de lectura (18 de 21 días)</span>
                <span className="font-bold text-[#ffb598] dark:text-[#ffb598] light:text-[#914722]">85%</span>
              </div>
              <div className="w-full h-1.5 bg-[#14161d] dark:bg-[#14161d] light:bg-[#e5e2da] rounded-full overflow-hidden border border-[#2d303d]/40">
                <div
                  className="h-full bg-gradient-to-r from-[#e07a4f] to-[#f39566] rounded-full transition-all duration-500"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Curatorial Banner */}
      <section className="px-4 sm:px-6 pt-5">
        <div className="relative rounded-2xl overflow-hidden bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f1eee6] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] shadow-lg">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 sm:h-auto sm:w-2/5 flex-shrink-0 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGYzl_o5vBzrEi3JXO1TRK0ScGXn6UMZJQ6ksFWd-XYdqnz10vCcMwO7-IubuFXpr9QT_-Ios2x_zJVq9xoe5YNN0fs076gVkUAZ6mTi_aD-MapGXBP6YdHsVwGaov1f6qqfKcHq475Ts4TjJfW3WcHRwPGgUq7XZKENCLM2y4RIi2UNPYIjsL_FWyAHn2aCgqmS6xOKGAtj427jlaPgXWlvBhAhNTjlYtGFWDTjG0DuxXHpf69UX-4w"
                alt="Clásicos Latinoamericanos Reeditados"
                className="w-full h-full object-cover opacity-90 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2029] via-[#1e2029]/40 to-transparent sm:hidden" />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#331c13] border border-[#5a2c17] text-[#fcb887] text-[11px] font-semibold mb-2.5">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  <span>Selección Curatorial</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] leading-snug font-semibold">
                  Clásicos Latinoamericanos Reeditados
                </h2>
                <p className="text-xs text-[#dcdad2]/80 mt-2 italic font-serif leading-relaxed">
                  «El mundo era tan reciente, que muchas cosas carecían de nombre...»
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveCategory('fiction');
                    onToast('Colección de clásicos latinoamericanos activada', 'auto_stories');
                  }}
                  className="px-4 py-2 bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] font-semibold text-xs rounded-lg shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Explorar colección</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <span className="text-xs text-[#9ea2ae]">12 Volúmenes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="pt-5">
        <div className="flex items-center gap-2 overflow-x-auto px-4 sm:px-6 no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#e07a4f] text-[#1a0800] border-[#e07a4f] shadow-md shadow-[#e07a4f]/20 scale-105'
                    : 'bg-[#1e2029] dark:bg-[#1e2029] light:bg-white text-[#9ea2ae] dark:text-[#9ea2ae] light:text-[#54433c] border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] hover:text-[#f0ece2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Lecturas de la semana (Carousel) */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4 sm:px-6 mb-3">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
              Lecturas de la semana
            </h3>
            <p className="text-xs text-[#9ea2ae]">Títulos más solicitados y comentados</p>
          </div>
          <button
            onClick={() => onNavigate('catalogo')}
            className="text-xs text-[#ffb598] hover:underline flex items-center gap-0.5 font-medium"
          >
            Ver catálogo
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-2 pt-1 no-scrollbar">
          {filteredBooks.slice(0, 5).map((book) => {
            const isSaved = !!savedBooks[book.id];
            return (
              <article
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onNavigate('detalle-libro');
                }}
                className="flex-shrink-0 w-44 bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f1eee6] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] rounded-2xl p-3 shadow-md flex flex-col justify-between hover:border-[#ffb598]/60 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div>
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#14161d] shadow-inner mb-3 border border-white/5">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#111319]/80 backdrop-blur-md rounded border border-white/10 text-[11px] font-semibold text-white flex items-center gap-0.5 shadow-sm">
                      <span className="material-symbols-outlined text-[12px] text-[#ffb598]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{book.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#78c991]" />
                    <span className="text-[11px] font-semibold text-[#78c991] truncate">
                      {book.formats.ebook.available ? 'eBook Inmediato' : 'Sede Central'}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] line-clamp-1 leading-tight">
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#9ea2ae] truncate mt-0.5">{book.author}</p>
                </div>

                <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-[#2d303d]/40">
                  <span className="px-2 py-0.5 bg-[#14161d] dark:bg-[#14161d] light:bg-[#e5e2da] text-[#9ea2ae] text-[10px] uppercase font-semibold rounded border border-[#2d303d]/40">
                    {book.formats.ebook.available ? 'Digital' : 'Físico'}
                  </span>
                  <button
                    onClick={(e) => handleToggleBookmark(book, e)}
                    aria-label="Guardar libro"
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                      isSaved
                        ? 'bg-[#e07a4f] text-[#1a0800] border-[#e07a4f]'
                        : 'bg-[#2a2220] border-[#5a2c17] text-[#ffb598] hover:bg-[#e07a4f] hover:text-[#1a0800]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[17px]"
                      style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_add'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Inspirational Quote Box */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f6f3eb] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#2a2220] border border-[#4e2d1f] flex items-center justify-center text-[#ffb598] flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">format_quote</span>
          </div>
          <div>
            <p className="font-serif text-sm text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] italic leading-relaxed">
              «Para viajar lejos no hay mejor nave que un libro.»
            </p>
            <span className="text-[11px] text-[#9ea2ae] uppercase tracking-wider font-semibold">
              — Emily Dickinson
            </span>
          </div>
        </div>
      </section>

      {/* Recomendados para ti */}
      <section className="px-4 sm:px-6 pt-7">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
              Recomendados para ti
            </h3>
            <p className="text-xs text-[#9ea2ae]">
              Porque leíste <span className="font-semibold text-[#ffb598]">La sombra del viento</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {BOOKS_DATA.slice(7, 10).map((book) => (
            <article
              key={book.id}
              onClick={() => {
                onSelectBook(book);
                onNavigate('detalle-libro');
              }}
              className="p-3.5 bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f6f3eb] border border-[#2d303d] dark:border-[#2d303d] light:border-[#dac1b8] rounded-xl shadow-sm flex items-center justify-between gap-3 hover:border-[#ffb598]/50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#14161d] border border-white/5 shadow-sm">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 bg-[#14161d] border border-[#2d303d] text-[10px] text-[#9ea2ae] font-semibold rounded">
                      {book.category}
                    </span>
                    <span className="text-[10px] text-[#78c991] flex items-center gap-0.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#78c991]" /> Disponible
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] truncate">
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#9ea2ae] truncate">{book.author}</p>
                  <p className="text-[11px] text-[#828695] mt-0.5 truncate">
                    {book.formats.physical.shelf || 'Acceso inmediato en EPUB y Kindle'}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToast(`Reserva iniciada para «${book.title}»`, 'book_online');
                }}
                className="w-9 h-9 rounded-full bg-[#14161d] border border-[#2d303d] flex items-center justify-center text-[#9ea2ae] hover:text-[#ffb598] hover:border-[#ffb598] transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[19px]">add</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Room Footer Note */}
      <div className="px-4 sm:px-6 mt-8 pt-4 pb-2 text-center">
        <div className="inline-flex items-center gap-2 text-[#9ea2ae] mb-1">
          <span className="w-8 h-px bg-[#2d303d]" />
          <span className="material-symbols-outlined text-[16px] text-[#ffb598]">local_library</span>
          <span className="w-8 h-px bg-[#2d303d]" />
        </div>
        <p className="text-xs text-[#9ea2ae] max-w-xs mx-auto leading-relaxed">
          Los fondos bibliográficos de Atenea se actualizan quincenalmente con adquisiciones curadas por la comunidad.
        </p>
      </div>
    </div>
  );
};
