import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Instagram, Search } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuthStore();
  const displayName = profile?.username || user?.email?.split('@')[0] || 'Cliente';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  const handleGoHomeTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/55 backdrop-blur-sm shadow-md border-b border-[#C026FF]/30">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" onClick={handleGoHomeTop} className="flex items-center gap-2 text-white">
          <img src="/branding/logo.png" alt="Kazuty Partz" className="h-9 w-auto" />
          <span className="font-brand font-bold text-lg hidden sm:block">
            <span className="text-primary">KAZUTY</span> <span className="text-gray-200">PARTZ</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex items-center mx-4 flex-1 max-w-xs">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full h-8 rounded-md border border-[#C026FF]/40 bg-black/45 px-8 pr-2 text-xs text-white placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C026FF]" />
          </div>
        </form>

        <div className="flex items-center space-x-2">
          <a
            href="https://instagram.com/kazuty_parts"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-full hover:bg-[#C026FF]/15 text-primary"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://wa.me/543534128474?text=Hola%20Kazuty%20Partz%2C%20quiero%20consultar%20por%20productos."
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-md border border-[#C026FF] bg-[#C026FF]/10 text-xs font-bold tracking-wide text-[#C026FF] hover:bg-[#C026FF]/20 transition-colors"
            aria-label="WhatsApp"
          >
            Contacto
          </a>
          <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-[#C026FF]/15" aria-label="Carrito">
            <ShoppingCart className="h-4 w-4 text-gray-200 hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full h-3.5 w-3.5 flex items-center justify-center text-[10px]">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center text-gray-200 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-[#C026FF]/15"
                aria-label="Perfil"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:inline text-xs ml-1">{displayName}</span>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-3 w-3 mr-2" />
                      Cerrar sesion
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-gray-200 hover:text-primary transition-colors flex items-center p-1.5 rounded-full hover:bg-[#C026FF]/15"
            >
              <User className="h-4 w-4" />
              <span className="hidden md:inline text-xs ml-1">Ingresar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
