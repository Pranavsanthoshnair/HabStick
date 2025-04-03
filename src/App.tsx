import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import Home from './pages/Home';
import Product from './pages/Product';
import Testimonials from './pages/Testimonials';
import Support from './pages/Support';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Notification from './components/Notification';
import Cart from './components/Cart';
import ChatBot from './components/ChatBot';

import Logo from './components/Logo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Product', href: '/product' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Support', href: '/support' },
];

function AppContent() {
  const { cart } = useAppContext();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Handle click outside profile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="app-container">
      <ChatBot />
      <header className="navbar">
        <Link to="/" className="logo flex items-center">
          <Logo size="small" />
          <span className="font-bold text-xl ml-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">HabStick</span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="nav-links hidden sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Cart and Auth buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="hidden sm:flex items-center text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
                aria-expanded={isProfileMenuOpen}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium shadow-sm">
                  {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="ml-2 text-sm font-medium">{currentUser?.displayName || 'User'}</span>
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isProfileMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:flex items-center text-gray-800 hover:text-blue-600 transition-colors bg-gray-100 px-3 py-2 rounded-md"
            >
              <UserIcon className="h-6 w-6" aria-hidden="true" />
              <span className="ml-1 text-sm font-medium">Sign In</span>
            </Link>
          )}
          
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:flex items-center text-gray-800 hover:text-blue-600 transition-colors bg-gray-100 px-3 py-2 rounded-md"
            style={{ position: 'relative' }}
          >
            <span className="sr-only">View cart</span>
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {cartItemsCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center"
                style={{ boxShadow: '0 0 0 2px white' }}
              >
                {cartItemsCount}
              </span>
            )}
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden py-2 px-4 bg-white border-b border-gray-200 shadow-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-3 text-base font-medium text-gray-600 hover:text-blue-600 border-b border-gray-100 last:border-b-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="border-b border-gray-100 py-3">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
                  {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-900">{currentUser?.displayName || 'User'}</div>
                  <div className="text-xs text-gray-500 truncate">{currentUser?.email}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Link
                  to="/profile"
                  className="text-xs text-center block py-2 bg-gray-50 rounded text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-xs text-center block py-2 bg-gray-50 rounded text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Orders
                </Link>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
      </div>
          ) : (
            <Link
              to="/auth"
              className="block py-3 text-base font-medium text-gray-600 hover:text-blue-600 border-b border-gray-100 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <span>Sign In</span>
            </Link>
          )}
          
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-3 text-base font-medium text-gray-600 hover:text-blue-600 flex items-center"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>Cart</span>
            {cartItemsCount > 0 && (
              <span className="ml-2 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
        </button>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/support" element={<Support />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>

      <Cart open={isCartOpen} setOpen={setIsCartOpen} />
      <Notification />
      
      </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
