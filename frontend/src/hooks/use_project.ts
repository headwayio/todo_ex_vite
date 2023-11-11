import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { CORE_USER_FIELDS, User } from './use_user';
import { Task } from './use_task';

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
  user: User;
}

export interface INewProject {
  name: string;
  userId: number;
}

const CORE_PROJECT_FIELDS = gql`
  ${CORE_USER_FIELDS}
  fragment CoreProjectFields on Project {
    id
    name
    user {
      ...CoreUserFields
    }
    tasks {
      id
      title
      description
      completed
    }
  }
`;

export const GET_PROJECTS = gql`
  ${CORE_PROJECT_FIELDS}
  query GetProjects {
    projects {
      ...CoreProjectFields
    }
  }
`;

export const ADD_PROJECT = gql`
  ${CORE_PROJECT_FIELDS}
  mutation AddProject($name: String!, $user_id: Int!) {
    project: createProject(name: $name, userId: $user_id) {
      ...CoreProjectFields
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($project_id: Int!) {
    project: deleteProject(projectId: $project_id) {
      id
    }
  }
`;

export const useProject = () => {
  const [projects, setProjects] = useState<Project[] | undefined>();
  const [newProject, setNewProject] = useState<INewProject>({
    name: '',
    userId: 1,
  });
  const {
    loading,
    error: fetchProjectError,
    refetch,
  } = useQuery(GET_PROJECTS, {
    onCompleted: (data) => {
      setProjects(data.projects);
    },
  });

  const [addProject, { error: addProjectError }] = useMutation(ADD_PROJECT, {
    onCompleted: (data) => {
      setNewProject({ name: '', userId: 1 });
      setProjects(projects && [...projects, data.project]);
    },
  });

  const [deleteProject, { error: deleteProjectError }] = useMutation(
    DELETE_PROJECT,
    {
      onCompleted: (data) => {
        setProjects(
          projects &&
            projects.filter((project) => project.id !== data.project.id)
        );
      },
    }
  );

  const error = fetchProjectError || addProjectError || deleteProjectError;

  return {
    projects,
    addProject,
    deleteProject,
    newProject,
    setNewProject,
    loading,
    error,
    refetch,
  };
};
