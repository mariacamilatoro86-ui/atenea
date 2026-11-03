import React, { useState } from 'react';
import { CulturalEvent, Book, ScreenType } from '../types';
import { initialCulturalEvents, mockBooks } from '../data/mockData';

interface CommunityScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectBook: (book: Book) => void;
  onShowToast: (msg: string) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  onNavigate,
  onSelectBook,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [isEnrolledInClub, setIsEnrolledInClub] = useState<boolean>(false);
  const [clubSeats, setClubSeats] = useState<number>(4);
  const [reservedEvents, setReservedEvents] = useState<Record<string, boolean>>({});
  const [reviewsLikes, setReviewsLikes] = useState<Record<string, { count: number; liked: boolean }>>({
    r1: { count: 12, liked: false },
    r2: { count: 18, liked: false },
    r3: { count: 9, liked: false },
  });
  const [showProposeModal, setShowProposeModal] = useState<boolean>(false);
  const [proposalForm, setProposalForm] = useState({
    title: '',
    category: 'Club de lectura',
    description: '',
  });

  const days = [
    { name: 'LUN', num: 14, hasDot: false },
    { name: 'MAR', num: 15, hasDot: true, dotColor: 'bg-secondary' },
    { name: 'MIÉ', num: 16, hasDot: false },
    { name: 'JUE', num: 17, hasDot: true, dotColor: 'bg-primary-fixed' },
    { name: 'VIE', num: 18, hasDot: true, dotColor: 'bg-tertiary' },
    { name: 'SÁB', num: 19, hasDot: true, dotColor: 'bg-primary' },
    { name: 'DOM', num: 20, hasDot: false },
  ];

  const handleEnrollClub = () => {
    if (isEnrolledInClub) {
      setIsEnrolledInClub(false);
      setClubSeats((prev) => prev + 1);
      onShowToast('Te has desinscrito del Club de Lectura de Pedro Páramo');
    } else {
      setIsEnrolledInClub(true);
      setClubSeats((prev) => Math.max(0, prev - 1));
      onShowToast('¡Inscripción confirmada! Te esperamos el Jueves 17 a las 18:30h');
    }
  };

  const handleToggleReserve = (eventId: string, title: string) => {
    const isReserved = !!reservedEvents[eventId];
    setReservedEvents((prev) => ({ ...prev, [eventId]: !isReserved }));
    if (!isReserved) {
      onShowToast(`Plaza reservada para «${title}»`);
    } else {
      onShowToast(`Reserva cancelada para «${title}»`);
    }
  };

  const handleToggleLikeReview = (id: string) => {
    setReviewsLikes((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return {
        ...prev,
        [id]: {
          liked: !cur.liked,
          count: cur.liked ? cur.count - 1 : cur.count + 1,
        },
      };
    });
  };

  const handleOpenPedroParamo = () => {
    const paramoBook = mockBooks.find((b) => b.title.includes('Páramo')) || mockBooks[0];
    onSelectBook(paramoBook);
    onNavigate('detalle-libro');
  };

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.title.trim()) return;
    onShowToast(`Iniciativa «${proposalForm.title}» enviada a los bibliotecarios para revisión.`);
    setShowProposeModal(false);
    setProposalForm({ title: '', category: 'Club de lectura', description: '' });
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-6">
      {/* Encabezado con selector de agenda mensual */}
      <section className="flex flex-col pt-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
              Agenda Cultural
            </span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
              Octubre 2024
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-[#1d1f26] border border-[#282a30] px-1 py-1 rounded-full shadow-sm">
            <button
              onClick={() => onShowToast('Mostrando semana 2 de Octubre')}
              aria-label="Mes anterior"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="font-label-md text-label-md text-on-surface px-1">Semana 3</span>
            <button
              onClick={() => onShowToast('Mostrando semana 4 de Octubre')}
              aria-label="Mes siguiente"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carrusel horizontal de días */}
        <div className="flex gap-2 overflow-x-auto py-2 -mx-4 px-4 no-scrollbar scroll-smooth">
          {days.map((day) => {
            const isActive = selectedDay === day.num;
            return (
              <button
                key={day.num}
                onClick={() => setSelectedDay(day.num)}
                className={`flex flex-col items-center justify-center min-w-[50px] py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'min-w-[54px] bg-gradient-to-b from-[#e07a4f] to-[#b05f38] text-white shadow-lg shadow-orange-950/40 border border-[#ffb598]/30 scale-105'
                    : 'bg-[#1a1c24] border border-[#282a30]/60 hover:bg-[#282a30] text-on-surface-variant'
                }`}
                type="button"
              >
                <span
                  className={`font-label-sm text-label-sm ${
                    isActive ? 'text-primary-fixed font-semibold' : 'opacity-60'
                  }`}
                >
                  {day.name}
                </span>
                <span
                  className={`font-headline-sm text-headline-sm mt-0.5 ${
                    isActive ? 'font-bold text-white' : 'text-on-surface'
                  }`}
                >
                  {day.num}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    isActive
                      ? 'bg-primary-fixed shadow-sm'
                      : day.hasDot
                      ? day.dotColor || 'bg-secondary'
                      : 'bg-transparent'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filtros Temáticos con Chips */}
      <section className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'clubes', label: 'Clubes de lectura' },
          { id: 'talleres', label: 'Talleres infantiles' },
          { id: 'autores', label: 'Encuentro con autores' },
          { id: 'cine', label: 'Cine fórum' },
        ].map((chip) => {
          const isSelected = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveCategory(chip.id)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-sm whitespace-nowrap flex items-center gap-1 transition-colors ${
                isSelected
                  ? 'bg-primary-container text-white border border-primary/40'
                  : 'bg-[#1e212b] border border-[#282a30] text-on-surface-variant hover:text-primary hover:border-outline-variant'
              }`}
            >
              {isSelected && (
                <span className="material-symbols-outlined text-[16px]">done</span>
              )}
              {chip.label}
            </button>
          );
        })}
      </section>

      {/* Sección destacada: Club de Lectura del Mes */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Club de Lectura del Mes
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary bg-secondary-container/60 border border-outline-variant/40 px-2.5 py-0.5 rounded-full">
            Destacado
          </span>
        </div>

        <div className="bg-[#1e212b] border border-[#282a30] rounded-xl p-4 shadow-lg shadow-black/30 flex flex-col gap-4">
          <div className="flex gap-3.5 items-start">
            <div
              onClick={handleOpenPedroParamo}
              className="relative w-24 h-36 rounded-lg overflow-hidden shrink-0 shadow-md bg-[#191b21] ring-1 ring-white/10 cursor-pointer hover:opacity-95"
            >
              <img
                className="w-full h-full object-cover"
                alt="Pedro Páramo por Juan Rulfo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjPIeQ1RMKezK6gpntjrVNCPWe5ykCL1zk9uTrjaWlvKebuyWFpK0lEiIgECehTOAp935FilwiGaPj1YRsjE7oBwl1b33nov36M9ClCW5xOtL6CRYzSa0YYrZbDoJQ5VOcmuZgSHh9R3PTH9QVvvqWXlYNshEt4leWybVZNBudtd6oA6499EVlSIZA4Z6Kpf5Vnwq-Q8vPseaDepElW3B0SIpKMWv4FiWR_lA3zHCODa6YzS5V0CacTA"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-1.5 text-center">
                <span className="font-label-sm text-label-sm text-tertiary text-[10px]">Novela</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="font-label-sm text-label-sm text-primary tracking-wide uppercase">
                  Círculo Literario
                </span>
                <span
                  className={`border font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isEnrolledInClub
                      ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                      : 'bg-[#4a1c1d] border-error/30 text-error'
                  }`}
                >
                  {isEnrolledInClub ? 'Inscrito' : `Quedan ${clubSeats} plazas`}
                </span>
              </div>
              <h3
                onClick={handleOpenPedroParamo}
                className="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5 truncate cursor-pointer hover:text-primary transition-colors"
              >
                Pedro Páramo
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Juan Rulfo</p>
              <div className="mt-2.5 flex items-center gap-1.5 text-secondary">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                <p className="font-label-md text-label-md leading-tight text-on-surface">
                  Jueves 17 Oct, 18:30h
                </p>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] truncate">
                  Sala Polivalente &amp; Google Meet
                </p>
              </div>
            </div>
          </div>

          {/* Moderador y Comunidad */}
          <div className="bg-[#161820] border border-[#282a30]/80 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                alt="Prof. Mario Valenzuela"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBUMFR8aag3_MGgtyXIp8iBleprysA2oiek5paWG2H6iAnxkjQSKFHvBSqQBWED2SlfLIq9POJMiTKshRk0w1wUug5WZ85TDoo4oazO0KaUoEyo8Fc0VE4eQ1bmKFo-awtPOt35H628DJsnsfQRBmVGEQuL1zDajma8tU1MuNzyM5A3C_WwEhMHGMV9QfJBfjlznGFsFFSJDVTibFv2i1jW0x4qyXmMMYnsODk6JN6FJhRbP9VWGRshQ"
              />
              <div className="flex flex-col truncate">
                <span className="font-label-sm text-label-sm text-on-surface leading-tight truncate">
                  Prof. Mario Valenzuela
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                  Moderador residente
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant shrink-0 pl-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary">group</span>
              <span className="font-label-md text-label-md text-on-surface">
                {isEnrolledInClub ? '25 inscritos' : '24 inscritos'}
              </span>
            </div>
          </div>

          <button
            onClick={handleEnrollClub}
            className={`w-full py-2.5 px-4 rounded-lg font-label-lg text-label-lg shadow-md transition-all flex items-center justify-center gap-2 border ${
              isEnrolledInClub
                ? 'bg-[#282a30] text-emerald-300 border-emerald-500/30'
                : 'bg-primary-container hover:bg-[#b05f38] text-white shadow-orange-950/30 border-primary/20'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isEnrolledInClub ? 'check_circle' : 'how_to_reg'}
            </span>
            <span>{isEnrolledInClub ? 'Inscrito (Cancelar inscripción)' : 'Inscribirme gratis'}</span>
          </button>
        </div>
      </section>

      {/* Lista de Próximos Eventos y Talleres */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              calendar_month
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Próximas Actividades
            </h2>
          </div>
          <button
            onClick={() => onShowToast('Catálogo de 12 eventos de Octubre')}
            className="font-label-md text-label-md text-primary hover:underline"
          >
            Ver todas (12)
          </button>
        </div>

        <div className="space-y-3">
          {/* Evento 1: Encuadernación */}
          <article className="bg-[#1e212b] border border-[#282a30] rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5">
            <div className="flex gap-3">
              <div className="w-14 h-16 rounded-lg bg-[#161820] border border-[#282a30] flex flex-col items-center justify-center text-center shrink-0">
                <span className="font-label-sm text-label-sm text-primary uppercase">SÁB</span>
                <span className="font-headline-md text-headline-md text-on-surface leading-none mt-0.5">
                  19
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">11:00h</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-[#242b26] border border-emerald-900/40 text-[#a8deb5] font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                    Presencial · Cupos limitados
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-1">
                  Taller de Encuadernación Artesanal Japonesa
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                  Aprende costura Yotsume Toji. Incluye papel washi y herramientas.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-on-surface-variant text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-tertiary">handyman</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Materiales incluidos
                </span>
              </div>
              <button
                onClick={() =>
                  handleToggleReserve('encuadernacion', 'Taller de Encuadernación Japonesa')
                }
                className={`font-label-md text-label-md px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border ${
                  reservedEvents['encuadernacion']
                    ? 'bg-emerald-900/40 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#282a30] hover:bg-[#33353b] text-on-surface hover:text-primary border-outline-variant/30'
                }`}
                type="button"
              >
                <span>{reservedEvents['encuadernacion'] ? 'Plaza reservada' : 'Reservar plaza'}</span>
                <span className="material-symbols-outlined text-[14px]">
                  {reservedEvents['encuadernacion'] ? 'check' : 'arrow_forward'}
                </span>
              </button>
            </div>
          </article>

          {/* Evento 2: Mesa redonda */}
          <article className="bg-[#1e212b] border border-[#282a30] rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5">
            <div className="flex gap-3">
              <div className="w-14 h-16 rounded-lg bg-[#161820] border border-[#282a30] flex flex-col items-center justify-center text-center shrink-0">
                <span className="font-label-sm text-label-sm text-primary uppercase">MIÉ</span>
                <span className="font-headline-md text-headline-md text-on-surface leading-none mt-0.5">
                  23
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">19:00h</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-[#2a2720] border border-amber-900/40 text-secondary font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                    Mesa Redonda
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Auditorio Mayor
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-1">
                  Literatura fantástica contemporánea
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                  Debate abierto con 3 autores invitados y sesión de firmas.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center -space-x-2">
                <img
                  className="w-6 h-6 rounded-full object-cover shadow-sm ring-1 ring-[#1e212b]"
                  alt="Clara Ortiz"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANyEPs91hJgipL0QA2pIwURXzGuIpKLpUGo6HpBAT5ZpMVLxZC9pY0B7S4lMWvE2EeBzlkguJ1KaRzl8iZXnu2lmCQ31I86NTzeL4K9qhC_eH8xaOGWm8bbQCOoO-FJOdZoiEWNixUSaCJLGq0xklSL2V2KrfKsEv7eY9dx1WUUNPeGNiuJBIHzR3VyRaMgqhTCnIbvs003-bKTreesER1C9RxJXE3sYp8PF1UDc-07ERPgIe0whCo8g"
                />
                <img
                  className="w-6 h-6 rounded-full object-cover shadow-sm ring-1 ring-[#1e212b]"
                  alt="Diego Mendez"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT4muGFmk9otVKRAmrp8tkUvRI3sLxglLOQ-9M1XQOrS6gYbGaBj7GoMhzUPoCogMg3pJNO205Z3DkDlf0pjkrqTWWQeqUh8u86OfldU7qSRPVt5FcCSXHupEF0qiqwpcSZQTM05Wla4-v7WQL3Sl79X8btYUlL4HzAiBcAmQw1L6DBrS4t8hnD7wjH8miC8L303i98HlZzQ7SwxqO6WQvxL9AxO-T__A63fA4DfVYCZBqFVbs_ns6xA"
                />
                <img
                  className="w-6 h-6 rounded-full object-cover shadow-sm ring-1 ring-[#1e212b]"
                  alt="Sofia Leiva"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tZ9aHUEIuSqiM8fQJQQjaQC5shAoqeNXUqu8Q_ehA7RSQAoq_MfNgt1RQWoRwLZkLyLtvIwi_UsvZLKQmsX6Hnik7NOssC6d2Bqw9lIa63BMFlCxKflQxqTRPk6Rwr_il633WU3y2kIkYXttZxZ9ovRFdG75zWlNITWbCmYZmR2dvevS1AAC1yqx3TmwlTAnvLRjiO7oKoj2-0BY-E6-J0Zy4GjXZHmJEN74L_F1ZTy1ZoeCdvuQ"
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant pl-3">
                  3 autores invitados
                </span>
              </div>
              <button
                onClick={() => handleToggleReserve('fantastica', 'Literatura fantástica contemporánea')}
                className={`font-label-md text-label-md px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border ${
                  reservedEvents['fantastica']
                    ? 'bg-emerald-900/40 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#282a30] hover:bg-[#33353b] text-on-surface hover:text-primary border-outline-variant/30'
                }`}
                type="button"
              >
                <span>{reservedEvents['fantastica'] ? 'Inscrito' : 'Asistir'}</span>
                <span className="material-symbols-outlined text-[14px]">
                  {reservedEvents['fantastica'] ? 'check' : 'arrow_forward'}
                </span>
              </button>
            </div>
          </article>

          {/* Evento 3: Infantil */}
          <article className="bg-[#1e212b] border border-[#282a30] rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5">
            <div className="flex gap-3">
              <div className="w-14 h-16 rounded-lg bg-[#161820] border border-[#282a30] flex flex-col items-center justify-center text-center shrink-0">
                <span className="font-label-sm text-label-sm text-primary uppercase">DOM</span>
                <span className="font-headline-md text-headline-md text-on-surface leading-none mt-0.5">
                  27
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant">12:00h</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-[#38231c] border border-orange-900/40 text-primary font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                    Familiar · 4 a 9 años
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Rincón del Cuento
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-1">
                  La Hora del Cuento: Fábulas mitológicas
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                  Narración oral teatralizada con títeres de sombras y títeres de dedos.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-on-surface-variant text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">child_care</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Acceso libre sin reserva previa
                </span>
              </div>
              <button
                onClick={() =>
                  onShowToast('Actividad familiar libre en Sala Infantil · Rincón del Cuento')
                }
                className="bg-[#282a30] hover:bg-[#33353b] text-on-surface hover:text-primary font-label-md text-label-md px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-outline-variant/30"
                type="button"
              >
                <span>Detalles</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Foro y Retos de Lectura Comunitarios */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Retos &amp; Comunidad
            </h2>
          </div>
          <button
            onClick={() => onShowToast('¡Llevas 14 de 25 libros leídos en 2024!')}
            className="font-label-md text-label-md text-secondary hover:text-primary flex items-center gap-0.5"
            type="button"
          >
            <span>Mi progreso</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Tarjeta del Reto Anual */}
        <div className="bg-gradient-to-br from-[#1e212b] to-[#151720] border border-[#282a30] rounded-xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                Reto Anual Atenea
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-0.5">
                25 libros en 2024
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Llevamos 4,812 lecturas registradas entre 380 lectores.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#38231c] border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">emoji_events</span>
            </div>
          </div>

          {/* Barra de progreso comunitario */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">Progreso colectivo</span>
              <span className="text-primary font-bold">76% del objetivo anual</span>
            </div>
            <div className="w-full h-2.5 bg-[#101217] rounded-full overflow-hidden border border-[#282a30]">
              <div
                className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(255,181,152,0.35)]"
                style={{ width: '76%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-body-sm text-[12px] text-on-surface-variant pt-1">
              <span>
                Tu aporte actual: <strong className="text-on-surface">14 libros</strong>
              </span>
              <span className="text-tertiary flex items-center gap-0.5 font-medium">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> ¡Vas por delante!
              </span>
            </div>
          </div>
        </div>

        {/* Muro de Recomendaciones de Miembros */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-label-lg text-label-lg text-on-surface">Ecos de Lectura</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              De la comunidad hoy
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
            {/* Recomendación 1 */}
            <div className="min-w-[240px] max-w-[240px] bg-[#1e212b] border border-[#282a30] rounded-xl p-3 shadow-sm flex flex-col justify-between hover:border-outline-variant/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
                    alt="Elena R."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxL447WiaRp0EF2nTARdfiIzMnd7TnIEDwjqBnTcI7OpLXHPcHroIF13qtpfS1HiITmS7UOh1uArnQzuI4dOWILMj_lD0BIeJQGLAg62zMpwPrpP9aTmpphGKBb5SGVkNd0KhQ7IP9yveBI4O_W92a-o7aTVJghYCy3d7ydG4ddgu5KHd_P3H4ldMGE1w0uwwno6aE_d4XeIv1jDedFw_m7ddaz7D1QFgkzRHnhVEf9roZvecb01tGAg"
                  />
                  <span className="font-label-md text-label-md text-on-surface truncate">Elena R.</span>
                  <span className="text-primary text-[11px] ml-auto">★★★★★</span>
                </div>
                <p className="font-display-lg italic text-[14px] leading-snug text-[#dcc1b7] line-clamp-3">
                  "«Los desposeídos» de Le Guin me cambió la perspectiva sobre la utopía. ¡Lectura obligatoria!"
                </p>
              </div>
              <div className="mt-3 pt-2 flex items-center justify-between text-on-surface-variant border-t border-[#282a30]/60">
                <span className="font-label-sm text-label-sm text-[11px] text-primary">
                  Los desposeídos
                </span>
                <button
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    reviewsLikes['r1']?.liked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => handleToggleLikeReview('r1')}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: reviewsLikes['r1']?.liked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{reviewsLikes['r1']?.count || 12}</span>
                </button>
              </div>
            </div>

            {/* Recomendación 2 */}
            <div className="min-w-[240px] max-w-[240px] bg-[#1e212b] border border-[#282a30] rounded-xl p-3 shadow-sm flex flex-col justify-between hover:border-outline-variant/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
                    alt="Carlos V."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfdlobaQs7NhNSiDOycTW9fdZ1s9WEXoela36RQ9bSCtp8VkDZyFlJD5e26bwooKWJm5iT48NqcifZpxN-VJkNmC-k-y8qlJzrfgnBEBAHLNierYPdNAL5iN_3xwL8yKDHI3swVJY_X_knJ2LwbgrzKnJQLYoNqvhuYWoNyB2NzQiKmhgaoU6rBCJbmc7Dh2ZdBkzP9KltGSG4YS3jTjDSJ7YrIluMaj2qk79BBPuL_2Cxn6ICGVrqLw"
                  />
                  <span className="font-label-md text-label-md text-on-surface truncate">Carlos V.</span>
                  <span className="text-primary text-[11px] ml-auto">★★★★★</span>
                </div>
                <p className="font-display-lg italic text-[14px] leading-snug text-[#dcc1b7] line-clamp-3">
                  "El club de Rulfo es ideal para releer Pedro Páramo. Cada página tiene un secreto enterrado."
                </p>
              </div>
              <div className="mt-3 pt-2 flex items-center justify-between text-on-surface-variant border-t border-[#282a30]/60">
                <span className="font-label-sm text-label-sm text-[11px] text-primary">Pedro Páramo</span>
                <button
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    reviewsLikes['r2']?.liked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => handleToggleLikeReview('r2')}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: reviewsLikes['r2']?.liked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{reviewsLikes['r2']?.count || 18}</span>
                </button>
              </div>
            </div>

            {/* Recomendación 3 */}
            <div className="min-w-[240px] max-w-[240px] bg-[#1e212b] border border-[#282a30] rounded-xl p-3 shadow-sm flex flex-col justify-between hover:border-outline-variant/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
                    alt="Beatriz M."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgZC2ujfqXMq57Ty85Qd_lg0vA0UI-RQlWNELaz4ys6-I80E4j9CpRHAcoNM8hTtzEHRIxVRtkyCpuUXCyfRmNXoLYYZjCS1gJgLXvmvKuHHQWEz5wL-RjtqYapcnfYKhOWrzuKjvJBapMjXKCVQG5XN7DCgauoNgmKVyVwUaJpaWOFj-V3LDYlaXG2dy5BxOi75P4UtiF21ja-94IGTbDo9hY5CXrZc76XId0NvUYVFqS9cayuddcLg"
                  />
                  <span className="font-label-md text-label-md text-on-surface truncate">Beatriz M.</span>
                  <span className="text-primary text-[11px] ml-auto">★★★★☆</span>
                </div>
                <p className="font-display-lg italic text-[14px] leading-snug text-[#dcc1b7] line-clamp-3">
                  "El taller de encuadernación del año pasado fue mágico. ¡No dejen pasar los cupos de este sábado!"
                </p>
              </div>
              <div className="mt-3 pt-2 flex items-center justify-between text-on-surface-variant border-t border-[#282a30]/60">
                <span className="font-label-sm text-label-sm text-[11px] text-primary">Encuadernación</span>
                <button
                  className={`flex items-center gap-1 text-[11px] transition-colors ${
                    reviewsLikes['r3']?.liked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => handleToggleLikeReview('r3')}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: reviewsLikes['r3']?.liked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{reviewsLikes['r3']?.count || 9}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón de acción para proponer club o actividad */}
      <section className="bg-[#1e212b] border border-[#282a30] rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#38231c] border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[20px]">add_comment</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-[16px] text-on-surface leading-tight">
              ¿Tienes una iniciativa literaria?
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Propón un nuevo club de lectura o taller en Atenea.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowProposeModal(true)}
          className="bg-[#282a30] border border-outline-variant/30 text-on-surface hover:text-primary px-3 py-2 rounded-lg font-label-md text-label-md transition-colors shrink-0"
          type="button"
        >
          Proponer
        </button>
      </section>

      {/* Modal para proponer iniciativa */}
      {showProposeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#191b21] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowProposeModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
              <h3 className="font-headline-sm text-lg text-white">Proponer Iniciativa</h3>
            </div>
            <p className="text-xs text-white/70 mb-4">
              Envía tu propuesta para que el equipo curatorial de Atenea te ayude a coordinar la sala física o enlace virtual.
            </p>
            <form onSubmit={handleProposeSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-primary font-medium block mb-1">Título de la actividad</label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Club de Poesía Hispanoamericana"
                  value={proposalForm.title}
                  onChange={(e) => setProposalForm({ ...proposalForm, title: e.target.value })}
                  className="w-full bg-[#111319] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-primary font-medium block mb-1">Tipo de actividad</label>
                <select
                  value={proposalForm.category}
                  onChange={(e) => setProposalForm({ ...proposalForm, category: e.target.value })}
                  className="w-full bg-[#111319] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option>Club de lectura</option>
                  <option>Taller de escritura</option>
                  <option>Mesa redonda / Debate</option>
                  <option>Actividad infantil / juvenil</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-primary font-medium block mb-1">Breve descripción</label>
                <textarea
                  rows={3}
                  placeholder="Objetivos, lecturas sugeridas, periodicidad..."
                  value={proposalForm.description}
                  onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                  className="w-full bg-[#111319] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProposeModal(false)}
                  className="flex-1 py-2 rounded-lg bg-[#282a30] text-white/80 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-colors"
                >
                  Enviar Propuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
