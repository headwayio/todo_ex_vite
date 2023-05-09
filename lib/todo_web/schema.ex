defmodule TodoWeb.Schema do
  use Absinthe.Schema

  alias TodoWeb.Schema
  alias Todo.{Accounts, TaskManager}

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Accounts, Accounts.data())
      |> Dataloader.add_source(TaskManager, TaskManager.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  import_types(Schema.Types)

  query do
    import_fields(:get_users)
    import_fields(:get_projects)
    import_fields(:get_tasks)
  end

  mutation do
    import_fields(:create_user_mutation)
    import_fields(:create_project_mutation)
    import_fields(:create_task_mutation)
  end
end
