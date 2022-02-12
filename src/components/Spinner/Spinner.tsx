// https://loading.io/css/

import "./Spinner.scss";
import React from "react";

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className = "" }) => (
  <div className={`Spinner ${className}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
