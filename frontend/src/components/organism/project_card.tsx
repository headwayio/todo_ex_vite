import { Project } from '../../hooks/use_project';
import { INewTask, useTask } from '../../hooks/use_task';
import { Avatar } from '../atoms/avatar';
import { ButtonIcon } from '../atoms/button_icon';
import { Modal } from '../molecules/modal';
import { Card } from '../molecules/card';
import { Dropdown } from '../molecules/dropdown';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import { SimpleForm } from '../molecules/simple_form';
import { useState } from 'react';
import { TaskCard } from '../molecules/task_card';

interface Props {
  project: Project;
  deleteProject: (project_id: number) => void;
}

export const ProjectCard = ({ project, deleteProject }: Props) => {
  const { tasks, addTask, newTask, setNewTask } = useTask();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showProjectSettings, setShowProjectSettings] = useState(false);
  const [projectSettingsId, setProjectSettingsId] = useState(1);

  const handleAddTaskOpen = (project_id: number) => {
    setNewTask({
      ...newTask,
      project_id: project_id,
    });
    setShowAddTask(true);
  };
  const handleAddTaskClose = () => setShowAddTask(false);

  const handleAddTask = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addTask({
      variables: {
        ...newTask,
      },
    });
    setShowAddTask(false);
  };

  const handleUpdateProject = () => {
    alert('This has not been implemented');
  };

  return (
    <Card>
      <div className='flex items-center gap-4'>
        <Avatar initials={project.user.name} />
        <h3 className='text-lg font-semibold flex-grow'>{project.name}</h3>

        <div>
          <ButtonIcon onClick={() => handleAddTaskOpen(project.id)}>
            <FiPlus />
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              setProjectSettingsId(project.id);
              setShowProjectSettings(!showProjectSettings);
            }}
            onBlur={() => setShowProjectSettings(false)}
          >
            <FiMoreVertical />
            <Dropdown
              show={showProjectSettings && projectSettingsId === project.id}
              fields={[
                {
                  label: 'Edit',
                  click: () => handleUpdateProject(),
                },
                {
                  label: 'Delete',
                  click: () => deleteProject(project.id),
                },
              ]}
            />
          </ButtonIcon>
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col gap-4'>
        {tasks &&
          tasks[project.id].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
      <Modal show={showAddTask} handleClose={handleAddTaskClose}>
        <h3 className='text-lg font-semibold uppercase mb-8'>New task</h3>
        <SimpleForm<INewTask>
          aria-label='Add a new task'
          handleSubmit={handleAddTask}
          state={newTask}
          setState={setNewTask}
          fields={[
            {
              type: 'text',
              name: 'title',
              label: 'Title',
              placeholder: 'Buy a shovel',
              id: 'task_title',
              value: newTask.title,
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
              id: 'task_description',
              value: newTask.description,
            },
          ]}
        />
      </Modal>
    </Card>
  );
};
