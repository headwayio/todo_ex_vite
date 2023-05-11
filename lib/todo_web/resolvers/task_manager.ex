defmodule TodoWeb.Resolvers.TaskManager do
  alias Todo.TaskManager

  def list_projects(_args, _context) do
    {:ok, TaskManager.list_projects()}
  end

  def list_tasks(_args, _context) do
    {:ok, TaskManager.list_tasks()}
  end

  def create_project(_parent, args, _context) do
    TaskManager.create_project(args)
  end

  def create_task(_parent, args, _context) do
    TaskManager.create_task(args)
  end

  def update_task(_parent, %{task_id: task_id} = args, _context) do
    TaskManager.update_task(task_id, args)
  end

  def delete_project(_parent, %{project_id: project_id}, _context) do
    TaskManager.delete_project(project_id)
  end

  def delete_task(_parent, %{task_id: task_id}, _context) do
    TaskManager.create_task(task_id)
  end
end
