import { AppError } from "@/errors";
import { getSession } from "@/middleware";
import {
  createExample,
  getExampleById,
  getExamplesByUser,
  softDeleteExample,
  updateExample,
} from "@/repository/example";
import { ok } from "@/response";
import { insertExampleSchema, updateExampleSchema } from "@/schemas/example";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

const example = new Hono();

example.get("/", async (c) => {
  const session = await getSession(c);
  const examples = await getExamplesByUser(session.user.id);
  return ok(c, examples, 200);
});
example.get(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  async (c) => {
    const session = await getSession(c);
    const { id } = c.req.valid("param");
    const example = await getExampleById(id, session.user.id);
    if (!example) throw new AppError(404, "Example not found");
    return ok(c, example, 200);
  },
);
example.post("/", zValidator("json", insertExampleSchema), async (c) => {
  const session = await getSession(c);
  const body = c.req.valid("json");
  const example = await createExample({ ...body, userId: session.user.id });
  return ok(c, example, 201);
});
example.patch(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  zValidator("json", updateExampleSchema),
  async (c) => {
    const session = await getSession(c);
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const example = await updateExample(id, session.user.id, body);
    if (!example) throw new AppError(404, "Example not found");
    return ok(c, example, 200);
  },
);
example.delete(
  "/:id",
  zValidator("param", z.object({ id: z.uuid() })),
  async (c) => {
    const session = await getSession(c);
    const { id } = c.req.valid("param");
    const example = softDeleteExample(id, session.user.id);
    if (!example) throw new AppError(404, "Example not found");
    return ok(c, null, 200);
  },
);

export default example;
