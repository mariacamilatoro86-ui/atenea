import React, { useState } from 'react';
import { Book, Loan, Reservation, ReadingHistoryItem, ScreenType } from '../types';
import { initialLoans, initialReservations, initialHistory, mockBooks, readerProfile } from '../data/mockData';

interface LoansScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectBook: (book: Book) => void;
  onShowToast: (msg: string) => void;
}

export const LoansScreen: React.FC<LoansScreenProps> = ({
  onNavigate,
  onSelectBook,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'activos' | 'reservas' | 'historial'>('activos');
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const handleRenew = (loanId: string) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id === loanId) {
          if (l.renewable === false) {
            onShowToast('Este préstamo ya ha alcanzado el límite de renovaciones');
            return l;
          }
          onShowToast(`Préstamo de «${l.title}» extendido 15 días hasta el 30 de Octubre`);
          return {
            ...l,
            daysRemaining: l.daysRemaining + 15,
            dueDate: '30 de Octubre',
            renewable: false,
          };
        }
        return l;
      })
    );
  };

  const handleCancelReservation = (resId: string, bookTitle: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== resId));
    onShowToast(`Reserva de «${bookTitle}» cancelada`);
  };

  const handleGoToBook = (bookId: string) => {
    const book = mockBooks.find((b) => b.id === bookId);
    if (book) {
      onSelectBook(book);
      onNavigate('detalle-libro');
    }
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5">
      {/* Breadcrumb & Ambient Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            Mesa de Préstamos
          </span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Credencial &amp; Actividad
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1d1f26] border border-white/5 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-emerald-400 uppercase">
            Lector Activo
          </span>
        </div>
      </div>

      {/* Credencial Digital de Lector Premium */}
      <div
        onClick={() => setShowQrModal(true)}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12182b] via-[#0f1422] to-[#0a0d17] text-white p-5 border border-white/10 shadow-2xl transition-all duration-300 cursor-pointer hover:border-primary/40 group"
      >
        {/* Filigrana decorativa de fondo */}
        <div className="absolute -right-12 -top-12 w-48 h-48 opacity-15 pointer-events-none text-primary group-hover:scale-105 transition-transform duration-500">
          <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="3,3" strokeWidth="1.5"></circle>
            <circle cx="50" cy="50" fill="none" r="35" stroke="currentColor" strokeWidth="0.8"></circle>
            <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="0.5"></path>
          </svg>
        </div>

        {/* Encabezado de la Tarjeta */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            </div>
            <div>
              <p className="font-label-sm text-label-sm tracking-widest text-primary uppercase leading-tight font-semibold">
                Atenea
              </p>
              <p className="font-label-sm text-[10px] text-white/50 uppercase">Carnet de Lector</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-label-sm text-[11px] tracking-wide">
            Frecuente
          </span>
        </div>

        {/* Nombre y Clave de Socio */}
        <div className="relative z-10 mt-5">
          <p className="font-label-sm text-[11px] text-white/45 uppercase tracking-wider">
            Titular de la membresía
          </p>
          <h2 className="font-headline-md text-headline-md tracking-tight text-white mt-0.5">
            {readerProfile.name}
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <div>
              <span className="font-label-sm text-[10px] text-white/45 uppercase">Nº de Socio</span>
              <p className="font-label-md text-label-md text-primary tracking-widest font-mono font-medium">
                {readerProfile.membershipNumber}
              </p>
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-white/45 uppercase">Validez</span>
              <p className="font-label-md text-label-md text-white/80">{readerProfile.validUntil}</p>
            </div>
          </div>
        </div>

        {/* Sector QR y Escaneo Rápido */}
        <div className="relative z-10 mt-5 pt-4 bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3">
          <div className="flex flex-col justify-center">
            <span className="font-label-sm text-label-sm text-white/90 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">contactless</span>
              Mostrador &amp; Kiosco
            </span>
            <span className="font-body-sm text-body-sm text-white/50 mt-0.5 text-xs">
              Toca para ampliar código QR
            </span>
            {/* Simulación de código de barras tipográfico */}
            <div className="flex items-end gap-[2px] mt-2 h-4 opacity-75">
              <span className="w-[2px] h-full bg-white/70"></span>
              <span className="w-[1px] h-3 bg-white/70"></span>
              <span className="w-[3px] h-full bg-white/70"></span>
              <span className="w-[1px] h-2 bg-white/70"></span>
              <span className="w-[2px] h-full bg-white/70"></span>
              <span className="w-[1px] h-3 bg-white/70"></span>
              <span className="w-[4px] h-full bg-white/70"></span>
              <span className="w-[2px] h-2 bg-white/70"></span>
              <span className="w-[1px] h-full bg-white/70"></span>
              <span className="w-[3px] h-3 bg-white/70"></span>
            </div>
          </div>

          {/* QR Code Visual de Alta Precisión */}
          <div className="bg-white p-2 rounded-lg shadow-md shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 29 29">
              <rect fill="#FFFFFF" height="29" width="29"></rect>
              <rect fill="#111319" height="7" width="7" x="2" y="2"></rect>
              <rect fill="#FFFFFF" height="5" width="5" x="3" y="3"></rect>
              <rect fill="#111319" height="3" width="3" x="4" y="4"></rect>
              <rect fill="#111319" height="7" width="7" x="20" y="2"></rect>
              <rect fill="#FFFFFF" height="5" width="5" x="21" y="3"></rect>
              <rect fill="#111319" height="3" width="3" x="22" y="4"></rect>
              <rect fill="#111319" height="7" width="7" x="2" y="20"></rect>
              <rect fill="#FFFFFF" height="5" width="5" x="3" y="21"></rect>
              <rect fill="#111319" height="3" width="3" x="4" y="22"></rect>
              <rect fill="#111319" height="2" width="2" x="11" y="2"></rect>
              <rect fill="#111319" height="2" width="2" x="15" y="4"></rect>
              <rect fill="#111319" height="1" width="3" x="11" y="6"></rect>
              <rect fill="#111319" height="3" width="2" x="2" y="11"></rect>
              <rect fill="#111319" height="2" width="1" x="6" y="11"></rect>
              <rect fill="#111319" height="7" width="7" x="11" y="11"></rect>
              <rect fill="#FFFFFF" height="3" width="3" x="13" y="13"></rect>
              <rect fill="#111319" height="2" width="2" x="20" y="11"></rect>
              <rect fill="#111319" height="2" width="3" x="24" y="13"></rect>
              <rect fill="#111319" height="2" width="3" x="11" y="20"></rect>
              <rect fill="#111319" height="4" width="2" x="16" y="22"></rect>
              <rect fill="#111319" height="3" width="2" x="20" y="20"></rect>
              <rect fill="#111319" height="2" width="3" x="24" y="22"></rect>
            </svg>
          </div>
        </div>
      </div>

      {/* Métricas Rápidas / Bento Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => setActiveTab('activos')}
          className={`border rounded-xl p-3 flex flex-col items-center text-center shadow-md transition-all ${
            activeTab === 'activos'
              ? 'bg-[#252832] border-primary/40'
              : 'bg-[#1e212a] border-white/5 hover:border-white/15'
          }`}
        >
          <span className="font-headline-md text-headline-md text-primary leading-none">
            {loans.length}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">
            En préstamo
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reservas')}
          className={`border rounded-xl p-3 flex flex-col items-center text-center shadow-md transition-all ${
            activeTab === 'reservas'
              ? 'bg-[#252832] border-secondary/40'
              : 'bg-[#1e212a] border-white/5 hover:border-white/15'
          }`}
        >
          <span className="font-headline-md text-headline-md text-secondary leading-none">
            {reservations.length}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">
            Reserva
          </span>
        </button>

        <button
          onClick={() => setActiveTab('historial')}
          className={`border rounded-xl p-3 flex flex-col items-center text-center shadow-md transition-all ${
            activeTab === 'historial'
              ? 'bg-[#252832] border-tertiary/40'
              : 'bg-[#1e212a] border-white/5 hover:border-white/15'
          }`}
        >
          <span className="font-headline-md text-headline-md text-tertiary leading-none">
            24
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">
            Leídos este año
          </span>
        </button>
      </div>

      {/* Pestañas Interactivas */}
      <div
        className="flex items-center gap-1.5 p-1 bg-[#1a1d24] border border-white/5 rounded-xl"
        role="tablist"
      >
        <button
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 text-center ${
            activeTab === 'activos'
              ? 'bg-[#252832] text-white shadow-sm'
              : 'text-on-surface-variant hover:text-white'
          }`}
          onClick={() => setActiveTab('activos')}
          type="button"
        >
          Activos ({loans.length})
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 text-center ${
            activeTab === 'reservas'
              ? 'bg-[#252832] text-white shadow-sm'
              : 'text-on-surface-variant hover:text-white'
          }`}
          onClick={() => setActiveTab('reservas')}
          type="button"
        >
          Reservas ({reservations.length})
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 text-center ${
            activeTab === 'historial'
              ? 'bg-[#252832] text-white shadow-sm'
              : 'text-on-surface-variant hover:text-white'
          }`}
          onClick={() => setActiveTab('historial')}
          type="button"
        >
          Historial
        </button>
      </div>

      {/* Contenedor Pestaña 1: Préstamos Activos */}
      {activeTab === 'activos' && (
        <div className="space-y-4">
          {loans.map((loan) => {
            const isAlert = loan.daysRemaining <= 3;
            const progressPercent = isAlert ? 85 : 35;

            return (
              <div
                key={loan.id}
                className="bg-[#1d2029] border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col space-y-3"
              >
                <div className="flex gap-3.5">
                  <div
                    onClick={() => handleGoToBook(loan.bookId)}
                    className="w-20 h-28 rounded-lg overflow-hidden shrink-0 shadow-md bg-black/40 ring-1 ring-white/10 cursor-pointer hover:opacity-90"
                  >
                    <img
                      className="w-full h-full object-cover"
                      alt={loan.title}
                      src={loan.cover}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] uppercase font-bold tracking-wider ${
                            isAlert
                              ? 'bg-amber-500/20 border border-amber-400/30 text-amber-300'
                              : 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
                          }`}
                        >
                          {isAlert ? `${loan.daysRemaining} días restantes` : 'En tiempo'}
                        </span>
                        <span className="font-label-sm text-[11px] text-secondary capitalize">
                          {loan.format}
                        </span>
                      </div>
                      <h3
                        onClick={() => handleGoToBook(loan.bookId)}
                        className="font-headline-sm text-headline-sm text-white mt-1.5 truncate cursor-pointer hover:text-primary transition-colors"
                      >
                        {loan.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {loan.author}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        isAlert ? 'text-primary' : 'text-emerald-300'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isAlert ? 'schedule' : 'calendar_today'}
                      </span>
                      <span className="font-label-sm text-label-sm font-medium">
                        Vence: {loan.dueDate} {!isAlert && `(${loan.daysRemaining} días)`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Barra sutil de progreso temporal */}
                <div className="w-full h-1.5 bg-[#2a2d38] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isAlert
                        ? 'bg-gradient-to-r from-amber-500 to-primary-container'
                        : 'bg-emerald-500/80'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Acciones */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <span className="font-body-sm text-body-sm text-white/40 text-xs">
                    {loan.renewable ? 'Máx. 1 renovación' : 'Ubicación: Sala Central (Est. 4B)'}
                  </span>
                  {loan.renewable ? (
                    <button
                      className="px-3.5 py-2 bg-primary-container hover:bg-primary text-white rounded-xl font-label-md text-label-md flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      onClick={() => handleRenew(loan.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">autorenew</span>
                      <span>Renovar (15 días)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleGoToBook(loan.bookId)}
                      className="px-3.5 py-2 bg-[#262934] hover:bg-[#303442] text-white/90 rounded-xl font-label-md text-label-md flex items-center gap-1 transition-colors"
                      type="button"
                    >
                      <span>Detalles</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contenedor Pestaña 2: Reservas Pendientes */}
      {activeTab === 'reservas' && (
        <div className="space-y-4">
          {reservations.length === 0 ? (
            <div className="p-8 text-center bg-[#1d2029] rounded-2xl border border-white/5">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">bookmark_border</span>
              <p className="font-headline-sm text-white">No tienes reservas activas</p>
              <button
                onClick={() => onNavigate('catalogo')}
                className="mt-3 px-4 py-2 bg-primary-container text-white rounded-xl text-xs font-semibold"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="bg-[#1d2029] border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold">¡Casi listo!</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 border border-secondary/30 text-secondary font-label-sm text-[11px]">
                    Turno #{res.queuePosition} en cola
                  </span>
                </div>

                <div className="flex gap-3.5">
                  <div
                    onClick={() => handleGoToBook(res.bookId)}
                    className="w-16 h-24 rounded-lg overflow-hidden shrink-0 shadow-md bg-black/40 ring-1 ring-white/10 cursor-pointer"
                  >
                    <img className="w-full h-full object-cover" alt={res.title} src={res.cover} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3
                      onClick={() => handleGoToBook(res.bookId)}
                      className="font-headline-sm text-headline-sm text-white truncate cursor-pointer hover:text-primary"
                    >
                      {res.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{res.author}</p>
                    <p className="font-body-sm text-body-sm text-primary mt-2">
                      Disponible para recoger <strong className="font-semibold text-white">{res.readyDate}</strong> en el mostrador principal.
                    </p>
                  </div>
                </div>

                <div className="bg-[#242732] p-2.5 rounded-xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">store</span>
                    <span className="font-body-sm text-body-sm text-white/70 text-xs">{res.pickupLocation}</span>
                  </div>
                  <button
                    onClick={() => handleCancelReservation(res.id, res.title)}
                    className="text-[11px] text-red-300 hover:text-red-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Contenedor Pestaña 3: Historial Reciente de Lecturas */}
      {activeTab === 'historial' && (
        <div className="space-y-3">
          {initialHistory.map((item) => (
            <div
              key={item.id}
              className="bg-[#1d2029] border border-white/5 rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  onClick={() => handleGoToBook(item.bookId)}
                  className="w-12 h-16 rounded-md overflow-hidden shrink-0 bg-black/40 ring-1 ring-white/10 cursor-pointer"
                >
                  <img className="w-full h-full object-cover" alt={item.title} src={item.cover} />
                </div>
                <div className="min-w-0">
                  <h4
                    onClick={() => handleGoToBook(item.bookId)}
                    className="font-headline-sm text-base text-white truncate cursor-pointer hover:text-primary"
                  >
                    {item.title}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Devuelto el {item.returnedDate}
                  </p>
                  {/* Calificación por estrellas */}
                  <div className="flex items-center gap-0.5 text-primary mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-[16px]"
                        style={{
                          fontVariationSettings: star <= (item.userRating || 5) ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="font-label-sm text-[11px] text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded-md shrink-0">
                Completado
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Notificación Informativa de Sala de Lectura */}
      <div className="bg-[#1e212a] border border-white/5 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 text-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]">local_cafe</span>
        </div>
        <div className="text-xs">
          <p className="font-label-md text-label-md text-white font-medium">¿Necesitas renovar en sala?</p>
          <p className="font-body-sm text-body-sm text-white/55 mt-0.5">
            Los ejemplares físicos disponen de buzón de devolución desatendido 24h en la entrada norte de Atenea.
          </p>
        </div>
      </div>

      {/* QR Modal for Counter scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161820] border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center relative flex flex-col items-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-2xl">qr_code_2</span>
            </div>
            <h3 className="font-headline-sm text-lg text-white">Credencial de Elena Morales</h3>
            <p className="text-xs text-white/60 font-mono mt-0.5">AT-8942-B</p>
            <div className="bg-white p-4 rounded-xl shadow-2xl my-4">
              <svg className="w-40 h-40" fill="none" viewBox="0 0 29 29">
                <rect fill="#FFFFFF" height="29" width="29"></rect>
                <rect fill="#111319" height="7" width="7" x="2" y="2"></rect>
                <rect fill="#FFFFFF" height="5" width="5" x="3" y="3"></rect>
                <rect fill="#111319" height="3" width="3" x="4" y="4"></rect>
                <rect fill="#111319" height="7" width="7" x="20" y="2"></rect>
                <rect fill="#FFFFFF" height="5" width="5" x="21" y="3"></rect>
                <rect fill="#111319" height="3" width="3" x="22" y="4"></rect>
                <rect fill="#111319" height="7" width="7" x="2" y="20"></rect>
                <rect fill="#FFFFFF" height="5" width="5" x="3" y="21"></rect>
                <rect fill="#111319" height="3" width="3" x="4" y="22"></rect>
                <rect fill="#111319" height="2" width="2" x="11" y="2"></rect>
                <rect fill="#111319" height="2" width="2" x="15" y="4"></rect>
                <rect fill="#111319" height="1" width="3" x="11" y="6"></rect>
                <rect fill="#111319" height="3" width="2" x="2" y="11"></rect>
                <rect fill="#111319" height="2" width="1" x="6" y="11"></rect>
                <rect fill="#111319" height="7" width="7" x="11" y="11"></rect>
                <rect fill="#FFFFFF" height="3" width="3" x="13" y="13"></rect>
                <rect fill="#111319" height="2" width="2" x="20" y="11"></rect>
                <rect fill="#111319" height="2" width="3" x="24" y="13"></rect>
                <rect fill="#111319" height="2" width="3" x="11" y="20"></rect>
                <rect fill="#111319" height="4" width="2" x="16" y="22"></rect>
                <rect fill="#111319" height="3" width="2" x="20" y="20"></rect>
                <rect fill="#111319" height="2" width="3" x="24" y="22"></rect>
              </svg>
            </div>
            <p className="text-[11px] text-white/50">
              Presenta este código en los lectores ópticos del mostrador o kioscos de autopréstamo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
