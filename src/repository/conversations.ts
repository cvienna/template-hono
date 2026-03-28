import { db } from "@/lib/db";
import { userConversations } from "@/schemas/users";
import { conversations, type NewConversation } from "@/schemas/conversations";
import { and, eq, isNull, isNotNull, desc, sql } from "drizzle-orm";

export async function getConversationsByUser(
  userId: string,
  page: number = 1,
  pageSize: number = 20,
) {
  const offset = (page - 1) * pageSize;

  return await db
    .select()
    .from(userConversations)
    .innerJoin(
      conversations,
      eq(userConversations.conversationId, conversations.id),
    )
    .where(
      and(
        eq(userConversations.userId, userId),
        isNull(userConversations.deletedAt),
        isNull(conversations.deletedAt),
      ),
    )
    .limit(pageSize)
    .offset(offset)
    .orderBy(
      desc(
        sql`COALESCE(${conversations.updatedAt}, ${conversations.createdAt})`,
      ),
    );
}

export async function getConversationById(id: string, userId: string) {
  const result = await db
    .select()
    .from(userConversations)
    .innerJoin(
      conversations,
      eq(userConversations.conversationId, conversations.id),
    )
    .where(
      and(
        eq(userConversations.userId, userId),
        eq(conversations.id, id),
        isNull(userConversations.deletedAt),
        isNull(conversations.deletedAt),
      ),
    );

  return result[0] ?? null;
}

// TODO - Uncertain
export async function createConversation(data: NewConversation) {
  const result = await db
    .insert(conversations)
    .values({ ...data, createdAt: new Date() })
    .returning();

  return result[0];
}

export async function updateConversation(
  id: string,
  data: Partial<NewConversation>,
) {
  const result = await db
    .update(conversations)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(conversations.id, id), isNull(conversations.deletedAt)))
    .returning();

  return result[0] ?? null;
}

export async function softDeleteConversation(id: string) {
  const result = await db
    .update(conversations)
    .set({ deletedAt: new Date() })
    .where(and(eq(conversations.id, id), isNull(conversations.deletedAt)))
    .returning();

  return result[0];
}

export async function hardDeleteConversation(id: string) {
  await db
    .delete(conversations)
    .where(and(eq(conversations.id, id), isNotNull(conversations.deletedAt)));
}
