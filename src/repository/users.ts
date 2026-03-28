import { db } from "@/lib/db";
import { userConversations, type NewUserConversation } from "@/schemas/users";
import { and, eq, isNull } from "drizzle-orm";

export async function createUserConversation(data: NewUserConversation) {
  const result = await db.insert(userConversations).values(data).returning();

  return result[0] ?? null;
}

export async function updateUserConversation(
  id: string,
  userId: string,
  data: Partial<NewUserConversation>,
) {
  const result = await db
    .update(userConversations)
    .set(data)
    .where(
      and(
        eq(userConversations.id, id),
        eq(userConversations.userId, userId),
        isNull(userConversations.deletedAt),
      ),
    )
    .returning();

  return result[0] ?? null;
}

export async function softDeleteUserConversation(id: string, userId: string) {
  const result = await db
    .update(userConversations)
    .set({ deletedAt: new Date() })
    .where(
      and(
        eq(userConversations.id, id),
        eq(userConversations.userId, userId),
        isNull(userConversations.deletedAt),
      ),
    )
    .returning();

  return result[0] ?? null;
}
