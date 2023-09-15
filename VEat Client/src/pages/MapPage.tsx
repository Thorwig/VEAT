import NavBar from "../components/NavBar";
import ShortcutFilterList from "../components/ShortcutFilterList";
import { getUserIdFromJWT, Tag } from "../api/common";
import TrackOrderMap from "../components/TrackOrderMap";
import { Coordinates } from "../api/user";
import { useEffect, useState } from "react";
import { useGetUserById } from "../hooks/useGetUserById";
import ParseRestaurantMap from "../components/ParseRestaurantMap";
import { Restaurant } from "../api/restaurant";
import { useNavigate } from "react-router-dom";
import { tp } from "../routing";

type Props = {
  selectedFilterList: Tag[];
  addFilter: (filter: Tag) => void;
  removeFilter: (filter: Tag) => void;
  userCoordinates: Coordinates | undefined;
};

function MapPage(props: Props) {
  const { selectedFilterList, addFilter, removeFilter, userCoordinates } =
    props;
  const [userLatLong, setUserLatLong] = useState(userCoordinates);
  const [userHasActiveOrder, setUserHasActiveOrder] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const { data: user } = useGetUserById(userId!);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.latitude && user.longitude) {
      setUserLatLong({
        latitude: Number(user.latitude),
        longitude: Number(user.longitude),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (userLatLong === undefined) {
      setUserLatLong(userCoordinates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoordinates]);

  return (
    <>
      <NavBar />
      <div className="bg-[--white-smoke] h-screen">
        <div className="flex flex-col px-12 pt-5">
          <ShortcutFilterList
            selectedFilterList={selectedFilterList}
            addFilter={addFilter}
            removeFilter={removeFilter}
          />
        </div>
        <div className="flex flex-col px-10 pt-3">
          <div className="h-72 mt-3 w-full">
            {userHasActiveOrder ? (
              userCoordinates &&
              selectedRestaurant && (
                <TrackOrderMap
                  userCoordinates={userCoordinates}
                  selectedRestaurant={selectedRestaurant}
                />
              )
            ) : (
              <ParseRestaurantMap
                userCoordinates={userLatLong}
                setSelectedRestaurant={setSelectedRestaurant}
              />
            )}
          </div>
          {selectedRestaurant && (
            <div
              className="bg-white mb-7 rounded-2xl flex shadow-md h-36 mt-7"
              onClick={() => {
                navigate(
                  tp("/restaurant/:restaurantId", [selectedRestaurant.uid])
                );
              }}
            >
              <img
                src={selectedRestaurant.logo}
                alt={`${selectedRestaurant.restaurantName} logo`}
                className="w-1/2 rounded-l-2xl shadow-md h-full object-cover"
              />
              <div className="ml-2 flex flex-col bg-white justify-between rounded-r-2xl">
                <div className="bg-transparent mt-1 font-bold whitespace-pre-wrap">
                  {selectedRestaurant.restaurantName}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MapPage;
