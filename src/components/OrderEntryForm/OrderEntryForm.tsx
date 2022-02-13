import React from "react";
import "./OrderEntryForm.scss";
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

  return (
    <form onSubmit={onSubmit} className="OrderEntryForm" autoComplete="off">
      <label className="OrderEntryForm__label">
        Amount:<br />
        <input type="text" name="amount" value={amount || ""} onChange={(event) => onAmountChange(event.target.value)} pattern="[0-9]+(\.[0-9]+)?" required />
      </label>

      <label className="OrderEntryForm__label">
        Price:<br />
        <input type="text" name="price" value={price || ""} onChange={(event) => onPriceChange(event.target.value)} pattern="[0-9]+(\.[0-9]+)?" required />
      </label>

      <p className="OrderEntryForm__buttons">
        <button type="submit" disabled={isDisabled} value="buy" onClick={onSideChangeClick} className="OrderEntryForm__button OrderEntryForm__button--buy">Buy</button>

        <button type="submit" disabled={isDisabled} value="sell" onClick={onSideChangeClick} className="OrderEntryForm__button OrderEntryForm__button--sell">Sell</button>
      </p>

      {resultMessage && <p className={`OrderEntryForm__result ${isSubmitError && "OrderEntryForm__result--error"}`}>{resultMessage}</p>}
    </form>
  );
};