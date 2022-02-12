export interface Order {
  id: number;
  side: "sell" | "buy";
  amount: number;
  price: number;
}

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
