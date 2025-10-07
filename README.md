# JUNO

**honestly, never better** 

A holistic self-care management app that integrates productivity planning with wellness activities. Built to help users balance their schedules with intentional self-care.

---

##  Design

**Figma File:** https://www.figma.com/design/rKrgzUKTwAFeIoPaVizRPK/Self-Care-Management-App

**Design System:**
- Primary Color: `#99F7AB`
- Secondary Color: `#FAFFF9`
- Fonts: DM Sans (headers/body), DM Mono (buttons/labels)

**Quick Links:**
- Component Library: Node `755-91172`
- Hi-Fi Wireframes: Node `288-5658`
- Style Tile: Node `503-29677`

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React Native + Expo |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query (React Query) |
| **Backend** | AWS Amplify (AppSync, DynamoDB, Cognito, S3) |
| **Styling** | NativeWind (Tailwind CSS for React Native) |
| **Navigation** | React Navigation |
| **Language** | TypeScript |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install
```

### Run the App

```bash
# Start Expo dev server
npm start

# Then press:
# 'i' for iOS simulator
# 'a' for Android emulator
# 'w' for web (if needed for testing)
```

### Other Useful Commands

```bash
# Run on specific platform
npm run ios
npm run android

# Code quality
npm run lint          # Run ESLint
npm run format        # Format with Prettier
```

---

##  Project Structure

```
src/
├── screens/              # Screen components organized by feature
│   ├── planner/         # Calendar, day view, task management
│   ├── wellness/        # Wheel of Wellness, activity selection
│   ├── profile/         # User profile and settings
│   └── onboarding/      # First-time user setup flow
│
├── components/          # Shared/reusable components
│   ├── navigation/     # Bottom tab navigation components
│   ├── ui/             # Buttons, cards, inputs, etc.
│   └── wellness/       # Wellness wheel, activity cards
│
├── stores/              # Zustand state management
│   ├── useAuthStore.ts        # Authentication state
│   ├── usePlannerStore.ts     # Calendar events and tasks
│   └── useWellnessStore.ts    # Wellness activities and sessions
│
├── services/            # API integration layer
│   ├── auth.ts         # Cognito authentication
│   ├── planner.ts      # Calendar/event operations
│   └── wellness.ts     # Wellness activity operations
│
├── types/               # TypeScript type definitions
│   ├── user.ts
│   ├── event.ts
│   └── wellness.ts
│
└── utils/               # Helper functions
    ├── date-utils.ts
    ├── validation.ts
    └── constants.ts
```

---

##  State Management (Zustand Stores)

### Auth Store
```typescript
const { user, token, isAuthenticated, login, logout } = useAuthStore();
```
Manages user authentication, profile data, and JWT tokens.

### Planner Store
```typescript
const { events, currentDate, addEvent, updateEvent, deleteEvent } = usePlannerStore();
```
Handles calendar events, tasks, and current date selection.

### Wellness Store
```typescript
const { habits, currentSession, streak, startSession, completeSession } = useWellnessStore();
```
Tracks wellness habits, active meditation/exercise sessions, and streaks.

---

##  Development Workflow

### Branching Strategy

**Two-Branch System:**
```
main      ← Production-ready code (stable, deployable)
  ↑
develop   ← Active development (your playground)
```

**Daily Workflow:**
```bash
# Start the day - make sure you're on develop
git checkout develop
git pull

# Build features, commit often
git add .
git commit -m "descriptive message"
git push origin develop

# When a feature is complete and tested:
git checkout main
git merge develop
git push origin main

# Tag important milestones (optional)
git tag -a v0.1.0 -m "MVP complete"
git push --tags
```

**Why this works:**
- `develop` = freedom to experiment and break things
- `main` = your safety net, always has working code
- Easy rollback if something goes wrong
- Clean history of stable releases

---

##  Important Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [NativeWind Docs](https://www.nativewind.dev/)
- [AWS Amplify Docs](https://docs.amplify.aws/)

---



### Common Patterns

**Creating a new screen:**
1. Create file in `src/screens/{feature}/`
2. Use functional component with TypeScript
3. Style with NativeWind classes
4. Add to navigation in `App.tsx`

**Adding a new Zustand store:**
1. Create file in `src/stores/`
2. Define TypeScript interfaces
3. Use `create()` with state and actions
4. Export and use in components

---

## 📱 App Features (MVP)

### Planner Module
- Day/Week/Month calendar views
- Event and task management
- Time block scheduling
- Quick add functionality

### Wellness Module
- User-customizable wellness wheel
- Custom activity creation
- Session tracking with timers
- Streak/habit tracking

### Profile Module
- User profile management
- Wellness analytics dashboard
- Settings and preferences

---

**Built with 💚 by Casey Joiner**

*Version: 0.1.0 (In Development)*