import { pgSchema, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { users } from "./auth";

export const exampleSchema = pgSchema("example");

export const example = exampleSchema.table("example", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  foo: text("foo").notNull(),
  bar: text("bar").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const insertExampleSchema = createInsertSchema(example, {
  foo: z.string().min(1).max(100),
  bar: z.string().min(1),
}).pick({ foo: true, bar: true });

export const updateExampleSchema = insertExampleSchema.partial();

export const selectExampleSchema = createSelectSchema(example);

export type Example = typeof example.$inferSelect;
export type NewExample = typeof example.$inferInsert;
export type InsertExampleInput = z.infer<typeof insertExampleSchema>;
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
