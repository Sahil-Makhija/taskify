"use client";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "center" | "start" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side,
  align,
  sideOffset,
}: FormPopoverProps) => {
  const router = useRouter();
  const proModal = useProModal();
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created!");
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      proModal.onOpen();
    },
    onComplete: () => {
      console.log("Completed!");
      buttonRef.current?.click();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };

  const buttonRef = useRef<ElementRef<"button">>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset}>
        <div className="text-sm w-full font-medium text-center text-neutral-600 pb-4">
          Create Board
          <PopoverClose asChild>
            <Button
              ref={buttonRef}
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
              variant={"ghost"}
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <form className="space-y-4" action={onSubmit}>
            <div className="space-y-4 my-2">
              <FormPicker id="image" errors={fieldErrors} />

              <FormInput
                className="text-start"
                type="text"
                id="title"
                label="Board title"
                error={fieldErrors || undefined}
              />
            </div>
            <FormSubmit className="w-full">Create</FormSubmit>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
