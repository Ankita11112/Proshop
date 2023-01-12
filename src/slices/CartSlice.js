import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const URL = import.meta.env.VITE_APP_URL;

const initialState = {
  items: null,
  loading: true,
  error: false,
  amount: 0,
  subQty: 0,
};

const totalQty = (arr) => {
  let res = arr.reduce((acc, v) => acc + v.qty, 0);
  return res;
};

const totalAmount = (arr) => {
  let res = arr.reduce((acc, v) => acc + v.qty * v.price, 0);
  return res;
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  (user) => {
    return axios(`${URL}/api/cart/${user}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const createUserCart = createAsyncThunk(
  "cart/createUserCart",
  (user) => {
    return axios
      .post(`${URL}/api/cart/${user}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  ({ user, cartItem }) => {
    return axios
      .put(`${URL}/api/cart/${user}`, cartItem)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const updateItemQty = createAsyncThunk("cart/updateItemQty", (data) => {
  return axios
    .put(`${URL}/api/cart/qty/${data.user}`, data.item)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  (data) => {
    return axios
      .delete(`${URL}/api/cart/${data.user}/${data._id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", (user) => {
  return axios
    .put(`${URL}/api/cart/clear/${user}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.items = null;
      state.loading = true;
      state.error = false;
      state.amount = 0;
      state.subQty = 0;
    },
  },
  extraReducers: {
    [fetchCartItems.pending]: (state) => {
      state.loading = true;
      state.items = null;
      state.error = false;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.amount = totalAmount(action.payload.items);
      state.subQty = totalQty(action.payload.items);
    },
    [fetchCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createUserCart.pending]: (state) => {
      state.loading = true;
    },
    [createUserCart.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createUserCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addCartItem.pending]: (state) => {
      state.loading = true;
      state.items = null;
      state.error = false;
    },
    [addCartItem.fulfilled]: (state, action) => {
      state.loading = false;
      // state.items = action.payload.items;
    },
    [addCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateItemQty.pending]: (state) => {
      state.loading = true;
      state.items = null;
      state.error = false;
    },
    [updateItemQty.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.amount = totalAmount(action.payload.items);
      state.subQty = totalQty(action.payload.items);
    },
    [updateItemQty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [removeCartItem.pending]: (state) => {
      state.loading = true;
      state.items = null;
      state.error = false;
    },
    [removeCartItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.amount = totalAmount(action.payload.items);
      state.subQty = totalQty(action.payload.items);
    },
    [removeCartItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [clearCart.pending]: (state) => {
      state.loading = true;
      state.items = null;
      state.error = false;
    },
    [clearCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = [];
      state.amount = 0;
      state.subQty = 0;
    },
    [clearCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default cartSlice.reducer;
export const { emptyCart } = cartSlice.actions;
