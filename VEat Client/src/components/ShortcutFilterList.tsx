import { Tag, tags } from "../api/common";
import { nanoid } from "nanoid";

type Props = {
  selectedFilterList: Tag[];
  addFilter: (filter: Tag) => void;
  removeFilter: (filter: Tag) => void;
};

function ShortcutFilterList(props: Props) {
  const { selectedFilterList, addFilter, removeFilter } = props;

  const isFilterSelected = (filter: Tag) => {
    return selectedFilterList.includes(filter);
  };

  return (
    <div className="flex mt-5 justify-between overflow-x-auto gap-3 pb-4">
      {tags.map((tag) => {
        return (
          <div
            className={`whitespace-nowrap py-2 px-4 rounded-full justify-center items-center ${
              isFilterSelected(tag) ? "bg-[--yellow]" : "bg-white"
            }`}
            key={nanoid()}
            onClick={() => {
              if (isFilterSelected(tag)) {
                removeFilter(tag);
              } else {
                addFilter(tag);
              }
            }}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
}

export default ShortcutFilterList;
