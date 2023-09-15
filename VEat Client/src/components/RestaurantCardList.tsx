import { BsClock, BsFillStarFill } from "react-icons/bs";
import { Restaurant } from "../api/restaurant";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
import { tp } from "../routing";

type Props = {
  restaurantList: Restaurant[];
};

function RestaurantCardList(props: Props) {
  const { restaurantList } = props;

  const navigate = useNavigate();

  return restaurantList !== undefined ? (
    <>
      <div className="text-xs text-[--gray] mt-2">
        {restaurantList.length} restaurants found.
        <div className="h-[50vh] overflow-y-auto mt-2 text-base text-black sm:grid md:grid-cols-2 xl:grid-cols-3 mx-auto">
          {restaurantList.map((restaurant) => {
            return (
              <div
                className="bg-white mb-7 rounded-2xl flex shadow-md h-36 sm:w-80"
                key={nanoid()}
                onClick={() => {
                  navigate(tp("/restaurant/:restaurantId", [restaurant.uid]));
                }}
              >
                <img
                  src={restaurant.logo}
                  alt={`${restaurant.restaurantName} logo`}
                  className="w-1/2 rounded-l-2xl shadow-md h-full object-cover"
                />
                <div className="ml-2 flex flex-col bg-white justify-between rounded-r-2xl">
                  <div className="bg-transparent mt-1 font-bold whitespace-pre-wrap">
                    {restaurant.restaurantName}
                  </div>
                  <div className="flex flex-col bg-white rounded-r-2xl">
                    {
                      // TODO : Replace this fake datas by real operations
                    }
                    <div className="bg-transparent mb-1 text-[--gray] flex gap-1">
                      <BsClock
                        size={15}
                        className="text-[--orange] bg-white p-1"
                      />
                      30 mins
                    </div>
                    <div className="bg-transparent mb-1 text-[--gray] flex gap-1">
                      <BsFillStarFill
                        size={15}
                        className="text-[--orange] bg-white p-1"
                      />
                      4.5
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className="text-[--gray] flex justify-center items-center">
      No restaurant found near you
    </div>
  );
}

export default RestaurantCardList;
