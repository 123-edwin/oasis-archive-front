import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import FavoritesPage from './pages/FavoritesPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import AboutPage from './pages/AboutPage';
import BackgroundLoop from './components/BackgroundLoop';

function AppContent() {
  const { status } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {status === 'authenticated' && <Navbar />}
      {status === 'authenticated' && !['/login', '/register'].includes(location.pathname) && <BackgroundLoop />}
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Si no está autenticado, cualquier ruta lo manda al login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SearchPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Si ya está autenticado, no tiene sentido que vea el login */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  const { status } = useContext(AuthContext);

  if (status === 'checking') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white">
        <h2 className="animate-pulse text-2xl font-bold tracking-widest">OASIS ARCHIVE</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;