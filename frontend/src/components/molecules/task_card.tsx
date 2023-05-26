import { Card } from './card';
import { Task, useTask } from '../../hooks/use_task';
import { ButtonIcon } from '../atoms/button_icon';
import {
  FiSquare,
  FiCheckSquare,
  FiEdit,
  FiMoreVertical,
} from 'react-icons/fi';
import { Dropdown } from './dropdown';
import { useState } from 'react';

interface Props {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const { updateTask } = useTask();
  const [showTaskSettings, setShowTaskSettings] = useState(false);
  const [taskSettingsId, setTaskSettingsId] = useState(1);

  const handleTaskCompletion = (task_id: number, completed: boolean) => {
    updateTask({
      variables: { completed: !completed, task_id: task_id },
    });
  };

  const handleUpdateTask = () => {
    alert('This has not been implemented');
  };

  const handleDeleteTask = () => {
    alert('This has not been implemented');
  };

  return (
    <Card horizontalStack={true} disabled={task.completed}>
      {task.completed ? (
        <FiCheckSquare
          className='cursor-pointer'
          onClick={() => handleTaskCompletion(task.id, task.completed)}
        />
      ) : (
        <FiSquare
          className='cursor-pointer'
          onClick={() => handleTaskCompletion(task.id, task.completed)}
        />
      )}
      <div className='flex flex-col flex-grow'>
        <p>{task.title}</p>
        <p className='text-xs text-gray-500'>{task.description}</p>
      </div>
      {!task.completed && (
        <div>
          <ButtonIcon>
            <FiEdit />
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              setTaskSettingsId(task.id);
              setShowTaskSettings(!showTaskSettings);
            }}
            onBlur={() => setShowTaskSettings(false)}
          >
            <FiMoreVertical />
            <Dropdown
              show={showTaskSettings && taskSettingsId === task.id}
              fields={[
                {
                  label: 'Edit',
                  click: () => handleUpdateTask(),
                },
                {
                  label: 'Delete',
                  click: () => handleDeleteTask(),
                },
              ]}
            />
          </ButtonIcon>
        </div>
      )}
    </Card>
  );
};
