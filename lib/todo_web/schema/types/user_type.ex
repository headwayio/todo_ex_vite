defmodule TodoWeb.Schema.Types.UserType do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  alias Todo.TaskManager
  alias TodoWeb.Resolvers

  @desc "A user"
  object :user do
    field :id, :integer
    field :email, :string
    field :name, :string
    field :projects, list_of(:project), resolve: dataloader(TaskManager)
  end

  object :get_users do
    @desc """
    Get a list of users
    """

    field :users, list_of(:user) do
      resolve(&Resolvers.Accounts.list_users/2)
    end
  end

  object :create_user_mutation do
    @desc """
    create user
    """

    @desc "Create a user"
    field :create_user, :user do
      arg(:email, non_null(:string))
      arg(:name, non_null(:string))

      resolve(&Resolvers.Accounts.create_user/3)
    end
  end
end
