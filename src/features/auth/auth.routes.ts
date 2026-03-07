import { Hono } from "hono";
import { auth } from "@/lib/auth";

const betterAuthRoute = new Hono();

betterAuthRoute.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export { betterAuthRoute };
