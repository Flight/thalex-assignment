import { Order } from "../typings/Order";

export const getMarkPrice = (orders: Order[]): number | null => {
  const sellOrders = orders.filter((order) => order.side === "sell");
  const buyOrders = orders.filter((order) => order.side === "buy");

  if (!sellOrders || !buyOrders) {
    return null;
  }

  const lowestSell = Math.min(...sellOrders.map((order) => order.price));
  const highestBuy = Math.max(...buyOrders.map((order) => order.price));

  return (lowestSell + highestBuy) / 2;
};
