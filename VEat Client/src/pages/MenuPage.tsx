import { useNavigate, useParams } from "react-router-dom";
import "./MenuPage.css";
import { FiChevronLeft } from "react-icons/fi";
import { Button, notification, Spin } from "antd";
import React, { useMemo } from "react";
import { LocalOrder } from "../api/order";
import { useGetMenuById } from "../hooks/useGetMenuById";
import { tp } from "../routing";
import { LoadingOutlined } from "@ant-design/icons";
import { Menu } from "../api/restaurant";

function MenuPage() {
  const { menuId } = useParams();
  const { data: menu, isLoading } = useGetMenuById(menuId!);
  const navigate = useNavigate();
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Notification" }), []);
  // const { data: articleList } = useGetArticleList(articleIdList);

  const openSuccessNotification = (message: string) => {
    api.success({
      message,
      onClick: () => {
        navigate(tp("/cart"));
      },
    });
  };

  // useEffect(() => {
  //   const articleList: string[] = [];
  //   menu?.articles.forEach((article) => {
  //     articleList.push(article.articleId);
  //   });
  //   setArticleIdList(articleList);
  // }, [menu]);

  const addMenu = (menu: Menu) => {
    const order = localStorage.getItem("order");
    if (order) {
      const orderJSON: LocalOrder[] = JSON.parse(order);
      let isMenuInOrder = false;
      orderJSON.forEach((item, id) => {
        if (item.itemId === menu.uid) {
          isMenuInOrder = true;
          orderJSON[id] = {
            itemType: "menu",
            description: menu.description,
            itemName: menu.name,
            price: menu.price,
            itemId: menu.uid,
            quantity: item.quantity + 1,
          };
        }
      });
      if (!isMenuInOrder) {
        orderJSON.push({
          itemType: "menu",
          description: menu.description,
          itemName: menu.name,
          price: menu.price,
          itemId: menu.uid,
          quantity: 1,
        });
      }
      localStorage.setItem("order", JSON.stringify(orderJSON));
      openSuccessNotification(`${menu?.name} a bien été ajouté au panier`);
      return;
    }
    const newOrder: LocalOrder[] = [
      {
        itemType: "menu",
        itemId: menu.uid,
        description: menu.description,
        itemName: menu.name,
        price: menu.price,
        quantity: 1,
      },
    ];
    localStorage.setItem("order", JSON.stringify(newOrder));
    openSuccessNotification(`${menu?.name} a bien été ajouté au panier`);
    return;
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="background-gradient-yellow-orange w-screen h-screen relative">
        {isLoading ? (
          <div className="absolute bg-white left-0 right-0 top-56 rounded-t-[2.5rem]">
            <div className="flex flex-col justify-center items-center mt-40 mx-10">
              <div className="flex justify-center items-center mt-10">
                <Spin
                  indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />}
                  className="text-[--orange]"
                />
              </div>
            </div>
          </div>
        ) : menu ? (
          <>
            <div className="flex ml-7 pt-10 justify-between">
              <FiChevronLeft
                size={35}
                className="justify-start w-fit"
                onClick={() => {
                  window.history.back();
                }}
              />
            </div>
            <div className="flex justify-center items-center pt-5">
              <img
                src={menu.photo}
                alt="menu preview"
                className="w-64 h-auto z-50"
              />
            </div>
            <div className="absolute bg-white bottom-0 left-0 right-0 top-56 rounded-t-[2.5rem]">
              <div className="flex flex-col justify-center items-center mt-40 mx-10">
                <h1 className="font-bold">{menu.name}</h1>
                <div className="mt-14 text-sm text-[--gray] leading-6 font-light">
                  {menu.description}
                </div>
                {
                  // <div className="mt-14 text-2xl font-bold flex flex-col justify-end items-end w-full gap-3">
                  //   {menu.articles?.map((article) => {
                  //     return (
                  //       <div
                  //         key={nanoid()}
                  //         className="w-full flex justify-center items-center flex-col"
                  //       >
                  //         <ArticleDetailsList articleId={article.articleId} />
                  //       </div>
                  //     );
                  //   })}
                  // </div>
                }
                <div className="mt-14 text-2xl font-bold flex justify-end items-end w-full">
                  {menu.price} €
                </div>
                <Button
                  type="primary"
                  size="large"
                  className="mt-7 w-full mb-3"
                  onClick={() => {
                    addMenu(menu);
                  }}
                >
                  <div className="flex justify-center items-center">
                    Add to cart
                  </div>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex ml-7 pt-10 justify-between">
              <FiChevronLeft
                size={35}
                className="justify-start w-fit"
                onClick={() => {
                  window.history.back();
                }}
              />
            </div>
            <div className="flex justify-center items-center pt-5">
              <h2>Menu not found</h2>
            </div>
            <div className="absolute bg-white bottom-0 left-0 right-0 top-56 rounded-t-[2.5rem] shadow-none border-0">
              <div className="flex flex-col justify-center items-center mt-40 mx-10">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    navigate(tp("/"));
                  }}
                >
                  Go back to home page
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default MenuPage;
