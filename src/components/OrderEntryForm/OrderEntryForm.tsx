import React from "react";
import { OrderSide } from "../../typings/Order";

interface OrderEntryFormProps {
  amount: string;
  price: string;
  isDisabled: boolean;
  isSubmitError: boolean;
  resultMessage?: string;
  onSubmit: React.FormEventHandler
  onAmountChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSideChange: (value: OrderSide) => void;
}

export const OrderEntryForm: React.FC<OrderEntryFormProps> = ({ onSubmit, amount, price, isDisabled, isSubmitError, resultMessage, onAmountChange, onPriceChange, onSideChange }) => {
  const onSideChangeClick = (clickEvent) => {
    onSideChange(clickEvent.target.value);
  };

  return (<>
    <form onSubmit={onSubmit}>
      <input type="text" name="amount" value={amount || ""} onChange={(event) => onAmountChange(event.target.value)} pattern="[0-9]+(\.[0-9]+)?" />
      <input type="text" name="price" value={price || ""} onChange={(event) => onPriceChange(event.target.value)} pattern="[0-9]+(\.[0-9]+)?" />

      <button type="submit" disabled={isDisabled} value="buy" onClick={onSideChangeClick}>Buy</button>
      <button type="submit" disabled={isDisabled} value="sell" onClick={onSideChangeClick}>Sell</button>
    </form>

    {resultMessage && <h2 className={isSubmitError ? "text-red" : ""}>{resultMessage}</h2>}
  </>);
};