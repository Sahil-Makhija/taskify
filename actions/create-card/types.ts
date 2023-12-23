import { z } from "zod";
import { CreateCard } from "./schema";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateCard>;
export type OutputType = ActionState<InputType,Card>