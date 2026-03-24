import { serve } from "@hono/node-server";
import { Hono } from "hono";
import routes from "@/routes";
import { env } from "./env";
import { errorMiddleware } from "./middleware";

const app = new Hono();

app.route("/api", routes);
app.onError(errorMiddleware);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
