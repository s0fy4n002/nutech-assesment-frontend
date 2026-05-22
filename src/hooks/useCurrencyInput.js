import { useState } from "react";

export const useCurrencyInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  // Fungsi untuk memformat angka (internal)
  const formatNumber = (val) => {
    const number = val.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handler untuk input
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(rawValue)) {
      setValue(rawValue);
    }
  };

  // Kembalikan nilai dalam bentuk angka murni (untuk kalkulasi/API) 
  // dan displayValue (untuk input)
  return {
    value,              // "15000"
    displayValue: formatNumber(value), // "15.000"
    handleChange,
    setValue
  };
};