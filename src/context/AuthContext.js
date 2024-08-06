import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('uid');
    if (token) setIsLoggedIn(true);
    setLoading(false)
  }, []);

  const login = (token) => {
    Cookies.set('uid', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('uid');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
