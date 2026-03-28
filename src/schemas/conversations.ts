import { pgSchema, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export const conversationsSchema = pgSchema("conversations");

export const conversations = conversationsSchema.table("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: text("providerId").notNull(),
  subject: text("subject").notNull(),
  preview: text("preview").notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type NewConversation = typeof conversations.$inferInsert;
