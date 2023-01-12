import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const URL = import.meta.env.VITE_APP_URL;

const initialState = {
  product: null,
  loading: true,
  error: false,
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  (id) => {
    return axios(`${URL}/api/products/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const createReview = createAsyncThunk(
  "singleProduct/createReview",
  ({ id, data }) => {
    return axios
      .post(`${URL}/api/products/reviews/${id}`, data)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  extraReducers: {
    [fetchSingleProduct.pending]: (state) => {
      state.loading = true;
      state.product = null;
      state.error = false;
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error.message;
    },
    [createReview.pending]: (state) => {
      state.loading = true;
      state.product = null;
      state.error = false;
    },
    [createReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [createReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default singleProductSlice.reducer;
