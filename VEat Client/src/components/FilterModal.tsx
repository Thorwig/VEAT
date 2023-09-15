import { nanoid } from "nanoid";
import { Tag, tags } from "../api/common";
import { Checkbox, Select } from "antd";
import "./FilterModal.css";

type Props = {
  addFilter: (filter: Tag) => void;
  removeFilter: (filter: Tag) => void;
  selectedFilterList: Tag[];
  restaurantRadius: string;
  setRestaurantRadius: (restaurantRadius: string) => void;
};

function FilterModal(props: Props) {
  const {
    addFilter,
    removeFilter,
    selectedFilterList,
    restaurantRadius,
    setRestaurantRadius,
  } = props;

  const changeRadius = (value: string) => {
    setRestaurantRadius(value);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-3 text-lg">
        Find in a
        <Select
          defaultValue={restaurantRadius}
          className="w-24"
          onChange={changeRadius}
          options={[
            { value: "2", label: "2km" },
            { value: "5", label: "5km" },
            { value: "10", label: "10km" },
            { value: "20", label: "20km" },
            { value: "50", label: "50km" },
          ]}
        />
        radius
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto h-80">
        {tags.map((tag) => {
          return (
            <Checkbox
              value={tag}
              key={nanoid()}
              checked={selectedFilterList.includes(tag)}
              className={
                selectedFilterList.includes(tag) ? "text-[--orange]" : undefined
              }
              onChange={(checked) => {
                if (checked.target.checked) {
                  addFilter(tag);
                } else {
                  removeFilter(tag);
                }
              }}
            >
              {tag}
            </Checkbox>
          );
        })}
      </div>
    </>
  );
}

export default FilterModal;
