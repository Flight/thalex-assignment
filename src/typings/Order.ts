export type OrderSide = "sell" | "buy";

export interface Order {
  id: number;
  side: OrderSide;
  amount: number;
  price: number;
}
export type OrderInsert = Omit<Order, "id">;

interface PostOrderResultInserted {
  result: "inserted";
  order: Order;
}
interface PostOrderResultExecuted {
  result: "executed";
}
export type PostOrderResult = PostOrderResultInserted | PostOrderResultExecuted;

interface OrdersAPIInitialResponse {
  existing?: [];
}
interface OrdersAPIUpdateResponse {
  delete?: number[];
  insert?: Order[];
}
export type OrdersAPIResponse = OrdersAPIInitialResponse &
  OrdersAPIUpdateResponse;
