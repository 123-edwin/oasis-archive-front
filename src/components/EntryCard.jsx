import { User, MessageSquare, Calendar, Trash2, Pencil } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import oasisApi from '../api/oasisApi';

const SpotifyIcon = ({ size = 16, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="12" fill="#1DB954" />
    <path d="M17.25 16.13a.75.75 0 0 1-1.03.23c-2.82-1.73-6.38-2.12-10.59-1.15a.75.75 0 1 1-.33-1.46c4.56-1.04 8.47-.6 11.6 1.25.36.22.47.69.23 1.03zm1.48-2.7a.94.94 0 0 1-1.29.29c-3.23-2-8.16-2.59-11.98-1.4a.94.94 0 1 1-.54-1.8c4.22-1.27 9.56-.63 13.2 1.6.44.27.57.85.29 1.31zm.13-2.82C15.1 8.2 8.9 8 6.13 8.8a1.13 1.13 0 1 1-.65-2.18c3.18-.95 9.97-.73 13.56 2.02a1.13 1.13 0 0 1-1.23 1.87z" fill="#fff" />
  </svg>
);

const EntryCard = ({ entry, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);
  const canEditOrDelete = user && (user.role === 'ADMIN' || entry.userId === user.id);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar la reseña "${entry.title}"?`)) return;

    try {
      await oasisApi.delete(`/entries/${entry.id}`);
      if (onDelete) onDelete(entry.id);
      toast.success("Reseña eliminada correctamente");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message || "No se pudo eliminar la reseña";
      toast.error(errorMsg);
    }
  };
  // Formatear fecha para que se vea pro
  const date = new Date(entry.createdAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all shadow-xl">
      <div className="flex gap-4">
        {/* Lado izquierdo: Album Art */}
        <div className="shrink-0">
          <img 
            src={entry.albumArt || '/default-album.png'}
            alt={entry.title}
            className="w-20 h-20 rounded-xl object-cover shadow-lg border border-zinc-800"
          />
        </div>

        {/* Lado derecho: Contenido */}
        <div className="grow min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate leading-tight">{entry.title}</h3>
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                {entry.artistName}
                {entry.spotifyTrackId && (
                  <a
                    href={`https://open.spotify.com/track/${entry.spotifyTrackId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-green-500 transition-colors flex items-center gap-1"
                    title="Escuchar en Spotify"
                  >
                    <SpotifyIcon size={16} />
                    <span className="hidden sm:inline">Spotify</span>
                  </a>
                )}
              </p>
              {/* Rating visual */}
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className={star <= (entry.rating || 0) ? 'text-yellow-400' : 'text-zinc-700'}>★</span>
                ))}
                <span className="ml-1 text-xs text-zinc-400">{entry.rating}/5</span>
              </div>
            </div>
            <span className="text-zinc-600 flex items-center gap-1 text-[10px] uppercase font-bold flex-shrink-0 ml-2">
              <Calendar size={12} />
              {date}
            </span>
          </div>

          <div className="bg-zinc-800/50 rounded-2xl p-4 mt-3 relative">
             <MessageSquare className="absolute -top-2 -left-2 text-zinc-700" size={16} />
             <p className="text-zinc-300 text-sm italic leading-relaxed">
               "{entry.content}"
             </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
                <User size={14} />
              </div>
              <span className="text-zinc-400 text-xs font-medium">
                Publicado por <span className="text-white">{entry.user?.name || 'Anon'}</span>
              </span>
            </div>
            {canEditOrDelete && (
              <div className="flex gap-2">
                <button onClick={handleDelete} title="Eliminar" className="p-2 md:p-1 rounded-full hover:bg-red-900/60 transition-colors">
                  <Trash2 size={16} className="md:w-[18px] text-red-400" />
                </button>
                <button onClick={() => onEdit && onEdit(entry)} title="Editar" className="p-2 md:p-1 rounded-full hover:bg-yellow-900/60 transition-colors">
                  <Pencil size={16} className="md:w-[18px] text-yellow-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;