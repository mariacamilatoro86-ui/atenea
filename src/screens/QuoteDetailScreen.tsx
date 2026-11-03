import React, { useState } from 'react';
import { ScreenType, CommunityComment } from '../types';
import { COMMUNITY_COMMENTS, MEMBER_PROFILE } from '../data/mockData';

interface QuoteDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenPostalModal: () => void;
  onToast: (msg: string, icon?: string) => void;
}

export const QuoteDetailScreen: React.FC<QuoteDetailScreenProps> = ({
  onBack,
  onNavigate,
  onOpenPostalModal,
  onToast
}) => {
  const [likes, setLikes] = useState(86);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<CommunityComment[]>(COMMUNITY_COMMENTS);
  const [newCommentInput, setNewCommentInput] = useState('');

  const toggleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      onToast('Añadido a tus citas predilectas', 'favorite');
    } else {
      setLikes(likes - 1);
      setLiked(false);
      onToast('Eliminado de predilectas', 'favorite_border');
    }
  };

  const toggleSave = () => {
    setSaved(!saved);
    onToast(
      !saved ? 'Cita archivada en tu Colección Atenea' : 'Retirada de tu archivo',
      !saved ? 'bookmark' : 'bookmark_remove'
    );
  };

  const handleSendComment = () => {
    if (!newCommentInput.trim()) return;

    const newComment: CommunityComment = {
      id: 'comm-' + Date.now(),
      userName: MEMBER_PROFILE.name,
      userAvatar: MEMBER_PROFILE.avatar,
      userBadge: 'Lectora Activa',
      timeAgo: 'Ahora mismo',
      content: newCommentInput.trim(),
      likes: 0,
      clubAffiliation: 'Club de Clásicos'
    };

    setComments([newComment, ...comments]);
    setNewCommentInput('');
    onToast('Tu reflexión ha sido compartida con la comunidad', 'auto_stories');
  };

  const handleToggleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const userLiked = !c.userLiked;
          return {
            ...c,
            userLiked,
            likes: userLiked ? c.likes + 1 : c.likes - 1
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-16 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Scenic Editorial Quote Card (Postal Literaria) */}
      <section className="relative w-full rounded-2xl bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] shadow-2xl border border-[#282a30] overflow-hidden mt-2 mb-4">
        {/* Ambient Backlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e07a4f]/10 via-[#191b21] to-[#0c0e14] opacity-90 pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#ffb598]/10 blur-3xl pointer-events-none" />

        <div className="relative p-5 sm:p-6 flex flex-col gap-4">
          {/* Distinctive Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 bg-[#282a30] dark:bg-[#282a30] light:bg-[#e5e2da] px-3 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#fcb887] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span className="text-[10px] font-bold text-[#fcb887] dark:text-[#fcb887] light:text-[#914722] tracking-wider uppercase">
                Cita del Mes en Atenea
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#9ea2ae] text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-[#ffb598]">edit_note</span>
              <span>234 lecturas subrayadas</span>
            </div>
          </div>

          {/* Typographic Quote Body */}
          <div className="relative mt-1">
            <span className="font-serif text-5xl text-[#ffb598]/30 leading-none select-none absolute -top-4 -left-2">
              “
            </span>
            <blockquote className="font-serif text-lg sm:text-xl text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] leading-relaxed italic pl-3 pt-2">
              Al principio fueron las palabras habladas, el aire que temblaba y se desvanecía; luego vino el junco que brotaba en las marismas del Nilo, aplastado y trenzado para atrapar el suspiro humano en una superficie tangible.
            </blockquote>
          </div>

          {/* Work Metadata & Folio Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#282a30]/50">
            <div className="flex flex-col">
              <cite className="font-serif text-base text-[#ffb598] dark:text-[#ffb598] light:text-[#914722] not-italic font-semibold">
                Irene Vallejo
              </cite>
              <span className="text-xs text-[#9ea2ae]">
                El infinito en un junco • Cap. III, pág. 142
              </span>
            </div>

            <div className="self-start sm:self-auto flex items-center gap-1 bg-[#282a30] dark:bg-[#282a30] light:bg-[#e5e2da] px-2.5 py-1 rounded border border-white/5">
              <span className="material-symbols-outlined text-[#ffb598] text-[14px]">local_library</span>
              <span className="text-[10px] font-mono text-[#dcc1b7]">Folio #IV-882</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Social Actions */}
        <div className="bg-[#14161d] dark:bg-[#14161d] light:bg-[#ebe8e0] px-4 py-3 flex items-center justify-between flex-wrap gap-2 border-t border-[#282a30]">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold ${
                liked ? 'bg-[#ffb598]/20 text-[#ffb598]' : 'bg-[#1e2029] text-[#f0ece2] hover:bg-[#282a30]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[17px] text-[#ffb598]"
                style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              <span>{likes}</span>
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e2029] hover:bg-[#282a30] text-[#f0ece2] text-xs font-semibold">
              <span className="material-symbols-outlined text-[17px] text-[#fcb887]">chat_bubble</span>
              <span>{comments.length}</span>
            </button>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs ${
                saved ? 'bg-[#1e2029] text-[#ffb598]' : 'bg-[#1e2029] text-[#9ea2ae] hover:text-white'
              }`}
            >
              <span
                className="material-symbols-outlined text-[17px]"
                style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
              <span>{saved ? 'Guardada' : 'Guardar'}</span>
            </button>
          </div>

          <button
            onClick={onOpenPostalModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>Crear Postal</span>
          </button>
        </div>
      </section>

      {/* Format Editorial for Social Networks (9:16) */}
      <div className="flex items-center justify-between p-4 mb-5 rounded-2xl bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] border border-[#282a30] shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#282a30] flex items-center justify-center flex-shrink-0 text-[#fcb887]">
            <span className="material-symbols-outlined text-[22px]">aspect_ratio</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] truncate">
              Formato Editorial para Redes
            </span>
            <span className="text-[11px] text-[#9ea2ae] truncate">
              Exporta con tipografía de imprenta clásica (9:16)
            </span>
          </div>
        </div>

        <button
          onClick={onOpenPostalModal}
          className="ml-2 px-3 py-1.5 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#ffb598] text-xs font-semibold transition-colors flex-shrink-0"
        >
          Diseñar
        </button>
      </div>

      {/* Discussion: Ecos de la Comunidad */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb598] text-[20px]">forum</span>
            <h3 className="font-serif text-lg font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
              Ecos de la Comunidad
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcb887]">
            {comments.length} Reflexiones
          </span>
        </div>

        {comments.map((c) => (
          <article
            key={c.id}
            className="flex flex-col gap-2 p-4 rounded-xl bg-[#191b21] dark:bg-[#191b21] light:bg-[#f6f3eb] border border-[#282a30] shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={c.userAvatar}
                  alt={c.userName}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17]">
                      {c.userName}
                    </span>
                    {c.userBadge && (
                      <span className="px-1.5 py-0.2 rounded bg-[#282a30] text-[#fcb887] text-[9px] font-bold">
                        {c.userBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#9ea2ae]">{c.timeAgo}</span>
                </div>
              </div>

              <button
                aria-label="Opciones"
                className="text-[#9ea2ae] hover:text-white"
              >
                <span className="material-symbols-outlined text-base">more_horiz</span>
              </button>
            </div>

            <p className="text-xs text-[#d8d4c9] dark:text-[#d8d4c9] light:text-[#1c1c17] pl-10 leading-relaxed">
              {c.content}
            </p>

            <div className="flex items-center justify-between pl-10 pt-1 text-[11px] text-[#9ea2ae]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleCommentLike(c.id)}
                  className={`flex items-center gap-1 hover:text-[#ffb598] transition-colors ${
                    c.userLiked ? 'text-[#ffb598] font-bold' : ''
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[15px] text-[#ffb598]"
                    style={{ fontVariationSettings: c.userLiked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{c.likes}</span>
                </button>

                <button
                  onClick={() => setNewCommentInput(`@${c.userName} `)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">reply</span>
                  <span>Responder</span>
                </button>
              </div>

              {c.clubAffiliation && (
                <span className="text-[10px] text-[#fcb887]">{c.clubAffiliation}</span>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Floating Bottom Input Bar for New Reflection */}
      <aside className="fixed bottom-0 left-0 right-0 p-3 bg-[#111319]/95 dark:bg-[#111319]/95 light:bg-[#fcf9f1]/95 backdrop-blur-md border-t border-[#282a30] z-40">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#282a30] flex items-center justify-center flex-shrink-0 text-[#ffb598]">
            <span className="material-symbols-outlined text-[18px]">stylus_note</span>
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={newCommentInput}
              onChange={(e) => setNewCommentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              placeholder="Escribe tu reflexión sobre este pasaje..."
              className="w-full bg-[#191b21] dark:bg-[#191b21] light:bg-[#f1eee6] text-[#f0ece2] dark:text-[#f0ece2] light:text-[#1c1c17] placeholder:text-[#9ea2ae] text-xs px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#e07a4f]"
            />
          </div>

          <button
            onClick={handleSendComment}
            aria-label="Publicar reflexión"
            className="w-10 h-10 rounded-full bg-[#e07a4f] hover:bg-[#fcb887] text-[#1a0800] flex items-center justify-center flex-shrink-0 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[19px]">send</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
