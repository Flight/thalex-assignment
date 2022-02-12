import React from "react";
import "./App.scss";
import { Spinner } from "./components/Spinner/Spinner";
import { useOrders } from "./hooks/useOrders";

export const App = () => {
  const orders = useOrders();

  return (<div className="App">
    <h1>Thalex Front-End Developer Technical Assignment Solution</h1>
    {orders.length === 0 ?
      <Spinner /> :
      orders.map(order => (
        <React.Fragment key={order.id}>
          {order.amount}{" "}
        </React.Fragment>
      ))
    }
  </div>);
};