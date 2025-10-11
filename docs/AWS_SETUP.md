# AWS Setup Guide - Juno Self-Care Management App

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

### 3. **AWS AppSync** (GraphQL API)
- **What it does**: GraphQL API that connects your React app to DynamoDB
- **Why we use it**: Real-time updates, built-in subscriptions, auto-generated API
- **My API Endpoint**: `https://jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com/graphql`

### 4. **Amazon DynamoDB** (Database)
- **What it does**: NoSQL database that stores users, events, wellness sessions, and custom activities
- **Why we use it**: Fast, scalable, serverless - you only pay for what you use
- **Your Tables**: User, Event, WellnessSession, WellnessActivity

### 5. **AWS CloudFormation**
- **What it does**: AWS's infrastructure-as-code service (Amplify uses this behind the scenes)
- **Where to find it**: AWS Console → Search "CloudFormation" → Stacks
- **Your Stack**: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`

---

## Current Setup

### Sandbox Environment
- **Identifier**: `caseyjoiner` (your system username)
- **Stack Name**: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`
- **Region**: `us-east-1` (N. Virginia)
- **Status**: Running (watch mode active)

### What's Deployed
 **Cognito User Pool** - Authentication is live
- Users can register with email
- Users can sign in with email + password
- Optional `preferredUsername` attribute

 **AppSync GraphQL API** - Fully deployed
- GraphQL endpoint for all data operations
- Owner-based authorization (users only see their own data)
- Auto-generated queries, mutations, and subscriptions

 **DynamoDB Tables** - 4 tables created
- User (profiles, preferences, stats)
- Event (calendar events, tasks, wellness activities)
- WellnessSession (completed wellness activities)
- WellnessActivity (custom user activities)

---

## Data Layer (DynamoDB + AppSync)

### What We Built

You now have a complete GraphQL API with 4 DynamoDB tables:

#### 1. **User Table**
Stores user profiles, preferences, and wellness statistics.

**Fields:**
- `id` - Auto-generated unique identifier (partition key)
- `owner` - Cognito user ID (auto-added by Amplify for authorization)
- `email` - User's email address
- `name` - User's display name
- `profilePhoto` - S3 URL to profile photo (optional)
- `joinedAt` - Timestamp when user joined
- `preferences` - Nested object with app preferences:
  - `defaultCalendarView` - "day", "week", or "month"
  - `notificationsEnabled` - Boolean
  - `wellnessReminders` - Boolean
- `stats` - Nested object tracking wellness statistics:
  - `totalWellnessSessions` - Integer count
  - `currentStreak` - Days in current streak
  - `longestStreak` - Best streak achieved
  - `completionRate` - Float (0-1)

**Table Name:** `User-2rasccwojggtkdas2qxwvwmrq-NONE`

---

#### 2. **Event Table**
Calendar events, tasks, and scheduled wellness activities.

**Fields:**
- `id` - Event identifier (partition key)
- `owner` - Cognito user ID
- `title` - Event title
- `startTime` - Event start datetime (ISO 8601)
- `endTime` - Event end datetime (ISO 8601)
- `type` - Event type: "event", "wellness", or "task"
- `completed` - Boolean for task completion (default: false)
- `description` - Optional event notes
- `wellnessActivity` - Nested object for wellness event details:
  - `activityType` - Name of activity
  - `duration` - Duration in minutes
  - `category` - "mind" or "body"

**Table Name:** `Event-2rasccwojggtkdas2qxwvwmrq-NONE`

---

#### 3. **WellnessSession Table**
Completed wellness activities for tracking and analytics.

**Fields:**
- `id` - Session identifier (partition key)
- `owner` - Cognito user ID
- `activityId` - Links to custom activity (optional)
- `activityName` - Name of activity performed
- `category` - "mind" or "body"
- `subcategory` - "active" or "restorative"
- `startedAt` - When activity started (ISO 8601)
- `completedAt` - When activity finished (ISO 8601, optional)
- `plannedDuration` - Intended duration in minutes
- `actualDuration` - Actual duration in minutes
- `completed` - Completion status (default: false)
- `mood` - Post-activity mood: "energized", "calm", "neutral", or "frustrated"
- `notes` - Optional session notes

**Table Name:** `WellnessSession-2rasccwojggtkdas2qxwvwmrq-NONE`

---

#### 4. **WellnessActivity Table**
User's custom wellness activities for the wellness wheel.

**Fields:**
- `id` - Activity identifier (partition key)
- `owner` - Cognito user ID
- `name` - Activity name
- `category` - "mind" or "body"
- `subcategory` - "active" or "restorative"
- `description` - Activity description (optional)
- `duration` - Default duration in minutes
- `isCustom` - True for user-created activities (default: true)
- `isActive` - False if user deactivated (default: true)

**Table Name:** `WellnessActivity-2rasccwojggtkdas2qxwvwmrq-NONE`

---

### Authorization

All tables use **owner-based authorization**:
- Users can only create, read, update, and delete their own records
- The `owner` field is automatically populated with the Cognito user's ID
- No need for manual `userId` fields - Amplify handles this automatically
- GraphQL queries automatically filter results to only show the authenticated user's data

**Security Note:** The owner field is managed by AWS - users cannot manually change ownership unless you add field-level authorization rules.

---

### GraphQL API

**Endpoint:** `https://jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com/graphql`

**Authorization Mode:** Amazon Cognito User Pools (default)

**Available Operations:**
- **Queries:** `getUser`, `listUsers`, `getEvent`, `listEvents`, `getWellnessSession`, `listWellnessSessions`, `getWellnessActivity`, `listWellnessActivities`
- **Mutations:** `createUser`, `updateUser`, `deleteUser`, `createEvent`, `updateEvent`, `deleteEvent`, etc.
- **Subscriptions:** Real-time updates when data changes (configured but not yet used in app)

---

### How It Works

1. **User signs in** → Cognito provides JWT token
2. **App makes GraphQL request** → Includes JWT token in headers
3. **AppSync validates token** → Checks user is authenticated
4. **AppSync executes resolver** → Reads/writes to DynamoDB
5. **Owner filter applied automatically** → User only sees their own data
6. **Response returned** → App updates UI with data

---

### Important Notes

**No Explicit Relationships Needed:**
- Owner-based auth automatically filters data by user
- You don't need `hasMany` or `belongsTo` relationships
- Simply query for events, sessions, or activities - you'll only get the authenticated user's data

**CustomType Fields:**
- Cannot have `.default()` values at the schema level
- Set default values in your application code when creating records
- Example: When creating a user, provide default stats values in the mutation

**Owner Field:**
- Automatically added by Amplify - don't manually set it
- Don't query or filter by the `owner` field - it's handled automatically
- The field stores the Cognito user's `sub` (subject) claim from the JWT token

**Deployment Warning:**
```
WARNING: owners may reassign ownership for the following model(s)...
```
This is informational - users could technically transfer ownership via direct API calls, but the app UI won't expose this. For personal wellness data, this isn't a concern.

---

## How the Code Maps to AWS

### Local Files → AWS Resources

```
amplify/
├── auth/
│   └── resource.ts          → Creates Cognito User Pool
├── data/
│   └── resource.ts          → Creates AppSync + DynamoDB tables
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
   - **Users**: List of registered users
   - **App integration**: How your React app connects
   - **Sign-in experience**: Email-based authentication
   - **User attributes**: Email (required), preferredUsername (optional)

### DynamoDB Tables
1. Go to AWS Console → Search "DynamoDB"
2. Click **Tables** in the left sidebar
3. You should see 4 tables:
   - `Event-2rasccwojggtkdas2qxwvwmrq-NONE`
   - `User-2rasccwojggtkdas2qxwvwmrq-NONE`
   - `WellnessActivity-2rasccwojggtkdas2qxwvwmrq-NONE`
   - `WellnessSession-2rasccwojggtkdas2qxwvwmrq-NONE`
4. Click any table to see:
   - **Items**: Browse actual data (will be empty initially)
   - **Indexes**: View partition keys and GSIs
   - **Metrics**: Table performance stats

### AppSync API
1. Go to AWS Console → Search "AppSync"
2. Find your API: `amplify-juno-caseyjoiner-sandbox-...`
3. Click **Schema** to see the full GraphQL schema
4. Click **Queries** to test GraphQL operations
5. Click **Data Sources** to see DynamoDB table connections

### CloudFormation Stack
1. Go to AWS Console → Search "CloudFormation"
2. Find stack: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`
3. Click **Resources** tab to see everything deployed:
   - Cognito User Pool
   - AppSync API
   - DynamoDB Tables (4)
   - IAM Roles
   - Nested stacks for each resource

---

## The `amplify_outputs.json` File

This file is **auto-generated** - never edit it manually!

```json
{
  "auth": {
    "user_pool_id": "us-east-1_dBLohVOst",
    "aws_region": "us-east-1",
    "user_pool_client_id": "262g6ion98cqmqg028tr6rum40",
    // ... more auth config
  },
  "data": {
    "url": "https://jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_region": "us-east-1",
    "default_authorization_type": "AMAZON_COGNITO_USER_POOLS",
    // ... more data config
  },
  "version": "1.4"
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
- **Data**: Test data only - gets deleted when sandbox is deleted

### Production (Coming later)
- **Purpose**: Live app for real users
- **Lifespan**: Permanent until you delete it
- **How to deploy**: `npx ampx pipeline-deploy --branch main`
- **When to use**: When you're ready to launch
- **Data**: Real user data - persistent and backed up

---

## Costs (AWS Free Tier)

For development, you're covered by AWS Free Tier:

- **Cognito**: 50,000 monthly active users (free forever)
- **DynamoDB**: 25 GB storage, 25 read/write units (free forever)
- **AppSync**: 250,000 queries/month (12 months free)
- **Lambda**: 1M requests/month (free forever)

**Bottom line**: This sandbox development will cost $0 or close to it.

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

### Tables not showing in DynamoDB
- Check you're in the correct AWS region (us-east-1)
- Look for tables with names ending in `-NONE` (sandbox tables)
- Check CloudFormation stack Resources tab to verify tables were created

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
- `amplify/data/resource.ts` - Use `const { a, defineData } = require(...)`
- Export with `exports.auth`, `exports.data`, etc.

**Why this happens:** Expo uses ESM modules by default, which conflicts with how Amplify's build system loads backend files.

---

### Owner Authorization + Relationships Conflict
**Problem:** Using `.authorization([a.allow.owner()])` with `a.hasMany()` and `a.belongsTo()` relationships causes deployment errors

**Error message:**
```
Cannot read properties of undefined (reading 'owner')
```

**Solution:** Remove explicit relationships - owner-based auth automatically filters data by user

**Why this works:**
- `a.allow.owner()` creates an automatic `owner` field
- All queries are automatically filtered to the authenticated user's data
- You don't need explicit foreign keys or relationships
- Simply query `listEvents()` and you'll only get the current user's events

---

### CustomType Default Values
**Problem:** Using `.default()` on fields inside `a.customType()` causes errors

**Error message:**
```
.default() is not a function
```

**Solution:** Remove `.default()` from customType fields and set defaults in application code

**Example:**
```typescript
//  Don't do this in schema
stats: a.customType({
  currentStreak: a.integer().default(0),  // ERROR!
}),

//  Do this in schema
stats: a.customType({
  currentStreak: a.integer(),
}),

//  Set defaults in app code
await client.models.User.create({
  // ... other fields
  stats: {
    currentStreak: 0,  // Set default here
  },
});
```

---

## Next Steps

1. ✅ **Auth is set up** (Cognito)
2. ✅ **Data layer is set up** (DynamoDB + AppSync with 4 tables)
3. ⏳ **Generate TypeScript types** from schema
4. ⏳ **Connect React app** to AWS (configure Amplify client)
5. ⏳ **Build API service layer** (functions in `src/services/`)
6. ⏳ **Test CRUD operations** (create user, events, etc.)
7. ⏳ **Build UI screens** (planner, wellness wheel, profile)

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
- **GraphQL Docs**: https://graphql.org/learn/

---

## Notes

- Keep `npx ampx sandbox` running while developing
- The sandbox auto-deploys on file changes (~30-60 seconds)
- `amplify_outputs.json` should be in `.gitignore`
- Each developer can have their own sandbox (identified by username)
- Production deployment creates a separate, permanent environment
- All data in sandbox tables uses owner-based filtering automatically