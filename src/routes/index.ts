import { Hono } from "hono";
import auth from "./auth";
import example from "./example";

const app = new Hono();

app.route("/auth", auth);
app.route("/example", example);

export default app;
