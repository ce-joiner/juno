/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEvent = /* GraphQL */ `mutation CreateEvent(
  $condition: ModelEventConditionInput
  $input: CreateEventInput!
) {
  createEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateEventMutationVariables,
  APITypes.CreateEventMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const createWellnessActivity =
  /* GraphQL */ `mutation CreateWellnessActivity(
  $condition: ModelWellnessActivityConditionInput
  $input: CreateWellnessActivityInput!
) {
  createWellnessActivity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.CreateWellnessActivityMutationVariables,
    APITypes.CreateWellnessActivityMutation
  >;
export const createWellnessSession =
  /* GraphQL */ `mutation CreateWellnessSession(
  $condition: ModelWellnessSessionConditionInput
  $input: CreateWellnessSessionInput!
) {
  createWellnessSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.CreateWellnessSessionMutationVariables,
    APITypes.CreateWellnessSessionMutation
  >;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent(
  $condition: ModelEventConditionInput
  $input: DeleteEventInput!
) {
  deleteEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteEventMutationVariables,
  APITypes.DeleteEventMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const deleteWellnessActivity =
  /* GraphQL */ `mutation DeleteWellnessActivity(
  $condition: ModelWellnessActivityConditionInput
  $input: DeleteWellnessActivityInput!
) {
  deleteWellnessActivity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.DeleteWellnessActivityMutationVariables,
    APITypes.DeleteWellnessActivityMutation
  >;
export const deleteWellnessSession =
  /* GraphQL */ `mutation DeleteWellnessSession(
  $condition: ModelWellnessSessionConditionInput
  $input: DeleteWellnessSessionInput!
) {
  deleteWellnessSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.DeleteWellnessSessionMutationVariables,
    APITypes.DeleteWellnessSessionMutation
  >;
export const updateEvent = /* GraphQL */ `mutation UpdateEvent(
  $condition: ModelEventConditionInput
  $input: UpdateEventInput!
) {
  updateEvent(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateEventMutationVariables,
  APITypes.UpdateEventMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const updateWellnessActivity =
  /* GraphQL */ `mutation UpdateWellnessActivity(
  $condition: ModelWellnessActivityConditionInput
  $input: UpdateWellnessActivityInput!
) {
  updateWellnessActivity(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.UpdateWellnessActivityMutationVariables,
    APITypes.UpdateWellnessActivityMutation
  >;
export const updateWellnessSession =
  /* GraphQL */ `mutation UpdateWellnessSession(
  $condition: ModelWellnessSessionConditionInput
  $input: UpdateWellnessSessionInput!
) {
  updateWellnessSession(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.UpdateWellnessSessionMutationVariables,
    APITypes.UpdateWellnessSessionMutation
  >;
