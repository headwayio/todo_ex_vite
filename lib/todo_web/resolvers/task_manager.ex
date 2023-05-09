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
end
