import { useNavigate, useParams } from "react-router";
import { useGetRestaurantById } from "../hooks/restaurants/useGetRestaurantById";
import MenuCardList from "../components/MenuCardList";
import { FiChevronLeft } from "react-icons/fi";
import { tp } from "../routing";
import ArticleCardList from "../components/ArticleCardList";
import { Button, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LocalOrder } from "../api/order";
import { Restaurant } from "../api/restaurant";
import { useEffect, useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";

function RestaurantPage() {
  const { restaurantId } = useParams();
  const { data: restaurant, isLoading } = useGetRestaurantById(restaurantId!);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderExistsInAnotherRestaurant = (restaurant: Restaurant) => {
    let orderExistsWithAnotherRestaurant = false;
    const order = localStorage.getItem("order");
    if (order) {
      orderExistsWithAnotherRestaurant = true;
      const orderJSON: LocalOrder[] = JSON.parse(order);
      orderJSON.forEach((item) => {
        restaurant.articles?.forEach((article) => {
          if (article.uid === item.itemId) {
            orderExistsWithAnotherRestaurant = false;
            return orderExistsWithAnotherRestaurant;
          }
        });
        restaurant.menus?.forEach((menu) => {
          if (menu.uid === item.itemId) {
            orderExistsWithAnotherRestaurant = false;
            return orderExistsWithAnotherRestaurant;
          }
        });
      });
    }
    return orderExistsWithAnotherRestaurant;
  };

  useEffect(() => {
    if (restaurant && restaurant.uid === restaurantId) {
      if (orderExistsInAnotherRestaurant(restaurant)) {
        setIsModalOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]);

  return (
    <>
      <Modal
        open={isModalOpen}
        okText="Start a new order"
        title={
          <div className="flex gap-3">
            <div className="text-[--orange]">
              <PiWarningCircleLight size={30} className="text-[#faad14]" />
            </div>
            <div>Order can be in a restaurant at once</div>
          </div>
        }
        centered
        onCancel={() => {
          setIsModalOpen(false);
          window.history.back();
        }}
        onOk={() => {
          localStorage.removeItem("order");
          setIsModalOpen(false);
        }}
      >
        You already start an order in another restaurant, if you continue in
        this restaurant the current order will be removed
      </Modal>
      {restaurant !== undefined ? (
        <div className="bg-[--white-smoke]">
          <div className="flex flex-col px-12 pt-5">
            <div className="flex mt-3">
              <div className="flex items-start justify-start">
                <FiChevronLeft
                  size={35}
                  className="justify-start w-fit"
                  onClick={() => {
                    navigate(tp("/"));
                  }}
                />
              </div>
              <h3 className="font-bold flex justify-center items-center ml-5">
                {restaurant.restaurantName}
              </h3>
            </div>
          </div>
          <div className="flex flex-col px-12 pt-5">
            {restaurant.menus && restaurant.menus.length > 0 && (
              <>
                <h2>Menus :</h2>
                <MenuCardList menuList={restaurant.menus} />
              </>
            )}
            {restaurant.menus &&
              restaurant.menus.length > 0 &&
              restaurant.articles &&
              restaurant.articles.length > 0 && (
                <hr className="mb-3 bg-[--orange] h-0.5 border-0" />
              )}
            {restaurant.articles && restaurant.articles.length > 0 && (
              <>
                <h2>Articles :</h2>
                <ArticleCardList articleList={restaurant.articles} />
              </>
            )}
            {(restaurant.articles === undefined ||
              restaurant.articles.length === 0) &&
              (restaurant.menus === undefined ||
                restaurant.menus.length === 0) && (
                <div>No content found for this restaurant</div>
              )}
          </div>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="bg-[--white-smoke] h-screen">
              <div className="flex justify-center items-center pt-40">
                <Spin
                  indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
                  className="text-[--orange]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[--white-smoke] flex justify-center pt-10">
              <div>
                <h2>Restaurant not found</h2>
                <div className="flex justify-center items-center">
                  <Button
                    type="primary"
                    size="large"
                    className="mt-20"
                    onClick={() => {
                      navigate(tp("/"));
                    }}
                  >
                    Go back to home page
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default RestaurantPage;
