import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    title: "Telo 1kg",
    price: "12.000",
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title;
      state.price = action.payload.price;
    },
  },
});

// mempunyai actions 1 yaitu update jika ingin nambah tinggal  kasih koma
export const { update } = productSlice.actions;
// export agar bisa diakses pada app/store.js
export default productSlice.reducer;
