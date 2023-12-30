"use server";
import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (validatedData: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = validatedData;
  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );
    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "failed to reorder.",
    };
  }
  revalidatePath(`/board/${boardId}`)
  return {data:lists}
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
