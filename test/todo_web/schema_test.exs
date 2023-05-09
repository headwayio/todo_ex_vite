defmodule TodoWeb.SchemaTest do
  use TodoWeb.ConnCase
  import Todo.AccountsFixtures
  import Todo.TaskManagerFixtures

  describe "queries" do
    @user_query """
    query getUsers {
      users {
        name
        email
      }
    }
    """

    @project_query """
    query getProjects {
      projects {
        name
        user {
          id
        }
      }
    }
    """

    @task_query """
    query getTasks {
      tasks {
        title
        project {
          id
        }
      }
    }
    """

    test "users", %{conn: conn} do
      user = user_fixture()

      conn =
        post(conn, "/graphql", %{
          "query" => @user_query
        })

      assert json_response(conn, 200) == %{
               "data" => %{"users" => [%{"email" => user.email, "name" => user.name}]}
             }
    end

    test "projects", %{conn: conn} do
      project = project_fixture()

      conn =
        post(conn, "/graphql", %{
          "query" => @project_query
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "projects" => [%{"name" => project.name, "user" => %{"id" => project.user_id}}]
               }
             }
    end

    test "tasks", %{conn: conn} do
      task = task_fixture()

      conn =
        post(conn, "/graphql", %{
          "query" => @task_query
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "tasks" => [%{"title" => task.title, "project" => %{"id" => task.project_id}}]
               }
             }
    end
  end

  describe "mutations" do
    @user_mutation """
    mutation CreateUser($name: String!, $email: String!) {
      createUser(name: $name, email: $email) {
        name
        email
      }
    }
    """

    @project_mutation """
    mutation CreateProject($name: String!, $user_id: Int!) {
      createProject(name: $name, userId: $user_id) {
        name
      }
    }
    """

    @task_mutation """
    mutation CreateTask($title: String!, $project_id: Int!) {
      createTask(title: $title, projectId: $project_id) {
        title
      }
    }
    """

    test "create user", %{conn: conn} do
      conn =
        post(conn, "/graphql", %{
          "query" => @user_mutation,
          "variables" => %{"name" => "John Doe", "email" => "john_doe@email.com"}
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "createUser" => %{"name" => "John Doe", "email" => "john_doe@email.com"}
               }
             }
    end

    test "create project", %{conn: conn} do
      user = user_fixture()

      conn =
        post(conn, "/graphql", %{
          "query" => @project_mutation,
          "variables" => %{"name" => "New Project", "user_id" => user.id}
        })

      assert json_response(conn, 200) == %{
               "data" => %{"createProject" => %{"name" => "New Project"}}
             }
    end

    test "create task", %{conn: conn} do
      project = project_fixture()

      conn =
        post(conn, "/graphql", %{
          "query" => @task_mutation,
          "variables" => %{"title" => "New Task", "project_id" => project.id}
        })

      assert json_response(conn, 200) == %{
               "data" => %{"createTask" => %{"title" => "New Task"}}
             }
    end
  end
end
