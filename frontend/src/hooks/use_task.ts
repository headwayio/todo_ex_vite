import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useProject } from './use_project';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export interface INewTask {
  title: string;
  description: string;
  project_id: number | undefined;
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

export const useTask = () => {
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState<INewTask>({
    title: '',
    description: '',
    project_id: undefined,
  });

  const [addTask, { error: addTaskError }] = useMutation(ADD_TASK, {
    onCompleted: () => {
      setNewTask({
        title: '',
        description: '',
        project_id: undefined,
      });
    },
  });

  console.log(tasks && tasks[47]);

  const [updateTask, { error: updateTaskError }] = useMutation(UPDATE_TASK);

  const error = addTaskError || updateTaskError;

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    newTask,
    setNewTask,
    error,
  };
};
