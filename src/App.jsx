import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import FavoritesPage from './pages/FavoritesPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';

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
      {status === 'authenticated' && <Navbar />}
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
            {/* Si ya está autenticado, no tiene sentido que vea el login */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;