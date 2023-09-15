import { Input } from "antd";
import { BsSearch } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

type Props = {
  setFilterModalIsOpen: (isOpen: boolean) => void;
  setRestaurantSearchName: (search: string) => void;
};

function RestaurantSearchBar(props: Props) {
  const { setFilterModalIsOpen, setRestaurantSearchName } = props;

  return (
    <Input
      placeholder="Your favorite restaurant"
      autoFocus={false}
      onChange={(value) => {
        setRestaurantSearchName(value.target.value);
      }}
      className="rounded-full flex items-center mt-5 w-full shadow-md"
      size="large"
      prefix={<BsSearch size={20} className="bg-white p-1" />}
      suffix={
        <FiFilter
          size={20}
          className="bg-white p-1"
          onClick={(event: React.MouseEvent<SVGElement>) => {
            event.stopPropagation();
            setFilterModalIsOpen(true);
          }}
        />
      }
    />
  );
}

export default RestaurantSearchBar;
