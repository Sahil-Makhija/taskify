import { z } from "zod";

export type FieldErrors<TInput> = {
  [k in keyof TInput]: string[];
};
export type ActionState<TInput, TOutput> = {
  data?: TOutput;
  error?: string | null;
  fieldErrors?: FieldErrors<TInput>;
};

//*basically parses the given data and checks for any field errors
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validatedData.data);
  };
};
