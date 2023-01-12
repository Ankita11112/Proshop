import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUserCart } from "./CartSlice";

const URL = import.meta.env.VITE_APP_URL;

const getUser = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: getUser,
  error: false,
};
export const fetchAllUser = createAsyncThunk("user/fetchAllUsers", () => {
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  return axios(`${URL}/api/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

export const registerUser = createAsyncThunk("user/registerUser", (data) => {
  return axios
    .post(`${URL}/api/user/register`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

export const loginUser = createAsyncThunk("user/loginUser", (data) => {
  return axios
    .post(`${URL}/api/user/login`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

export const updateUser = createAsyncThunk("user/updateUser", (data) => {
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  return axios
    .put(`${URL}/api/user/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});
export const updateAdmin = createAsyncThunk(
  "user/updateAdmin",
  ({ id, data }) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
      .put(`${URL}/api/user/admin/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", (id) => {
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  return axios
    .delete(`${URL}/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = false;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: {
    [fetchAllUser.pending]: (state) => {
      state.users = null;
    },
    [fetchAllUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.error = false;
    },
    [fetchAllUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [registerUser.pending]: (state) => {
      state.userInfo = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.error = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [loginUser.pending]: (state) => {
      state.userInfo = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.error = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateUser.pending]: (state) => {
      state.userInfo = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.error = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateAdmin.pending]: (state) => {
      // state.users = null;
    },
    [updateAdmin.fulfilled]: (state, action) => {
      let { _id } = action.payload;
      let index = state.users.findIndex((user) => user._id === _id);
      state.users[index] = action.payload;
      state.error = false;
    },
    [updateAdmin.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [deleteUser.pending]: (state) => {
      // state.users = null;
    },
    [deleteUser.fulfilled]: (state, action) => {
      // state.users = action.payload;
      state.error = false;
      state.loading = false;
      const { _id } = action.payload;
      let index = state.users.findIndex((user) => user._id === _id);
      state.users.splice(index, 1);
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
