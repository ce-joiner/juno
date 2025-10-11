/**
 * AWS Amplify Data Schema Configuration
 *
 * Defines the GraphQL API data models for Juno using AWS AppSync and DynamoDB.
 * All models use owner-based authorization - users can only access their own data.
 * Amplify automatically adds an 'owner' field (Cognito user ID) to each record.
 *
 * Models: User, Event, WellnessSession, WellnessActivity
 *
 * @see https://docs.amplify.aws/gen2/build-a-backend/data/
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const { a, defineData } = require('@aws-amplify/backend');

const schema = a.schema({
  /**
   * User Model
   *
   * Profile information, preferences, and wellness statistics.
   * Note: Set default values for preferences and stats in app code, not schema.
   */
  User: a
    .model({
      email: a.string().required(),
      name: a.string().required(),
      profilePhoto: a.url(),
      joinedAt: a.datetime().required(),

      preferences: a.customType({
        defaultCalendarView: a.enum(['day', 'week', 'month']),
        notificationsEnabled: a.boolean(),
        wellnessReminders: a.boolean(),
      }),

      stats: a.customType({
        totalWellnessSessions: a.integer(),
        currentStreak: a.integer(),
        longestStreak: a.integer(),
        completionRate: a.float(),
      }),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * Event Model
   *
   * Calendar events, tasks, and scheduled wellness activities.
   * Displayed in planner views (day/week/month).
   */
  Event: a
    .model({
      title: a.string().required(),
      startTime: a.datetime().required(),
      endTime: a.datetime().required(),

      type: a.enum(['event', 'wellness', 'task']),
      completed: a.boolean().default(false),
      description: a.string(),

      wellnessActivity: a.customType({
        activityType: a.string(),
        duration: a.integer(),
        category: a.enum(['mind', 'body']),
      }),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * WellnessSession Model
   *
   * Tracks completed wellness activities for habit streaks and analytics.
   * Links to WellnessActivity via activityId (optional).
   */
  WellnessSession: a
    .model({
      activityId: a.id(),
      activityName: a.string().required(),
      category: a.enum(['mind', 'body']),
      subcategory: a.enum(['active', 'restorative']),
      startedAt: a.datetime().required(),
      completedAt: a.datetime(),
      plannedDuration: a.integer(),
      actualDuration: a.integer(),
      completed: a.boolean().default(false),

      mood: a.enum(['energized', 'calm', 'neutral', 'frustrated']),
      notes: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * WellnessActivity Model
   *
   * Custom wellness activities created by users (e.g., "Morning Meditation").
   * Acts as a template for WellnessSessions. Set isActive=false to soft delete.
   */
  WellnessActivity: a
    .model({
      name: a.string().required(),
      category: a.enum(['mind', 'body']),
      subcategory: a.enum(['active', 'restorative']),
      description: a.string(),
      duration: a.integer().required(),
      isCustom: a.boolean().default(true),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [allow.owner()]),
});

/**
 * Export data resource with Cognito User Pool authentication.
 * Imported in amplify/backend.ts and deployed to AWS.
 */
exports.data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
