import { get, post } from "../helpers/http";
import type { Order, PostOrderResult } from "../typings/Order";
import { API_BASE_URL } from "./urls";

export const getOrders = (): Promise<Order[]> => get(`${API_BASE_URL}/orders`);

export const postOrder = (
  order: Omit<Order, "id">
): Promise<PostOrderResult | string> => post(`${API_BASE_URL}/orders`, order);
