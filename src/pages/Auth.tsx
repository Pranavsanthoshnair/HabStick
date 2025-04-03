import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type AuthMode = 'login' | 'signup';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseConfigured, setFirebaseConfigured] = useState(true);
  
  const { login, signup, currentUser, error: authError } = useAuth();
  const { showNotification } = useAppContext();
  const navigate = useNavigate();

  // Check if Firebase is configured
  useEffect(() => {
    // Check if Firebase API key is set
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      setFirebaseConfigured(false);
      setLocalError('Firebase is not configured. Please set up your Firebase credentials in the .env file.');
    }
  }, []);

  // Handle auth context error
  useEffect(() => {
    if (authError) {
      setLocalError(authError);
    }
  }, [authError]);

  // Redirect if user is logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser, navigate]);
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setLocalError(null);
    setEmail('');
    setPassword('');
    setName('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsLoading(true);

    if (!firebaseConfigured) {
      setLocalError('Firebase is not configured. Please set up your Firebase credentials in the .env file.');
      setIsLoading(false);
      return;
    }

    try {
      // Validation
      if (!email.trim()) {
        throw new Error('Email is required');
      }

      if (!password.trim()) {
        throw new Error('Password is required');
      }

      if (mode === 'signup' && !name.trim()) {
        throw new Error('Name is required');
      }
      
      if (mode === 'login') {
        await login(email, password);
        showNotification('Successfully signed in!', 'success');
      } else {
        await signup(name, email, password);
        showNotification('Account created successfully!', 'success');
      }
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Sign In to Your Account' : 'Create a New Account'}
        </h1>
        
        {localError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            <p>{localError}</p>
            
            {!firebaseConfigured && (
              <div className="mt-3 text-sm">
                <p className="font-medium">To configure Firebase:</p>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Create a project at <a href="https://console.firebase.google.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
                  <li>Add a web app to your project</li>
                  <li>Copy the configuration values to your .env file</li>
                  <li>Restart the application</li>
                </ol>
              </div>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !firebaseConfigured}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              mode === 'login' ? 'Sign in' : 'Sign up'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
} 