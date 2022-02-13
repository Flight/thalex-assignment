import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { Order, OrderSide } from "../../typings/Order";
import "./OrderTable.scss";

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
      }, 5000);
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
    <div className="OrderTable">
      <table className={`OrderTable__table ${type === "sell" ? "OrderTable_sell" : "OrderTable_buy"}`}>
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
              <tr key={id} className={sentOrderIds.includes(id) ? "text-green" : ""} onClick={() => onOrderSelect(order)}>
                <td>{price}</td>
                <td>{amount}</td>
                <td>{price * amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};