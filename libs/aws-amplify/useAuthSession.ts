import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export const useAuthSession = () => {
  const [userSession, setUserSession] = useState<AuthUser | null>();
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the authentication session from AWS Amplify.
   * @returns {Promise<AuthUser | null>} The authentication session, or null if it's empty.
   */
  const fetchUserSession = async (): Promise<AuthUser | null> => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    const loadUserSession = async () => {
      const session = await fetchUserSession();
      if (session) setUserSession(session);
      return session;
    };

    loadUserSession().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return {
    userSession,
    isLoading,
    setUserSession,
    fetchUserSession,
    setIsLoading,
  };
};
