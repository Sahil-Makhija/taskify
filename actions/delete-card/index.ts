"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { manageOrgLimit } from "@/lib/org-limit";

const handler = async (validatedData: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id , boardId } = validatedData;
  let card;
  try {
    card = await db.card.delete({
      where:{
        id,
        list:{
          board:{
            orgId
          },
          boardId
        }
      }
    })
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  await manageOrgLimit("DECREMENT")
  revalidatePath(`/board/${boardId}`);
  return {data:card}
};

export const deleteCard = createSafeAction(DeleteCard,handler);
