import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Project } from './use_project';

export interface User {
  id: number;
  name: string;
  email?: string;
  projects?: Project[];
}

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    name
  }
`;

const GET_USERS = gql`
  ${CORE_USER_FIELDS}
  query GetUsers {
    users {
      ...CoreUserFields
    }
  }
`;

export const useUser = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const { error } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      setUsers(data.users);
    },
  });

  return {
    users,
    error,
  };
};
