/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateTodo: OnCreateTodoSubscription;
  onUpdateTodo: OnUpdateTodoSubscription;
  onDeleteTodo: OnDeleteTodoSubscription;
  onCreateCalendarEvent: OnCreateCalendarEventSubscription;
  onUpdateCalendarEvent: OnUpdateCalendarEventSubscription;
  onDeleteCalendarEvent: OnDeleteCalendarEventSubscription;
  onCreateUser: OnCreateUserSubscription;
  onUpdateUser: OnUpdateUserSubscription;
  onDeleteUser: OnDeleteUserSubscription;
  onCreateUserSubscription: OnCreateUserSubscriptionSubscription;
  onUpdateUserSubscription: OnUpdateUserSubscriptionSubscription;
  onDeleteUserSubscription: OnDeleteUserSubscriptionSubscription;
};

export type CreateTodoInput = {
  id?: string | null;
  name: string;
  description?: string | null;
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelTodoConditionInput | null> | null;
  or?: Array<ModelTodoConditionInput | null> | null;
  not?: ModelTodoConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Todo = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTodoInput = {
  id: string;
  name?: string | null;
  description?: string | null;
};

export type DeleteTodoInput = {
  id: string;
};

export type CreateCalendarEventInput = {
  id?: string | null;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
};

export type ModelCalendarEventConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  location?: ModelStringInput | null;
  participant?: ModelStringInput | null;
  userId?: ModelIDInput | null;
  and?: Array<ModelCalendarEventConditionInput | null> | null;
  or?: Array<ModelCalendarEventConditionInput | null> | null;
  not?: ModelCalendarEventConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CalendarEvent = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCalendarEventInput = {
  id: string;
  title?: string | null;
  description?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
};

export type DeleteCalendarEventInput = {
  id: string;
};

export type CreateUserInput = {
  id?: string | null;
  name: string;
  email: string;
  role: string;
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  role?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type User = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: ModelCalendarEventConnection | null;
  subscriptions?: ModelUserSubscriptionConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelCalendarEventConnection = {
  __typename: "ModelCalendarEventConnection";
  items: Array<CalendarEvent | null>;
  nextToken?: string | null;
};

export type ModelUserSubscriptionConnection = {
  __typename: "ModelUserSubscriptionConnection";
  items: Array<UserSubscription | null>;
  nextToken?: string | null;
};

export type UserSubscription = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: User;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type CreateUserSubscriptionInput = {
  id?: string | null;
  userId: string;
  startDate: string;
  endDate: string;
};

export type ModelUserSubscriptionConditionInput = {
  userId?: ModelIDInput | null;
  startDate?: ModelStringInput | null;
  endDate?: ModelStringInput | null;
  and?: Array<ModelUserSubscriptionConditionInput | null> | null;
  or?: Array<ModelUserSubscriptionConditionInput | null> | null;
  not?: ModelUserSubscriptionConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type UpdateUserSubscriptionInput = {
  id: string;
  userId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type DeleteUserSubscriptionInput = {
  id: string;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection";
  items: Array<Todo | null>;
  nextToken?: string | null;
};

export type ModelCalendarEventFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  location?: ModelStringInput | null;
  participant?: ModelStringInput | null;
  userId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelCalendarEventFilterInput | null> | null;
  or?: Array<ModelCalendarEventFilterInput | null> | null;
  not?: ModelCalendarEventFilterInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  role?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelUserSubscriptionFilterInput = {
  id?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  startDate?: ModelStringInput | null;
  endDate?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelUserSubscriptionFilterInput | null> | null;
  or?: Array<ModelUserSubscriptionFilterInput | null> | null;
  not?: ModelUserSubscriptionFilterInput | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionTodoFilterInput | null> | null;
  or?: Array<ModelSubscriptionTodoFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionCalendarEventFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  startTime?: ModelSubscriptionStringInput | null;
  endTime?: ModelSubscriptionStringInput | null;
  location?: ModelSubscriptionStringInput | null;
  participant?: ModelSubscriptionStringInput | null;
  userId?: ModelSubscriptionIDInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionCalendarEventFilterInput | null> | null;
  or?: Array<ModelSubscriptionCalendarEventFilterInput | null> | null;
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  role?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
};

export type ModelSubscriptionUserSubscriptionFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionIDInput | null;
  startDate?: ModelSubscriptionStringInput | null;
  endDate?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserSubscriptionFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserSubscriptionFilterInput | null> | null;
};

export type CreateTodoMutation = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTodoMutation = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteTodoMutation = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCalendarEventMutation = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCalendarEventMutation = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCalendarEventMutation = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserSubscriptionMutation = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserSubscriptionMutation = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserSubscriptionMutation = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTodoQuery = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListTodosQuery = {
  __typename: "ModelTodoConnection";
  items: Array<{
    __typename: "Todo";
    id: string;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCalendarEventQuery = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCalendarEventsQuery = {
  __typename: "ModelCalendarEventConnection";
  items: Array<{
    __typename: "CalendarEvent";
    id: string;
    title: string;
    description?: string | null;
    startTime: string;
    endTime: string;
    location?: string | null;
    participant?: string | null;
    userId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUserSubscriptionQuery = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type ListUserSubscriptionsQuery = {
  __typename: "ModelUserSubscriptionConnection";
  items: Array<{
    __typename: "UserSubscription";
    id: string;
    userId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type CalendarEventsByUserIdAndStartTimeQuery = {
  __typename: "ModelCalendarEventConnection";
  items: Array<{
    __typename: "CalendarEvent";
    id: string;
    title: string;
    description?: string | null;
    startTime: string;
    endTime: string;
    location?: string | null;
    participant?: string | null;
    userId?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type UserSubscriptionsByUserIdAndStartDateQuery = {
  __typename: "ModelUserSubscriptionConnection";
  items: Array<{
    __typename: "UserSubscription";
    id: string;
    userId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateTodoSubscription = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateTodoSubscription = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteTodoSubscription = {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCalendarEventSubscription = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCalendarEventSubscription = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCalendarEventSubscription = {
  __typename: "CalendarEvent";
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  location?: string | null;
  participant?: string | null;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  role: string;
  events?: {
    __typename: "ModelCalendarEventConnection";
    nextToken?: string | null;
  } | null;
  subscriptions?: {
    __typename: "ModelUserSubscriptionConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscriptionSubscription = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserSubscriptionSubscription = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserSubscriptionSubscription = {
  __typename: "UserSubscription";
  id: string;
  userId: string;
  user: {
    __typename: "User";
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateTodo(
    input: CreateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<CreateTodoMutation> {
    const statement = `mutation CreateTodo($input: CreateTodoInput!, $condition: ModelTodoConditionInput) {
        createTodo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTodoMutation>response.data.createTodo;
  }
  async UpdateTodo(
    input: UpdateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<UpdateTodoMutation> {
    const statement = `mutation UpdateTodo($input: UpdateTodoInput!, $condition: ModelTodoConditionInput) {
        updateTodo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTodoMutation>response.data.updateTodo;
  }
  async DeleteTodo(
    input: DeleteTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<DeleteTodoMutation> {
    const statement = `mutation DeleteTodo($input: DeleteTodoInput!, $condition: ModelTodoConditionInput) {
        deleteTodo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTodoMutation>response.data.deleteTodo;
  }
  async CreateCalendarEvent(
    input: CreateCalendarEventInput,
    condition?: ModelCalendarEventConditionInput
  ): Promise<CreateCalendarEventMutation> {
    const statement = `mutation CreateCalendarEvent($input: CreateCalendarEventInput!, $condition: ModelCalendarEventConditionInput) {
        createCalendarEvent(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCalendarEventMutation>response.data.createCalendarEvent;
  }
  async UpdateCalendarEvent(
    input: UpdateCalendarEventInput,
    condition?: ModelCalendarEventConditionInput
  ): Promise<UpdateCalendarEventMutation> {
    const statement = `mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!, $condition: ModelCalendarEventConditionInput) {
        updateCalendarEvent(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCalendarEventMutation>response.data.updateCalendarEvent;
  }
  async DeleteCalendarEvent(
    input: DeleteCalendarEventInput,
    condition?: ModelCalendarEventConditionInput
  ): Promise<DeleteCalendarEventMutation> {
    const statement = `mutation DeleteCalendarEvent($input: DeleteCalendarEventInput!, $condition: ModelCalendarEventConditionInput) {
        deleteCalendarEvent(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCalendarEventMutation>response.data.deleteCalendarEvent;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreateUserSubscription(
    input: CreateUserSubscriptionInput,
    condition?: ModelUserSubscriptionConditionInput
  ): Promise<CreateUserSubscriptionMutation> {
    const statement = `mutation CreateUserSubscription($input: CreateUserSubscriptionInput!, $condition: ModelUserSubscriptionConditionInput) {
        createUserSubscription(input: $input, condition: $condition) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserSubscriptionMutation>response.data.createUserSubscription;
  }
  async UpdateUserSubscription(
    input: UpdateUserSubscriptionInput,
    condition?: ModelUserSubscriptionConditionInput
  ): Promise<UpdateUserSubscriptionMutation> {
    const statement = `mutation UpdateUserSubscription($input: UpdateUserSubscriptionInput!, $condition: ModelUserSubscriptionConditionInput) {
        updateUserSubscription(input: $input, condition: $condition) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserSubscriptionMutation>response.data.updateUserSubscription;
  }
  async DeleteUserSubscription(
    input: DeleteUserSubscriptionInput,
    condition?: ModelUserSubscriptionConditionInput
  ): Promise<DeleteUserSubscriptionMutation> {
    const statement = `mutation DeleteUserSubscription($input: DeleteUserSubscriptionInput!, $condition: ModelUserSubscriptionConditionInput) {
        deleteUserSubscription(input: $input, condition: $condition) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserSubscriptionMutation>response.data.deleteUserSubscription;
  }
  async GetTodo(id: string): Promise<GetTodoQuery> {
    const statement = `query GetTodo($id: ID!) {
        getTodo(id: $id) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTodoQuery>response.data.getTodo;
  }
  async ListTodos(
    filter?: ModelTodoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTodosQuery> {
    const statement = `query ListTodos($filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
        listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTodosQuery>response.data.listTodos;
  }
  async GetCalendarEvent(id: string): Promise<GetCalendarEventQuery> {
    const statement = `query GetCalendarEvent($id: ID!) {
        getCalendarEvent(id: $id) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCalendarEventQuery>response.data.getCalendarEvent;
  }
  async ListCalendarEvents(
    filter?: ModelCalendarEventFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCalendarEventsQuery> {
    const statement = `query ListCalendarEvents($filter: ModelCalendarEventFilterInput, $limit: Int, $nextToken: String) {
        listCalendarEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            description
            startTime
            endTime
            location
            participant
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCalendarEventsQuery>response.data.listCalendarEvents;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async GetUserSubscription(id: string): Promise<GetUserSubscriptionQuery> {
    const statement = `query GetUserSubscription($id: ID!) {
        getUserSubscription(id: $id) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserSubscriptionQuery>response.data.getUserSubscription;
  }
  async ListUserSubscriptions(
    filter?: ModelUserSubscriptionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserSubscriptionsQuery> {
    const statement = `query ListUserSubscriptions($filter: ModelUserSubscriptionFilterInput, $limit: Int, $nextToken: String) {
        listUserSubscriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userId
            startDate
            endDate
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUserSubscriptionsQuery>response.data.listUserSubscriptions;
  }
  async CalendarEventsByUserIdAndStartTime(
    userId: string,
    startTime?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelCalendarEventFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<CalendarEventsByUserIdAndStartTimeQuery> {
    const statement = `query CalendarEventsByUserIdAndStartTime($userId: ID!, $startTime: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelCalendarEventFilterInput, $limit: Int, $nextToken: String) {
        calendarEventsByUserIdAndStartTime(
          userId: $userId
          startTime: $startTime
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            title
            description
            startTime
            endTime
            location
            participant
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    if (startTime) {
      gqlAPIServiceArguments.startTime = startTime;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CalendarEventsByUserIdAndStartTimeQuery>(
      response.data.calendarEventsByUserIdAndStartTime
    );
  }
  async UserSubscriptionsByUserIdAndStartDate(
    userId: string,
    startDate?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserSubscriptionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserSubscriptionsByUserIdAndStartDateQuery> {
    const statement = `query UserSubscriptionsByUserIdAndStartDate($userId: ID!, $startDate: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelUserSubscriptionFilterInput, $limit: Int, $nextToken: String) {
        userSubscriptionsByUserIdAndStartDate(
          userId: $userId
          startDate: $startDate
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            userId
            startDate
            endDate
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userId
    };
    if (startDate) {
      gqlAPIServiceArguments.startDate = startDate;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UserSubscriptionsByUserIdAndStartDateQuery>(
      response.data.userSubscriptionsByUserIdAndStartDate
    );
  }
  OnCreateTodoListener(
    filter?: ModelSubscriptionTodoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTodo">>
  > {
    const statement = `subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
        onCreateTodo(filter: $filter) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTodo">>
    >;
  }

  OnUpdateTodoListener(
    filter?: ModelSubscriptionTodoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTodo">>
  > {
    const statement = `subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
        onUpdateTodo(filter: $filter) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTodo">>
    >;
  }

  OnDeleteTodoListener(
    filter?: ModelSubscriptionTodoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTodo">>
  > {
    const statement = `subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
        onDeleteTodo(filter: $filter) {
          __typename
          id
          name
          description
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTodo">>
    >;
  }

  OnCreateCalendarEventListener(
    filter?: ModelSubscriptionCalendarEventFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCalendarEvent">>
  > {
    const statement = `subscription OnCreateCalendarEvent($filter: ModelSubscriptionCalendarEventFilterInput) {
        onCreateCalendarEvent(filter: $filter) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onCreateCalendarEvent">
      >
    >;
  }

  OnUpdateCalendarEventListener(
    filter?: ModelSubscriptionCalendarEventFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCalendarEvent">>
  > {
    const statement = `subscription OnUpdateCalendarEvent($filter: ModelSubscriptionCalendarEventFilterInput) {
        onUpdateCalendarEvent(filter: $filter) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onUpdateCalendarEvent">
      >
    >;
  }

  OnDeleteCalendarEventListener(
    filter?: ModelSubscriptionCalendarEventFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCalendarEvent">>
  > {
    const statement = `subscription OnDeleteCalendarEvent($filter: ModelSubscriptionCalendarEventFilterInput) {
        onDeleteCalendarEvent(filter: $filter) {
          __typename
          id
          title
          description
          startTime
          endTime
          location
          participant
          userId
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onDeleteCalendarEvent">
      >
    >;
  }

  OnCreateUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  > {
    const statement = `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
        onCreateUser(filter: $filter) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
    >;
  }

  OnUpdateUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  > {
    const statement = `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
        onUpdateUser(filter: $filter) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
    >;
  }

  OnDeleteUserListener(
    filter?: ModelSubscriptionUserFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  > {
    const statement = `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
        onDeleteUser(filter: $filter) {
          __typename
          id
          name
          email
          role
          events {
            __typename
            nextToken
          }
          subscriptions {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
    >;
  }

  OnCreateUserSubscriptionListener(
    filter?: ModelSubscriptionUserSubscriptionFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateUserSubscription">
    >
  > {
    const statement = `subscription OnCreateUserSubscription($filter: ModelSubscriptionUserSubscriptionFilterInput) {
        onCreateUserSubscription(filter: $filter) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onCreateUserSubscription">
      >
    >;
  }

  OnUpdateUserSubscriptionListener(
    filter?: ModelSubscriptionUserSubscriptionFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateUserSubscription">
    >
  > {
    const statement = `subscription OnUpdateUserSubscription($filter: ModelSubscriptionUserSubscriptionFilterInput) {
        onUpdateUserSubscription(filter: $filter) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onUpdateUserSubscription">
      >
    >;
  }

  OnDeleteUserSubscriptionListener(
    filter?: ModelSubscriptionUserSubscriptionFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteUserSubscription">
    >
  > {
    const statement = `subscription OnDeleteUserSubscription($filter: ModelSubscriptionUserSubscriptionFilterInput) {
        onDeleteUserSubscription(filter: $filter) {
          __typename
          id
          userId
          user {
            __typename
            id
            name
            email
            role
            createdAt
            updatedAt
          }
          startDate
          endDate
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onDeleteUserSubscription">
      >
    >;
  }
}
