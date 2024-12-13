import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

export const getProduct = createAsyncThunk("products/getProduct", async () => {
  const response = await axios.get("http://localhost:5000/Products");
  return response.data;
});

export const saveProduct = createAsyncThunk(
  "products/saveProduct",
  async ({ title, price }) => {
    const response = await axios.post("http://localhost:5000/Products", {
      title,
      price,
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/saveProduct",
  async ({ id, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/Products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:5000/Products/${id}`);
    return id;
  }
);

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload);
      productEntity.setOne(state, action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      productEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload); // Hapus produk berdasarkan ID
    });
  },
});

export const productSelectors = productEntity.getSelectors(
  (state) => state.product
);
// export agar bisa diakses pada app/store.js
export default productSlice.reducer;
