import React, { useState } from 'react';
import { Button } from './components/atoms/button';
import { Modal } from './components/molecules/modal';
import { SimpleForm } from './components/molecules/simple_form';
import { Card } from './components/molecules/card';
import { Alert } from './components/molecules/alert';
import { INewProject, useProject } from './hooks/use_project';
import { useUser } from './hooks/use_user';
import { ProjectCard } from './components/organism/project_card';

function App() {
  const {
    projects,
    addProject,
    removeProject,
    newProject,
    setNewProject,
    error,
  } = useProject();
  const { users } = useUser();

  const [showAddProject, setShowAddProject] = useState(false);
  const handleAddProjectOpen = () => setShowAddProject(true);
  const handleAddProjectClose = () => setShowAddProject(false);

  const handleAddProject = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    addProject({
      variables: { name: newProject.name, user_id: newProject.userId },
    });
    setShowAddProject(false);
  };

  const handleRemoveProject = (project_id: number) => {
    removeProject(project_id);
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
              <ProjectCard
                key={project.id}
                project={project}
                deleteProject={handleRemoveProject}
              />
            ))
          : [0, 1, 2, 3].map((i) => <Card key={i} loading={true} />)}
      </div>
      <Modal show={showAddProject} handleClose={handleAddProjectClose}>
        <h3 className='text-lg font-semibold uppercase mb-8'>New project</h3>
        <SimpleForm<INewProject>
          aria-label='Add a new project'
          handleSubmit={handleAddProject}
          state={newProject}
          setState={setNewProject}
          fields={[
            {
              type: 'text',
              label: 'Project name',
              name: 'name',
              placeholder: 'Do the thing...',
              id: 'project_name',
              value: newProject.name,
            },
            {
              type: 'select',
              id: 'project_user',
              name: 'userId',
              label: 'User',
              value: newProject.userId,
              options: users?.map((user) => ({
                value: user.id,
                text: user.name,
              })),
            },
          ]}
        />
      </Modal>
    </div>
  );
}

export default App;
