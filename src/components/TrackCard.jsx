import { Star, Plus } from 'lucide-react';

const TrackCard = ({ track, onAddFavorite, onAddEntry }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all group">
      <img 
        src={track.coverArt} 
        alt={track.name} 
        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="p-4">
        <h3 className="text-white font-bold truncate">{track.name}</h3>
        <p className="text-zinc-400 text-sm truncate">{track.album}</p>
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => onAddFavorite(track)}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-yellow-500 transition-colors"
            title="Agregar a favoritos"
          >
            <Star size={20} />
          </button>
          <button 
            onClick={() => onAddEntry(track)}
            className="flex items-center gap-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-colors"
          >
            <Plus size={14} /> RESEÑAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;