import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

interface INewTask {
  title: string;
  description: string;
  projectId: number | undefined;
}

const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!, $project_id: Int!) {
    task: createTask(
      title: $title
      description: $description
      projectId: $project_id
    ) {
      id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $title: String
    $description: String
    $completed: Boolean
    $task_id: Int!
  ) {
    task: updateTask(
      title: $title
      description: $description
      completed: $completed
      taskId: $task_id
    ) {
      id
    }
  }
`;

export const useTask = (refetch: () => void) => {
  const [newTask, setNewTask] = useState<INewTask>({
    title: '',
    description: '',
    projectId: undefined,
  });

  const [addTask, { error: addTaskError }] = useMutation(ADD_TASK, {
    onCompleted: (data) => {
      setNewTask({
        title: '',
        description: '',
        projectId: undefined,
      });
      console.log(data.task);
      refetch();
    },
  });

  const [updateTask, { error: updateTaskError }] = useMutation(UPDATE_TASK, {
    onCompleted: (data) => {
      console.log(data.task);
      refetch();
    },
  });

  const error = addTaskError || updateTaskError;

  return {
    addTask,
    updateTask,
    newTask,
    setNewTask,
    error,
  };
};
