import React, { useState } from "react";
import "./OrdersApp.scss";
import { OrderEntryForm } from "./components/OrderEntryForm/OrderEntryForm";
import { OrderTable } from "./components/OrderTable/OrderTable";
import { debug } from "./helpers/debug";
import { useOrders } from "./hooks/useOrders";
import { Order, OrderSide, PostOrderResult } from "./typings/Order";
import { getMarkPrice } from "./helpers/markPrice";
import { DECIMALS_AMOUNT } from "./helpers/constants";

export const OrdersApp = () => {
  const { orders, sendOrder } = useOrders();
  // Better to save to the session / local storage
  const [sentOrderIds, setSentOrderIds] = useState<number[]>([]);
  const [side, setSide] = useState<OrderSide>(null);
  const [amount, setAmount] = useState<string>(null);
  const [price, setPrice] = useState<string>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const markPrice = getMarkPrice(orders);

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



  return (<div className="OrdersApp">
    <h1>Orders</h1>
    <h2>Thalex Front-End Developer Technical Assignment Solution</h2>

    <OrderEntryForm
      amount={amount}
      price={price}
      isDisabled={isSending}
      isSubmitError={isSubmitError}
      resultMessage={sendResult}
      onSubmit={handleSubmit}
      onAmountChange={setAmount}
      onPriceChange={setPrice}
      onSideChange={setSide}
    />

    <p><strong>Sell:</strong></p>
    <OrderTable
      type="sell"
      orders={orders.filter(order => order.side === "sell")}
      sentOrderIds={sentOrderIds}
      onOrderSelect={(order) => prefillOrderForm(order)}
    />

    {markPrice && <p>Mark price: <strong>{markPrice.toFixed(DECIMALS_AMOUNT)}</strong></p>}

    <p><strong>Buy:</strong></p>
    <OrderTable
      type="buy"
      orders={orders.filter(order => order.side === "buy")}
      sentOrderIds={sentOrderIds}
      onOrderSelect={(order) => prefillOrderForm(order)}
    />
  </div >);
};