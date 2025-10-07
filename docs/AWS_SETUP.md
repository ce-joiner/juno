# AWS Setup Guide - Juno Note-Taking App

## Overview
This document explains how Juno's backend infrastructure is set up on AWS using Amplify Gen 2. This is your reference guide for understanding what's deployed, where to find it, and how it all connects.

---

## AWS Services Used

### 1. **AWS Amplify**
- **What it does**: Infrastructure-as-code framework that manages all your AWS services
- **Why we use it**: Makes it easy to set up auth, databases, and APIs without manually configuring everything
- **Where to find it**: AWS Console → Search "Amplify" → Your app will be listed

### 2. **Amazon Cognito** (Authentication)
- **What it does**: Manages user registration, login, password resets, and sessions
- **Why we use it**: Industry-standard auth service, integrates seamlessly with your React app
- **Where to find it**: AWS Console → Search "Cognito" → User Pools
- **Your User Pool**: Look for a pool named like `amplify-juno-caseyjoiner-sandbox-...`

### 3. **AWS AppSync** (GraphQL API) - *Coming next*
- **What it does**: GraphQL API that connects your React app to DynamoDB
- **Why we use it**: Real-time updates, built-in subscriptions, auto-generated API

### 4. **Amazon DynamoDB** (Database) - *Coming next*
- **What it does**: NoSQL database that stores your notes, folders, tags, etc.
- **Why we use it**: Fast, scalable, serverless - you only pay for what you use

### 5. **AWS CloudFormation**
- **What it does**: AWS's infrastructure-as-code service (Amplify uses this behind the scenes)
- **Where to find it**: AWS Console → Search "CloudFormation" → Stacks
- **Your Stack**: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`

---

## Your Current Setup

### Sandbox Environment
- **Identifier**: `caseyjoiner` (your system username)
- **Stack Name**: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`
- **Region**: `us-east-1` (N. Virginia)
- **Status**: Running (watch mode active)

### What's Deployed Right Now
✅ **Cognito User Pool** - Authentication is live
- Users can register with email
- Users can sign in with email + password
- Optional `preferredUsername` attribute

⏳ **AppSync + DynamoDB** - Coming next (we'll add this together)

---

## How Your Code Maps to AWS

### Local Files → AWS Resources

```
amplify/
├── auth/
│   └── resource.ts          → Creates Cognito User Pool
├── data/                    → (Coming next) Creates AppSync + DynamoDB
│   └── resource.ts
└── backend.ts               → Main config that ties everything together

amplify_outputs.json         → Auto-generated config your React app uses
```

### What happens when you save a file:
1. Amplify sandbox detects the change
2. Synthesizes the backend (converts TypeScript → CloudFormation)
3. Deploys to AWS (updates your stack)
4. Regenerates `amplify_outputs.json`
5. Your React app automatically gets the new config

---

## Finding Your Resources in AWS Console

### Cognito User Pool
1. Go to AWS Console → Search "Cognito"
2. Click on **User Pools** in the left sidebar
3. Find your pool: `amplify-juno-caseyjoiner-sandbox-...`
4. Click it to see:
   - **Users**: List of registered users (empty right now)
   - **App integration**: How your React app connects
   - **Sign-in experience**: Email-based authentication
   - **User attributes**: Email (required), preferredUsername (optional)

### CloudFormation Stack
1. Go to AWS Console → Search "CloudFormation"
2. Find stack: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`
3. Click **Resources** tab to see everything deployed:
   - Cognito User Pool
   - IAM Roles
   - (Soon) AppSync API, DynamoDB tables

### Amplify App
1. Go to AWS Console → Search "Amplify"
2. Find your app: `juno`
3. You'll see:
   - Backend environments (Sandbox)
   - Deployments
   - Settings

---

## The `amplify_outputs.json` File

This file is **auto-generated** - never edit it manually!

```json
{
  "auth": {
    "user_pool_id": "us-east-1_XXXXXXX",
    "aws_region": "us-east-1",
    "user_pool_client_id": "XXXXXXXXXXXXXXXXX",
    // ... more config
  }
  // Data config will appear here when we add DynamoDB
}
```

**What it does**: Your React app imports this to connect to AWS services

**Important**: Add to `.gitignore` - this file is environment-specific

---

## Sandbox vs Production

### Sandbox (What you have now)
- **Purpose**: Development environment
- **Lifespan**: Temporary - tied to your `npx ampx sandbox` process
- **Identifier**: Uses your username (`caseyjoiner`)
- **When to use**: Day-to-day development, testing changes
- **Cost**: Minimal (AWS free tier covers most of this)

### Production (Coming later)
- **Purpose**: Live app for real users
- **Lifespan**: Permanent until you delete it
- **How to deploy**: `npx ampx pipeline-deploy --branch main`
- **When to use**: When you're ready to launch

---

## Costs (AWS Free Tier)

For development, you're covered by AWS Free Tier:

- **Cognito**: 50,000 monthly active users (free forever)
- **DynamoDB**: 25 GB storage, 25 read/write units (free forever)
- **AppSync**: 250,000 queries/month (12 months free)
- **Lambda**: 1M requests/month (free forever)

**Bottom line**: Your sandbox development will cost $0 or close to it.

---

## Troubleshooting

### Sandbox won't start
```bash
# Check AWS credentials
npx ampx configure profile

# Check you're in the right directory (should see amplify/ folder)
ls -la

# Check region matches your IAM user
cat ~/.aws/credentials
```

### Changes not deploying
- Make sure `npx ampx sandbox` is still running
- Check the terminal for errors
- Try stopping sandbox (Ctrl+C) and restarting

### Can't find resources in AWS Console
- Double-check you're in **us-east-1** region (top-right corner)
- Resources are named with your sandbox identifier: `caseyjoiner`

### "Access Denied" errors
- Your IAM user needs `AdministratorAccess-Amplify` policy
- Go to IAM → Users → amplify-dev → Add permissions

---

## Known Issues & Solutions

### Expo + Amplify Module Conflict
**Problem:** ESM/CommonJS conflict between Expo's TypeScript config and Amplify Gen 2

**Error message:**
```
Cannot require() ES Module /Users/.../amplify/backend.ts
```

**Solution:** Use CommonJS `require()` syntax in `amplify/` files instead of ESM `import`

**Files affected:**
- `amplify/backend.ts` - Use `const { defineBackend } = require(...)`
- `amplify/auth/resource.ts` - Use `const { defineAuth } = require(...)`
- Export with `exports.auth = defineAuth(...)`

**Why this happens:** Expo uses ESM modules by default, which conflicts with how Amplify's build system loads backend files.

---

## Next Steps

1. ✅ **Auth is set up** (Cognito)
2. ⏳ **Add Data layer** (DynamoDB + AppSync with your schema)
3. ⏳ **Connect React app** to AWS (import amplify_outputs.json)
4. ⏳ **Build API service layer** (functions that call AppSync)
5. ⏳ **Test authentication** (sign up, sign in, sign out)

---

## Useful Commands

```bash
# Start sandbox (development mode)
npx ampx sandbox

# Delete sandbox environment
npx ampx sandbox delete

# Deploy to production
npx ampx pipeline-deploy --branch main

# Generate TypeScript types from schema
npx ampx generate graphql-client-code

# View CloudFormation stack in browser
npx ampx info
```

---

## Learning Resources

- **Amplify Gen 2 Docs**: https://docs.amplify.aws/react/
- **Cognito Docs**: https://docs.aws.amazon.com/cognito/
- **AppSync Docs**: https://docs.aws.amazon.com/appsync/
- **DynamoDB Docs**: https://docs.aws.amazon.com/dynamodb/

---

## Notes

- Keep `npx ampx sandbox` running while developing
- The sandbox auto-deploys on file changes
- `amplify_outputs.json` should be in `.gitignore`
- Each developer can have their own sandbox (identified by username)
- Production deployment creates a separate, permanent environment