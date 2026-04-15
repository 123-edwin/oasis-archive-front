import { useState } from 'react';
import { X, Send } from 'lucide-react';
import oasisApi from '../api/oasisApi';


const StarRating = ({ rating, setRating, disabled }) => (
  <div className="flex items-center gap-1 mb-4">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={disabled}
        onClick={() => setRating(star)}
        className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-zinc-600'} ${disabled ? 'opacity-50' : 'hover:text-yellow-300'}`}
        aria-label={`Calificar con ${star} estrella${star > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ))}
    <span className="ml-2 text-sm text-zinc-400">{rating}/5</span>
  </div>
);

const EntryModal = ({ track, onClose, onSuccess, initialData = null }) => {
  // Si hay initialData, usamos sus valores, si no, valores por defecto
  const [content, setContent] = useState(initialData?.content || '');
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [loading, setLoading] = useState(false);

  const isEditing = !!initialData; // Booleano para saber el modo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // MODO EDICIÓN
            const { data } = await oasisApi.put(`/entries/${initialData.id}`, {
          content,
          rating
        });
        onSuccess(data); // Pasamos la data actualizada para el estado local
      } else {
        // MODO CREACIÓN
        await oasisApi.post('/entries', {
          title: `Reseña de ${track.name}`,
          content,
          rating,
          spotifyTrackId: track.spotifyId,
          albumArt: track.coverArt
        });
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error en la operación:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header con imagen del track */}
        <div className="relative h-32 bg-zinc-800">
          <img 
            src={track.coverArt} 
            alt={track.name} 
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-6 left-8 flex items-end gap-4">
            <img 
              src={track.coverArt} 
              alt={track.name} 
              className="w-24 h-24 rounded-xl shadow-2xl border-2 border-zinc-900 object-cover"
            />
            <div className="mb-2">
              <h2 className="text-xl font-bold text-white truncate max-w-50">{track.name}</h2>
              <p className="text-zinc-400 text-sm">{track.artist}</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8 pt-12">
          <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">
            ¿Qué opinas de este track?
          </label>
          <StarRating rating={rating} setRating={setRating} disabled={loading} />
          <textarea
            required
            autoFocus
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-white min-h-40 resize-none transition-all"
            placeholder="Escribe tu reseña aquí... 'Definitely Maybe' vibe only."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading || !content.trim() || !rating}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'GUARDANDO...' : (
                <>
                  <Send size={18} /> {isEditing ? 'ACTUALIZAR RESEÑA' : 'PUBLICAR RESEÑA'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;