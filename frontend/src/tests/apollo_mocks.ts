import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
} from '../hooks/use_project';
import { GET_USERS } from '../hooks/use_user';

export const queryMocks = [
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: [
          {
            __typename: 'Project',
            id: '1',
            name: 'Buck',
            user: { __typename: 'User', name: 'John Doe', id: 1 },
            tasks: [],
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            __typename: 'User',
            id: '1',
            name: 'John Doe',
          },
        ],
      },
    },
  },
  {
    request: {
      query: ADD_PROJECT,
      variables: { name: 'My Tasks', user_id: 1 },
    },
    result: {
      data: {
        project: {
          id: '2',
          name: 'My Tasks',
          user: { name: 'John Doe', id: 1 },
          tasks: [],
        },
      },
    },
  },
  {
    request: {
      query: DELETE_PROJECT,
      variables: { project_id: 1 },
    },
    result: {
      data: { project: { __typename: 'Project', id: '1' } },
    },
  },
];

export const errorMocks = [
  {
    request: {
      query: GET_PROJECTS,
    },
    error: new Error('Something went wrong'),
  },
];
