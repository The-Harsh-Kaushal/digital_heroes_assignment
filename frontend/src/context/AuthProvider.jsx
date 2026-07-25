import { useCallback, useMemo, useState } from 'react';
import { login as loginAdmin } from '../services/adminService';
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
} from '../utils/authStorage';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());

  const signIn = useCallback(async (credentials) => {
    const data = await loginAdmin(credentials);
    const accessToken = data?.accessToken;

    if (!accessToken) {
      throw new Error('Login response did not include an access token');
    }

    setStoredToken(accessToken);
    setToken(accessToken);
    return data;
  }, []);

  const signOut = useCallback(() => {
    clearStoredToken();
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      signIn,
      signOut,
    }),
    [signIn, signOut, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
