import { pgSchema, uuid, text } from "drizzle-orm/pg-core";

export const exampleSchema = pgSchema("example");

export const example = exampleSchema.table("example", {
  id: uuid("id").primaryKey(),

  foo: text("bar").notNull(),
});
