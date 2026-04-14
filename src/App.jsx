import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

// Aquí irán tus páginas (puedes crearlas como componentes simples por ahora)
const SearchPage = () => <div className="bg-slate-900 h-screen text-white p-10">Buscador de Oasis</div>;

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
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            {/* Si no está autenticado, cualquier ruta lo manda al login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SearchPage />} />
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