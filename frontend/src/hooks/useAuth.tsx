import { createContext, useCallback, useContext, useState } from "react";

interface AuthContext {
  token: string;
  team_name: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const initialValue: AuthContext = {
  token: "",
  team_name: "",
  signIn: async () => {},
  signOut: async () => {},
};

const context = createContext<AuthContext>(initialValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, useToken] = useState("");
  const [team_name, useTeamname] = useState("");

  const signIn = useCallback(async () => {}, []);
  const signOut = useCallback(async () => {}, []);

  return (
    <context.Provider value={{ token, team_name, signIn, signOut }}>
      {children}
    </context.Provider>
  );
};

export default function useAuth() {
  return useContext(context);
}
