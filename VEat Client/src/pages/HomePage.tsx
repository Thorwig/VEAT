import transparentLogo from "../assets/transparent_logo.png";
import RestaurantCardList from "../components/RestaurantCardList";
import ShortcutFilterList from "../components/ShortcutFilterList";
import { Tag } from "../api/common";
import { useEffect, useState } from "react";
import RestaurantSearchBar from "../components/RestaurantSearchBar";
import NavBar from "../components/NavBar";
import { Modal, Spin } from "antd";
import FilterModal from "../components/FilterModal";
import { useGetAllRestaurants } from "../hooks/restaurants/useGetAllRestaurants";
import { LoadingOutlined } from "@ant-design/icons";
import { Coordinates } from "../api/user";
import { Restaurant } from "../api/restaurant";

type Props = {
  selectedFilterList: Tag[];
  addFilter: (filter: Tag) => void;
  removeFilter: (filter: Tag) => void;
  userCoordinates: Coordinates | undefined;
};

function HomePage(props: Props) {
  const { selectedFilterList, addFilter, removeFilter, userCoordinates } =
    props;
  // TODO : If userCoordinates !== undefined => use the getRestaurantInRadius endpoint
  const logo = transparentLogo;

  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [restaurantRadius, setRestaurantRadius] = useState("2");
  const { data: restaurantList, isLoading } = useGetAllRestaurants();
  const [restaurantSearchName, setRestaurantSearchName] = useState<string>("");
  const [filteredRestaurantList, setFilteredRestaurantList] =
    useState(restaurantList);

  const filterRestaurantList = () => {
    const restaurantListFiltered: Restaurant[] = [];
    restaurantList?.forEach((restaurant) => {
      let restaurantIncludeAllSelectedTags = true;
      selectedFilterList.forEach((tag) => {
        if (!restaurant.tags?.includes(tag)) {
          restaurantIncludeAllSelectedTags = false;
        }
      });
      if (
        restaurantIncludeAllSelectedTags &&
        restaurant.restaurantName
          .toLocaleLowerCase()
          .includes(restaurantSearchName.toLocaleLowerCase())
      ) {
        restaurantListFiltered.push(restaurant);
      }
    });
    return restaurantListFiltered;
  };

  useEffect(() => {
    setFilteredRestaurantList(filterRestaurantList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantList, restaurantSearchName, selectedFilterList]);

  return (
    <div className="bg-[--white-smoke]">
      <Modal
        open={filterModalIsOpen}
        centered
        onCancel={() => setFilterModalIsOpen(false)}
        footer={null}
      >
        <FilterModal
          addFilter={addFilter}
          removeFilter={removeFilter}
          selectedFilterList={selectedFilterList}
          restaurantRadius={restaurantRadius}
          setRestaurantRadius={setRestaurantRadius}
        />
      </Modal>
      <NavBar />
      <div className="flex flex-col px-12 pt-5">
        <img src={logo} alt="logo" className="h-14 justify-start w-fit" />
        <div className="flex flex-col justify-center mt-3">
          <h2 className="font-bold text-justify max-[380px]:hidden">
            Find a <b className="text-[--orange] font-bold">good restaurant </b>
            around you
          </h2>
          <h3 className="font-bold text-justify min-[380px]:hidden">
            Find a <b className="text-[--orange] font-bold">good restaurant </b>
            around you
          </h3>
        </div>
        <RestaurantSearchBar
          setFilterModalIsOpen={setFilterModalIsOpen}
          setRestaurantSearchName={setRestaurantSearchName}
        />
        <ShortcutFilterList
          selectedFilterList={selectedFilterList}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />
        {filteredRestaurantList ? (
          <RestaurantCardList restaurantList={filteredRestaurantList} />
        ) : (
          <div>
            {isLoading ? (
              <div className="bg-[--white-smoke] h-[58.5vh]">
                <div className="flex justify-center items-center mt-10">
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ fontSize: 40 }} />
                    }
                    className="text-[--orange]"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[--white-smoke] h-[63.5vh] flex justify-center items-center text-[--gray]">
                No restaurant found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
