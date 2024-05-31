// Use Aws Amplify to sign in the user with provided username and password.

import * as Auth from "aws-amplify/auth";

/**
 * Sign in the user with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<Auth.SignInOutput>} A promise that resolves to the signed-in user object.
 */
export const signIn = async (username: string, password: string) => {
  try {
    const user = await Auth.signIn({ username, password });
    return user;
  } catch (error) {
    console.log("error signing in", error);
  }
};

/**
 * Sign out the user.
 *
 * @return {Promise<void>} A promise that resolves when the sign-out is complete.
 */
export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out", error);
  }
};

/**
 * Sign up the user with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<void>} A promise that resolves when the user is signed up.
 * @throws {Error} If there is an error signing up the user.
 */
export const signUp = async (username: string, password: string) => {
  try {
    return await Auth.signUp({ username, password });
  } catch (error) {
    throw error;
  }
};
