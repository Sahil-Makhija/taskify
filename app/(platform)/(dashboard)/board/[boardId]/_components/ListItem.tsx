import { List } from "@prisma/client";
import ListHeader from "./ListHeader";

export const ListItem = ({ index, data }: { data: List; index: number }) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
