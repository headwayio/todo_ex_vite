defmodule TodoWeb.Schema.Types.ProjectType do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias Todo.{Accounts, TaskManager}
  alias TodoWeb.Resolvers

  @desc "A project"
  object :project do
    field :id, :integer
    field :name, :string
    field :user, :user, resolve: dataloader(Accounts)
    field :tasks, list_of(:task), resolve: dataloader(TaskManager)
  end

  object :get_projects do
    @desc """
    Get a list of projects
    """

    field :projects, list_of(:project) do
      resolve(&Resolvers.TaskManager.list_projects/2)
    end
  end

  object :create_project_mutation do
    @desc """
    create project
    """

    @desc "Create a project"
    field :create_project, :project do
      arg(:name, non_null(:string))
      arg(:user_id, non_null(:integer))

      resolve(&Resolvers.TaskManager.create_project/3)
    end
  end

  object :delete_project_mutation do
    @desc """
    delete project
    """

    @desc "Deletes a project"
    field :delete_project, :project do
      arg(:project_id, non_null(:integer))

      resolve(&Resolvers.TaskManager.delete_project/3)
    end
  end
end
