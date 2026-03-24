import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { type NewExample, example } from "@/schemas/example";

export async function getExamplesByUser(userId: string) {
  return await db
    .select()
    .from(example)
    .where(and(eq(example.userId, userId), isNull(example.deletedAt)));
}

export async function getExampleById(id: string, userId: string) {
  const result = await db
    .select()
    .from(example)
    .where(
      and(
        eq(example.id, id),
        eq(example.userId, userId),
        isNull(example.deletedAt),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}

export async function createExample(data: NewExample) {
  const result = await db.insert(example).values(data).returning();

  return result[0];
}

export async function updateExample(
  id: string,
  userId: string,
  data: Partial<NewExample>,
) {
  const result = await db
    .update(example)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(
        eq(example.id, id),
        eq(example.userId, userId),
        isNull(example.deletedAt),
      ),
    )
    .returning();

  return result[0] ?? null;
}

export async function softDeleteExample(id: string, userId: string) {
  const result = await db
    .update(example)
    .set({ deletedAt: new Date() })
    .where(
      and(
        eq(example.id, id),
        eq(example.userId, userId),
        isNull(example.deletedAt),
      ),
    )
    .returning();

  return result[0] ?? null;
}
