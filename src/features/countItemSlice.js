import { createSlice } from "@reduxjs/toolkit";
import productList from "../components/user/UserHomePage/ProductsPage";

const initialState = {
  productList: productList,
  numberItemOfCart: 0,
  cart: [],
};

// Cấu hình Slice
export const countItemSlice = createSlice({
  name: "countItem",
  initialState,
  reducers: {
    increasement: (state, action) => {
      const item = state.productList.find(
        (product) => product.id === action.payload.id
      );
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    },
    decreasement: (state) => {
      state.numberItemOfCart -= 1;
    },
  },
});

// Export actions
export const { increasement, decreasement } = countItemSlice.actions;

// Lấy ra state cartItems của cartItemsSlice;
export const selectCartItems = (state) => state.countItem.numberItemOfCart;

export const selectItem = (state) => state.countItem.cart;

// Export reducer
export default countItemSlice.reducer;
