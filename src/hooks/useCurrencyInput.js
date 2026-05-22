import { useState } from "react";

export const useCurrencyInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const formatNumber = (val) => {
    const number = val.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (value) => {
    const rawValue =  value.replace(/\./g, "");
    if (/^\d*$/.test(rawValue)) {
      setValue(rawValue);
    }
  };

  return {
    value, // 15000
    displayValue: formatNumber(value), // "15.000"
    handleChange,
    setValue
  };
};