import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export function ok<T>(
  c: Context,
  data: T,
  statusCode: ContentfulStatusCode = 200,
) {
  return c.json({ success: true, data }, statusCode);
}
