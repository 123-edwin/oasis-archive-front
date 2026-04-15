import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { UserPlus, Disc } from 'lucide-react';
import oasisApi from '../api/oasisApi';
import video1 from '../assets/1.webm';
import video2 from '../assets/2.webm';
import video3 from '../assets/3.webm';

const RegisterPage = () => {
    const { login } = useContext(AuthContext); // Usamos login para entrar auto después de registrar
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videos = [video1, video2, video3];
    const { name, email, password } = formData;

    useEffect(() => {
        const handleVideoEnd = () => {
            setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        };

        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('ended', handleVideoEnd);
            return () => videoElement.removeEventListener('ended', handleVideoEnd);
        }
    }, [videos.length]);

    const onChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1. Registrar al usuario en el backend
            await oasisApi.post('/auth/register', { name, email, password });

            // 2. Hacer login automático para que entre directo al archivo
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la cuenta');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
            <video
                ref={videoRef}
                key={videos[currentVideoIndex]}
                src={videos[currentVideoIndex]}
                autoPlay
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
            />
            <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-2xl border border-zinc-800 shadow-2xl relative z-10">

                <div className="text-center">
                    <div className="flex justify-center">
                        <Disc className="h-12 w-12 text-white animate-spin-slow" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tighter uppercase">
                        Únete al Archivo
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400"> Crea tu cuenta para empezar a reseñar </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
                        placeholder="Contraseña"
                        value={password}
                        onChange={onChange}
                    />

                    {error && (
                        <div className="bg-red-900/20 border border-red-900 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none transition-colors uppercase tracking-widest disabled:opacity-50"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <UserPlus className="h-5 w-5 text-black" />
                        </span>
                        {loading ? 'Creando...' : 'Registrarse'}
                    </button>
                </form>

                <div className="text-center">
                    <Link to="/auth/login" className="text-zinc-500 hover:text-white text-sm transition-colors">
                        ¿Ya tienes cuenta? <span className="font-bold underline text-white">Inicia sesión</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;