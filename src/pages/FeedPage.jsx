import { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import oasisApi from '../api/oasisApi';
import EntryCard from '../components/EntryCard';
import EntryModal from '../components/EntryModal'; // Asegúrate de importarlo
import { Loader2, Radio } from 'lucide-react';

const FeedPage = () => {
  const [allEntries, setAllEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all'); 
  const [editingEntry, setEditingEntry] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data } = await oasisApi.get('/entries');
        setAllEntries(data);
      } catch (error) {
        console.error("Error cargando el feed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const displayedEntries = useMemo(() => {
    if (tab === 'all') return allEntries;
    if (tab === 'my' && user) {
      return allEntries.filter(e => e.userId === user.id);
    }
    return [];
  }, [tab, allEntries, user]);

  const handleEditSuccess = (updatedEntry) => {
    setAllEntries(prev => prev.map(e => {
      if (e.id === updatedEntry.id) {
        // Mantenemos los datos del usuario original para no perder el nombre en la UI
        return { ...updatedEntry, user: e.user };
      }
      return e;
    }));
    // Opcional: una notificación más elegante que un alert
    console.log('Entry updated');
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-6 relative z-10">
      <div className="max-w-3xl mx-auto pt-10 pb-20">
        <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="p-3 bg-white rounded-2xl w-fit">
            <Radio className="text-black animate-pulse" size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">The Feed</h1>
            <p className="text-zinc-500 font-medium">Comunidad Oasis.</p>
          </div>
          
          <div className="flex gap-2 bg-zinc-900 p-1 rounded-full border border-zinc-800">
            <button
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${tab === 'all' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              onClick={() => setTab('all')}
            >
              Todas
            </button>
            <button
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${tab === 'my' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              onClick={() => setTab('my')}
            >
              Mías
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-white" size={40} />
          </div>
        ) : (
          <div className="space-y-6">
            {displayedEntries.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                <p className="text-zinc-600">No hay reseñas para mostrar en esta sección.</p>
              </div>
            ) : (
              <>
                {displayedEntries.map(entry => (
                  <EntryCard 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={(id) => setAllEntries(prev => prev.filter(e => e.id !== id))}
                    onEdit={(entry) => setEditingEntry(entry)}
                  />
                ))}

                {editingEntry && (
                  <EntryModal
                    initialData={editingEntry}
                    track={{
                      name: editingEntry.trackName,
                      coverArt: editingEntry.albumArt
                    }}
                    onClose={() => setEditingEntry(null)}
                    onSuccess={handleEditSuccess}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;