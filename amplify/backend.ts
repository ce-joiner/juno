/* eslint-disable @typescript-eslint/no-require-imports */
const { defineBackend } = require('@aws-amplify/backend');
const { auth } = require('./auth/resource');

defineBackend({
  auth,
});
