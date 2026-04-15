import { useState, useEffect } from 'react';
import oasisApi from '../api/oasisApi';
import { Star, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const { data } = await oasisApi.get('/favorites');
      setFavorites(data);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`¿Eliminar "${name}" de tus favoritos?`)) return;

    try {
      await oasisApi.delete(`/favorites/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      toast.error(error?.message || "No se pudo eliminar el favorito");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative z-10">
      <div className="animate-pulse text-zinc-500 font-bold tracking-widest uppercase">Cargando Colección...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-6 relative z-10">
      <div className="max-w-6xl mx-auto pt-10">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">Mis Favoritos</h1>
            <p className="text-zinc-500 mt-2 font-medium">Tu curación personal de la discografía de Oasis.</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold">{favorites.length}</span>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Tracks Guardados</p>
          </div>
        </header>

        {favorites.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <Star className="mx-auto text-zinc-800 mb-4" size={60} />
            <p className="text-zinc-500 text-xl">Aún no tienes canciones favoritas.</p>
            <p className="text-zinc-600 text-sm mt-2">Ve al buscador y empieza a armar tu archivo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {favorites.map((fav) => (
              <div 
                key={fav.id} 
                className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 p-2 md:p-4 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-3 md:gap-6 min-w-0">
                  <img 
                    src={fav.albumArt} 
                    alt={fav.trackName}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover shadow-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm md:text-lg leading-none truncate">{fav.trackName}</h3>
                    <p className="text-zinc-500 text-xs md:text-sm mt-1 truncate">{fav.artistName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a 
                    href={`https://open.spotify.com/track/${fav.spotifyTrackId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-green-500 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => handleDelete(fav.id, fav.trackName)}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;