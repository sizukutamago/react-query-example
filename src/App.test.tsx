import {
  render,
  screen,
  renderHook,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { useGetTodos, usePostTodo } from "./hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

const { worker } = require("./mocks/server");
worker.listen();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test("getTodos hooks", async () => {
  const { result } = renderHook(() => useGetTodos(), { wrapper });
  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
});

test("postTodo hooks", async () => {
  const { result } = renderHook(() => usePostTodo(), { wrapper });
  act(() => {
    result.current.mutate({
      id: "3",
      title: "aaaa",
    });
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBeTruthy();
  });

  console.log(result.current);

  expect(result.current.data[2].title).toEqual("aaaa");
});

test("App tsx", async () => {
  render(<App />, { wrapper });
  expect(screen.getAllByText(/delectus/i)[0]).toBeInTheDocument();
});
