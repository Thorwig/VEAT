export type Order = {
  uid: string;
  addresses: {
    restaurantAddress: {
      longitude: string;
      latitude: string;
      fullAddress: string;
    };
    clientAddress: {
      longitude: string;
      latitude: string;
      fullAddress: string;
    };
  };
  clientId: string;
  restaurantId: string;
  driverId: string;
  isApprovedByRestaurant: boolean;
  isApprovedByDriver: boolean;
  isDelivered: boolean;
  isHidden: boolean;
  price: {
    subtotal: number;
    fees: number;
    totalPrice: number;
  };
  dates: {
    // Format -> MomentJS
    orderTimestamp: string;
    deliveryTimestamp: string;
  };
  orderDetails: LocalOrder[];
};

export type LocalOrder = {
  itemType: "menu" | "article";
  itemName: string;
  price: number;
  description: string;
  itemId: string;
  quantity: number;
};
