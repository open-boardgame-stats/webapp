import { createContext } from "react";

interface AuthContext {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
  googleSignin: (token: string) => Promise<void>;
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
}

const AuthContext = createContext<AuthContext>({
  signin: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  signout: () => null,
  googleSignin: () => Promise.resolve(),
  accessToken: null,
  refreshToken: null,
  authenticated: false,
});

export default AuthContext;
