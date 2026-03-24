import type { Context } from "hono";
import { AppError } from "./errors";
import { auth } from "./lib/auth";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export async function getSession(c: Context) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) throw new AppError(401, "Unauthorized");
  return session;
}

export function errorMiddleware(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json(
      { success: false, message: err.message },
      err.statusCode as ContentfulStatusCode,
    );
  }

  return c.json({ success: false, message: "Internal server error" }, 500);
}
