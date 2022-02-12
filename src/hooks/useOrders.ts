import { useCallback, useEffect, useState } from "react";
import {
  Order,
  OrderInsert,
  OrdersAPIResponse,
  PostOrderResult,
} from "../typings/Order";
import { API_BASE_URL, API_WS_URL } from "../api/urls";
import { post } from "../helpers/http";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const sendOrder = useCallback(
    (order: OrderInsert): Promise<PostOrderResult | string> =>
      post(`${API_BASE_URL}/orders`, order),
    []
  );

  useEffect(() => {
    const ordersWebsocket = new WebSocket(`${API_WS_URL}/orders`);

    ordersWebsocket.onmessage = (response) => {
      if (!response?.data) {
        return;
      }

      const {
        existing: initialOrders,
        delete: orderIdsToRemove,
        insert: ordersToAdd,
      } = JSON.parse(response.data) as OrdersAPIResponse;

      if (initialOrders?.length ?? 0) {
        setOrders(initialOrders);
      }

      if (orderIdsToRemove?.length ?? 0) {
        setOrders((oldOrders) => {
          if (oldOrders.length === 0) {
            return [];
          }

          return oldOrders.filter(
            (oldOrder) => !orderIdsToRemove.includes(oldOrder.id)
          );
        });
      }

      if (ordersToAdd?.length ?? 0) {
        setOrders((oldOrders) => ordersToAdd.concat(oldOrders));
      }
    };

    return () => {
      ordersWebsocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should run only on load
  }, []);

  return { orders, sendOrder };
};
