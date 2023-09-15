import { useEffect, useState } from "react";
import { tp } from "../routing";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";
import NavBar from "../components/NavBar";
import { useGetUserById } from "../hooks/useGetUserById";
import { useGetRestaurantsByOwnerId } from "../hooks/useGetRestaurantsByOwnerId";
import { nanoid } from "nanoid";

function HomePage() {
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const navigate = useNavigate();
  const { data: user } = useGetUserById(userId!);
  const { data: restaurantList } = useGetRestaurantsByOwnerId(userId!);

  useEffect(() => {
    if (userId === undefined) {
      navigate(tp("/profile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user && (
        <>
          <NavBar />
          <div>Restaurant Page</div>
          <div>
            {restaurantList && (
              <>
                {restaurantList.map((restaurant) => {
                  return <div key={nanoid()}>{restaurant.restaurantName}</div>;
                })}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
