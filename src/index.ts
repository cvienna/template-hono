import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { betterAuthRoute } from "@/features/auth/auth.routes";
import { exampleRoute } from "@/features/example/example.routes";

const app = new Hono();


app.route('/api', betterAuthRoute)

app.route('/api', exampleRoute)

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT ?? '8787'),
  },
  (info) => {
    console.log(`Server is running on ${info.port}`);
  },
);
