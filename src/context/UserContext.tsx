import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, ApiError } from '../types';
import apiService from '../services/api';

interface UserContextType {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  fetchUsers: () => Promise<void>;
  clearError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};