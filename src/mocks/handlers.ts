import { rest } from "msw";

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
];

const url = "https://jsonplaceholder.typicode.com";

export const handlers = [
  rest.get(`${url}/todos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.post(`${url}/posts`, (req, res, ctx) => {
    const todo = {
      id: 101,
      title: "aaaa",
      userId: 1,
      completed: false,
    };
    todos.push(todo);

    return res(ctx.status(201), ctx.json(todos));
  }),
];
