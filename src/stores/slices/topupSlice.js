import { createSlice } from '@reduxjs/toolkit';

const formatNumber = (val) => {
    const number = val.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const topupSlice = createSlice({
  name: 'topup',
  initialState: {
    amount: 0,
    displayAmount: 0,
    topupValue: 0,
    displayTopupValue: "",
    displayBalance: false,
  },
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
      state.displayAmount = formatNumber(action.payload.toString());
    },

    setDisplayBalance: (state, action) => {
      state.displayBalance = action.payload;
    },

    setTopupValue: (state, action) => {
       const rawValue = action.payload
        .toString()
        .replace(/Rp\s?/gi, "")
        .replace(/\./g, "");

      state.topupValue = rawValue;
      state.displayTopupValue = formatNumber(action.payload.toString());
    },
    updateAmount: (state, action) => {
      state.amount += parseInt(action.payload, 10);
    },
    updateAmountPayment: (state, action) => {
      state.amount -= parseInt(action.payload, 10);
    },

  },
 
});

export const { setAmount, setTopupValue, updateAmount, updateAmountPayment, setDisplayBalance } = topupSlice.actions;
export default topupSlice.reducer;