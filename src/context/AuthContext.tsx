import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const raw = await AsyncStorage.getItem('@auth_current_user');
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (e) {
        console.error('restoreSession error', e);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    // look up registered users
    const usersRaw = await AsyncStorage.getItem('@auth_users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found || found.password !== password) {
      throw new Error('Invalid email or password.');
    }
    setUser(found);
    await AsyncStorage.setItem('@auth_current_user', JSON.stringify(found));
  };

  const signup = async (name: string, email: string, password: string) => {
    const usersRaw = await AsyncStorage.getItem('@auth_users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      throw new Error('Email already registered.');
    }
    const newUser: User = { name, email, password };
    const updated = [...users, newUser];
    await AsyncStorage.setItem('@auth_users', JSON.stringify(updated));
    setUser(newUser);
    await AsyncStorage.setItem('@auth_current_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@auth_current_user');
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};