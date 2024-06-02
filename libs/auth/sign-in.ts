import * as Auth from "aws-amplify/auth";

export const signIn = async (username: string, password: string) => {
  try {
    const user = await Auth.signIn({ username, password });
    return user;
  } catch (error) {
    console.log("error signing in", error);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out", error);
  }
};

export const signUp = async (
  username: string,
  password: string
): Promise<Auth.SignUpOutput> => {
  try {
    return await Auth.signUp({ username, password });
  } catch (error) {
    throw error;
  }
};
