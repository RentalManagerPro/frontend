import { AuthUser } from "aws-amplify/auth";
import React from "react";
import { useAuthSession } from "../aws-amplify/useAuthSession";
import { signIn, signOut, signUp } from "./sign-in";
import * as Auth from "aws-amplify/auth";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signUp: (username: string, password: string) => Promise<Auth.SignUpOutput>;
  signOut: () => void;
  session?: AuthUser | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signUp: () => null as any,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const {
    isLoading,
    userSession,
    setUserSession,
    fetchUserSession,
    setIsLoading,
  } = useAuthSession();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
          setIsLoading(true);
          const signInOutput = await signIn(username, password);
          if (signInOutput) {
            if (signInOutput.isSignedIn) {
              const authSession = await fetchUserSession();
              if (authSession) setUserSession(authSession);
            }
          }
          setIsLoading(false);
        },
        signUp: async (username, password): Promise<Auth.SignUpOutput> => {
          return await signUp(username, password);
        },
        signOut: async () => {
          setIsLoading(true);
          setUserSession(null);
          await signOut();
          setIsLoading(false);
        },
        session: userSession,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
