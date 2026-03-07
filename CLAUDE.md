# Juno - Development Guide

**Stage**: Pre-MVP (API service layer + navigation)  
**Full context**: See [README.md](README.md), [ARCHITECTURE.md](docs/ARCHITECTURE.md), [AWS_SETUP.md](docs/AWS_SETUP.md)

---

## Current Priorities

1. **API Service Layer** (`src/services/planner.ts`, `wellness.ts`, `profile.ts`)
2. **React Navigation** (bottom tabs + stack navigators)  
3. **Auth Screens** (using completed `auth.ts` service)
4. **First Screen**: Planner Day View

**Don't build yet**: Wellness timer, profile screens, celebration screens (see `/mnt/project/Incomplete_design_screens`)

---

## Workflow

### Plan Mode
Use plan mode for: service files, navigation setup, AWS integration, multi-screen flows, anything 3+ steps.

### Verification Required
Before marking complete:
- Console log actual DynamoDB responses
- Test full flows (signup → verify → login)
- Run `npm run type-check` && `npm run lint`
- Verify in simulator/device
- **Update documentation** (README, ARCHITECTURE, or AWS_SETUP)

### Self-Improvement
After corrections: note the pattern, apply lesson immediately, iterate until mistake doesn't recur.

---

## Critical Architecture Patterns

### Store vs Service
- **Zustand Store** = UI state (instant, in-memory, lost on close)
- **Service Layer** = AWS backend (persistent, network calls)

**Pattern**: Optimistic update → Service call → Confirm/rollback

```typescript
const temp = { ...data, id: 'temp-' + Date.now() };
store.addEvent(temp);
try {
  const saved = await createEventInDB(data);
  store.setState(s => ({ events: s.events.map(e => e.id === temp.id ? saved : e) }));
} catch {
  store.setState(s => ({ events: s.events.filter(e => e.id !== temp.id) }));
}
```

### AWS Amplify Gen 2 (Critical!)
- **Owner-based auth is automatic** - NO manual userId filtering
- **WRONG**: `filter: { userId: { eq: user.id } }`
- **RIGHT**: Just query - AppSync filters via JWT automatically
- Always use types from `src/API.ts`
- GraphQL client: `generateClient()` from `aws-amplify/api`

---

## Official Docs (Always Consult First)

- **Expo SDK 54**: https://docs.expo.dev/
- **React 19.2**: https://react.dev/ (`useEffectEvent` available)
- **Amplify Gen 2**: https://docs.amplify.aws/ (NOT Gen 1!)
- **React Navigation v7**: https://reactnavigation.org/
- **NativeWind v2**: https://www.nativewind.dev/v2/ (NOT v4!)

**Rule**: Check official docs for current best practices, not Stack Overflow.

---

## Figma Integration (MCP)

**Design file**: https://www.figma.com/design/rKrgzUKTwAFeIoPaVizRPK/Self-Care-Management-App

**When building screens**: Use Figma MCP to access designs directly:
- Component library: Node `755-91172`
- Hi-fi wireframes: Node `288-5658`
- Extract colors, spacing, typography from designs
- Generate pixel-perfect components from Figma nodes

**Requires**: Figma desktop app open with the Desktop Bridge plugin running (Plugins → Development → Figma Desktop Bridge). File must be open in Edit mode (not Dev mode).

### Critical: How to read design tokens
**Always use `figma_execute` via the Desktop Bridge plugin** — never use REST API calls for variables or styles, they will fail due to missing scopes.
```javascript
// Get all color variables
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variables = await figma.variables.getLocalVariablesAsync();
return { collections, variables };
```

**If `figma_execute` fails**: Call `figma_reconnect` first, then retry.

**Never use**: `figma_get_variables` or `figma_get_styles` — these use the REST API and will fail. Always use `figma_execute` instead.

---

## Code Style

- **DRY + KISS** - Match project patterns
- **Comments**: Section headers + inline WHY (not WHAT)
- **TypeScript strict** - Use generated types
- **Naming**: PascalCase components, kebab-case utils, use{X}Store

---

## Version Constraints

- Node 20.x LTS (not 23+)
- React 19.2.0
- NativeWind v2 (v4 breaks Expo)
- Never update `react-native` (Expo manages it)
- Never `npm audit fix --force` (breaks Amplify)

---

## Documentation Updates (Required!)

**After every feature**: Update README, ARCHITECTURE, or AWS_SETUP as needed.
- Remove "Coming soon" placeholders
- Change ⏳ to ✅ for completed features
- Add usage examples
- Test documented commands work

---

## Git Workflow

- **develop** branch (your work)
- **main** branch (Casey reviews before merge)
- Descriptive commits: explain WHAT and WHY
- Must pass `type-check` and `lint` before commit

---

## Quick Commands

```bash
npm start                              # Expo dev server
npm run type-check && npm run lint     # Validate
npx ampx sandbox                       # Start AWS backend
npx ampx generate graphql-client-code  # Regenerate types
```

---

## When to Ask

- Architecture decisions
- Feature scope (MVP vs later)
- AWS patterns (check ARCHITECTURE.md first)
- Design details (check Figma first)