import React, { useState } from "react";
import "./App.scss";
import { Spinner } from "./components/Spinner/Spinner";
import { debug } from "./helpers/debug";
import { useOrders } from "./hooks/useOrders";
import { Order, OrderSide, PostOrderResult } from "./typings/Order";

export const App = () => {
  const { orders, sendOrder } = useOrders();
  // Better to save to the session / local storage
  const [sentOrderIds, setSentOrderIds] = useState<number[]>([]);
  const [side, setSide] = useState<OrderSide>(null);
  const [amount, setAmount] = useState<string>(null);
  const [price, setPrice] = useState<string>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const prefillOrderForm = (order: Order) => {
    setAmount(order.amount.toString());
    setPrice(order.price.toString());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setIsSubmitError(false);

    const response: string | PostOrderResult = await sendOrder({
      side, amount: parseFloat(amount), price: parseFloat(price)
    });

    // No response (connection error) or string response (validation error)
    if (!response || typeof response === "string") {
      setSendResult(response || "Something went wrong, please try again later.");
      setIsSubmitError(true);
      setIsSending(false);

      return;
    }

    // Normal flow
    switch (response.result) {
      case "executed":
        setSendResult("Order executed!");
        break;

      case "inserted":
        setSentOrderIds(ids => ids.concat(response.order.id));
        setSendResult("Order inserted!");
        break;

      default:
        setSendResult("Something went wrong, please try again later.");
        setIsSubmitError(true);
        debug.error("Order entry form", `Response is not correct: ${response}`);
    }

    setIsSending(false);
  };

  return (<div className="App">
    <h1>Thalex Front-End Developer Technical Assignment Solution</h1>

    <form onSubmit={handleSubmit}>
      <input type="text" name="amount" value={amount || ""} onChange={(changeEvent) => setAmount(changeEvent.target.value)} pattern="[0-9]+(\.[0-9]+)?" />
      <input type="text" name="price" value={price || ""} onChange={(changeEvent) => setPrice(changeEvent.target.value)} pattern="[0-9]+(\.[0-9]+)?" />

      <button type="submit" disabled={isSending} onClick={() => setSide("buy")}>Buy</button>
      <button type="submit" disabled={isSending} onClick={() => setSide("sell")}>Sell</button>
    </form>
    {sendResult && <h2 className={isSubmitError ? "text-red" : ""}>{sendResult}</h2>}

    {orders.length === 0 ?
      <Spinner /> :
      orders.map(order => (
        <button type="button" key={order.id} className={sentOrderIds.includes(order.id) ? "text-green" : ""} onClick={() => prefillOrderForm(order)}>
          {order.id} {order.side} {order.amount} {order.price}
        </button>
      ))
    }
  </div>);
};