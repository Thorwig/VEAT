import { FiChevronLeft } from "react-icons/fi";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { LocalOrder } from "../api/order";
import CartItem from "../components/CartItem";
import { nanoid } from "nanoid";
import { Button } from "antd";

function CartPage() {
  const [order, setOrder] = useState<LocalOrder[]>();

  const deliveryFees = 3.5;

  const loadLocalOrder = () => {
    const localStorageOrder = localStorage.getItem("order");
    if (localStorageOrder) {
      const tempOrder: LocalOrder[] = JSON.parse(localStorageOrder);
      if (tempOrder) {
        setOrder(tempOrder);
      }
    }
  };

  useEffect(() => {
    loadLocalOrder();
  }, []);

  const getSubtotal = () => {
    let subtotal = 0;
    if (order) {
      order.forEach((item) => {
        subtotal += item.price * item.quantity;
      });
    }
    return Number(subtotal.toFixed(2));
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="flex ml-7 pt-10 justify-between">
          <FiChevronLeft
            size={35}
            className="justify-start w-fit"
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
        <div className="mt-5 flex flex-col justify-center items-center px-7">
          <h2 className="font-bold">Your cart</h2>
          <div className="mt-5 flex flex-col gap-3 w-full overflow-y-auto h-[70vh]">
            {order ? (
              <div>
                {order.map((item) => {
                  return (
                    <CartItem
                      item={item}
                      key={nanoid()}
                      triggerOrderChanging={loadLocalOrder}
                    />
                  );
                })}
                <div className="mt-5">
                  <div className="flex justify-between items-center">
                    <div className="font-light">Subtotal</div>
                    <div className="font-light">{getSubtotal()} €</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-light">Delivery fees</div>
                    <div className="font-light">
                      {deliveryFees.toFixed(2)} €
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="font-semibold text-[--orange]">Total</div>
                    <div className="font-semibold text-[--orange]">
                      {(getSubtotal() + deliveryFees).toFixed(2)} €
                    </div>
                  </div>
                  <div className="flex justify-end items-end mt-3 mb-5">
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => {
                        // TODO : Send order to back here
                        // TODO : Redirect to the map page to track the delivery
                      }}
                    >
                      Continue to payment
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-10 text-[--gray] flex justify-center items-center">
                Your cart is empty
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
