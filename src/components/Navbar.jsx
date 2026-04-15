import { Link, useLocation } from 'react-router-dom';
import { Music, Star, LogOut, User, Radio, Info } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="text-white font-black text-xl tracking-tighter uppercase">
        Oasis Archive
      </Link>
      <div className="flex items-center gap-8">
        {user?.name && (
          <span className="flex items-center gap-2 text-zinc-300 font-medium text-sm mr-2">
            <User size={16} />
            Hola, <span className="text-white font-bold">{user.name}</span>
          </span>
        )}
        <Link
          to="/"
          className={`flex items-center gap-2 transition-colors font-semibold px-3 py-1 rounded-full ${isActive('/') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Music size={18} /> <span className="hidden md:inline">Explorar</span>
        </Link>
        <Link
          to="/feed"
          className={`flex items-center gap-2 transition-colors font-semibold px-3 py-1 rounded-full ${isActive('/feed') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Radio size={18} /> <span className="hidden md:inline">Feed</span>
        </Link>
        <Link
          to="/favorites"
          className={`flex items-center gap-2 transition-colors font-semibold px-3 py-1 rounded-full ${isActive('/favorites') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Star size={18} /> <span className="hidden md:inline">Favoritos</span>
        </Link>
        <Link
          to="/about"
          className={`flex items-center gap-2 transition-colors font-semibold px-3 py-1 rounded-full ${isActive('/about') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Info size={18} /> <span className="hidden md:inline">About</span>
        </Link>
        <button 
          onClick={logout}
          className="text-zinc-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;