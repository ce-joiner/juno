# Juno - Technical Architecture Document

**Version:** 1.1  
**Last Updated:** October 18, 2025  
**Status:** In Active Development

---

## Table of Contents

1. [Overview](#overview)
2. [Implementation Status](#implementation-status)
3. [System Architecture](#system-architecture)
4. [Data Models](#data-models)
5. [Authentication & Authorization](#authentication--authorization)
6. [Frontend Architecture](#frontend-architecture)
7. [State Management](#state-management)
8. [Service Layer](#service-layer)
9. [Data Flow Examples](#data-flow-examples)
10. [Security](#security)
11. [Future Enhancements](#future-enhancements)

---

## Overview

Juno is a holistic self-care management app that integrates productivity planning with wellness activities. Built with React Native, AWS Amplify, and modern serverless architecture.

**Core Technologies:**
- **Frontend:** React Native + Expo, TypeScript, NativeWind (Tailwind CSS)
- **State Management:** Zustand for client state, TanStack Query for server state
- **Backend:** AWS Amplify Gen 2, AppSync (GraphQL), DynamoDB, Cognito
- **Authentication:** Amazon Cognito with email-based login
- **Authorization:** Owner-based data filtering (automatic per-user isolation)

---

## Implementation Status

### ✅ Completed Features

| Component | Status | Details |
|-----------|--------|---------|
| **AWS Infrastructure** | ✅ Deployed | Cognito, AppSync, DynamoDB (4 tables) |
| **Authentication System** | ✅ Working | Sign up, verify email, sign in, sign out |
| **Data Layer** | ✅ Deployed | 4 DynamoDB tables with GraphQL API |
| **Owner-Based Authorization** | ✅ Active | Automatic data filtering by user |
| **Amplify Client Configuration** | ✅ Working | App connected to AWS backend |
| **Auth Service Layer** | ✅ Implemented | Complete auth operations (src/services/auth.ts) |
| **Zustand Stores** | ✅ Implemented | useAuthStore, usePlannerStore, useWellnessStore |
| **TypeScript Types** | ✅ Generated | Auto-generated from GraphQL schema |
| **Dev Environment** | ✅ Ready | ESLint, Prettier, Husky, path aliases |

### ⏳ In Progress / Planned

| Component | Status | Priority |
|-----------|--------|----------|
| **UI Screens** | 🔨 Next | Building planner, wellness, profile screens |
| **Data Service Layers** | 📋 Planned | planner.ts, wellness.ts API services |
| **React Query Integration** | 📋 Planned | Connect Zustand to AppSync GraphQL |
| **Navigation** | 📋 Planned | React Navigation setup |
| **Profile Photo Upload** | 📋 Planned | S3 integration for images |

### 🔮 Future Enhancements

- Google Calendar bidirectional sync
- Google OAuth social login
- Real-time sync with AppSync subscriptions
- Offline support with local SQLite
- Push notifications
- Wearable device integration

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     React Native App (Expo)                 │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Screens    │  │  Components  │  │    Stores    │    │
│  │  (planner,   │  │   (UI, nav)  │  │   (Zustand)  │    │
│  │  wellness,   │  │              │  │              │    │
│  │  profile)    │  │              │  │              │    │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘    │
│         │                                     │             │
│         └────────────┬────────────────────────┘             │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │  Service Layer │                            │
│              │  (auth.ts,     │                            │
│              │   planner.ts,  │                            │
│              │   wellness.ts) │                            │
│              └───────┬────────┘                            │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │ Amplify Client │                            │
│              │  (configured   │                            │
│              │   with outputs)│                            │
│              └───────┬────────┘                            │
└──────────────────────┼──────────────────────────────────────┘
                       │
                       │ HTTPS/GraphQL
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      AWS Cloud                              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Amazon Cognito (Authentication)         │  │
│  │  • User Pools (email/password auth)                 │  │
│  │  • JWT Token Generation & Validation                │  │
│  │  • Email Verification                                │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                           │
│  ┌──────────────▼───────────────────────────────────────┐  │
│  │           AWS AppSync (GraphQL API)                  │  │
│  │  • Auto-generated CRUD operations                    │  │
│  │  • Owner-based authorization                         │  │
│  │  • Real-time subscriptions (future)                  │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                           │
│  ┌──────────────▼───────────────────────────────────────┐  │
│  │            Amazon DynamoDB (NoSQL Database)          │  │
│  │                                                       │  │
│  │  Tables:                                             │  │
│  │  • User (profiles, preferences, stats)               │  │
│  │  • Event (calendar events, tasks, wellness)          │  │
│  │  • WellnessSession (completed activities)            │  │
│  │  • WellnessActivity (custom user activities)         │  │
│  │                                                       │  │
│  │  All tables use owner field for data isolation       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             Amazon S3 (Future - File Storage)        │  │
│  │  • Profile photos                                    │  │
│  │  • User-uploaded content                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### AWS Services Used

#### Amazon Cognito (Authentication)
- **Purpose:** User registration, login, session management
- **Features:** Email/password auth, email verification, JWT tokens
- **Configuration:**
  - Required attributes: email, name
  - Optional attributes: preferredUsername
  - Password policy: min 8 chars, uppercase, lowercase, numbers, symbols

#### AWS AppSync (GraphQL API)
- **Purpose:** GraphQL API layer between app and database
- **API Endpoint:** `https://jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com/graphql`
- **Authorization:** Cognito User Pools (primary), AWS IAM (secondary)
- **Features:**
  - Auto-generated queries, mutations, subscriptions
  - Type-safe TypeScript client code generation
  - Owner-based authorization rules

#### Amazon DynamoDB (NoSQL Database)
- **Purpose:** Application data storage
- **Tables:** 4 tables (User, Event, WellnessSession, WellnessActivity)
- **Design Pattern:** Single entity per table, no relationships
- **Authorization:** Owner field automatically filters data per user
- **Performance:** Single-digit millisecond latency, automatic scaling

---

## Data Models

### Owner-Based Authorization Pattern

**Critical Design Decision:** Instead of using foreign keys and Global Secondary Indexes (GSIs), Juno uses Amplify's owner-based authorization.

**How it works:**
1. Every table has an automatic `owner` field (added by Amplify)
2. The `owner` field stores the Cognito user ID (sub claim from JWT)
3. All GraphQL queries automatically filter by `owner === current_user_id`
4. Users can ONLY see/modify their own data
5. No explicit relationships needed between tables

**Benefits:**
- ✅ Automatic multi-tenant data isolation
- ✅ Simpler schema (no foreign keys)
- ✅ Better security (impossible to access other users' data)
- ✅ No need for complex GSI queries

---

### User Table

**Purpose:** Store user profiles, preferences, and wellness statistics

**Schema:**
```graphql
type User @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  email: String!
  name: String!
  profilePhoto: AWSURL
  joinedAt: AWSDateTime!
  
  preferences: UserPreferences
  stats: UserStats
}

type UserPreferences {
  defaultCalendarView: UserPreferencesDefaultCalendarView
  notificationsEnabled: Boolean
  wellnessReminders: Boolean
}

type UserStats {
  totalWellnessSessions: Int
  currentStreak: Int
  longestStreak: Int
  completionRate: Float
}
```

**Key Fields:**
- `id`: Auto-generated UUID (DynamoDB partition key)
- `owner`: Auto-added by Amplify (Cognito user ID)
- `email`: User's email address (from Cognito)
- `preferences`: Nested object for app settings
- `stats`: Nested object for wellness metrics

**Default Values:**
Set in application code, not in schema:
```typescript
await client.models.User.create({
  email: user.email,
  name: user.name,
  joinedAt: new Date().toISOString(),
  preferences: {
    defaultCalendarView: 'day',
    notificationsEnabled: true,
    wellnessReminders: true,
  },
  stats: {
    totalWellnessSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0.0,
  },
});
```

---

### Event Table

**Purpose:** Calendar events, tasks, and scheduled wellness activities

**Schema:**
```graphql
type Event @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
  startTime: AWSDateTime!
  endTime: AWSDateTime!
  
  type: EventType
  completed: Boolean @default(value: "false")
  description: String
  
  wellnessActivity: EventWellnessActivity
}

enum EventType {
  event
  wellness
  task
}

type EventWellnessActivity {
  activityType: String
  duration: Int
  category: EventWellnessActivityCategory
}

enum EventWellnessActivityCategory {
  mind
  body
}
```

**Key Fields:**
- `id`: Auto-generated UUID
- `owner`: Auto-added (filters to current user's events only)
- `type`: Differentiates calendar events, tasks, and wellness activities
- `wellnessActivity`: Optional nested data for wellness-type events

**Query Pattern:**
```typescript
// Get all events for current user between dates
const { data } = await client.models.Event.list({
  filter: {
    startTime: { ge: startDate },
    endTime: { le: endDate },
  }
});
// Owner filtering happens automatically!
```

---

### WellnessSession Table

**Purpose:** Track completed wellness activities for streak/analytics

**Schema:**
```graphql
type WellnessSession @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  activityId: ID
  activityName: String!
  category: WellnessSessionCategory
  subcategory: WellnessSessionSubcategory
  
  startedAt: AWSDateTime!
  completedAt: AWSDateTime
  plannedDuration: Int
  actualDuration: Int
  completed: Boolean @default(value: "false")
  
  mood: WellnessSessionMood
  notes: String
}

enum WellnessSessionCategory {
  mind
  body
}

enum WellnessSessionSubcategory {
  active
  restorative
}

enum WellnessSessionMood {
  energized
  calm
  neutral
  frustrated
}
```

**Key Fields:**
- `activityId`: Optional reference to WellnessActivity (soft link, not enforced)
- `startedAt`/`completedAt`: For duration tracking
- `mood`: Post-activity mood logging

---

### WellnessActivity Table

**Purpose:** Custom wellness activities created by users

**Schema:**
```graphql
type WellnessActivity @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  category: WellnessActivityCategory
  subcategory: WellnessActivitySubcategory
  duration: Int!
  
  isCustom: Boolean
  isActive: Boolean
  description: String
}
```

**Key Fields:**
- `isCustom`: True if user-created, false if preset
- `isActive`: Soft delete flag (deactivate without deleting)

---

## Authentication & Authorization

### Sign Up Flow

```
1. User enters email, password, name
   ↓
2. App calls auth service: signUp({ email, password, name })
   ↓
3. Amplify Auth → Cognito User Pool (creates account)
   ↓
4. Cognito sends verification code to email
   ↓
5. User enters code → confirmSignUpCode({ email, code })
   ↓
6. Cognito activates account
   ↓
7. User auto-logged in, JWT tokens issued
   ↓
8. App creates User profile in DynamoDB (with owner field)
```

### Login Flow

```
1. User enters email, password
   ↓
2. App calls: signIn({ email, password })
   ↓
3. Amplify Auth → Cognito (validates credentials)
   ↓
4. Cognito returns JWT tokens:
   - ID Token (user attributes + sub claim)
   - Access Token (for API calls)
   - Refresh Token (30-day validity)
   ↓
5. Tokens stored in device keychain (automatic via Amplify)
   ↓
6. useAuthStore.login(user, token) updates state
   ↓
7. App queries AppSync for full user profile
   ↓
8. User redirected to main app screens
```

### Token Refresh (Automatic)

```
1. Access token expires after 1 hour
   ↓
2. Amplify detects expired token on next API call
   ↓
3. Amplify uses refresh token to get new tokens
   ↓
4. New tokens replace old tokens (transparent to user)
   ↓
5. If refresh token expired (30 days), user must re-login
```

### Logout Flow

```
1. User taps logout button
   ↓
2. App calls: signOut()
   ↓
3. Amplify revokes tokens in Cognito
   ↓
4. useAuthStore.logout() clears local state
   ↓
5. TanStack Query cache cleared
   ↓
6. User redirected to login screen
```

---

## Frontend Architecture

### Project Structure

```
src/
├── screens/              # Feature-based screen components
│   ├── planner/         # Calendar screens (day/week/month views)
│   ├── wellness/        # Wellness wheel, activity selection, timer
│   ├── profile/         # User profile, analytics dashboard
│   └── onboarding/      # First-time user wellness setup
│
├── components/          # Reusable UI components
│   ├── navigation/      # Tab bar, drawer navigation
│   ├── ui/              # Buttons, cards, inputs, etc.
│   └── wellness/        # Wellness wheel, activity cards
│
├── stores/              # ✅ Zustand state management (implemented)
│   ├── useAuthStore.ts        # Auth state, user, token
│   ├── usePlannerStore.ts     # Events, currentDate, CRUD operations
│   └── useWellnessStore.ts    # Habits, currentSession, streak
│
├── services/            # ✅ API integration layer (auth implemented)
│   ├── auth.ts         # ✅ Cognito auth operations (working)
│   ├── planner.ts      # 📋 Event CRUD operations (planned)
│   └── wellness.ts     # 📋 Wellness operations (planned)
│
├── types/               # TypeScript type definitions
│   ├── user.ts         # 📋 User-related types
│   ├── event.ts        # 📋 Event-related types
│   └── wellness.ts     # 📋 Wellness-related types
│
└── utils/               # Helper functions
    ├── date-utils.ts   # 📋 Date formatting/manipulation
    ├── validation.ts   # 📋 Form validation helpers
    └── constants.ts    # 📋 App-wide constants
```

### Configuration

**TypeScript Config (tsconfig.json):**
- Strict mode enabled
- Path aliases: `@/*` → `src/*`
- Excludes: `amplify/` folder (CommonJS conflict)

**Code Quality:**
- ESLint + Prettier for formatting
- Husky pre-commit hooks for linting
- Lint-staged for efficient checks

---

## State Management

### Zustand Stores (✅ Implemented)

#### useAuthStore

**Purpose:** Manage authentication state across the app

**State:**
```typescript
interface AuthState {
  user: User | null;           // Current user object
  token: string | null;        // JWT token for API calls
  isAuthenticated: boolean;    // Quick auth check
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
}
```

**Usage:**
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();

// After successful authentication
login(user, token);

// Check auth status
if (!isAuthenticated) {
  navigate('Login');
}

// Logout
logout();
```

---

#### usePlannerStore

**Purpose:** Manage calendar events, tasks, and date selection

**State:**
```typescript
interface PlannerState {
  events: Event[];              // All user events
  currentDate: string;          // Currently viewed date (YYYY-MM-DD)
  
  // Actions
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setCurrentDate: (date: string) => void;
}
```

**Usage:**
```typescript
const { events, currentDate, addEvent, updateEvent } = usePlannerStore();

// Add new event (optimistic update)
addEvent({
  id: generateId(),
  title: 'Team Meeting',
  startTime: '2025-10-19T14:00:00Z',
  endTime: '2025-10-19T15:00:00Z',
  type: 'event',
  completed: false,
});

// Update event
updateEvent(eventId, { completed: true });

// Navigate to different date
setCurrentDate('2025-10-20');
```

**Synchronization with Backend:**
```typescript
// TanStack Query mutation (planned)
const createEventMutation = useMutation({
  mutationFn: (newEvent) => client.models.Event.create(newEvent),
  onMutate: (newEvent) => {
    // Optimistic update
    usePlannerStore.getState().addEvent(newEvent);
  },
  onSuccess: (savedEvent) => {
    // Update with server response (includes generated ID)
    usePlannerStore.getState().updateEvent(savedEvent.id, savedEvent);
  },
  onError: (error, newEvent) => {
    // Rollback on failure
    usePlannerStore.getState().deleteEvent(newEvent.id);
  }
});
```

---

#### useWellnessStore

**Purpose:** Manage wellness habits, active sessions, and streak tracking

**State:**
```typescript
interface WellnessState {
  habits: WellnessActivity[];           // User's wellness activities
  currentSession: WellnessSession | null;  // Active session (null if none)
  streak: number;                       // Consecutive days of activity
  
  // Actions
  addHabit: (habit: WellnessActivity) => void;
  removeHabit: (id: string) => void;
  startSession: (activity: WellnessActivity) => void;
  completeSession: () => void;
}
```

**Usage:**
```typescript
const { habits, currentSession, streak, startSession, completeSession } = useWellnessStore();

// Start wellness session
startSession({
  id: 'meditation-1',
  name: 'Morning Meditation',
  category: 'mind',
  subcategory: 'restorative',
  duration: 15,
  isCustom: false,
});

// Complete session (increments streak)
completeSession();

// Add custom habit
addHabit({
  id: generateId(),
  name: 'Yoga Practice',
  category: 'body',
  subcategory: 'active',
  duration: 30,
  isCustom: true,
});
```

---

## Service Layer

### Auth Service (✅ Implemented)

**File:** `src/services/auth.ts`

**Functions:**

```typescript
// Sign up new user
async function signUp({ email, password, name }): Promise<SignUpResult>

// Confirm email verification code
async function confirmSignUpCode({ email, confirmationCode }): Promise<ConfirmResult>

// Sign in existing user
async function signIn({ email, password }): Promise<SignInResult>

// Sign out current user
async function signOut(): Promise<void>

// Get current authenticated user
async function getCurrentUser(): Promise<User>

// Get current auth session (tokens)
async function getAuthSession(): Promise<AuthSession>
```

**Example Usage:**
```typescript
import { signUp, signIn, getCurrentUser } from '@/services/auth';

// Sign up
const result = await signUp({
  email: 'jane@example.com',
  password: 'SecurePass123!',
  name: 'Jane Doe',
});

if (!result.isSignUpComplete) {
  // Show verification code screen
  const confirmResult = await confirmSignUpCode({
    email: 'jane@example.com',
    confirmationCode: '123456',
  });
}

// Sign in
const { success, user, token } = await signIn({
  email: 'jane@example.com',
  password: 'SecurePass123!',
});

if (success) {
  useAuthStore.getState().login(user, token);
}
```

---

### Planner Service (📋 Planned)

**File:** `src/services/planner.ts` (to be implemented)

**Planned Functions:**
```typescript
async function createEvent(event: CreateEventInput): Promise<Event>
async function updateEvent(id: string, updates: UpdateEventInput): Promise<Event>
async function deleteEvent(id: string): Promise<void>
async function listEvents(startDate: string, endDate: string): Promise<Event[]>
async function getEvent(id: string): Promise<Event>
```

---

### Wellness Service (📋 Planned)

**File:** `src/services/wellness.ts` (to be implemented)

**Planned Functions:**
```typescript
async function createSession(session: CreateSessionInput): Promise<WellnessSession>
async function completeSession(id: string, updates: CompleteSessionInput): Promise<WellnessSession>
async function listSessions(limit?: number): Promise<WellnessSession[]>
async function createActivity(activity: CreateActivityInput): Promise<WellnessActivity>
async function listActivities(): Promise<WellnessActivity[]>
```

---

## Data Flow Examples

### Example 1: User Login

```
1. User enters credentials in LoginScreen
   ↓
2. LoginScreen calls: await signIn({ email, password })
   ↓
3. auth.ts service → Amplify.Auth.signIn()
   ↓
4. Amplify → Cognito API (validates credentials)
   ↓
5. Cognito returns JWT tokens
   ↓
6. auth.ts returns { success: true, user, token }
   ↓
7. LoginScreen calls: useAuthStore.login(user, token)
   ↓
8. Zustand updates state, triggers re-renders
   ↓
9. App.tsx detects isAuthenticated=true
   ↓
10. Navigation redirects to PlannerDayScreen
```

---

### Example 2: Create Calendar Event (Future)

```
1. User fills out form in AddEventScreen
   ↓
2. AddEventScreen calls: createEventMutation.mutate(newEvent)
   ↓
3. TanStack Query onMutate: usePlannerStore.addEvent(newEvent)
   ↓  (Optimistic update - UI shows event immediately)
4. planner.ts service → client.models.Event.create()
   ↓
5. Amplify → AppSync GraphQL mutation
   ↓
6. AppSync adds owner field, saves to DynamoDB
   ↓
7. DynamoDB returns saved event (with generated ID)
   ↓
8. TanStack Query onSuccess: usePlannerStore.updateEvent(id, savedEvent)
   ↓
9. Zustand updates event with confirmed data
   ↓
10. UI shows final event with server ID
```

---

### Example 3: Complete Wellness Session

```
1. User finishes meditation, taps "Complete"
   ↓
2. CompletionScreen calls: useWellnessStore.completeSession()
   ↓
3. Zustand clears currentSession, increments streak
   ↓
4. UI shows celebration animation
   ↓
5. (Future) wellness.ts → client.models.WellnessSession.create()
   ↓
6. AppSync saves session to DynamoDB
   ↓
7. (Future) Query user stats to update streak counter
   ↓
8. Navigation returns to planner view
```

---

## Security

### Authentication Security

**Token Storage:**
- Amplify automatically stores tokens in device keychain (iOS) or Keystore (Android)
- Tokens encrypted at rest
- Never stored in AsyncStorage or local state

**Token Lifecycle:**
- Access tokens expire after 1 hour
- Refresh tokens valid for 30 days
- Automatic refresh handled by Amplify (transparent to user)

**Password Policy:**
- Minimum 8 characters
- Requires: uppercase, lowercase, number, symbol
- Enforced by Cognito

---

### Authorization Security

**Owner-Based Data Isolation:**
- Every DynamoDB record has an `owner` field (Cognito user ID)
- AppSync resolvers automatically filter all queries by owner
- Users can ONLY access their own data
- No risk of data leakage between users

**GraphQL Resolver Example:**
```
User queries: listEvents()
  ↓
AppSync resolver adds filter: owner = {current_user_cognito_id}
  ↓
DynamoDB returns only events where owner matches
  ↓
User receives only their own events
```

---

### Data Encryption

**At Rest:**
- DynamoDB tables encrypted with AWS managed keys
- S3 buckets encrypted (for profile photos - future)

**In Transit:**
- All API calls use HTTPS/TLS 1.2+
- GraphQL endpoint enforces secure connections

---

## Future Enhancements

### Phase 2: Google Integration

**Google Calendar Sync:**
- Bidirectional sync (Juno ↔ Google Calendar)
- Conflict resolution strategy (last-write-wins)
- Sync triggered on app open + periodic background sync

**Google OAuth:**
- Social login option
- Account linking with existing email accounts
- Simplified onboarding

---

### Phase 3: Real-Time Features

**AppSync Subscriptions:**
- Live updates when events change
- Real-time streak updates
- Collaborative features (future)

**Push Notifications:**
- Wellness reminders
- Event notifications
- Streak milestone celebrations

---

### Phase 4: Offline Support

**Local Database:**
- SQLite for offline data storage
- Queue sync operations
- Conflict resolution on reconnect

**React Query Persistence:**
- Cache hydration from SQLite
- Optimistic updates with rollback

---

### Phase 5: Advanced Analytics

**Wellness Insights:**
- Activity pattern analysis
- Mind/body balance trends
- Optimal activity time recommendations
- Mood correlation with activity types

**Productivity Insights:**
- Task completion rates
- Peak productivity hours
- Calendar density analysis

---

### Phase 6: Infrastructure Improvements

**Performance:**
- CloudFront CDN for S3 content
- DynamoDB DAX for caching
- AppSync caching directives

**Background Processing:**
- Lambda functions for complex analytics
- EventBridge for scheduled sync
- Step Functions for multi-step workflows

---

## Appendix

### GraphQL Schema Reference

**Auto-Generated Types:** See `src/API.ts` (generated from schema)

**Key Models:**
- User
- Event  
- WellnessSession
- WellnessActivity

**Custom Types:**
- UserPreferences
- UserStats
- EventWellnessActivity

**Enums:**
- EventType: event, wellness, task
- WellnessActivityCategory: mind, body
- WellnessActivitySubcategory: active, restorative
- WellnessSessionMood: energized, calm, neutral, frustrated

---

### Useful AWS Console Links

**Cognito User Pool:**
AWS Console → Cognito → User Pools → `amplify-juno-caseyjoiner-sandbox-...`

**DynamoDB Tables:**
AWS Console → DynamoDB → Tables (search for `User-`, `Event-`, etc.)

**AppSync API:**
AWS Console → AppSync → APIs → `amplify-juno-caseyjoiner-sandbox-...`

**CloudFormation Stack:**
AWS Console → CloudFormation → Stacks → `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`

---

### Development Commands

```bash
# Start AWS sandbox (keep running while developing)
npx ampx sandbox

# Generate TypeScript types from GraphQL schema
npx ampx generate graphql-client-code

# View CloudFormation stack details
npx ampx info

# Deploy to production (when ready)
npx ampx pipeline-deploy --branch main

# Delete sandbox environment
npx ampx sandbox delete
```

---

### Testing Authentication Flow

**Manual Testing Steps:**

1. **Sign Up Test:**
```typescript
import { signUp, confirmSignUpCode } from '@/services/auth';

// Step 1: Create account
const result = await signUp({
  email: 'test@example.com',
  password: 'TestPass123!',
  name: 'Test User',
});

// Step 2: Check email for verification code

// Step 3: Confirm account
await confirmSignUpCode({
  email: 'test@example.com',
  confirmationCode: '123456',
});
```

2. **Sign In Test:**
```typescript
import { signIn } from '@/services/auth';

const { success, user, token } = await signIn({
  email: 'test@example.com',
  password: 'TestPass123!',
});

console.log('Logged in:', success);
console.log('User:', user);
```

3. **Get Current User Test:**
```typescript
import { getCurrentUser } from '@/services/auth';

const { success, user } = await getCurrentUser();
console.log('Current user:', user);
```

4. **Sign Out Test:**
```typescript
import { signOut } from '@/services/auth';

await signOut();
console.log('User signed out');
```

---

### Environment Variables

**amplify_outputs.json (Auto-Generated):**
```json
{
  "auth": {
    "user_pool_id": "us-east-1_dBLohVOst",
    "aws_region": "us-east-1",
    "user_pool_client_id": "262g6ion98cqmqg028tr6rum40",
    "identity_pool_id": "us-east-1:5c795565-dcc3-4ef4-ab96-70d9236c82e8"
  },
  "data": {
    "url": "https://jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_region": "us-east-1",
    "default_authorization_type": "AMAZON_COGNITO_USER_POOLS"
  }
}
```

**Important:** This file is auto-generated and environment-specific. Never commit to version control (already in `.gitignore`).

---

### Known Issues & Solutions

#### Issue 1: Expo + Amplify Module Conflict

**Problem:** ESM/CommonJS conflict between Expo and Amplify Gen 2

**Error:**
```
Cannot require() ES Module /Users/.../amplify/backend.ts
```

**Solution:** Use CommonJS syntax in `amplify/` files
```javascript
// ✅ Correct (CommonJS)
const { defineBackend } = require('@aws-amplify/backend');
exports.auth = defineAuth({ ... });

// ❌ Wrong (ESM)
import { defineBackend } from '@aws-amplify/backend';
export const auth = defineAuth({ ... });
```

---

#### Issue 2: Owner Authorization + Relationships Conflict

**Problem:** Using `.authorization([a.allow.owner()])` with `hasMany()`/`belongsTo()` causes errors

**Error:**
```
Cannot read properties of undefined (reading 'owner')
```

**Solution:** Remove explicit relationships - owner-based auth handles data filtering automatically

```javascript
// ❌ Wrong - explicit relationships with owner auth
Event: a.model({
  userId: a.id(),
  user: a.belongsTo('User', 'userId'),  // Don't do this!
})

// ✅ Correct - no relationships needed
Event: a.model({
  title: a.string(),
  // No userId field needed!
  // Owner field added automatically
})
```

---

#### Issue 3: CustomType Default Values

**Problem:** Using `.default()` inside `a.customType()` causes errors

**Error:**
```
.default() is not a function
```

**Solution:** Set defaults in application code, not schema

```typescript
// ❌ Wrong - in schema
stats: a.customType({
  currentStreak: a.integer().default(0),  // Error!
})

// ✅ Correct - in schema (no defaults)
stats: a.customType({
  currentStreak: a.integer(),
})

// ✅ Correct - set defaults in app code
await client.models.User.create({
  stats: {
    currentStreak: 0,
    longestStreak: 0,
    totalWellnessSessions: 0,
    completionRate: 0.0,
  },
});
```

---

### Design System Reference

**Colors:**
- Primary: `#99F7AB` (light green)
- Secondary: `#FAFFF9` (off-white)
- Text: DM Sans (headers/body)
- Buttons: DM Mono (labels)

**Figma:**
- Design File: https://www.figma.com/design/rKrgzUKTwAFeIoPaVizRPK/Self-Care-Management-App
- Component Library: Node 755-91172
- Hi-Fi Wireframes: Node 288-5658
- Style Tile: Node 503-29677

**NativeWind Classes:**
```typescript
// Primary button
className="bg-primary text-neutral-darkest font-mono px-6 py-3 rounded-lg"

// Screen container
className="flex-1 bg-secondary p-4"

// Header text
className="text-3xl font-bold text-neutral-darkest font-sans"
```

---

### Contributing Guidelines

**Branch Strategy:**
- `main` - Production-ready code
- `develop` - Active development branch
- Feature branches off `develop`

**Commit Messages:**
```bash
# Good commit messages
git commit -m "feat: add wellness session completion flow"
git commit -m "fix: resolve auth token refresh bug"
git commit -m "docs: update architecture with new data models"

# Bad commit messages
git commit -m "updates"
git commit -m "fixed stuff"
```

**Pull Request Checklist:**
- [ ] Code follows TypeScript strict mode
- [ ] ESLint passes (`npm run lint`)
- [ ] Prettier formatting applied (`npm run format`)
- [ ] No console.logs (except in services for debugging)
- [ ] Types defined for all functions
- [ ] Comments added for complex logic

---

### Roadmap

**Foundation**
- ✅ AWS infrastructure setup
- ✅ Authentication system
- ✅ Data layer (4 tables)
- ✅ Zustand stores
- ✅ Auth service layer
- 🔨 UI screens (in progress)

**MVP Launch**
- 📋 Complete planner module
- 📋 Wellness wheel + timer
- 📋 Profile analytics
- 📋 App Store deployment

**Enhancements**
- 🔮 Google Calendar sync
- 🔮 Google OAuth
- 🔮 Push notifications
- 🔮 Advanced analytics

**Scale**
- 🔮 Offline support
- 🔮 Real-time sync
- 🔮 Wearable integration
- 🔮 Social features

---

### Contact & Support

**Project Repository:** GitHub (develop branch)

**Tech Stack Support:**
- AWS Amplify Docs: https://docs.amplify.aws/
- React Native Docs: https://reactnative.dev/
- Zustand Docs: https://zustand-demo.pmnd.rs/
- TanStack Query Docs: https://tanstack.com/query/

**AWS Resources:**
- CloudFormation Stack: `amplify-juno-caseyjoiner-sandbox-9d3d7de92b`
- Region: `us-east-1`
- AppSync Endpoint: `jghaagn4azhixbybbia5wtkg2i.appsync-api.us-east-1.amazonaws.com`

---

## Document Changelog

**Version 1.1 (October 18, 2025):**
- ✅ Added implementation status section
- ✅ Documented owner-based authorization pattern
- ✅ Removed incorrect GSI/foreign key references
- ✅ Added complete Zustand store documentation
- ✅ Added auth service layer documentation
- ✅ Moved Google OAuth/Calendar sync to future enhancements
- ✅ Added data flow examples
- ✅ Added testing guidelines
- ✅ Added known issues & solutions

**Version 1.0 (October 7, 2025):**
- Initial architecture document
- Basic data models
- AWS services overview

---

**END OF DOCUMENT**