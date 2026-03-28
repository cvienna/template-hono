import { db } from "@/lib/db";
import { mails, type NewMail } from "@/schemas/mails";
import { and, eq } from "drizzle-orm";

// TODO - Uncertain
export async function getMailsByConversation(conversationId: string) {
  return await db
    .select()
    .from(mails)
    .where(and(eq(mails.conversationId, conversationId)));
}

export async function createMail(data: NewMail) {
  const result = await db
    .insert(mails)
    .values({ ...data, createdAt: new Date() })
    .returning();

  return result[0] ?? null;
}
