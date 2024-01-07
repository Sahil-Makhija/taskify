import { create } from "zustand";

type CardModalProps = {
    id?:string;
    isOpen :boolean,
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

export const useCardModal = create<CardModalProps>((set)=>({
    isOpen:false,
    onOpen:(id)=>set({isOpen:true,id}),
    onClose:()=>set({isOpen:false,id:undefined})
})) 