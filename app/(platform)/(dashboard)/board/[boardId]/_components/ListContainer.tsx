"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListForm } from "./ListForm";
import ListItem from "./ListItem";
import { ListWithCards } from "@/types";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list : T[],startIndex:number,endIndex:number){
  const result = Array.from(list);
  const [removed] = result.splice(startIndex,1);
  result.splice(endIndex,0,removed)
  return result
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol 
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex gap-x-3 h-full">
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
