/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Event = {
  __typename: 'Event';
  completed?: boolean | null;
  createdAt: string;
  description?: string | null;
  endTime: string;
  id: string;
  owner?: string | null;
  startTime: string;
  title: string;
  type?: EventType | null;
  updatedAt: string;
  wellnessActivity?: EventWellnessActivity | null;
};

export enum EventType {
  event = 'event',
  task = 'task',
  wellness = 'wellness',
}

export type EventWellnessActivity = {
  __typename: 'EventWellnessActivity';
  activityType?: string | null;
  category?: EventWellnessActivityCategory | null;
  duration?: number | null;
};

export enum EventWellnessActivityCategory {
  body = 'body',
  mind = 'mind',
}

export type User = {
  __typename: 'User';
  createdAt: string;
  email: string;
  id: string;
  joinedAt: string;
  name: string;
  owner?: string | null;
  preferences?: UserPreferences | null;
  profilePhoto?: string | null;
  stats?: UserStats | null;
  updatedAt: string;
};

export type UserPreferences = {
  __typename: 'UserPreferences';
  defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
  notificationsEnabled?: boolean | null;
  wellnessReminders?: boolean | null;
};

export enum UserPreferencesDefaultCalendarView {
  day = 'day',
  month = 'month',
  week = 'week',
}

export type UserStats = {
  __typename: 'UserStats';
  completionRate?: number | null;
  currentStreak?: number | null;
  longestStreak?: number | null;
  totalWellnessSessions?: number | null;
};

export type WellnessActivity = {
  __typename: 'WellnessActivity';
  category?: WellnessActivityCategory | null;
  createdAt: string;
  description?: string | null;
  duration: number;
  id: string;
  isActive?: boolean | null;
  isCustom?: boolean | null;
  name: string;
  owner?: string | null;
  subcategory?: WellnessActivitySubcategory | null;
  updatedAt: string;
};

export enum WellnessActivityCategory {
  body = 'body',
  mind = 'mind',
}

export enum WellnessActivitySubcategory {
  active = 'active',
  restorative = 'restorative',
}

export type WellnessSession = {
  __typename: 'WellnessSession';
  activityId?: string | null;
  activityName: string;
  actualDuration?: number | null;
  category?: WellnessSessionCategory | null;
  completed?: boolean | null;
  completedAt?: string | null;
  createdAt: string;
  id: string;
  mood?: WellnessSessionMood | null;
  notes?: string | null;
  owner?: string | null;
  plannedDuration?: number | null;
  startedAt: string;
  subcategory?: WellnessSessionSubcategory | null;
  updatedAt: string;
};

export enum WellnessSessionCategory {
  body = 'body',
  mind = 'mind',
}

export enum WellnessSessionMood {
  calm = 'calm',
  energized = 'energized',
  frustrated = 'frustrated',
  neutral = 'neutral',
}

export enum WellnessSessionSubcategory {
  active = 'active',
  restorative = 'restorative',
}

export type ModelEventFilterInput = {
  and?: Array<ModelEventFilterInput | null> | null;
  completed?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  id?: ModelIDInput | null;
  not?: ModelEventFilterInput | null;
  or?: Array<ModelEventFilterInput | null> | null;
  owner?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  title?: ModelStringInput | null;
  type?: ModelEventTypeInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  eq?: boolean | null;
  ne?: boolean | null;
};

export enum ModelAttributeTypes {
  _null = '_null',
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
}

export type ModelStringInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelIDInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  size?: ModelSizeInput | null;
};

export type ModelEventTypeInput = {
  eq?: EventType | null;
  ne?: EventType | null;
};

export type ModelEventConnection = {
  __typename: 'ModelEventConnection';
  items: Array<Event | null>;
  nextToken?: string | null;
};

export type ModelUserFilterInput = {
  and?: Array<ModelUserFilterInput | null> | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  id?: ModelIDInput | null;
  joinedAt?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelUserFilterInput | null;
  or?: Array<ModelUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  profilePhoto?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelUserConnection = {
  __typename: 'ModelUserConnection';
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelWellnessActivityFilterInput = {
  and?: Array<ModelWellnessActivityFilterInput | null> | null;
  category?: ModelWellnessActivityCategoryInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  duration?: ModelIntInput | null;
  id?: ModelIDInput | null;
  isActive?: ModelBooleanInput | null;
  isCustom?: ModelBooleanInput | null;
  name?: ModelStringInput | null;
  not?: ModelWellnessActivityFilterInput | null;
  or?: Array<ModelWellnessActivityFilterInput | null> | null;
  owner?: ModelStringInput | null;
  subcategory?: ModelWellnessActivitySubcategoryInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelWellnessActivityCategoryInput = {
  eq?: WellnessActivityCategory | null;
  ne?: WellnessActivityCategory | null;
};

export type ModelIntInput = {
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
};

export type ModelWellnessActivitySubcategoryInput = {
  eq?: WellnessActivitySubcategory | null;
  ne?: WellnessActivitySubcategory | null;
};

export type ModelWellnessActivityConnection = {
  __typename: 'ModelWellnessActivityConnection';
  items: Array<WellnessActivity | null>;
  nextToken?: string | null;
};

export type ModelWellnessSessionFilterInput = {
  activityId?: ModelIDInput | null;
  activityName?: ModelStringInput | null;
  actualDuration?: ModelIntInput | null;
  and?: Array<ModelWellnessSessionFilterInput | null> | null;
  category?: ModelWellnessSessionCategoryInput | null;
  completed?: ModelBooleanInput | null;
  completedAt?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  id?: ModelIDInput | null;
  mood?: ModelWellnessSessionMoodInput | null;
  not?: ModelWellnessSessionFilterInput | null;
  notes?: ModelStringInput | null;
  or?: Array<ModelWellnessSessionFilterInput | null> | null;
  owner?: ModelStringInput | null;
  plannedDuration?: ModelIntInput | null;
  startedAt?: ModelStringInput | null;
  subcategory?: ModelWellnessSessionSubcategoryInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelWellnessSessionCategoryInput = {
  eq?: WellnessSessionCategory | null;
  ne?: WellnessSessionCategory | null;
};

export type ModelWellnessSessionMoodInput = {
  eq?: WellnessSessionMood | null;
  ne?: WellnessSessionMood | null;
};

export type ModelWellnessSessionSubcategoryInput = {
  eq?: WellnessSessionSubcategory | null;
  ne?: WellnessSessionSubcategory | null;
};

export type ModelWellnessSessionConnection = {
  __typename: 'ModelWellnessSessionConnection';
  items: Array<WellnessSession | null>;
  nextToken?: string | null;
};

export type ModelEventConditionInput = {
  and?: Array<ModelEventConditionInput | null> | null;
  completed?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  not?: ModelEventConditionInput | null;
  or?: Array<ModelEventConditionInput | null> | null;
  owner?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  title?: ModelStringInput | null;
  type?: ModelEventTypeInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateEventInput = {
  completed?: boolean | null;
  description?: string | null;
  endTime: string;
  id?: string | null;
  startTime: string;
  title: string;
  type?: EventType | null;
  wellnessActivity?: EventWellnessActivityInput | null;
};

export type EventWellnessActivityInput = {
  activityType?: string | null;
  category?: EventWellnessActivityCategory | null;
  duration?: number | null;
};

export type ModelUserConditionInput = {
  and?: Array<ModelUserConditionInput | null> | null;
  createdAt?: ModelStringInput | null;
  email?: ModelStringInput | null;
  joinedAt?: ModelStringInput | null;
  name?: ModelStringInput | null;
  not?: ModelUserConditionInput | null;
  or?: Array<ModelUserConditionInput | null> | null;
  owner?: ModelStringInput | null;
  profilePhoto?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateUserInput = {
  email: string;
  id?: string | null;
  joinedAt: string;
  name: string;
  preferences?: UserPreferencesInput | null;
  profilePhoto?: string | null;
  stats?: UserStatsInput | null;
};

export type UserPreferencesInput = {
  defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
  notificationsEnabled?: boolean | null;
  wellnessReminders?: boolean | null;
};

export type UserStatsInput = {
  completionRate?: number | null;
  currentStreak?: number | null;
  longestStreak?: number | null;
  totalWellnessSessions?: number | null;
};

export type ModelWellnessActivityConditionInput = {
  and?: Array<ModelWellnessActivityConditionInput | null> | null;
  category?: ModelWellnessActivityCategoryInput | null;
  createdAt?: ModelStringInput | null;
  description?: ModelStringInput | null;
  duration?: ModelIntInput | null;
  isActive?: ModelBooleanInput | null;
  isCustom?: ModelBooleanInput | null;
  name?: ModelStringInput | null;
  not?: ModelWellnessActivityConditionInput | null;
  or?: Array<ModelWellnessActivityConditionInput | null> | null;
  owner?: ModelStringInput | null;
  subcategory?: ModelWellnessActivitySubcategoryInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateWellnessActivityInput = {
  category?: WellnessActivityCategory | null;
  description?: string | null;
  duration: number;
  id?: string | null;
  isActive?: boolean | null;
  isCustom?: boolean | null;
  name: string;
  subcategory?: WellnessActivitySubcategory | null;
};

export type ModelWellnessSessionConditionInput = {
  activityId?: ModelIDInput | null;
  activityName?: ModelStringInput | null;
  actualDuration?: ModelIntInput | null;
  and?: Array<ModelWellnessSessionConditionInput | null> | null;
  category?: ModelWellnessSessionCategoryInput | null;
  completed?: ModelBooleanInput | null;
  completedAt?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  mood?: ModelWellnessSessionMoodInput | null;
  not?: ModelWellnessSessionConditionInput | null;
  notes?: ModelStringInput | null;
  or?: Array<ModelWellnessSessionConditionInput | null> | null;
  owner?: ModelStringInput | null;
  plannedDuration?: ModelIntInput | null;
  startedAt?: ModelStringInput | null;
  subcategory?: ModelWellnessSessionSubcategoryInput | null;
  updatedAt?: ModelStringInput | null;
};

export type CreateWellnessSessionInput = {
  activityId?: string | null;
  activityName: string;
  actualDuration?: number | null;
  category?: WellnessSessionCategory | null;
  completed?: boolean | null;
  completedAt?: string | null;
  id?: string | null;
  mood?: WellnessSessionMood | null;
  notes?: string | null;
  plannedDuration?: number | null;
  startedAt: string;
  subcategory?: WellnessSessionSubcategory | null;
};

export type DeleteEventInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type DeleteWellnessActivityInput = {
  id: string;
};

export type DeleteWellnessSessionInput = {
  id: string;
};

export type UpdateEventInput = {
  completed?: boolean | null;
  description?: string | null;
  endTime?: string | null;
  id: string;
  startTime?: string | null;
  title?: string | null;
  type?: EventType | null;
  wellnessActivity?: EventWellnessActivityInput | null;
};

export type UpdateUserInput = {
  email?: string | null;
  id: string;
  joinedAt?: string | null;
  name?: string | null;
  preferences?: UserPreferencesInput | null;
  profilePhoto?: string | null;
  stats?: UserStatsInput | null;
};

export type UpdateWellnessActivityInput = {
  category?: WellnessActivityCategory | null;
  description?: string | null;
  duration?: number | null;
  id: string;
  isActive?: boolean | null;
  isCustom?: boolean | null;
  name?: string | null;
  subcategory?: WellnessActivitySubcategory | null;
};

export type UpdateWellnessSessionInput = {
  activityId?: string | null;
  activityName?: string | null;
  actualDuration?: number | null;
  category?: WellnessSessionCategory | null;
  completed?: boolean | null;
  completedAt?: string | null;
  id: string;
  mood?: WellnessSessionMood | null;
  notes?: string | null;
  plannedDuration?: number | null;
  startedAt?: string | null;
  subcategory?: WellnessSessionSubcategory | null;
};

export type ModelSubscriptionEventFilterInput = {
  and?: Array<ModelSubscriptionEventFilterInput | null> | null;
  completed?: ModelSubscriptionBooleanInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  endTime?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  or?: Array<ModelSubscriptionEventFilterInput | null> | null;
  owner?: ModelStringInput | null;
  startTime?: ModelSubscriptionStringInput | null;
  title?: ModelSubscriptionStringInput | null;
  type?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null;
  ne?: boolean | null;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  in?: Array<string | null> | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  createdAt?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  joinedAt?: ModelSubscriptionStringInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  owner?: ModelStringInput | null;
  profilePhoto?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionWellnessActivityFilterInput = {
  and?: Array<ModelSubscriptionWellnessActivityFilterInput | null> | null;
  category?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  duration?: ModelSubscriptionIntInput | null;
  id?: ModelSubscriptionIDInput | null;
  isActive?: ModelSubscriptionBooleanInput | null;
  isCustom?: ModelSubscriptionBooleanInput | null;
  name?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionWellnessActivityFilterInput | null> | null;
  owner?: ModelStringInput | null;
  subcategory?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type ModelSubscriptionIntInput = {
  between?: Array<number | null> | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  in?: Array<number | null> | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionWellnessSessionFilterInput = {
  activityId?: ModelSubscriptionIDInput | null;
  activityName?: ModelSubscriptionStringInput | null;
  actualDuration?: ModelSubscriptionIntInput | null;
  and?: Array<ModelSubscriptionWellnessSessionFilterInput | null> | null;
  category?: ModelSubscriptionStringInput | null;
  completed?: ModelSubscriptionBooleanInput | null;
  completedAt?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  id?: ModelSubscriptionIDInput | null;
  mood?: ModelSubscriptionStringInput | null;
  notes?: ModelSubscriptionStringInput | null;
  or?: Array<ModelSubscriptionWellnessSessionFilterInput | null> | null;
  owner?: ModelStringInput | null;
  plannedDuration?: ModelSubscriptionIntInput | null;
  startedAt?: ModelSubscriptionStringInput | null;
  subcategory?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
};

export type GetEventQueryVariables = {
  id: string;
};

export type GetEventQuery = {
  getEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type GetWellnessActivityQueryVariables = {
  id: string;
};

export type GetWellnessActivityQuery = {
  getWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type GetWellnessSessionQueryVariables = {
  id: string;
};

export type GetWellnessSessionQuery = {
  getWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListEventsQuery = {
  listEvents?: {
    __typename: 'ModelEventConnection';
    items: Array<{
      __typename: 'Event';
      completed?: boolean | null;
      createdAt: string;
      description?: string | null;
      endTime: string;
      id: string;
      owner?: string | null;
      startTime: string;
      title: string;
      type?: EventType | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      createdAt: string;
      email: string;
      id: string;
      joinedAt: string;
      name: string;
      owner?: string | null;
      profilePhoto?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListWellnessActivitiesQueryVariables = {
  filter?: ModelWellnessActivityFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWellnessActivitiesQuery = {
  listWellnessActivities?: {
    __typename: 'ModelWellnessActivityConnection';
    items: Array<{
      __typename: 'WellnessActivity';
      category?: WellnessActivityCategory | null;
      createdAt: string;
      description?: string | null;
      duration: number;
      id: string;
      isActive?: boolean | null;
      isCustom?: boolean | null;
      name: string;
      owner?: string | null;
      subcategory?: WellnessActivitySubcategory | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type ListWellnessSessionsQueryVariables = {
  filter?: ModelWellnessSessionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListWellnessSessionsQuery = {
  listWellnessSessions?: {
    __typename: 'ModelWellnessSessionConnection';
    items: Array<{
      __typename: 'WellnessSession';
      activityId?: string | null;
      activityName: string;
      actualDuration?: number | null;
      category?: WellnessSessionCategory | null;
      completed?: boolean | null;
      completedAt?: string | null;
      createdAt: string;
      id: string;
      mood?: WellnessSessionMood | null;
      notes?: string | null;
      owner?: string | null;
      plannedDuration?: number | null;
      startedAt: string;
      subcategory?: WellnessSessionSubcategory | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type CreateEventMutationVariables = {
  condition?: ModelEventConditionInput | null;
  input: CreateEventInput;
};

export type CreateEventMutation = {
  createEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: CreateUserInput;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type CreateWellnessActivityMutationVariables = {
  condition?: ModelWellnessActivityConditionInput | null;
  input: CreateWellnessActivityInput;
};

export type CreateWellnessActivityMutation = {
  createWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type CreateWellnessSessionMutationVariables = {
  condition?: ModelWellnessSessionConditionInput | null;
  input: CreateWellnessSessionInput;
};

export type CreateWellnessSessionMutation = {
  createWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type DeleteEventMutationVariables = {
  condition?: ModelEventConditionInput | null;
  input: DeleteEventInput;
};

export type DeleteEventMutation = {
  deleteEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: DeleteUserInput;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type DeleteWellnessActivityMutationVariables = {
  condition?: ModelWellnessActivityConditionInput | null;
  input: DeleteWellnessActivityInput;
};

export type DeleteWellnessActivityMutation = {
  deleteWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type DeleteWellnessSessionMutationVariables = {
  condition?: ModelWellnessSessionConditionInput | null;
  input: DeleteWellnessSessionInput;
};

export type DeleteWellnessSessionMutation = {
  deleteWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type UpdateEventMutationVariables = {
  condition?: ModelEventConditionInput | null;
  input: UpdateEventInput;
};

export type UpdateEventMutation = {
  updateEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null;
  input: UpdateUserInput;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type UpdateWellnessActivityMutationVariables = {
  condition?: ModelWellnessActivityConditionInput | null;
  input: UpdateWellnessActivityInput;
};

export type UpdateWellnessActivityMutation = {
  updateWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type UpdateWellnessSessionMutationVariables = {
  condition?: ModelWellnessSessionConditionInput | null;
  input: UpdateWellnessSessionInput;
};

export type UpdateWellnessSessionMutation = {
  updateWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
  owner?: string | null;
};

export type OnCreateEventSubscription = {
  onCreateEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnCreateWellnessActivitySubscriptionVariables = {
  filter?: ModelSubscriptionWellnessActivityFilterInput | null;
  owner?: string | null;
};

export type OnCreateWellnessActivitySubscription = {
  onCreateWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnCreateWellnessSessionSubscriptionVariables = {
  filter?: ModelSubscriptionWellnessSessionFilterInput | null;
  owner?: string | null;
};

export type OnCreateWellnessSessionSubscription = {
  onCreateWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
  owner?: string | null;
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteWellnessActivitySubscriptionVariables = {
  filter?: ModelSubscriptionWellnessActivityFilterInput | null;
  owner?: string | null;
};

export type OnDeleteWellnessActivitySubscription = {
  onDeleteWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteWellnessSessionSubscriptionVariables = {
  filter?: ModelSubscriptionWellnessSessionFilterInput | null;
  owner?: string | null;
};

export type OnDeleteWellnessSessionSubscription = {
  onDeleteWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
  owner?: string | null;
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?: {
    __typename: 'Event';
    completed?: boolean | null;
    createdAt: string;
    description?: string | null;
    endTime: string;
    id: string;
    owner?: string | null;
    startTime: string;
    title: string;
    type?: EventType | null;
    updatedAt: string;
    wellnessActivity?: {
      __typename: 'EventWellnessActivity';
      activityType?: string | null;
      category?: EventWellnessActivityCategory | null;
      duration?: number | null;
    } | null;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: 'User';
    createdAt: string;
    email: string;
    id: string;
    joinedAt: string;
    name: string;
    owner?: string | null;
    preferences?: {
      __typename: 'UserPreferences';
      defaultCalendarView?: UserPreferencesDefaultCalendarView | null;
      notificationsEnabled?: boolean | null;
      wellnessReminders?: boolean | null;
    } | null;
    profilePhoto?: string | null;
    stats?: {
      __typename: 'UserStats';
      completionRate?: number | null;
      currentStreak?: number | null;
      longestStreak?: number | null;
      totalWellnessSessions?: number | null;
    } | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateWellnessActivitySubscriptionVariables = {
  filter?: ModelSubscriptionWellnessActivityFilterInput | null;
  owner?: string | null;
};

export type OnUpdateWellnessActivitySubscription = {
  onUpdateWellnessActivity?: {
    __typename: 'WellnessActivity';
    category?: WellnessActivityCategory | null;
    createdAt: string;
    description?: string | null;
    duration: number;
    id: string;
    isActive?: boolean | null;
    isCustom?: boolean | null;
    name: string;
    owner?: string | null;
    subcategory?: WellnessActivitySubcategory | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateWellnessSessionSubscriptionVariables = {
  filter?: ModelSubscriptionWellnessSessionFilterInput | null;
  owner?: string | null;
};

export type OnUpdateWellnessSessionSubscription = {
  onUpdateWellnessSession?: {
    __typename: 'WellnessSession';
    activityId?: string | null;
    activityName: string;
    actualDuration?: number | null;
    category?: WellnessSessionCategory | null;
    completed?: boolean | null;
    completedAt?: string | null;
    createdAt: string;
    id: string;
    mood?: WellnessSessionMood | null;
    notes?: string | null;
    owner?: string | null;
    plannedDuration?: number | null;
    startedAt: string;
    subcategory?: WellnessSessionSubcategory | null;
    updatedAt: string;
  } | null;
};
