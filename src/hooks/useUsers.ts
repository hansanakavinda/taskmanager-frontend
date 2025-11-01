import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';

export const useUsers = () => {
  const context = useUserContext();
  const { fetchUsers } = context;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return context;
};