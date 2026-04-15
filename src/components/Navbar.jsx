import { Link, useLocation } from 'react-router-dom';
import { Music, Star, LogOut, User, Radio, Info } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black border-b border-zinc-800 px-3 md:px-6 py-3 md:py-4 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="text-white font-black text-base md:text-xl tracking-tighter uppercase">
        Oasis
      </Link>
      <div className="flex items-center gap-2 md:gap-8">
        {user?.name && (
          <span className="hidden sm:flex items-center gap-1 md:gap-2 text-zinc-300 font-medium text-xs md:text-sm mr-0 md:mr-2">
            <User size={14} />
            <span className="hidden lg:inline">Hola,</span> <span className="text-white font-bold text-xs">{user.name}</span>
          </span>
        )}
        <Link
          to="/"
          className={`flex items-center gap-1 md:gap-2 transition-colors font-semibold px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${isActive('/') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Music size={16} /> <span className="hidden md:inline">Explorar</span>
        </Link>
        <Link
          to="/feed"
          className={`flex items-center gap-1 md:gap-2 transition-colors font-semibold px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${isActive('/feed') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Radio size={16} /> <span className="hidden md:inline">Feed</span>
        </Link>
        <Link
          to="/favorites"
          className={`flex items-center gap-1 md:gap-2 transition-colors font-semibold px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${isActive('/favorites') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Star size={16} /> <span className="hidden md:inline">Favoritos</span>
        </Link>
        <Link
          to="/about"
          className={`flex items-center gap-1 md:gap-2 transition-colors font-semibold px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${isActive('/about') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          <Info size={16} /> <span className="hidden md:inline">About</span>
        </Link>
        <button 
          onClick={logout}
          className="text-zinc-400 hover:text-red-500 transition-colors ml-1 md:ml-0"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;