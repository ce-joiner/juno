# Juno Technical Architecture Document

**Version:** 1.0  
**Last Updated:** October 7, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Data Models](#data-models)
6. [Authentication Flow](#authentication-flow)
7. [API Operations](#api-operations)
8. [State Management](#state-management)

---

## Overview

Juno is a self-care management application that integrates productivity planning with wellness activities. The application uses a serverless architecture built on AWS services with a React Native mobile frontend.

### Technology Stack

| Layer | Technology |
|-------|------------|
| Mobile App | React Native + Expo |
| State Management | Zustand |
| Data Fetching | TanStack Query (React Query) |
| Backend Platform | AWS Amplify |
| Authentication | Amazon Cognito |
| API Layer | AWS AppSync (GraphQL) |
| Database | Amazon DynamoDB |
| File Storage | Amazon S3 |
| Styling | NativeWind (Tailwind CSS) |
| Navigation | React Navigation |

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Juno Mobile App                         │
│                  (React Native + Expo)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ AWS Amplify JavaScript SDK
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      AWS Amplify                            │
│        (Simplifies interaction with AWS services)           │
└───────┬──────────────────────┬────────────────────┬─────────┘
        │                      │                    │
        │                      │                    │
┌───────▼────────┐    ┌───────▼────────┐   ┌──────▼─────────┐
│   Amazon       │    │   AWS          │   │   Amazon       │
│   Cognito      │    │   AppSync      │   │   S3           │
│                │    │                │   │                │
│  - Sign up     │    │  - GraphQL API │   │  - Profile     │
│  - Login       │    │  - Real-time   │   │    photos      │
│  - OAuth       │    │    sync        │   │  - User        │
│  - JWT tokens  │    │  - Offline     │   │    uploads     │
└────────────────┘    └───────┬────────┘   └────────────────┘
                              │
                              │ Resolvers
                              │
                      ┌───────▼────────┐
                      │   Amazon       │
                      │   DynamoDB     │
                      │                │
                      │  - Users       │
                      │  - Events      │
                      │  - Wellness    │
                      └────────────────┘
```

### Component Interaction Flow

**User Login:**
1. User enters credentials in mobile app
2. Amplify SDK sends request to Cognito
3. Cognito verifies credentials, returns JWT token
4. App stores token in Zustand (useAuthStore)
5. App queries AppSync for user profile data
6. AppSync retrieves user from DynamoDB
7. User data populates throughout the app

**Create Calendar Event:**
1. User creates event in planner screen
2. Event temporarily stored in Zustand (usePlannerStore)
3. Amplify sends GraphQL mutation to AppSync
4. AppSync executes resolver to save in DynamoDB Events table
5. DynamoDB returns saved event with generated ID
6. Zustand store updates with confirmed event data

**Upload Profile Photo:**
1. User selects photo from device
2. Amplify Storage uploads image to S3
3. S3 returns secure URL
4. App sends GraphQL mutation to update user profile with photo URL
5. AppSync saves URL to DynamoDB Users table
6. Profile photo displays using S3 URL

---

## Frontend Architecture

### Project Structure

```
src/
├── screens/              # Screen components organized by feature
│   ├── planner/         # Calendar, day view, task management
│   ├── wellness/        # Wheel of Wellness, activity selection
│   ├── profile/         # User profile and settings
│   └── onboarding/      # First-time user setup flow
├── components/          # Shared/reusable components
│   ├── navigation/      # Bottom tab navigation components
│   ├── ui/              # Buttons, cards, inputs, etc.
│   └── wellness/        # Wellness wheel, activity cards
├── stores/              # Zustand state management
│   ├── useAuthStore.ts        # Authentication state
│   ├── usePlannerStore.ts     # Calendar events and tasks
│   └── useWellnessStore.ts    # Wellness activities and sessions
├── services/            # API integration layer
│   ├── auth.ts          # Cognito authentication
│   ├── planner.ts       # Calendar/event operations
│   └── wellness.ts      # Wellness activity operations
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

### Navigation Structure

- **Bottom Tab Navigation:** Primary navigation between main sections (Planner, Wellness, Profile)
- **Stack Navigation:** Within each section for detailed screens and flows
- **Modal Navigation:** For add forms, settings, and temporary overlays

---

## Backend Architecture

### AWS Services Overview

#### Amazon Cognito
**Purpose:** User authentication and authorization

**Features Used:**
- User pools for email/password authentication
- JWT token generation and validation
- Google OAuth integration for social login
- Password reset and email verification
- Multi-factor authentication (future)

**User Pool Configuration:**
- Attributes: email (required), name, phone_number (optional)
- Password policy: Minimum 8 characters, require uppercase, lowercase, numbers
- Token expiration: Access token (1 hour), Refresh token (30 days)

#### AWS AppSync
**Purpose:** GraphQL API layer

**Features Used:**
- GraphQL queries for data retrieval
- GraphQL mutations for data modification
- Real-time subscriptions for live updates
- Conflict resolution for offline sync
- Fine-grained authorization rules

**Authorization Modes:**
- Amazon Cognito User Pools (primary)
- API Key (for public data, if needed)

#### Amazon DynamoDB
**Purpose:** NoSQL database for application data

**Features Used:**
- Single-table design with multiple entity types
- Global Secondary Indexes (GSI) for flexible querying
- Point-in-time recovery for data backup
- On-demand capacity pricing model

**Performance Characteristics:**
- Single-digit millisecond latency
- Automatic scaling based on traffic
- Built-in caching with DAX (future optimization)

#### Amazon S3
**Purpose:** Object storage for user-generated content

**Features Used:**
- Secure file upload/download
- Pre-signed URLs for temporary access
- Automatic image optimization (future)
- CloudFront CDN integration (future)

---

## Data Models

### Users Table

**Primary Key:** `userId` (Partition Key)

**Attributes:**

```json
{
  "userId": "string (UUID)",
  "email": "string (unique)",
  "name": "string",
  "profilePhoto": "string (S3 URL)",
  "joinedAt": "string (ISO 8601 timestamp)",
  "preferences": {
    "defaultCalendarView": "string (day|week|month)",
    "notificationsEnabled": "boolean",
    "wellnessReminders": "boolean",
    "activityPreferences": ["string (mind|body)"],
    "availableTimeSlots": ["string (morning|afternoon|evening)"],
    "activityDurations": ["number (minutes)"]
  },
  "stats": {
    "totalWellnessSessions": "number",
    "currentStreak": "number",
    "longestStreak": "number",
    "completionRate": "number (0-1)"
  }
}
```

**Indexes:**
- Primary Key: `userId`

---

### Events Table

**Primary Key:** `eventId` (Partition Key)

**Global Secondary Index:** `userId-startTime-index`
- Partition Key: `userId`
- Sort Key: `startTime`

**Attributes:**

```json
{
  "eventId": "string (UUID)",
  "userId": "string (UUID, FK to Users)",
  "title": "string",
  "startTime": "string (ISO 8601 timestamp)",
  "endTime": "string (ISO 8601 timestamp)",
  "type": "string (event|wellness|task)",
  "completed": "boolean",
  "description": "string (optional)",
  "googleEventId": "string (optional, for sync)",
  "syncStatus": "string (synced|pending|failed)",
  "lastModifiedAt": "string (ISO 8601 timestamp)",
  "localChanges": "boolean",
  "wellnessActivity": {
    "activityType": "string (optional)",
    "duration": "number (optional)",
    "category": "string (mind|body, optional)"
  }
}
```

**Indexes:**
- Primary Key: `eventId`
- GSI: `userId-startTime-index` (for querying user's events by date)

**Query Patterns:**
1. Get all events for a user within a date range
   - Use GSI with `userId` and `startTime` between conditions
2. Get a specific event by ID
   - Use Primary Key query

---

### Wellness Sessions Table

**Primary Key:** `sessionId` (Partition Key)

**Global Secondary Index:** `userId-completedAt-index`
- Partition Key: `userId`
- Sort Key: `completedAt`

**Attributes:**

```json
{
  "sessionId": "string (UUID)",
  "userId": "string (UUID, FK to Users)",
  "activityId": "string (UUID, FK to custom activities)",
  "activityName": "string",
  "category": "string (mind|body)",
  "subcategory": "string (active|restorative)",
  "startedAt": "string (ISO 8601 timestamp)",
  "completedAt": "string (ISO 8601 timestamp)",
  "plannedDuration": "number (minutes)",
  "actualDuration": "number (minutes)",
  "completed": "boolean",
  "mood": "string (energized|calm|neutral|frustrated, optional)",
  "notes": "string (optional)",
  "totalSpins": "number (how many times user spun wheel)",
  "skippedActivities": ["string (activity names)"]
}
```

**Indexes:**
- Primary Key: `sessionId`
- GSI: `userId-completedAt-index` (for querying user's wellness history)

---

### Wellness Activities Table (Custom User Activities)

**Primary Key:** `activityId` (Partition Key)

**Global Secondary Index:** `userId-index`
- Partition Key: `userId`

**Attributes:**

```json
{
  "activityId": "string (UUID)",
  "userId": "string (UUID, FK to Users)",
  "name": "string",
  "category": "string (mind|body)",
  "subcategory": "string (active|restorative)",
  "duration": "number (minutes)",
  "isCustom": "boolean (true for user-created)",
  "createdAt": "string (ISO 8601 timestamp)",
  "isActive": "boolean (user can deactivate without deleting)"
}
```

**Indexes:**
- Primary Key: `activityId`
- GSI: `userId-index` (for querying user's custom activities)

---

## Authentication Flow

### Sign Up Flow

1. **User Input:** User provides email, password, name
2. **Cognito Request:** App sends sign-up request via Amplify Auth
3. **Email Verification:** Cognito sends verification code to email
4. **Code Confirmation:** User enters verification code
5. **Account Activation:** Cognito activates user account
6. **Profile Creation:** App creates user profile in DynamoDB Users table
7. **Auto Login:** User is automatically logged in after confirmation

### Login Flow

1. **User Input:** User provides email and password
2. **Cognito Authentication:** Amplify Auth sends credentials to Cognito
3. **Token Generation:** Cognito validates and returns:
   - ID Token (contains user attributes)
   - Access Token (for API authorization)
   - Refresh Token (for getting new tokens)
4. **Store Tokens:** Tokens stored securely in device keychain (handled by Amplify)
5. **Update State:** JWT token and user info stored in Zustand (useAuthStore)
6. **Fetch Profile:** App queries DynamoDB via AppSync for full user profile
7. **Navigate:** User redirected to main app screens

### Google OAuth Flow

1. **User Taps:** "Sign in with Google" button
2. **Google OAuth:** Opens Google login in secure browser
3. **User Authorizes:** User grants permissions to Juno
4. **Token Exchange:** Google returns authorization code
5. **Cognito Federation:** Amplify exchanges code with Cognito
6. **Account Linking:** Cognito creates or links to existing user account
7. **Same as Login:** Continues with standard login flow (tokens, profile fetch)

### Token Refresh Flow

1. **Token Expiration:** Access token expires after 1 hour
2. **Automatic Refresh:** Amplify automatically uses refresh token
3. **New Tokens:** Cognito issues new access and ID tokens
4. **Transparent:** Happens in background, user doesn't notice
5. **Session Timeout:** If refresh token expires (30 days), user must re-login

### Logout Flow

1. **User Action:** User taps logout button
2. **Clear State:** Zustand stores reset (useAuthStore.logout())
3. **Revoke Tokens:** Amplify signs out user from Cognito
4. **Clear Cache:** TanStack Query cache is cleared
5. **Navigate:** User redirected to welcome/login screen

---

## API Operations

### GraphQL Schema Overview

#### Queries

```graphql
# Get current user profile
query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    userId
    email
    name
    profilePhoto
    preferences {
      defaultCalendarView
      notificationsEnabled
      wellnessReminders
    }
    stats {
      totalWellnessSessions
      currentStreak
      longestStreak
      completionRate
    }
  }
}

# Get events for a user within date range
query ListEventsByUser($userId: ID!, $startTime: AWSDateTime!, $endTime: AWSDateTime!) {
  listEventsByUser(userId: $userId, startTime: $startTime, endTime: $endTime) {
    items {
      eventId
      title
      startTime
      endTime
      type
      completed
      wellnessActivity {
        activityType
        duration
      }
    }
  }
}

# Get wellness sessions for a user
query ListWellnessSessions($userId: ID!, $limit: Int) {
  listWellnessSessions(userId: $userId, limit: $limit) {
    items {
      sessionId
      activityName
      category
      startedAt
      completedAt
      actualDuration
      mood
    }
  }
}

# Get user's custom wellness activities
query ListUserActivities($userId: ID!) {
  listUserActivities(userId: $userId) {
    items {
      activityId
      name
      category
      subcategory
      duration
      isActive
    }
  }
}
```

#### Mutations

```graphql
# Create a new calendar event
mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    eventId
    userId
    title
    startTime
    endTime
    type
    completed
  }
}

# Update an existing event
mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    eventId
    title
    startTime
    endTime
    completed
  }
}

# Delete an event
mutation DeleteEvent($eventId: ID!) {
  deleteEvent(eventId: $eventId) {
    eventId
  }
}

# Create wellness session
mutation CreateWellnessSession($input: CreateWellnessSessionInput!) {
  createWellnessSession(input: $input) {
    sessionId
    userId
    activityName
    startedAt
    completedAt
    actualDuration
  }
}

# Create custom wellness activity
mutation CreateWellnessActivity($input: CreateWellnessActivityInput!) {
  createWellnessActivity(input: $input) {
    activityId
    userId
    name
    category
    duration
  }
}

# Update user profile
mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    userId
    name
    profilePhoto
    preferences {
      defaultCalendarView
      notificationsEnabled
    }
  }
}
```

#### Subscriptions (Future)

```graphql
# Subscribe to event changes
subscription OnEventChange($userId: ID!) {
  onEventChange(userId: $userId) {
    eventId
    title
    startTime
    type
    completed
  }
}
```

---

## State Management

### Zustand Store Architecture

Juno uses three primary Zustand stores for client-side state management:

#### useAuthStore

**Purpose:** Manages authentication state and user session

**State:**
- `user`: Current user object (null when logged out)
- `token`: JWT access token
- `isAuthenticated`: Boolean flag for auth status

**Actions:**
- `login(user, token)`: Sets user and token, marks as authenticated
- `logout()`: Clears all auth state

**Usage:**
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();
```

---

#### usePlannerStore

**Purpose:** Manages calendar events, tasks, and date selection

**State:**
- `events`: Array of all calendar events
- `currentDate`: Currently selected date (YYYY-MM-DD format)

**Actions:**
- `addEvent(event)`: Adds new event to local state
- `updateEvent(id, updates)`: Updates existing event
- `deleteEvent(id)`: Removes event from state
- `setCurrentDate(date)`: Changes currently viewed date

**Usage:**
```typescript
const { events, currentDate, addEvent, updateEvent } = usePlannerStore();
```

**Synchronization:**
- Local state updated immediately for UI responsiveness
- Changes sent to backend via TanStack Query mutations
- Backend responses update store with confirmed data (including generated IDs)

---

#### useWellnessStore

**Purpose:** Manages wellness activities, sessions, and tracking

**State:**
- `habits`: Array of user's wellness activities
- `currentSession`: Active session object (null when no session running)
- `streak`: Current consecutive days of wellness activities

**Actions:**
- `addHabit(habit)`: Adds wellness activity to user's habits
- `removeHabit(id)`: Removes activity from habits
- `startSession(activity)`: Begins wellness session with timestamp
- `completeSession()`: Ends session, increments streak

**Usage:**
```typescript
const { habits, currentSession, streak, startSession } = useWellnessStore();
```

---

### TanStack Query Integration

TanStack Query handles server state synchronization between Zustand stores and AWS backend.

**Key Patterns:**

**Queries (Data Fetching):**
```typescript
// Fetch user's events
const { data: events } = useQuery({
  queryKey: ['events', userId, date],
  queryFn: () => fetchEvents(userId, date),
  onSuccess: (data) => {
    // Sync to Zustand store
    usePlannerStore.setState({ events: data });
  }
});
```

**Mutations (Data Updates):**
```typescript
// Create new event
const createEventMutation = useMutation({
  mutationFn: (newEvent) => createEvent(newEvent),
  onMutate: async (newEvent) => {
    // Optimistic update - add to Zustand immediately
    usePlannerStore.getState().addEvent(newEvent);
  },
  onSuccess: (savedEvent) => {
    // Update with confirmed data from backend
    usePlannerStore.getState().updateEvent(savedEvent.id, savedEvent);
  },
  onError: (error, newEvent) => {
    // Rollback on failure
    usePlannerStore.getState().deleteEvent(newEvent.id);
  }
});
```

---

## Security Considerations

### Authentication
- All API requests require valid JWT token from Cognito
- Tokens stored securely in device keychain (iOS) or Keystore (Android)
- Automatic token refresh prevents session interruption
- Logout properly revokes tokens on server side

### Authorization
- AppSync enforces user-level data access
- Users can only query/modify their own data
- Authorization rules defined in GraphQL schema directives

### Data Privacy
- User data encrypted at rest in DynamoDB
- S3 objects use pre-signed URLs with expiration
- Profile photos have private access by default
- No sensitive data logged or tracked

---

## Future Enhancements

### Phase 2 Features
- Real-time sync using AppSync subscriptions
- Offline support with local database (SQLite)
- Google Calendar bidirectional sync
- Push notifications via Amazon SNS

### Phase 3 Features
- Analytics dashboard with detailed insights
- Social features (share activities, streaks)
- Wearable device integration
- Advanced AI recommendations

### Infrastructure Improvements
- CloudFront CDN for S3 content delivery
- DynamoDB DAX for caching layer
- Lambda functions for background processing
- AWS EventBridge for scheduled sync operations

---

**Document End**