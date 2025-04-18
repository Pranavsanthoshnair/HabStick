import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAppContext } from './AppContext';

type AuthContextType = {
  currentUser: FirebaseUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevAuthState, setPrevAuthState] = useState<boolean>(false);
  
  // Get the showNotification function from AppContext
  // This will be undefined on first render, but that's OK
  let showNotification: ((message: string, type?: 'success' | 'error' | 'info') => void) | undefined;
  try {
    showNotification = useAppContext()?.showNotification;
  } catch (e) {
    // Ignore error - this happens during initial render
  }

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const wasLoggedIn = prevAuthState;
      const isNowLoggedIn = !!user;
      
      // Only show notification when transitioning from logged out to logged in
      if (!wasLoggedIn && isNowLoggedIn && showNotification) {
        showNotification('Successfully signed in!', 'success');
      }
      
      setCurrentUser(user);
      setPrevAuthState(!!user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, [prevAuthState, showNotification]);

  // Sign up with email and password
  async function signup(name: string, email: string, password: string): Promise<void> {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user profile with the name
      if (userCredential.user && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError(err.message);
      }
      throw err;
    }
  }

  // Login with email and password
  async function login(email: string, password: string): Promise<void> {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else {
        setError(err.message);
      }
      throw err;
    }
  }

  // Logout
  async function logout(): Promise<void> {
    try {
      setError(null);
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    signup,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 