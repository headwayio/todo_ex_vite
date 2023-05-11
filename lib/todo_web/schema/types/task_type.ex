defmodule TodoWeb.Schema.Types.TaskType do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias Todo.TaskManager
  alias TodoWeb.Resolvers

  @desc "A task"
  object :task do
    field :id, :integer
    field :title, :string
    field :description, :string
    field :completed, :boolean
    field :project, :project, resolve: dataloader(TaskManager)
  end

  object :get_tasks do
    @desc """
    Get a list of tasks
    """

    field :tasks, list_of(:task) do
      resolve(&Resolvers.TaskManager.list_tasks/2)
    end
  end

  object :create_task_mutation do
    @desc """
    create task
    """

    @desc "Create a task"
    field :create_task, :task do
      arg(:title, non_null(:string))
      arg(:description, :string)
      arg(:project_id, non_null(:integer))

      resolve(&Resolvers.TaskManager.create_task/3)
    end
  end

  object :update_task_mutation do
    @desc """
    Update task
    """

    @desc "Update a task"
    field :update_task, :task do
      arg(:task_id, non_null(:integer))
      arg(:title, :string)
      arg(:description, :string)
      arg(:completed, :boolean)

      resolve(&Resolvers.TaskManager.update_task/3)
    end
  end
end
