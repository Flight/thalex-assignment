import React, { useState } from "react";
import "./App.scss";
import { Spinner } from "./components/Spinner/Spinner";
import { useOrders } from "./hooks/useOrders";
import { OrderSide, PostOrderResult } from "./typings/Order";

export const App = () => {
  const { orders, sendOrder } = useOrders();
  const [sendResult, setSendResult] = useState(null);
  const [side, setSide] = useState<OrderSide>("sell");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendOrder({
      side, amount, price
    });

    setSendResult(typeof response === "string" ? response : (response as PostOrderResult).result);
  };

  return (<div className="App">
    <h1>Thalex Front-End Developer Technical Assignment Solution</h1>

    <form onSubmit={handleSubmit}>
      <select name="side" value={side} onChange={(changeEvent) => setSide(changeEvent.target.value as OrderSide)}>
        <option value="sell">Sell</option>
        <option value="buy">Buy</option>
      </select>
      <input name="amount" value={amount} type="number" min={0} onChange={(changeEvent) => setAmount(parseInt(changeEvent.target.value, 10))} />
      <input name="price" value={price} type="number" min={0} onChange={(changeEvent) => setPrice(parseInt(changeEvent.target.value, 10))} />

      <button type="submit">Send order</button>
    </form>

    {sendResult && <h2>{sendResult}</h2>}

    {orders.length === 0 ?
      <Spinner /> :
      orders.map(order => (
        <React.Fragment key={order.id}>
          {order.id} {order.side} {order.amount} {order.price}<br />
        </React.Fragment>
      ))
    }
  </div>);
};