/**
 * AWS Amplify Backend Configuration
 *
 * Central configuration file that registers all backend resources for Juno.
 * This is where we wire together authentication, data (GraphQL API), storage,
 * and any other AWS services the app needs.
 *
 * Current resources:
 * - auth: Amazon Cognito authentication (email-based login)
 *
 * To add new resources:
 * 1. Create a resource definition file (e.g., ./data/resource.ts)
 * 2. Import it here
 * 3. Add it to the defineBackend() object
 *
 * @see https://docs.amplify.aws/gen2/build-a-backend/
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineBackend } = require('@aws-amplify/backend');
const { auth } = require('./auth/resource');
const { data } = require('./data/resource');

defineBackend({
  auth,
  data,
});
