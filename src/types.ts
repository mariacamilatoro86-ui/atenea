export type ScreenType = 
  | 'explorar'
  | 'catalogo'
  | 'detalle-libro'
  | 'lector'
  | 'subrayados'
  | 'editor-anotacion'
  | 'detalle-cita'
  | 'prestamos'
  | 'comunidad'
  | 'perfil';

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  year: number;
  cover: string;
  category: string;
  rating: number;
  ratingCount: number;
  pages: number;
  language: string;
  readingTime: string;
  formats: {
    physical: { available: boolean; count: number; shelf: string; signatura: string };
    ebook: { available: boolean; format: string; size: string };
    audio: { available: boolean; duration: string; narrator: string };
  };
  synopsis: string;
  curatedQuote?: string;
  badges: string[];
  branches: Array<{
    name: string;
    sub: string;
    status: 'available' | 'loaned' | 'reference_only';
    copies: number;
    availableDate?: string;
  }>;
  reviews: Array<{
    id: string;
    userName: string;
    userAvatar: string;
    userTag: string;
    timeAgo: string;
    rating: number;
    text: string;
  }>;
}

export interface Highlight {
  id: string;
  bookId: string;
  bookTitle: string;
  chapter: string;
  page: number;
  quote: string;
  note?: string;
  noteType?: 'marginal' | 'hipotesis' | 'idea' | 'referencia';
  noteTitle?: string;
  color: 'terracotta' | 'parchment' | 'sage' | 'lapis';
  colorLabel: string;
  date: string;
  clubName?: string;
  clubMatches?: number;
  isPrivate?: boolean;
  tags: string[];
  likes: number;
  commentsCount: number;
}

export interface CommunityComment {
  id: string;
  userName: string;
  userAvatar: string;
  userBadge?: string;
  timeAgo: string;
  content: string;
  likes: number;
  userLiked?: boolean;
  clubAffiliation?: string;
}

export interface CulturalEvent {
  id: string;
  title: string;
  subtitle: string;
  category: 'club' | 'taller' | 'mesa_redonda' | 'infantil' | 'cine';
  dateDisplay: {
    dayOfWeek: string;
    dayNumber: number;
    time: string;
  };
  badge: string;
  location: string;
  moderator?: {
    name: string;
    role: string;
    avatar: string;
  };
  guests?: Array<{
    name: string;
    avatar: string;
  }>;
  enrolledCount: number;
  maxSpots?: number;
  isFeatured?: boolean;
  coverImage?: string;
  userEnrolled?: boolean;
}

export interface Loan {
  id: string;
  bookId: string;
  title: string;
  author: string;
  cover: string;
  format: 'Físico' | 'eBook' | 'Audiolibro';
  dueDate: string;
  daysRemaining: number;
  totalDays: number;
  currentDay: number;
  renewable: boolean;
  renewedCount: number;
  location: string;
}

export interface Reservation {
  id: string;
  bookId: string;
  title: string;
  author: string;
  cover: string;
  queuePosition: number;
  readyDate: string;
  pickupLocation: string;
}

export interface ReadingHistoryItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  cover: string;
  returnedDate: string;
  userRating: number;
}

export interface ReaderSettings {
  brightness: number; // 0 - 100
  atmosphere: 'claro' | 'sepia' | 'atenea' | 'oled';
  fontSize: number; // pt (e.g. 16, 18, 20)
  fontFamily: 'garamond' | 'baskerville' | 'merriweather' | 'sans';
  lineSpacing: 'compact' | 'regular' | 'wide';
  navigationMode: 'page' | 'scroll';
}
