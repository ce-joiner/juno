/**
 * Authentication Service
 *
 * Handles all authentication operations using AWS Amplify + Cognito.
 * Provides functions for sign up, sign in, sign out, and session management.
 *
 * Usage:
 * import { signUp, signIn, signOut, getCurrentUser } from '@/services/auth';
 */

import {
  signUp as amplifySignUp,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  confirmSignUp,
  getCurrentUser as amplifyGetCurrentUser,
  fetchAuthSession,
  type SignUpInput,
  type SignInInput,
  type ConfirmSignUpInput,
} from 'aws-amplify/auth';

/**
 * Sign Up a New User
 *
 * Creates a new user account in Cognito and sends a verification email.
 *
 * @param email - User's email address (used for login)
 * @param password - User's password (min 8 chars, must meet policy)
 * @param name - User's display name
 *
 * @returns Object with userId and confirmation status
 *
 * @example
 * const result = await signUp({
 *   email: 'jane@example.com',
 *   password: 'SecurePass123!',
 *   name: 'Jane Doe',
 * });
 *
 * if (!result.isSignUpComplete) {
 *   // User needs to enter verification code sent to email
 * }
 */

export async function signUp({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const signUpInput: SignUpInput = {
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    };

    const { isSignUpComplete, userId, nextStep } =
      await amplifySignUp(signUpInput);

    console.log('Sign up successful:', { userId, isSignUpComplete, nextStep });

    return {
      success: true,
      userId,
      isSignUpComplete,
      nextStep,
    };
  } catch (error) {
    console.error('Sign up failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Confirm Sign Up with Verification Code
 *
 * After signing up, users receive a verification code via email.
 * This function confirms their account with that code.
 *
 * @param email - User's email address
 * @param confirmationCode - 6-digit code from email
 *
 * @example
 * const result = await confirmSignUpCode({
 *   email: 'jane@example.com',
 *   confirmationCode: '123456',
 * });
 */
export async function confirmSignUpCode({
  email,
  confirmationCode,
}: {
  email: string;
  confirmationCode: string;
}) {
  try {
    const confirmInput: ConfirmSignUpInput = {
      username: email,
      confirmationCode,
    };

    const { isSignUpComplete, nextStep } = await confirmSignUp(confirmInput);

    console.log('Conformation successful:', { isSignUpComplete, nextStep });

    return {
      success: true,
      isSignUpComplete,
      nextStep,
    };
  } catch (error) {
    console.error('Confirmation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sign In Existing User
 *
 * Authenticates a user with email and password.
 * Returns a JWT token that's automatically used for API requests.
 *
 * @param email - User's email address
 * @param password - User's password
 *
 * @example
 * const result = await signIn({
 *   email: 'jane@example.com',
 *   password: 'SecurePass123!',
 * });
 *
 * if (result.success) {
 *   // User is authenticated, can make API calls
 * }
 */
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const signInInput: SignInInput = {
      username: email,
      password,
    };

    const { isSignedIn, nextStep } = await amplifySignIn(signInInput);

    // Get the current user's details
    const user = await amplifyGetCurrentUser();

    // Get the JWT tokens
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    return {
      success: true,
      isSignedIn,
      user,
      token,
      nextStep,
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sign Out Current User
 *
 * Logs out the current user and clears their session.
 *
 * @example
 * await signOut();
 * // User is now logged out, redirect to login screen
 */
export async function signOut() {
  try {
    await amplifySignOut();
    console.log('Sign out successful');
    return {
      success: true,
    };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get Current Authenticated User
 *
 * Returns information about the currently signed-in user.
 * Throws an error if no user is signed in.
 *
 * @returns User object with userId, username (email)
 *
 * @example
 * try {
 *   const user = await getCurrentUser();
 *   console.log('Current user:', user.username);
 * } catch (error) {
 *   console.log('No user signed in');
 * }
 */
export async function getCurrentUser() {
  try {
    const user = await amplifyGetCurrentUser();
    console.log('Current user:', user);
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('❌ Get user error:', error);
    return {
      success: false,
      error: 'No user currently signed in',
    };
  }
}

/**
 * Get Current Auth Session
 *
 * Returns the current user's session with JWT tokens.
 * Useful for debugging or manual API calls.
 *
 * @returns Session object with tokens
 */
export async function getAuthSession() {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    return {
      success: true,
      token,
      session,
    };
  } catch (error) {
    console.error('❌ Get session error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'No session currently active',
    };
  }
}
