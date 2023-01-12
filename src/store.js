import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/CartSlice";
import ProductsReducer from "./slices/ProductSlice";
import SingleProductReducer from "./slices/SingleProduct";
import UserReducer from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    singleProduct: SingleProductReducer,
    user: UserReducer,
    cart: CartReducer,
  },
});

export default store;
