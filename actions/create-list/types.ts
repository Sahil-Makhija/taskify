import { z } from "zod";
import { CreateList } from "./schema";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateList>;
export type OutputType = ActionState<InputType,List>