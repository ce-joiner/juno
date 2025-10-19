/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEvent = /* GraphQL */ `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
` as GeneratedQuery<APITypes.GetEventQueryVariables, APITypes.GetEventQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const getWellnessActivity =
  /* GraphQL */ `query GetWellnessActivity($id: ID!) {
  getWellnessActivity(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetWellnessActivityQueryVariables,
    APITypes.GetWellnessActivityQuery
  >;
export const getWellnessSession =
  /* GraphQL */ `query GetWellnessSession($id: ID!) {
  getWellnessSession(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetWellnessSessionQueryVariables,
    APITypes.GetWellnessSessionQuery
  >;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      email
      id
      joinedAt
      name
      owner
      profilePhoto
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const listWellnessActivities =
  /* GraphQL */ `query ListWellnessActivities(
  $filter: ModelWellnessActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listWellnessActivities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListWellnessActivitiesQueryVariables,
    APITypes.ListWellnessActivitiesQuery
  >;
export const listWellnessSessions = /* GraphQL */ `query ListWellnessSessions(
  $filter: ModelWellnessSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listWellnessSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWellnessSessionsQueryVariables,
  APITypes.ListWellnessSessionsQuery
>;
