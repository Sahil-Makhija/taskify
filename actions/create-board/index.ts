"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Board } from "@prisma/client";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { manageOrgLimit } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { checkSubscription } from "@/lib/subscription";

const handler = async (validatedData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const canCreate = await manageOrgLimit("CAN_CREATE") as boolean;
  const isPro = await checkSubscription();
  if(!canCreate && !isPro){
    return {error:`Free users cannot create more than ${MAX_FREE_BOARDS} boards.`}
  }
  const { title, image } = validatedData;
  const { imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML } =
    JSON.parse(image);
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing Fields. Cannot create board!",
    };
  }
  let board: Board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (error) {
    return {
      error: "failed to create",
    };
  }
  await manageOrgLimit("INCREMENT")
  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
