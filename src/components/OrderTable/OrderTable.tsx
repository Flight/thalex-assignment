import React, { useEffect, useRef, useState } from "react";
import "./OrderTable.scss";
import { Spinner } from "../Spinner/Spinner";
import { Order, OrderSide } from "../../typings/Order";
import { DECIMALS_AMOUNT } from "../../helpers/constants";

// Time after user stops scrolling
// to move scroll position back to most important rows
const SCROLL_BACK_TIMEOUT = 5000;

interface OrderTableProps {
  type: OrderSide,
  orders: Order[];
  sentOrderIds: number[];
  onOrderSelect: (order: Order) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ type, orders, sentOrderIds, onOrderSelect }) => {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isScrollListenerAdded, setIsScrollListenerAdded] = useState(false);
  const scrollTimer = useRef(null);

  // Scrolling to the end of the sell table or to the start of the buy table if it's updated
  useEffect(() => {
    const tbody = tbodyRef.current;

    if (isUserScrolling || !tbody || tbody.scrollHeight - tbody.clientHeight === tbody.scrollTop) {
      return;
    }


    tbody?.scroll({ top: type === "sell" ? tbody.scrollHeight : 0, behavior: "smooth" });
  }, [isUserScrolling, orders, type]);

  // Should run only once
  // Adds the scroll event to the table to prevent jumping on data update
  // While the user is scrolling
  useEffect(() => {
    const tbody = tbodyRef.current;
    if (!tbody || isScrollListenerAdded) {
      return null;
    }

    const onBodyScroll = () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      setIsUserScrolling(true);
      scrollTimer.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, SCROLL_BACK_TIMEOUT);
    };

    tbody.addEventListener("wheel", onBodyScroll, true);
    tbody.addEventListener("touch", onBodyScroll, true);
    setIsScrollListenerAdded(true);

    return () => {
      tbody.removeEventListener("wheel", onBodyScroll);
      tbody.removeEventListener("touch", onBodyScroll);
    };
  }, [isScrollListenerAdded, orders]);

  if (orders.length === 0) {
    return <Spinner />;
  }

  return (
    <table className={`OrderTable ${type === "sell" ? "OrderTable--sell" : "OrderTable--buy"}`}>
      <thead>
        <tr>
          <th>price</th>
          <th>size</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody ref={tbodyRef}>
        {orders.sort((a, b) => b.price - a.price).map(order => {
          const { id, price, amount } = order;

          return (
            <tr key={id} className={sentOrderIds.includes(id) ? "highlight" : ""} onClick={() => onOrderSelect(order)}>
              <td>{price.toFixed(DECIMALS_AMOUNT)}</td>
              <td>{amount.toFixed(DECIMALS_AMOUNT)}</td>
              <td>{(price * amount).toFixed(DECIMALS_AMOUNT)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};