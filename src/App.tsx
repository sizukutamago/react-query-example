import { useGetTodos, usePostTodo } from "./hooks";

function App() {
  const query = useGetTodos();

  const mutation = usePostTodo();

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
