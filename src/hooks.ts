import { useMutation, useQuery, useQueryClient } from "react-query";

const getTodos = async (): Promise<
  {
    userId: string;
    id: string;
    title: string;
    completed: boolean;
  }[]
> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    return await response.json();
  } catch (error) {
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

export const useGetTodos = () => {
  return useQuery({ queryKey: ["todos"], queryFn: getTodos });
};

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  // Mutations
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
