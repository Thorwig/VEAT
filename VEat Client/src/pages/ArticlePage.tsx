import { useNavigate, useParams } from "react-router-dom";
import "./ArticlePage.css";
import { FiChevronLeft } from "react-icons/fi";
import { Button, notification, Spin } from "antd";
import { LocalOrder } from "../api/order";
import { useMemo } from "react";
import React from "react";
import { useGetArticleById } from "../hooks/useGetArticleById";
import { tp } from "../routing";
import { LoadingOutlined } from "@ant-design/icons";
import { Article } from "../api/restaurant";

function ArticlePage() {
  const { articleId } = useParams();
  const { data: article, isLoading } = useGetArticleById(articleId!);
  const navigate = useNavigate();
  const Context = React.createContext({ name: "Default" });

  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Notification" }), []);

  const openSuccessNotification = (message: string) => {
    api.success({
      message,
      onClick: () => {
        navigate(tp("/cart"));
      },
    });
  };

  const addArticle = (article: Article) => {
    const order = localStorage.getItem("order");
    if (order) {
      const orderJSON: LocalOrder[] = JSON.parse(order);
      let isArticleInOrder = false;
      orderJSON.forEach((item, id) => {
        if (item.itemId === article.uid) {
          isArticleInOrder = true;
          orderJSON[id] = {
            itemType: "article",
            itemId: article.uid,
            description: article.description,
            itemName: article.name,
            price: article.price,
            quantity: item.quantity + 1,
          };
        }
      });
      if (!isArticleInOrder) {
        orderJSON.push({
          itemType: "article",
          description: article.description,
          itemName: article.name,
          price: article.price,
          itemId: article.uid,
          quantity: 1,
        });
      }
      localStorage.setItem("order", JSON.stringify(orderJSON));
      openSuccessNotification(`${article?.name} a bien été ajouté au panier`);
      return;
    }
    const newOrder: LocalOrder[] = [
      {
        itemType: "article",
        description: article.description,
        itemName: article.name,
        price: article.price,
        itemId: article.uid,
        quantity: 1,
      },
    ];
    localStorage.setItem("order", JSON.stringify(newOrder));
    openSuccessNotification(`${article?.name} a bien été ajouté au panier`);
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
        ) : article ? (
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
                src={article?.photo}
                alt="article preview"
                className="w-64 h-auto z-50"
              />
            </div>
            <div className="absolute bg-white bottom-0 left-0 right-0 top-56 rounded-t-[2.5rem]">
              <div className="flex flex-col justify-center items-center mt-40 mx-10">
                <h1 className="font-bold">{article?.name}</h1>
                <div className="mt-14 text-sm text-[--gray] leading-6 font-light">
                  {article?.description}
                </div>
                <div className="mt-14 text-2xl font-bold flex justify-end items-end w-full">
                  {article?.price} €
                </div>
                {article && (
                  <Button
                    type="primary"
                    size="large"
                    className="mt-7 w-full mb-3"
                    onClick={() => {
                      addArticle(article);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      Add to cart
                    </div>
                  </Button>
                )}
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
              <h2>Article not found</h2>
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

export default ArticlePage;
