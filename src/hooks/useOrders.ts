import { useEffect, useRef, useState } from "react";
import { API_WS_URL } from "../api/urls";
import { Order, OrdersAPIResponse } from "../typings/Order";

export const useOrders = (): Order[] => {
  const ordersWebsocketRef = useRef(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    ordersWebsocketRef.current = new WebSocket(`${API_WS_URL}/orders`);

    const ordersWebsocket = ordersWebsocketRef.current;

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

  return orders;
};
