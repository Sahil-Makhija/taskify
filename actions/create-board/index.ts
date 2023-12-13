"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Board } from "@prisma/client";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

const handler = async (validatedData: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };
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
  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML,
  });
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
  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
