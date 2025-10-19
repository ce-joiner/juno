/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './API';
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onCreateEvent(filter: $filter, owner: $owner) {
    completed
    createdAt
    description
    endTime
    id
    owner
    startTime
    title
    type
    updatedAt
    wellnessActivity {
      activityType
      category
      duration
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
    createdAt
    email
    id
    joinedAt
    name
    owner
    preferences {
      defaultCalendarView
      notificationsEnabled
      wellnessReminders
      __typename
    }
    profilePhoto
    stats {
      completionRate
      currentStreak
      longestStreak
      totalWellnessSessions
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onCreateWellnessActivity =
  /* GraphQL */ `subscription OnCreateWellnessActivity(
  $filter: ModelSubscriptionWellnessActivityFilterInput
  $owner: String
) {
  onCreateWellnessActivity(filter: $filter, owner: $owner) {
    category
    createdAt
    description
    duration
    id
    isActive
    isCustom
    name
    owner
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreateWellnessActivitySubscriptionVariables,
    APITypes.OnCreateWellnessActivitySubscription
  >;
export const onCreateWellnessSession =
  /* GraphQL */ `subscription OnCreateWellnessSession(
  $filter: ModelSubscriptionWellnessSessionFilterInput
  $owner: String
) {
  onCreateWellnessSession(filter: $filter, owner: $owner) {
    activityId
    activityName
    actualDuration
    category
    completed
    completedAt
    createdAt
    id
    mood
    notes
    owner
    plannedDuration
    startedAt
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnCreateWellnessSessionSubscriptionVariables,
    APITypes.OnCreateWellnessSessionSubscription
  >;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onDeleteEvent(filter: $filter, owner: $owner) {
    completed
    createdAt
    description
    endTime
    id
    owner
    startTime
    title
    type
    updatedAt
    wellnessActivity {
      activityType
      category
      duration
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
    createdAt
    email
    id
    joinedAt
    name
    owner
    preferences {
      defaultCalendarView
      notificationsEnabled
      wellnessReminders
      __typename
    }
    profilePhoto
    stats {
      completionRate
      currentStreak
      longestStreak
      totalWellnessSessions
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onDeleteWellnessActivity =
  /* GraphQL */ `subscription OnDeleteWellnessActivity(
  $filter: ModelSubscriptionWellnessActivityFilterInput
  $owner: String
) {
  onDeleteWellnessActivity(filter: $filter, owner: $owner) {
    category
    createdAt
    description
    duration
    id
    isActive
    isCustom
    name
    owner
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnDeleteWellnessActivitySubscriptionVariables,
    APITypes.OnDeleteWellnessActivitySubscription
  >;
export const onDeleteWellnessSession =
  /* GraphQL */ `subscription OnDeleteWellnessSession(
  $filter: ModelSubscriptionWellnessSessionFilterInput
  $owner: String
) {
  onDeleteWellnessSession(filter: $filter, owner: $owner) {
    activityId
    activityName
    actualDuration
    category
    completed
    completedAt
    createdAt
    id
    mood
    notes
    owner
    plannedDuration
    startedAt
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnDeleteWellnessSessionSubscriptionVariables,
    APITypes.OnDeleteWellnessSessionSubscription
  >;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent(
  $filter: ModelSubscriptionEventFilterInput
  $owner: String
) {
  onUpdateEvent(filter: $filter, owner: $owner) {
    completed
    createdAt
    description
    endTime
    id
    owner
    startTime
    title
    type
    updatedAt
    wellnessActivity {
      activityType
      category
      duration
      __typename
    }
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
    createdAt
    email
    id
    joinedAt
    name
    owner
    preferences {
      defaultCalendarView
      notificationsEnabled
      wellnessReminders
      __typename
    }
    profilePhoto
    stats {
      completionRate
      currentStreak
      longestStreak
      totalWellnessSessions
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onUpdateWellnessActivity =
  /* GraphQL */ `subscription OnUpdateWellnessActivity(
  $filter: ModelSubscriptionWellnessActivityFilterInput
  $owner: String
) {
  onUpdateWellnessActivity(filter: $filter, owner: $owner) {
    category
    createdAt
    description
    duration
    id
    isActive
    isCustom
    name
    owner
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdateWellnessActivitySubscriptionVariables,
    APITypes.OnUpdateWellnessActivitySubscription
  >;
export const onUpdateWellnessSession =
  /* GraphQL */ `subscription OnUpdateWellnessSession(
  $filter: ModelSubscriptionWellnessSessionFilterInput
  $owner: String
) {
  onUpdateWellnessSession(filter: $filter, owner: $owner) {
    activityId
    activityName
    actualDuration
    category
    completed
    completedAt
    createdAt
    id
    mood
    notes
    owner
    plannedDuration
    startedAt
    subcategory
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
    APITypes.OnUpdateWellnessSessionSubscriptionVariables,
    APITypes.OnUpdateWellnessSessionSubscription
  >;
