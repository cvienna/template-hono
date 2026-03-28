import { pgSchema, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { conversations } from "./conversations";
import { users } from "./auth";

export const usersSchema = pgSchema("users");

export const userConversations = usersSchema.table("user_conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  lastSeenAt: timestamp("last_seen_at"),
  deletedAt: timestamp("deleted_at"),
});

export type NewUserConversation = typeof userConversations.$inferInsert;
