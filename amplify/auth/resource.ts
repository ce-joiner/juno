/**
 * AWS Amplify Authentication Configuration
 *
 * Defines the authentication setup for Juno using Amazon Cognito.
 * Configures email-based login and custom user attributes for the app.
 *
 * Configuration:
 * - Login method: Email-based authentication
 * - User attributes: preferredUsername (optional, mutable)
 *
 * This resource is imported and registered in the backend configuration.
 * Any changes here will affect user authentication across the entire app.
 *
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth/
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineAuth } = require('@aws-amplify/backend');

exports.auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
  },
});
