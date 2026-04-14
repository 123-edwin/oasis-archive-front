import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Radio, LogIn } from 'lucide-react';
import video1 from '../assets/1.webm';
import video2 from '../assets/2.webm';
import video3 from '../assets/3.webm';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videos = [video1, video2, video3];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await login(email, password);
        if (!result.ok) {
            setError(result.msg);
        }
    };

    return (
        <div className="login-container min-h-screen flex items-center justify-center px-4">
            <video
                ref={videoRef}
                key={videos[currentVideoIndex]}
                src={videos[currentVideoIndex]}
                autoPlay
                muted
                className="video-bg"
            />

            <div className="login-overlay" />

            {/* Contenedor Principal */}
            <div className="max-w-md w-full space-y-8 bg-zinc-900 p-10 rounded-2xl border border-zinc-800 shadow-2xl relative z-20">

                {/* Header con Icono */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <Radio className="h-12 w-12 text-white animate-spin-slow" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tighter uppercase">
                        Oasis Archive
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Ingresa para gestionar tu colección
                    </p>
                </div>

                {/* Formulario */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-zinc-700 bg-zinc-800 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-900 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors uppercase tracking-widest"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LogIn className="h-5 w-5 text-black" />
                            </span>
                            Entrar
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <span className="text-zinc-500 text-sm">¿No tienes cuenta? </span>
                    <a href="#" className="text-white hover:underline text-sm font-medium">Regístrate aquí</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;