import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import client from "./client";
import AuthContext from "./context";
import {
  clearTokens,
  loadTokens,
  saveTokens as saveTokensToCookie,
} from "./tokens";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [, startTransition] = useTransition();

  const router = useRouter();

  const saveTokens = useCallback(
    (access_token: string, refresh_token: string) => {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      startTransition(async () => {
        await saveTokensToCookie({
          accessToken: access_token,
          refreshToken: refresh_token,
        });
      });
      setAuthenticated(true);
    },
    []
  );

  const signin = useCallback(
    async (email: string, password: string) => {
      const { access_token, refresh_token } = await client.signIn(
        email,
        password
      );
      saveTokens(access_token, refresh_token);
      router.push("/");
      router.refresh();
    },
    [saveTokens, router]
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      const { access_token, refresh_token } = await client.signUp(
        email,
        password
      );
      saveTokens(access_token, refresh_token);
      router.push("/");
      router.refresh();
    },
    [router, saveTokens]
  );

  const googleSignin = useCallback(
    async (token: string) => {
      const { access_token, refresh_token } = await client.googleSignin(token);
      saveTokens(access_token, refresh_token);
      router.push("/");
      router.refresh();
    },
    [router, saveTokens]
  );

  const signout = () => {
    startTransition(async () => {
      await clearTokens();
      setAccessToken(null);
      setRefreshToken(null);
      setAuthenticated(false);
    });
    router.push("/");
    router.refresh();
  };

  const googleClientID = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    startTransition(async () => {
      const res = await loadTokens();
      if (res) {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setAuthenticated(true);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        signout,
        googleSignin,
        accessToken,
        refreshToken,
        authenticated,
      }}
    >
      <GoogleOAuthProvider clientId={googleClientID}>
        {children}
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
