"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

import { ListForm } from "./ListForm";
import ListItem from "./ListItem";
import { ListWithCards } from "@/types";
import { reorder } from "@/utils";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}
export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = ({ destination, source, type }: DropResult) => {
    if (!destination || !source || !type) return;

    // if dropped at same position
    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    )
      return;

    // User moves a list
    if (type == "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      executeUpdateListOrder({ boardId, items });
    }
    // User moves a card
    if ((type = "card")) {
      let newOrderedData = [...orderedData];
      const srcList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const dsntList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!srcList || !dsntList) return;
      if (!srcList.cards) srcList.cards = [];
      if (!dsntList.cards) dsntList.cards = [];

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          srcList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        srcList.cards = reorderedCards;
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        const [movedCard] = srcList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;

        // Adding card to the destination list
        dsntList.cards.splice(destination.index, 0, movedCard);

        // Update the order for each card in the both lists
        srcList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        dsntList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: dsntList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
