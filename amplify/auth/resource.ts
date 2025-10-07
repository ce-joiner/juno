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
