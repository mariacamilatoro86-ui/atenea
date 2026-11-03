import React, { useState } from 'react';
import { Book, ScreenType } from '../types';

interface BookDetailScreenProps {
  book: Book;
  onNavigate: (screen: ScreenType) => void;
  onOpenReader: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({
  book,
  onNavigate,
  onOpenReader,
  onToast
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'fisico' | 'ebook' | 'audio'>('fisico');
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [userReviews, setUserReviews] = useState(book.reviews);

  const formatDetails = {
    fisico: {
      title: 'Ejemplar en Sede Central',
      sub: book.formats.physical.shelf + ' • Signatura: ' + book.formats.physical.signatura,
      badge: 'Listo para retiro',
      icon: 'shelves',
      cta: 'Tomar en préstamo'
    },
    ebook: {
      title: 'Edición Digital Atenea Reader',
      sub: `${book.formats.ebook.format} • ${book.formats.ebook.size}`,
      badge: 'Disponible en app',
      icon: 'tablet_mac',
      cta: 'Abrir en Atenea Reader'
    },
    audio: {
      title: 'Audiolibro Oficial Narrado',
      sub: `Narración: ${book.formats.audio.narrator || 'Voz del autor'} • Duración ${book.formats.audio.duration} • Audio HD`,
      badge: 'Reproducción inmediata',
      icon: 'headphones',
      cta: 'Comenzar audiolibro'
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onToast(
      !isWishlisted ? 'Añadido a tu lista de deseos de lectura' : 'Eliminado de tu lista de deseos',
      !isWishlisted ? 'bookmark_added' : 'bookmark_remove'
    );
  };

  const handlePrimaryAction = () => {
    if (selectedFormat === 'ebook') {
      onOpenReader();
    } else if (selectedFormat === 'audio') {
      onToast(`Iniciando reproducción de audio: «${book.title}»`, 'headphones');
    } else {
      onToast('¡Reserva física confirmada! Recibirás los datos en tu carnet digital.', 'local_library');
    }
  };

  const handleAddReview = () => {
    if (!newReviewText.trim()) return;
    const newRev = {
      id: 'rev-' + Date.now(),
      userName: 'Elena Morales Ruiz',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRlFJo1wOfwHm6Ob6RmV5YgQ5n6TDJQs41nVm-I1uRy24HWPh5CkrdsGZ71dnRWV2yb3VxnCayM90IvfX97JsMpDKyynEb_qGLcfWQx90GCwmDqJ3odRKcQSvQfKkvyTrScOTJoft8vf-amtzS78G1O3IFrbrFVq293Df8_35gvmiUDfhSFRP6-6yVNKMcqGcQvQQgLPcRw8g0ky5Pzwtu0M8UqrC5W4BKKtPoMnh182gt_fsQ0pRWog',
      userTag: 'Socia Lectora',
      timeAgo: 'Justo ahora',
      rating: 5,
      text: newReviewText.trim()
    };
    setUserReviews([newRev, ...userReviews]);
    setNewReviewText('');
    setShowReviewInput(false);
    onToast('Tu reseña ha sido publicada en la ficha del libro', 'rate_review');
  };

  const currentInfo = formatDetails[selectedFormat];

  return (
    <div className="flex flex-col w-full pb-32 pt-16">
      {/* Hero / Cover Showcase Section */}
      <section className="w-full px-4 sm:px-6 pt-4 pb-6 flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-[#181a22] dark:from-[#181a22] light:from-[#f6f3eb] via-[#111319] dark:via-[#111319] light:via-[#fcf9f1] to-[#111319] dark:to-[#111319] light:to-[#fcf9f1]">
        {/* Ambient Backlight */}
        <div className="absolute -top-24 w-72 h-72 rounded-full bg-[#e07a4f]/20 blur-3xl pointer-events-none" />

        {/* 3D Book Cover Structure */}
        <div className="relative flex flex-col items-center my-3 group">
          <div className="absolute inset-x-4 bottom-1 h-36 bg-[#e07a4f]/20 blur-2xl rounded-full" />
          
          <div className="relative z-10 w-44 aspect-[2/3] rounded-lg overflow-hidden shadow-[0_20px_40px_-8px_rgba(0,0,0,0.85),0_6px_16px_rgba(224,122,79,0.22)] ring-1 ring-[#33353b] bg-[#1e212b] transition-transform duration-300 hover:scale-[1.02]">
            {/* Spine Highlight Overlay */}
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/50 via-white/10 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 left-3 w-[1px] bg-white/10 z-20 pointer-events-none" />
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 z-10">
            {book.badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#e5e2da] border border-[#33353b] text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] text-[11px] font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {i === 0 ? 'military_tech' : 'trending_up'}
                </span>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="text-center w-full max-w-md mt-2 flex flex-col items-center">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#ebe8e0] border border-[#282a30] text-[#d8d4c9] dark:text-[#d8d4c9] light:text-[#54433c] text-[11px] font-semibold mb-2 uppercase tracking-wider">
            {book.category}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17] leading-tight font-semibold px-2">
            {book.title}
          </h2>
          {book.subtitle && (
            <p className="font-serif text-base sm:text-lg text-[#d8d4c9] dark:text-[#d8d4c9] light:text-[#54433c] italic mt-0.5">
              {book.subtitle}
            </p>
          )}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-[#d8d4c9]/80 dark:text-[#d8d4c9]/80 light:text-[#54433c]">
            <span className="font-medium text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] text-sm">
              {book.author}
            </span>
            <span className="text-[#55433c]">•</span>
            <span>{book.publisher}, {book.year}</span>
          </div>
        </div>
      </section>

      {/* Metrics Bar (Bento Ribbon) */}
      <div className="px-4 sm:px-6 mb-6">
        <div className="w-full grid grid-cols-4 gap-2 p-3 bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#f1eee6] border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] rounded-2xl shadow-md">
          <div className="flex flex-col items-center text-center justify-center py-1">
            <div className="flex items-center gap-1 text-[#fcb887] dark:text-[#fcb887] light:text-[#914722]">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-sm font-bold">{book.rating}</span>
            </div>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">{book.ratingCount} votos</span>
          </div>

          <div className="flex flex-col items-center text-center justify-center py-1 bg-[#151720] dark:bg-[#151720] light:bg-[#ebe8e0] border border-[#282a30]/60 rounded-xl">
            <span className="text-sm font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">{book.pages}</span>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">Páginas</span>
          </div>

          <div className="flex flex-col items-center text-center justify-center py-1">
            <span className="text-sm font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">{book.language}</span>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">Idioma</span>
          </div>

          <div className="flex flex-col items-center text-center justify-center py-1 bg-[#151720] dark:bg-[#151720] light:bg-[#ebe8e0] border border-[#282a30]/60 rounded-xl">
            <span className="text-sm font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">{book.readingTime}</span>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">Lectura</span>
          </div>
        </div>
      </div>

      {/* Format Switcher / Tabs */}
      <section className="px-4 sm:px-6 mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-serif text-lg font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">
            Formatos disponibles
          </h3>
          <span className="text-[11px] font-semibold text-[#78c991] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78c991] animate-pulse" />
            Préstamo activo
          </span>
        </div>

        {/* Segmented Buttons */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#171922] dark:bg-[#171922] light:bg-[#e5e2da] border border-[#282a30] rounded-xl">
          <button
            onClick={() => setSelectedFormat('fisico')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all ${
              selectedFormat === 'fisico'
                ? 'bg-[#242733] dark:bg-[#242733] light:bg-white border border-[#e07a4f]/50 text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] shadow-sm font-semibold'
                : 'text-[#9ea2ae] hover:text-[#f4efe4]'
            }`}
          >
            <span className="material-symbols-outlined text-xl mb-0.5">menu_book</span>
            <span className="text-xs">Físico</span>
            <span className="text-[10px] text-[#78c991] font-bold mt-0.5">{book.formats.physical.count} en sala</span>
          </button>

          <button
            onClick={() => setSelectedFormat('ebook')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all ${
              selectedFormat === 'ebook'
                ? 'bg-[#242733] dark:bg-[#242733] light:bg-white border border-[#e07a4f]/50 text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] shadow-sm font-semibold'
                : 'text-[#9ea2ae] hover:text-[#f4efe4]'
            }`}
          >
            <span className="material-symbols-outlined text-xl mb-0.5">tablet_mac</span>
            <span className="text-xs">eBook</span>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">Descarga app</span>
          </button>

          <button
            onClick={() => setSelectedFormat('audio')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all ${
              selectedFormat === 'audio'
                ? 'bg-[#242733] dark:bg-[#242733] light:bg-white border border-[#e07a4f]/50 text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] shadow-sm font-semibold'
                : 'text-[#9ea2ae] hover:text-[#f4efe4]'
            }`}
          >
            <span className="material-symbols-outlined text-xl mb-0.5">headphones</span>
            <span className="text-xs">Audiolibro</span>
            <span className="text-[10px] text-[#9ea2ae] mt-0.5">{book.formats.audio.duration || '14h 20m'}</span>
          </button>
        </div>

        {/* Active Format Detail Card */}
        <div className="mt-3 p-3.5 bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#f6f3eb] border border-[#282a30] rounded-xl flex items-start justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#e07a4f]/20 border border-[#e07a4f]/30 flex items-center justify-center text-[#fcb887] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-lg">{currentInfo.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17] truncate">
                {currentInfo.title}
              </p>
              <p className="text-[11px] text-[#d8d4c9]/80 dark:text-[#d8d4c9]/80 light:text-[#54433c] truncate">
                {currentInfo.sub}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#2a241b] border border-[#6c3d17] text-[#fcb887] text-[10px] font-bold shrink-0">
            {currentInfo.badge}
          </span>
        </div>
      </section>

      {/* Synopsis & Curated Quote */}
      <section className="px-4 sm:px-6 mb-6">
        <h3 className="font-serif text-lg font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17] mb-2.5">
          Sinopsis de la obra
        </h3>
        <div className="bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#f6f3eb] border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] p-4 rounded-xl shadow-md">
          <p
            className={`text-xs text-[#d8d4c9] dark:text-[#d8d4c9] light:text-[#1c1c17] leading-relaxed ${
              synopsisExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {book.synopsis}
          </p>
          <button
            onClick={() => setSynopsisExpanded(!synopsisExpanded)}
            className="mt-2 text-[#fcb887] text-xs font-medium flex items-center gap-1 hover:underline"
          >
            <span>{synopsisExpanded ? 'Mostrar menos' : 'Leer sinopsis completa'}</span>
            <span className="material-symbols-outlined text-sm">
              {synopsisExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Curated Quote Accent Box */}
          {book.curatedQuote && (
            <div className="mt-4 p-3.5 bg-[#151720] dark:bg-[#151720] light:bg-[#e5e2da] border-l-2 border-[#e07a4f] rounded-lg flex gap-3 items-start">
              <span
                className="material-symbols-outlined text-[#fcb887] text-xl shrink-0 opacity-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <blockquote className="font-serif italic text-xs sm:text-sm text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17] leading-snug">
                {book.curatedQuote}
              </blockquote>
            </div>
          )}
        </div>
      </section>

      {/* Branch Availability */}
      {book.branches && book.branches.length > 0 && (
        <section className="px-4 sm:px-6 mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-serif text-lg font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">
              Disponibilidad en sedes
            </h3>
            <span className="text-xs text-[#9ea2ae]">{book.branches.length} Sedes</span>
          </div>

          <div className="space-y-2">
            {book.branches.map((b, i) => (
              <div
                key={i}
                className="bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#f6f3eb] border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] p-3.5 rounded-xl flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#242733] border border-[#33353b] text-[#fcb887] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">domain</span>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17] truncate">
                      {b.name}
                    </p>
                    <p className="text-[11px] text-[#9ea2ae] truncate">{b.sub}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  {b.status === 'available' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b2620] border border-[#346645]/60 text-[#a3e2b2] text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4d7f5c]" />
                      {b.copies} {b.copies === 1 ? 'ejemplar' : 'ejemplares'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#252834] border border-[#384668] text-[#c5d4fd] text-[10px] font-bold">
                      <span className="material-symbols-outlined text-[11px]">event</span>
                      {b.availableDate || 'En préstamo'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reader Community Reviews */}
      <section className="px-4 sm:px-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">
              Comunidad lectora
            </h3>
            <p className="text-xs text-[#9ea2ae]">Reseñas destacadas de socios</p>
          </div>
          <button
            onClick={() => setShowReviewInput(!showReviewInput)}
            className="text-xs text-[#fcb887] hover:underline font-semibold flex items-center gap-0.5"
          >
            <span>Escribir reseña</span>
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>

        {/* Review input box */}
        {showReviewInput && (
          <div className="mb-3 p-3 bg-[#191b21] border border-[#e07a4f]/50 rounded-xl flex flex-col gap-2">
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Comparte tu opinión sobre este libro..."
              rows={2}
              className="w-full bg-transparent text-xs text-[#f0ece2] placeholder:text-[#9ea2ae] outline-none resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowReviewInput(false)}
                className="px-2.5 py-1 text-xs text-[#9ea2ae] hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddReview}
                className="px-3 py-1 bg-[#e07a4f] text-[#1a0800] text-xs font-bold rounded-lg shadow-sm"
              >
                Publicar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {userReviews.map((rev) => (
            <article
              key={rev.id}
              className="p-3.5 bg-[#1e212b] dark:bg-[#1e212b] light:bg-[#f6f3eb] border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#33353b]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#f4efe4] dark:text-[#f4efe4] light:text-[#1c1c17]">
                      {rev.userName}
                    </p>
                    <p className="text-[10px] text-[#9ea2ae]">{rev.userTag} • {rev.timeAgo}</p>
                  </div>
                </div>

                <div className="flex text-[#fcb887]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: idx < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#d8d4c9] dark:text-[#d8d4c9] light:text-[#1c1c17] leading-relaxed">
                {rev.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Fixed Sticky Bottom Action Shelf */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#111319]/95 dark:bg-[#111319]/95 light:bg-[#fcf9f1]/95 backdrop-blur-xl p-4 border-t border-[#282a30] shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Wishlist toggle */}
          <button
            onClick={handleToggleWishlist}
            aria-label="Añadir a mi lista de deseos"
            className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 active:scale-95 transition-all ${
              isWishlisted
                ? 'bg-[#1e212b] border-[#e07a4f] text-[#fcb887]'
                : 'bg-[#1e212b] border-[#282a30] text-[#9ea2ae] hover:text-[#fcb887]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {isWishlisted ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={handlePrimaryAction}
            className="flex-1 h-12 px-4 rounded-xl bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] hover:text-[#370e00] font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(224,122,79,0.35)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-xl">
              {selectedFormat === 'ebook' ? 'auto_stories' : selectedFormat === 'audio' ? 'play_arrow' : 'menu_book'}
            </span>
            <span>{currentInfo.cta}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
