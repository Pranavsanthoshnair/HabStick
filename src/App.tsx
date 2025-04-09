import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import Home from './pages/Home';
import Product from './pages/Product';
import Testimonials from './pages/Testimonials';
import Support from './pages/Support';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout'; 
import About from './pages/About';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Notification from './components/Notification';
import Cart from './components/Cart';
import ScrollProgress from './components/ScrollProgress';
import AssistantHub from './components/AssistantHub';
import Logo from './components/Logo';
import PageTransition from './components/PageTransition';
import './styles/navbar.css';
import './styles/animations.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Product', href: '/product' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'About', href: '/about' },
  { name: 'Support', href: '/support' },
];

function AppContent() {
  const { cart, isCartOpen, setCartOpen } = useAppContext();
  const { isAuthenticated, currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  
  // Calculate cart items count
  const cartItemsCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`navbar fixed w-full z-50 transition-all duration-300 ${isNavbarScrolled ? 'scrolled py-2 shadow-md' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="navbar-brand text-2xl font-bold text-primary-600">
            <Logo className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-900">HabStick</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="nav-link text-gray-700 hover:text-primary-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCartOpen(!isCartOpen)} 
              className="cart-icon relative p-2 rounded-full hover:bg-gray-100"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </button>
            
            {isAuthenticated ? (
              <Link to="/profile" className="profile-icon p-2 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium h-9 w-9 hover:bg-blue-700 transition-colors">
                {currentUser?.displayName?.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link to="/auth" className="profile-icon p-2 rounded-full hover:bg-gray-100">
                <UserIcon className="h-6 w-6 text-gray-700" />
              </Link>
            )}
            
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Menu"
              >
                <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fade-in-down">
            <div className="container mx-auto px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <PageTransition>
        <main className="main-content pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </PageTransition>
      
      {/* Cart sidebar */}
      <Cart open={isCartOpen} setOpen={setCartOpen} />
      
      {/* Progress bar */}
      <ScrollProgress />
      
      {/* AI Assistant Hub */}
      <AssistantHub />
      
      {/* Notification component */}
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
