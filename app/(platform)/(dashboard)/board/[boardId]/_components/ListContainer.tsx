import { ListWithCards } from "@/types";
import { Board, List } from "@prisma/client";
import { ListForm } from "./ListForm";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}
export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
