import React, { useState, useEffect } from 'react';
import { ScreenType, Book, Highlight } from './types';
import { mockBooks, initialHighlights } from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { PostalModal } from './components/PostalModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ProfileModal } from './components/ProfileModal';

// Screens
import { ExploreScreen } from './screens/ExploreScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { ReaderScreen } from './screens/ReaderScreen';
import { HighlightsScreen } from './screens/HighlightsScreen';
import { AnnotationEditorScreen } from './screens/AnnotationEditorScreen';
import { QuoteDetailScreen } from './screens/QuoteDetailScreen';
import { LoansScreen } from './screens/LoansScreen';
import { CommunityScreen } from './screens/CommunityScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explorar');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['explorar']);
  const [selectedBook, setSelectedBook] = useState<Book>(mockBooks[0]);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight>(initialHighlights[0]);
  const [highlightsList, setHighlightsList] = useState<Highlight[]>(initialHighlights);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Modals and Drawers
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [postalOpen, setPostalOpen] = useState(false);
  const [postalData, setPostalData] = useState({
    quote: initialHighlights[0].quote,
    author: 'Irene Vallejo',
    bookTitle: initialHighlights[0].bookTitle,
    page: `Cap. ${initialHighlights[0].chapter}, pág. ${initialHighlights[0].page}`
  });

  // Global Toast
  const [toast, setToast] = useState<{ message: string; icon?: string } | null>(null);

  // Sync theme to root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    showToast(
      theme === 'dark' ? 'Modo Atenea Claro activado' : 'Modo Atenea Nocturna activado',
      theme === 'dark' ? 'light_mode' : 'dark_mode'
    );
  };

  const showToast = (message: string, icon?: string) => {
    setToast({ message, icon });
  };

  const handleNavigate = (nextScreen: ScreenType) => {
    if (nextScreen !== currentScreen) {
      setScreenHistory((prev) => [...prev, nextScreen]);
      setCurrentScreen(nextScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('explorar');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPostalForHighlight = (hl: Highlight) => {
    setPostalData({
      quote: hl.quote,
      author: hl.bookTitle.includes('infinito')
        ? 'Irene Vallejo'
        : hl.bookTitle.includes('sombra')
        ? 'Carlos Ruiz Zafón'
        : 'Juan Rulfo',
      bookTitle: hl.bookTitle,
      page: `Cap. ${hl.chapter}, pág. ${hl.page}`
    });
    setPostalOpen(true);
  };

  const handleSaveHighlight = (updated: Partial<Highlight>) => {
    setHighlightsList((prev) =>
      prev.map((h) => (h.id === selectedHighlight.id ? { ...h, ...updated } : h))
    );
    showToast('Anotación guardada en tu archivo marginal', 'bookmark_added');
    handleBack();
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#111319] text-[#e2e2ea]'
          : 'bg-[#faf7f2] text-[#201b17]'
      }`}
    >
      {/* Top Bar Navigation (Hidden in immersive Reader mode as Reader has its own header) */}
      {currentScreen !== 'lector' && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onBack={screenHistory.length > 1 ? handleBack : undefined}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          unreadCount={2}
        />
      )}

      {/* Main Screen Router */}
      <main
        className={`flex-1 flex flex-col w-full max-w-md mx-auto ${
          currentScreen === 'lector'
            ? 'pt-0 pb-0'
            : 'pt-16 pb-20 px-4'
        }`}
      >
        {currentScreen === 'explorar' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            onSelectBook={(book) => {
              setSelectedBook(book);
              handleNavigate('detalle-libro');
            }}
            onToast={showToast}
          />
        )}

        {currentScreen === 'catalogo' && (
          <CatalogScreen
            onNavigate={handleNavigate}
            onSelectBook={(book) => {
              setSelectedBook(book);
              handleNavigate('detalle-libro');
            }}
            onToast={showToast}
          />
        )}

        {currentScreen === 'detalle-libro' && (
          <BookDetailScreen
            book={selectedBook}
            onNavigate={handleNavigate}
            onOpenReader={() => handleNavigate('lector')}
            onToast={showToast}
          />
        )}

        {currentScreen === 'lector' && (
          <ReaderScreen
            book={selectedBook}
            onBack={handleBack}
            onNavigate={handleNavigate}
            onOpenPostalModal={() => {
              setPostalData({
                quote:
                  'Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.',
                author: selectedBook.author || 'Irene Vallejo',
                bookTitle: selectedBook.title || 'El infinito en un junco',
                page: 'Cap. III, pág. 142'
              });
              setPostalOpen(true);
            }}
            onToast={showToast}
          />
        )}

        {currentScreen === 'subrayados' && (
          <HighlightsScreen
            highlights={highlightsList}
            onNavigate={handleNavigate}
            onSelectBook={(book) => {
              setSelectedBook(book);
              handleNavigate('detalle-libro');
            }}
            onSelectHighlight={(hl) => {
              setSelectedHighlight(hl);
            }}
            onOpenPostal={handleOpenPostalForHighlight}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'editor-anotacion' && (
          <AnnotationEditorScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onSaveHighlight={handleSaveHighlight}
            onToast={showToast}
          />
        )}

        {currentScreen === 'detalle-cita' && (
          <QuoteDetailScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onOpenPostalModal={() => {
              setPostalData({
                quote:
                  'Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.',
                author: 'Irene Vallejo',
                bookTitle: 'El infinito en un junco',
                page: 'Cap. III, pág. 142'
              });
              setPostalOpen(true);
            }}
            onToast={showToast}
          />
        )}

        {currentScreen === 'prestamos' && (
          <LoansScreen
            onNavigate={handleNavigate}
            onSelectBook={(book) => {
              setSelectedBook(book);
              handleNavigate('detalle-libro');
            }}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'comunidad' && (
          <CommunityScreen
            onNavigate={handleNavigate}
            onSelectBook={(book) => {
              setSelectedBook(book);
              handleNavigate('detalle-libro');
            }}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Floating Navigation (Explorar / Catálogo / Subrayados / Préstamos / Comunidad) */}
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Global Modals & Drawers */}
      <PostalModal
        isOpen={postalOpen}
        onClose={() => setPostalOpen(false)}
        quote={postalData.quote}
        author={postalData.author}
        bookTitle={postalData.bookTitle}
        page={postalData.page}
        onToast={showToast}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigate={(screen) => {
          setNotificationsOpen(false);
          handleNavigate(screen);
        }}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onNavigate={(screen) => {
          setProfileOpen(false);
          handleNavigate(screen);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Global Toast */}
      {toast && <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />}
    </div>
  );
}
