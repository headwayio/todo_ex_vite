defmodule Todo.TaskManagerFixtures do
  import Todo.AccountsFixtures

  @moduledoc """
  This module defines test helpers for creating
  entities via the `Todo.TaskManager` context.
  """

  @doc """
  Generate a project.
  """
  def project_fixture(attrs \\ %{}) do
    {:ok, project} =
      attrs
      |> Enum.into(%{
        name: "some name",
        user_id: user_fixture().id
      })
      |> Todo.TaskManager.create_project()

    project
  end

  @doc """
  Generate a task.
  """
  def task_fixture(attrs \\ %{}) do
    {:ok, task} =
      attrs
      |> Enum.into(%{
        completed: true,
        description: "some description",
        title: "some title",
        project_id: project_fixture().id
      })
      |> Todo.TaskManager.create_task()

    task
  end
end
