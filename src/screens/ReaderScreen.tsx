import React, { useState } from 'react';
import { Book, ScreenType, ReaderSettings } from '../types';

interface ReaderScreenProps {
  book: Book;
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenPostalModal: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const ReaderScreen: React.FC<ReaderScreenProps> = ({
  book,
  onBack,
  onNavigate,
  onOpenPostalModal,
  onToast
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false);

  // Reader customizable preferences
  const [settings, setSettings] = useState<ReaderSettings>({
    brightness: 85,
    atmosphere: 'atenea',
    fontSize: 18,
    fontFamily: 'garamond',
    lineSpacing: 'regular',
    navigationMode: 'page'
  });

  const getAtmosphereClasses = () => {
    switch (settings.atmosphere) {
      case 'claro':
        return {
          bg: 'bg-[#fcf9f1]',
          text: 'text-[#1c1c17]',
          hudBg: 'bg-[#f1eee6]/95 border-[#e5e2da]',
          cardBg: 'bg-[#ebe8e0]',
          accentText: 'text-[#914722]',
          highlightBg: 'bg-[#ffb598]/30 text-[#1c1c17]'
        };
      case 'sepia':
        return {
          bg: 'bg-[#27211a]',
          text: 'text-[#dec2a7]',
          hudBg: 'bg-[#1e1913]/95 border-[#453628]',
          cardBg: 'bg-[#352b21]',
          accentText: 'text-[#fcb887]',
          highlightBg: 'bg-[#6c3d17]/50 text-[#fbf1e7]'
        };
      case 'oled':
        return {
          bg: 'bg-black',
          text: 'text-[#d8d4c9]',
          hudBg: 'bg-black/95 border-[#1a1c24]',
          cardBg: 'bg-[#0f1118]',
          accentText: 'text-[#ffb598]',
          highlightBg: 'bg-[#331c13] text-white'
        };
      case 'atenea':
      default:
        return {
          bg: 'bg-[#111319]',
          text: 'text-[#f4efe4]',
          hudBg: 'bg-[#191b21]/95 border-[#282a30]',
          cardBg: 'bg-[#1d1f26]',
          accentText: 'text-[#ffb598]',
          highlightBg: 'bg-[#e07a4f]/25 text-[#f4efe4]'
        };
    }
  };

  const atmosphereStyle = getAtmosphereClasses();

  const getFontFamilyStyle = () => {
    switch (settings.fontFamily) {
      case 'baskerville':
        return 'font-serif font-normal';
      case 'merriweather':
        return 'font-serif font-light';
      case 'sans':
        return 'font-sans';
      case 'garamond':
      default:
        return 'font-serif';
    }
  };

  const getLineHeightStyle = () => {
    switch (settings.lineSpacing) {
      case 'compact': return 'leading-relaxed';
      case 'wide': return 'leading-[2.2]';
      case 'regular':
      default: return 'leading-[1.8]';
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onToast(
      !isBookmarked ? 'Página 142 guardada en tus marcadores' : 'Marcador retirado',
      !isBookmarked ? 'bookmark' : 'bookmark_remove'
    );
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col relative transition-colors duration-300 ${atmosphereStyle.bg} ${atmosphereStyle.text}`}
      style={{ filter: `brightness(${Math.max(50, settings.brightness)}%)` }}
    >
      {/* Top HUD Bar */}
      <div className={`sticky top-0 z-30 w-full backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b shadow-md ${atmosphereStyle.hudBg}`}>
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBack}
            aria-label="Cerrar lector"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div className="min-w-0 flex flex-col">
            <span className="font-serif text-sm font-semibold truncate leading-tight">
              {book.title}
            </span>
            <span className="text-[11px] opacity-70 truncate">
              Cap. III · Los rollos de papiro
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleBookmark}
            aria-label="Marcador"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isBookmarked ? 'text-[#ffb598]' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>

          <button
            onClick={() => onNavigate('subrayados')}
            aria-label="Mis notas en este libro"
            title="Ver mis notas"
            className="w-9 h-9 rounded-full flex items-center justify-center opacity-75 hover:opacity-100 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
          </button>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            aria-label="Ajustes tipográficos"
            className={`h-9 px-3 rounded-full flex items-center gap-1 text-xs font-semibold shadow-sm transition-all ${
              settingsOpen
                ? 'bg-[#e07a4f] text-[#1a0800]'
                : 'bg-white/10 hover:bg-white/20 text-[#ffb598]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">text_fields</span>
            <span>Aa</span>
          </button>
        </div>
      </div>

      {/* Reader Manuscript Content */}
      <main className="flex-1 w-full max-w-[680px] mx-auto px-5 sm:px-8 pt-8 pb-28">
        
        {/* Top Header Pagination */}
        <div className="w-full flex justify-between items-center text-[11px] tracking-widest uppercase opacity-60 mb-6 font-sans">
          <span>{book.author}</span>
          <span className="bg-white/10 px-2 py-0.5 rounded-full text-[#fcb887] font-semibold">
            Pág. 142 de 452 (31%)
          </span>
        </div>

        {/* Chapter Title */}
        <div className="my-6 text-center flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-widest text-[#ffb598] font-bold mb-1">
            Capítulo III
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-center mb-2 leading-tight">
            El misterio de los rollos de papiro
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#e07a4f] to-transparent opacity-60 my-2" />
        </div>

        {/* Reader Prose */}
        <article
          className={`space-y-6 text-justify text-balance ${getFontFamilyStyle()} ${getLineHeightStyle()}`}
          style={{ fontSize: `${settings.fontSize}px` }}
        >
          {/* Paragraph 1 with Drop Cap */}
          <p className="leading-relaxed">
            <span className="float-left font-serif text-5xl leading-none pr-3 pt-1 text-[#e07a4f] font-semibold select-none">
              H
            </span>
            abía una vez en Alejandría un anhelo que desafiaba a los imperios: acorralar todo el saber del mundo conocido en un solo recinto de mármol y sombra. Los mensajeros reales zarpaban hacia los confines del Mediterráneo con saquillos repletos de monedas de oro y un mandato estricto: comprar rollos, saquear librerías privadas, copiar manuscritos prestados devolviendo copias falsas y custodiando los originales con celo insaciable.
          </p>

          {/* Highlighted Famous Passage with Community Pill */}
          <div className="relative my-6 group">
            <div
              onClick={() => setHighlightMenuOpen(!highlightMenuOpen)}
              className={`p-3.5 rounded-xl border border-[#e07a4f]/30 cursor-pointer shadow-sm hover:border-[#e07a4f] transition-all ${atmosphereStyle.highlightBg}`}
            >
              <p className="italic font-serif leading-relaxed">
                “Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.”
              </p>
            </div>

            {/* Pill & Interactive Options */}
            <div className="mt-2 flex items-center justify-between px-1 text-xs">
              <button
                onClick={() => setHighlightMenuOpen(!highlightMenuOpen)}
                className="flex items-center gap-1.5 text-[#ffb598] hover:underline font-medium text-[11px]"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stylus_note
                </span>
                <span>Cita destacada por el Club de Clásicos (234 lectores)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('detalle-cita')}
                  title="Ver debate de la comunidad"
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#e07a4f] hover:text-[#1a0800] text-[10px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">forum</span>
                  <span>Ecos (19)</span>
                </button>
                <button
                  onClick={() => onNavigate('editor-anotacion')}
                  title="Editar o añadir nota a este pasaje"
                  className="px-2 py-0.5 rounded bg-[#e07a4f]/20 hover:bg-[#e07a4f] hover:text-[#1a0800] text-[#ffb598] text-[10px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">edit</span>
                  <span>Anotar</span>
                </button>
              </div>
            </div>

            {/* Highlight Context Quick Menu */}
            {highlightMenuOpen && (
              <div className="mt-2 p-2.5 rounded-xl bg-[#191b21] border border-[#282a30] shadow-xl flex items-center justify-around gap-2 text-xs">
                <button
                  onClick={() => onNavigate('detalle-cita')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#282a30] text-[#ffb598] hover:bg-[#33353b] text-center font-medium flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">comment</span>
                  <span>Debate</span>
                </button>
                <button
                  onClick={() => onNavigate('editor-anotacion')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#282a30] text-[#fcb887] hover:bg-[#33353b] text-center font-medium flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">border_color</span>
                  <span>Anotar</span>
                </button>
                <button
                  onClick={onOpenPostalModal}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#e07a4f] text-[#1a0800] font-bold text-center flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  <span>Postal</span>
                </button>
              </div>
            )}
          </div>

          {/* Paragraph 2 */}
          <p className="leading-relaxed">
            El junco del papiro crecía salvaje en las orillas empantanadas. Su médula, cortada en tiras translúcidas dispuestas en capas perpendiculares, se empapaba con el agua del río sagrado, se prensaba bajo piedras descomunales y se pulía con valvas de moluscos hasta alcanzar una suavidad comparable a la piel de un ciervo recién nacido. Así, sobre aquel soporte vulnerable a las llamas, a la carcoma y a la humedad de los siglos, viajaron las tragedias de Eurípides, las cartas íntimas de Safo y los mapas del cosmos.
          </p>

          {/* Paragraph 3 */}
          <p className="leading-relaxed">
            Quien desenrollaba aquel cilindro vegetal sostenía entre sus palmas una tecnología tan prodigiosa y revolucionaria para su tiempo como lo sería el telescopio milenios después: una prótesis inextinguible de la memoria contra el olvido.
          </p>
        </article>

        {/* Parchment Watermark */}
        <div className="mt-16 pt-8 flex flex-col items-center justify-center text-center opacity-40">
          <span className="material-symbols-outlined text-2xl mb-1">auto_stories</span>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold">
            ATENEA BIBLIOTECA NOCTURNA
          </span>
        </div>
      </main>

      {/* Bottom Chapter Scrubber Bar */}
      <aside className={`fixed bottom-0 left-0 right-0 z-30 w-full backdrop-blur-md px-4 py-3 border-t shadow-2xl ${atmosphereStyle.hudBg}`}>
        <div className="max-w-[680px] mx-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-sans">
            <span className="font-medium opacity-80">Capítulo III</span>
            <span className="text-[#fcb887] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">schedule</span>
              ~12 min restantes
            </span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => onToast('Retrocediendo al capítulo anterior', 'skip_previous')}
              aria-label="Página anterior"
              className="opacity-70 hover:opacity-100"
            >
              <span className="material-symbols-outlined text-base">skip_previous</span>
            </button>

            <div className="relative w-full flex items-center h-4">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e07a4f] to-[#fcb887] rounded-full"
                  style={{ width: '31.4%' }}
                />
              </div>
              <div
                className="absolute w-3.5 h-3.5 bg-[#e07a4f] rounded-full shadow-md top-1/2 -translate-y-1/2 ring-2 ring-white/20"
                style={{ left: 'calc(31.4% - 7px)' }}
              />
            </div>

            <button
              onClick={() => onToast('Avanzando al capítulo siguiente', 'skip_next')}
              aria-label="Página siguiente"
              className="opacity-70 hover:opacity-100"
            >
              <span className="material-symbols-outlined text-base">skip_next</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Reading Settings Drawer (Bottom Sheet) */}
      {settingsOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 max-w-xl mx-auto bg-[#1d1f26] border-t border-[#282a30] rounded-t-2xl shadow-2xl p-5 flex flex-col gap-4 max-h-[82vh] overflow-y-auto animate-slide-up text-[#f4efe4]">
          {/* Sheet Handle & Header */}
          <div className="flex flex-col items-center w-full">
            <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb598]">tune</span>
                <h3 className="font-serif text-lg font-semibold">Ajustes de Lectura</h3>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#282a30] text-[#9ea2ae] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* SECTION 1: Brightness & Atmosphere */}
          <div className="bg-[#161820] p-3.5 rounded-xl border border-[#282a30] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#9ea2ae]">
                <span className="material-symbols-outlined text-sm">wb_sunny</span>
                Luminosidad del Papiro
              </span>
              <span className="text-[#fcb887] font-bold">{settings.brightness}%</span>
            </div>

            <input
              type="range"
              min={50}
              max={100}
              value={settings.brightness}
              onChange={(e) => setSettings({ ...settings, brightness: Number(e.target.value) })}
              className="w-full accent-[#e07a4f] cursor-pointer"
            />

            {/* Atmosphere theme picker */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-xs">
              <button
                onClick={() => setSettings({ ...settings, atmosphere: 'claro' })}
                className={`py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  settings.atmosphere === 'claro'
                    ? 'border-[#ffb598] bg-[#fcf9f1] text-[#1c1c17] font-bold shadow-md'
                    : 'border-transparent bg-[#242733] text-[#9ea2ae]'
                }`}
              >
                <span className="material-symbols-outlined text-base">wb_sunny</span>
                <span className="text-[10px] mt-0.5">Claro</span>
              </button>

              <button
                onClick={() => setSettings({ ...settings, atmosphere: 'sepia' })}
                className={`py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  settings.atmosphere === 'sepia'
                    ? 'border-[#ffb598] bg-[#27211a] text-[#dec2a7] font-bold shadow-md'
                    : 'border-transparent bg-[#242733] text-[#9ea2ae]'
                }`}
              >
                <span className="material-symbols-outlined text-base">local_cafe</span>
                <span className="text-[10px] mt-0.5">Sepia</span>
              </button>

              <button
                onClick={() => setSettings({ ...settings, atmosphere: 'atenea' })}
                className={`py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  settings.atmosphere === 'atenea'
                    ? 'border-[#ffb598] bg-[#111319] text-[#ffb598] font-bold shadow-md ring-1 ring-[#e07a4f]'
                    : 'border-transparent bg-[#242733] text-[#9ea2ae]'
                }`}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  nights_stay
                </span>
                <span className="text-[10px] mt-0.5">Atenea</span>
              </button>

              <button
                onClick={() => setSettings({ ...settings, atmosphere: 'oled' })}
                className={`py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  settings.atmosphere === 'oled'
                    ? 'border-[#ffb598] bg-black text-white font-bold shadow-md'
                    : 'border-transparent bg-[#242733] text-[#9ea2ae]'
                }`}
              >
                <span className="material-symbols-outlined text-base">dark_mode</span>
                <span className="text-[10px] mt-0.5">OLED</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: Font scale */}
          <div className="bg-[#161820] p-3.5 rounded-xl border border-[#282a30] flex items-center justify-between">
            <span className="text-xs text-[#9ea2ae] flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-base">format_size</span>
              Escala de letra
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSettings({ ...settings, fontSize: Math.max(14, settings.fontSize - 1) })}
                className="w-8 h-8 rounded-full bg-[#282a30] text-sm font-bold active:scale-95 flex items-center justify-center hover:bg-[#33353b]"
              >
                A-
              </button>
              <span className="text-sm font-bold text-[#ffb598] w-12 text-center">{settings.fontSize} pt</span>
              <button
                onClick={() => setSettings({ ...settings, fontSize: Math.min(26, settings.fontSize + 1) })}
                className="w-8 h-8 rounded-full bg-[#282a30] text-sm font-bold active:scale-95 flex items-center justify-center hover:bg-[#33353b]"
              >
                A+
              </button>
            </div>
          </div>

          {/* SECTION 3: Font Family */}
          <div className="bg-[#161820] p-3.5 rounded-xl border border-[#282a30] flex flex-col gap-2">
            <span className="text-xs text-[#9ea2ae] uppercase tracking-wider font-semibold">Tipografía Editorial</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSettings({ ...settings, fontFamily: 'garamond' })}
                className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                  settings.fontFamily === 'garamond'
                    ? 'border-[#ffb598] bg-[#282a30] text-[#ffb598] font-bold'
                    : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
                }`}
              >
                <span className="font-serif">EB Garamond</span>
                {settings.fontFamily === 'garamond' && <span className="material-symbols-outlined text-xs">check</span>}
              </button>

              <button
                onClick={() => setSettings({ ...settings, fontFamily: 'baskerville' })}
                className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                  settings.fontFamily === 'baskerville'
                    ? 'border-[#ffb598] bg-[#282a30] text-[#ffb598] font-bold'
                    : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
                }`}
              >
                <span className="font-serif">Baskerville</span>
                {settings.fontFamily === 'baskerville' && <span className="material-symbols-outlined text-xs">check</span>}
              </button>

              <button
                onClick={() => setSettings({ ...settings, fontFamily: 'merriweather' })}
                className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                  settings.fontFamily === 'merriweather'
                    ? 'border-[#ffb598] bg-[#282a30] text-[#ffb598] font-bold'
                    : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
                }`}
              >
                <span className="font-serif">Merriweather</span>
                {settings.fontFamily === 'merriweather' && <span className="material-symbols-outlined text-xs">check</span>}
              </button>

              <button
                onClick={() => setSettings({ ...settings, fontFamily: 'sans' })}
                className={`p-2 rounded-lg border text-left flex items-center justify-between ${
                  settings.fontFamily === 'sans'
                    ? 'border-[#ffb598] bg-[#282a30] text-[#ffb598] font-bold'
                    : 'border-transparent bg-[#1e2029] text-[#9ea2ae]'
                }`}
              >
                <span className="font-sans">Sans Clásica</span>
                {settings.fontFamily === 'sans' && <span className="material-symbols-outlined text-xs">check</span>}
              </button>
            </div>
          </div>

          {/* SECTION 4: Line spacing & Navigation */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#161820] p-3 rounded-xl border border-[#282a30] flex flex-col gap-1.5">
              <span className="text-[#9ea2ae] font-medium">Interlineado</span>
              <div className="flex items-center justify-around bg-[#1e2029] p-1 rounded-lg">
                <button
                  onClick={() => setSettings({ ...settings, lineSpacing: 'compact' })}
                  className={`p-1.5 rounded ${settings.lineSpacing === 'compact' ? 'bg-[#282a30] text-[#ffb598]' : 'text-[#9ea2ae]'}`}
                >
                  <span className="material-symbols-outlined text-base">format_line_spacing</span>
                </button>
                <button
                  onClick={() => setSettings({ ...settings, lineSpacing: 'regular' })}
                  className={`p-1.5 rounded ${settings.lineSpacing === 'regular' ? 'bg-[#282a30] text-[#ffb598]' : 'text-[#9ea2ae]'}`}
                >
                  <span className="material-symbols-outlined text-base">density_medium</span>
                </button>
                <button
                  onClick={() => setSettings({ ...settings, lineSpacing: 'wide' })}
                  className={`p-1.5 rounded ${settings.lineSpacing === 'wide' ? 'bg-[#282a30] text-[#ffb598]' : 'text-[#9ea2ae]'}`}
                >
                  <span className="material-symbols-outlined text-base">density_large</span>
                </button>
              </div>
            </div>

            <div className="bg-[#161820] p-3 rounded-xl border border-[#282a30] flex flex-col gap-1.5">
              <span className="text-[#9ea2ae] font-medium">Paso de Hoja</span>
              <div className="flex items-center justify-around bg-[#1e2029] p-1 rounded-lg">
                <button
                  onClick={() => setSettings({ ...settings, navigationMode: 'page' })}
                  className={`flex-1 py-1 rounded text-center font-medium ${
                    settings.navigationMode === 'page' ? 'bg-[#282a30] text-[#ffb598]' : 'text-[#9ea2ae]'
                  }`}
                >
                  Página
                </button>
                <button
                  onClick={() => setSettings({ ...settings, navigationMode: 'scroll' })}
                  className={`flex-1 py-1 rounded text-center font-medium ${
                    settings.navigationMode === 'scroll' ? 'bg-[#282a30] text-[#ffb598]' : 'text-[#9ea2ae]'
                  }`}
                >
                  Scroll
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSettingsOpen(false);
              onToast('Preferencias de lectura guardadas en tu perfil', 'tune');
            }}
            className="w-full py-3 bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] hover:text-[#370e00] font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Guardar Preferencias de Lectura
          </button>
        </div>
      )}
    </div>
  );
};
