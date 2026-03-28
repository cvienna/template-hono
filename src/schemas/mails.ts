import { pgSchema, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { conversations } from "./conversations";

export const mailsSchema = pgSchema("mails");

export const mails = mailsSchema.table("mails", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("converastion_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  providerId: text("providerId").notNull(),
  from: text("from").notNull(),
  replyTo: uuid("reply_to"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type NewMail = typeof mails.$inferInsert;
