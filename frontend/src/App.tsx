import { gql, useQuery } from "@apollo/client";
import "./App.css";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      projects {
        id
        name
        tasks {
          id
          title
        }
      }
    }
  }
`;

interface User {
  id: number;
  name: string;
  email: string;
  projects: Project[];
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  description: string;
}

function App() {
  const { data, loading, error } = useQuery(GET_USERS, {});

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {data &&
        data.users.map((user: User) => (
          <div>
            <h2>{user.name}</h2>
            {user.projects.map((project: Project) => (
              <>
                <h3>{project.name}</h3>
                <ul>
                  {project.tasks.map((task: Task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              </>
            ))}
          </div>
        ))}
    </>
  );
}

export default App;
