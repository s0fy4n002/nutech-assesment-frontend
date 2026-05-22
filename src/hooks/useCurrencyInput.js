import { useState } from "react";

export const useCurrencyInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const formatNumber = (val) => {
    const number = val.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(rawValue)) {
      setValue(rawValue);
    }
  };

  return {
    value,
    displayValue: formatNumber(value),
    handleChange,
    setValue
  };
};