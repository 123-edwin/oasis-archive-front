import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import oasisApi from '../api/oasisApi';
import TrackCard from '../components/TrackCard';
import useDebounce from '../hooks/useDebounce';
import { Search, Loader2 } from 'lucide-react';
import EntryModal from '../components/EntryModal';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const debouncedQuery = useDebounce(query, 600);

    const searchTracks = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setTracks([]);
            return;
        }

        setLoading(true);
        try {
            const { data } = await oasisApi.get(`/entries/search?q=${encodeURIComponent(searchTerm)}`);
            setTracks(data);
        } catch (error) {
            console.error('Error buscando tracks', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (track) => {
        setSelectedTrack(track);
        setShowModal(true);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        await searchTracks(query);
    };

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setTracks([]);
            return;
        }

        searchTracks(debouncedQuery);
    }, [debouncedQuery]);

    // Guardar favorito en la base de datos
    const handleAddFavorite = async (track) => {
        try {
            const payload = {
                spotifyId: track.spotifyId || track.id,
                name: track.name,
                artist: track.artist || track.artistName,
                coverArt: track.coverArt || track.albumArt
            };
            await oasisApi.post('/favorites', payload);
            toast.success('¡Agregado a favoritos! ⭐');
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'No se pudo agregar a favoritos');
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white p-6 relative z-10">
            {/* Buscador Superior */}
            <div className="max-w-4xl mx-auto pt-10">
                <h1 className="text-4xl font-black tracking-tighter mb-8 uppercase">Explora el Archivo</h1>

                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Busca una canción (ej. Supersonic)..."
                        className="w-full bg-zinc-900/80 backdrop-blur border border-zinc-800 py-4 px-6 pl-14 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200"
                    >
                        BUSCAR
                    </button>
                </form>

                {/* Resultados */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-zinc-500" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-20">
                        {tracks.map(track => (
                            <TrackCard
                                key={track.spotifyId}
                                track={track}
                                onAddFavorite={handleAddFavorite}
                                onAddEntry={handleOpenModal}
                            />
                        ))}
                    </div>
                )}
            </div>
            {showModal && selectedTrack && (
                <EntryModal
                    track={selectedTrack}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => toast.success('¡Reseña publicada con éxito! 🎸')}
                />
            )}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" style={{ zIndex: 9000, marginTop: '70px' }} />
        </div>
    );
};

export default SearchPage;