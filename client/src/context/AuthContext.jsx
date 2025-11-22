import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  // user = { id, name, role }

  const login = async (name, password) => {
    const res = await axios.post("http://localhost:4000/login", {
      name,
      password,
    });
    setUser(res.data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
