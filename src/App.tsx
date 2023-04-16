import logo from "./logo.svg";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "react-query";

function App() {
  const getTodos = async (): Promise<
    {
      userId: string;
      id: string;
      title: string;
      completed: boolean;
    }[]
  > => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const postTodo = async ({ id, title }: { id: string; title: string }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, userId: id }),
    });

    return await response.json();
  };

  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data &&
          query.data.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now().toString(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default App;
