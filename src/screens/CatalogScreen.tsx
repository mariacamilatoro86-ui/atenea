import React, { useState } from 'react';
import { Book, ScreenType } from '../types';
import { BOOKS_DATA } from '../data/mockData';

interface CatalogScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectBook: (book: Book) => void;
  onToast: (msg: string, icon?: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  onNavigate,
  onSelectBook,
  onToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'physical' | 'ebook' | 'audio'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory !== 'all' && !b.category.includes(selectedCategory)) return false;

    if (selectedFormat === 'physical' && !b.formats.physical.available) return false;
    if (selectedFormat === 'ebook' && !b.formats.ebook.available) return false;
    if (selectedFormat === 'audio' && !b.formats.audio.available) return false;

    if (onlyAvailable && !b.formats.physical.available && !b.formats.ebook.available) return false;

    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 pt-16 px-4 sm:px-6">
      {/* Title & Stats */}
      <div className="pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] uppercase tracking-wider">
            Fondos Bibliográficos
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
            Catálogo Atenea
          </h2>
        </div>
        <span className="text-xs text-[#9ea2ae] bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#e5e2da] px-2.5 py-1 rounded-full border border-[#282a30]">
          {filteredBooks.length} volúmenes
        </span>
      </div>

      {/* Search Input */}
      <div className="my-3 relative flex items-center bg-[#191b21] dark:bg-[#191b21] light:bg-white border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] rounded-xl shadow-md">
        <span className="material-symbols-outlined text-[#9ea2ae] ml-3 mr-2 text-[20px]">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por obra, autor, tema o signatura..."
          className="w-full py-2.5 text-xs text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] placeholder:text-[#6f7380] bg-transparent outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 mr-2 text-[#9ea2ae] hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Format Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        <button
          onClick={() => setSelectedFormat('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            selectedFormat === 'all'
              ? 'bg-[#e07a4f] text-[#1a0800] font-bold'
              : 'bg-[#1e2029] text-[#9ea2ae] hover:text-[#f0ece2]'
          }`}
        >
          Todos los formatos
        </button>
        <button
          onClick={() => setSelectedFormat('physical')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
            selectedFormat === 'physical'
              ? 'bg-[#e07a4f] text-[#1a0800] font-bold'
              : 'bg-[#1e2029] text-[#9ea2ae] hover:text-[#f0ece2]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">menu_book</span>
          Físico en sala
        </button>
        <button
          onClick={() => setSelectedFormat('ebook')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
            selectedFormat === 'ebook'
              ? 'bg-[#e07a4f] text-[#1a0800] font-bold'
              : 'bg-[#1e2029] text-[#9ea2ae] hover:text-[#f0ece2]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">tablet_mac</span>
          eBook
        </button>
        <button
          onClick={() => setSelectedFormat('audio')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
            selectedFormat === 'audio'
              ? 'bg-[#e07a4f] text-[#1a0800] font-bold'
              : 'bg-[#1e2029] text-[#9ea2ae] hover:text-[#f0ece2]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">headphones</span>
          Audiolibro
        </button>
      </div>

      {/* Category Pills & Availability Toggle */}
      <div className="flex items-center justify-between py-2 border-b border-[#282a30] text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['all', 'Ficción', 'Historia'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-[11px] uppercase font-semibold ${
                selectedCategory === cat ? 'bg-[#ffb598] text-[#370e00]' : 'text-[#9ea2ae] hover:text-[#f0ece2]'
              }`}
            >
              {cat === 'all' ? 'Toda Materia' : cat}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1.5 cursor-pointer text-[#9ea2ae] text-[11px] whitespace-nowrap pl-2">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="rounded border-[#282a30] text-[#e07a4f] focus:ring-0"
          />
          <span>Solo disponibles</span>
        </label>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {filteredBooks.map((book) => (
          <article
            key={book.id}
            onClick={() => {
              onSelectBook(book);
              onNavigate('detalle-libro');
            }}
            className="group bg-[#1e2029] dark:bg-[#1e2029] light:bg-[#f6f3eb] border border-[#282a30] dark:border-[#282a30] light:border-[#dac1b8] rounded-2xl p-3 shadow-md flex flex-col justify-between hover:border-[#ffb598]/60 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div>
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#14161d] shadow-inner mb-2.5">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#111319]/85 backdrop-blur-md rounded text-[10px] text-white flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[11px] text-[#ffb598]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{book.rating}</span>
                </div>
              </div>

              <span className="text-[10px] text-[#ffb598] uppercase font-bold tracking-wider block truncate">
                {book.category}
              </span>
              <h4 className="font-serif text-base font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] leading-snug line-clamp-1 mt-0.5">
                {book.title}
              </h4>
              <p className="text-xs text-[#9ea2ae] truncate">{book.author}</p>
            </div>

            <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#282a30]/50 text-[11px]">
              <span className="text-[#78c991] font-medium flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78c991]" />
                {book.formats.physical.available ? 'En sala' : 'Digital'}
              </span>
              <span className="material-symbols-outlined text-sm text-[#9ea2ae] group-hover:text-[#ffb598] transition-colors">
                arrow_forward
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="py-16 text-center text-[#9ea2ae]">
          <span className="material-symbols-outlined text-4xl mb-2 text-[#282a30]">search_off</span>
          <p className="text-sm">No se encontraron libros con los filtros seleccionados.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFormat('all');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="mt-3 px-3 py-1.5 rounded-lg bg-[#282a30] text-xs text-[#ffb598] hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
