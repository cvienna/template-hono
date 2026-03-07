import { Hono } from "hono";

const exampleRoute = new Hono()

exampleRoute.get("/example", (c) => {
  return c.json({ message: "Hello World!", foo: "bar" }, 200);
});

export { exampleRoute }
