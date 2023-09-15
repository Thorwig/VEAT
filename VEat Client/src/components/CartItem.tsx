import { Button } from "antd";
import { nanoid } from "nanoid";
import { LocalOrder } from "../api/order";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

type Props = {
  item: LocalOrder;
  triggerOrderChanging: () => void;
};

function CartItem(props: Props) {
  const { item, triggerOrderChanging } = props;
  const [refreshedItem, setRefreshedItem] = useState(item);
  const [isItemFullyRemoved, setIsItemFullyRemoved] = useState(false);

  const increaseQuantity = (itemToIncrease: LocalOrder) => {
    const order = localStorage.getItem("order");
    if (order) {
      const orderJSON: LocalOrder[] = JSON.parse(order);
      orderJSON.forEach((currentItem, id) => {
        if (currentItem.itemId === itemToIncrease.itemId) {
          orderJSON[id] = {
            itemType: itemToIncrease.itemType,
            description: itemToIncrease.description,
            itemName: itemToIncrease.itemName,
            price: itemToIncrease.price,
            itemId: itemToIncrease.itemId,
            quantity: itemToIncrease.quantity + 1,
          };
          setRefreshedItem(orderJSON[id]);
        }
      });
      localStorage.setItem("order", JSON.stringify(orderJSON));
      triggerOrderChanging();
      return;
    }
  };

  const decreaseQuantity = (itemToDecrease: LocalOrder) => {
    const order = localStorage.getItem("order");
    if (order) {
      const orderJSON: LocalOrder[] = JSON.parse(order);
      orderJSON.forEach((currentItem, id) => {
        if (currentItem.itemId === itemToDecrease.itemId) {
          if (currentItem.quantity === 1) {
            orderJSON.splice(id, 1);
            setIsItemFullyRemoved(true);
          } else {
            orderJSON[id] = {
              itemType: itemToDecrease.itemType,
              description: itemToDecrease.description,
              itemName: itemToDecrease.itemName,
              price: itemToDecrease.price,
              itemId: itemToDecrease.itemId,
              quantity: itemToDecrease.quantity - 1,
            };
            setRefreshedItem(orderJSON[id]);
          }
        }
      });
      localStorage.setItem("order", JSON.stringify(orderJSON));
      triggerOrderChanging();
      return;
    }
  };

  return (
    <div
      key={nanoid()}
      className={`flex gap-3 flex-col ${isItemFullyRemoved && "hidden"}`}
    >
      <div>
        {refreshedItem && (
          <div>
            <div className="font-bold">{refreshedItem.itemName}</div>
            <div className="mt-3 font-light text-[--gray]">
              {refreshedItem.description}
            </div>
            <div className="flex justify-between mt-5 items-center">
              <div className="flex gap-3">
                <Button
                  icon={<AiOutlineMinus size={25} />}
                  type="text"
                  className="flex justify-center items-center"
                  onClick={() => {
                    decreaseQuantity(refreshedItem);
                  }}
                />
                <div className="font-semibold flex justify-center items-center">
                  {refreshedItem.quantity}
                </div>
                <Button
                  icon={<AiOutlinePlus size={25} />}
                  type="text"
                  className="flex justify-center items-center"
                  onClick={() => {
                    increaseQuantity(refreshedItem);
                  }}
                />
              </div>
              <div className="font-bold">{refreshedItem.price} €</div>
            </div>
          </div>
        )}
      </div>
      <hr className="my-3 bg-[--yellow] h-0.5 border-0" />
    </div>
  );
}

export default CartItem;
