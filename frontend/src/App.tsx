import React, { useState } from 'react';
import { Button } from './components/atoms/button';
import { Avatar } from './components/atoms/avatar';
import { Modal } from './components/atoms/modal';
import { SimpleForm } from './components/molecules/simple_form';
import { Card } from './components/molecules/card';
import { Alert } from './components/molecules/alert';
import { useProject } from './hooks/use_project';
import { useUser } from './hooks/use_user';
import { useTask } from './hooks/use_task';
import {
  FiSquare,
  FiCheckSquare,
  FiEdit,
  FiPlus,
  FiMoreVertical,
} from 'react-icons/fi';
import { ButtonIcon } from './components/atoms/button_icon';

type EventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

function App() {
  const {
    projects,
    addProject,
    deleteProject,
    newProject,
    setNewProject,
    error,
    refetch,
  } = useProject();
  const { users } = useUser();
  const { addTask, updateTask, newTask, setNewTask } = useTask(refetch);

  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [projectSettingsId, setProjectSettingsId] = useState(1);
  const handleAddProjectOpen = () => setShowAddProject(true);
  const handleAddProjectClose = () => setShowAddProject(false);

  const handleAddTaskOpen = (project_id: number) => {
    setNewTask({
      ...newTask,
      projectId: project_id,
    });
    setShowAddTask(true);
  };
  const handleAddTaskClose = () => setShowAddTask(false);

  const handleNameUpdate = (e: EventType) =>
    setNewProject({
      ...newProject,
      name: e.target.value,
    });

  const handleUserUpdate = (e: EventType) =>
    setNewProject({
      ...newProject,
      userId: parseInt(e.target.value),
    });

  const handleChange = (e: EventType) => {
    const name = e.target.name;
    setNewTask({
      ...newTask,
      [name]: e.target.value,
    });
  };

  const handleTaskCompletion = (task_id: number, completed: boolean) => {
    updateTask({
      variables: { completed: !completed, task_id: task_id },
    });
  };

  const handleAddProject = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addProject({
      variables: { name: newProject.name, user_id: newProject.userId },
    });
    setShowAddProject(false);
  };

  const handleAddTask = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addTask({
      variables: {
        title: newTask.title,
        description: newTask.description,
        project_id: newTask.projectId,
      },
    });
    setShowAddTask(false);
  };

  const handleDeleteProject = (projectId: number) => {
    deleteProject({
      variables: { project_id: projectId },
    });
  };

  return (
    <div className='p-8'>
      <div className='flex gap-8'>
        <h2 className='flex-grow text-2xl uppercase font-semibold'>Projects</h2>
        <Button
          text='+ Add Project'
          variant='outline'
          onClick={handleAddProjectOpen}
        />
      </div>
      <hr className='my-8' />
      {error && <Alert error={error.message} />}
      <div className='grid grid-cols-2 gap-8'>
        {projects
          ? projects.map((project) => (
              <Card key={project.id}>
                <div className='relative flex items-center gap-4'>
                  <Avatar initials={project.user.name} />
                  <h3 className='text-lg font-semibold flex-grow'>
                    {project.name}
                  </h3>

                  <div>
                    <ButtonIcon onClick={() => handleAddTaskOpen(project.id)}>
                      <FiPlus />
                    </ButtonIcon>
                    <ButtonIcon
                      onClick={() => {
                        setProjectSettingsId(project.id);
                        setShowProjectSettings(!showProjectSettings);
                      }}
                    >
                      <FiMoreVertical />
                    </ButtonIcon>
                    <div
                      id='dropdown'
                      className={`${
                        showProjectSettings && projectSettingsId === project.id
                          ? ''
                          : 'hidden'
                      } absolute right-2 top-8 z-10 bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                    >
                      <ul
                        className=' text-sm text-gray-700 dark:text-gray-200'
                        aria-labelledby='dropdownDefaultButton'
                      >
                        <li
                          onClick={() => handleDeleteProject(project.id)}
                          className='block cursor-pointer rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr className='my-2' />
                <div className='flex flex-col gap-4'>
                  {project.tasks.map((task) => (
                    <Card
                      key={task.id}
                      horizontalStack={true}
                      disabled={task.completed}
                    >
                      {task.completed ? (
                        <FiCheckSquare
                          className='cursor-pointer'
                          onClick={() =>
                            handleTaskCompletion(task.id, task.completed)
                          }
                        />
                      ) : (
                        <FiSquare
                          className='cursor-pointer'
                          onClick={() =>
                            handleTaskCompletion(task.id, task.completed)
                          }
                        />
                      )}
                      <div className='flex flex-col flex-grow'>
                        <p>{task.title}</p>
                        <p className='text-xs text-gray-500'>
                          {task.description}
                        </p>
                      </div>
                      {!task.completed && (
                        <div>
                          <ButtonIcon>
                            <FiEdit />
                          </ButtonIcon>
                          <ButtonIcon>
                            <FiMoreVertical />
                          </ButtonIcon>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>
            ))
          : [0, 1, 2, 3].map((i) => <Card key={i} loading={true} />)}
      </div>
      <Modal show={showAddProject} handleClose={handleAddProjectClose}>
        <h3 className='text-lg font-semibold uppercase mb-8'>New project</h3>
        <SimpleForm
          handleSubmit={handleAddProject}
          fields={[
            {
              type: 'text',
              label: 'Project name',
              placeholder: 'Do the thing...',
              id: 'project_name',
              value: newProject.name,
              onChange: handleNameUpdate,
            },
            {
              type: 'select',
              id: 'project_user',
              label: 'User',
              value: newProject.userId,
              options: users?.map((user) => ({
                value: user.id,
                text: user.name,
              })),
              onChange: handleUserUpdate,
            },
          ]}
        />
      </Modal>
      <Modal show={showAddTask} handleClose={handleAddTaskClose}>
        <h3 className='text-lg font-semibold uppercase mb-8'>New task</h3>
        <SimpleForm
          handleSubmit={handleAddTask}
          fields={[
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              placeholder: 'Buy a shovel',
              id: 'task_title',
              value: newTask.title,
              onChange: handleChange,
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
              id: 'task_description',
              value: newTask.description,
              onChange: handleChange,
            },
          ]}
        />
      </Modal>
    </div>
  );
}

export default App;
