defmodule TodoWeb.Schema.Types do
  use Absinthe.Schema.Notation
  alias TodoWeb.Schema.Types

  import_types(Types.UserType)
  import_types(Types.ProjectType)
  import_types(Types.TaskType)
end
