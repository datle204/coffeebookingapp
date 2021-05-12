import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberItemOfCart: 0,
  cart: [],
};

// Cấu hình Slice
export const countItemSlice = createSlice({
  name: "countItem",
  initialState,
  reducers: {
    increasement: (state, action) => {
      state.numberItemOfCart += 1; 
      
      const itemId = action.payload.id
      const index = state.cart.find((cartItem)=> cartItem.id === itemId);
      if(index){
        state.cart = state.cart.map((cartItem) => {
          if(cartItem.id === itemId){
            cartItem.quantity += 1;
          }
          return cartItem;
        })
      
      }else{
        action.payload.quantity = 1;
        state.cart.push(action.payload);
      }
     
      
    },
    decreasement: (state) => {
      state.numberItemOfCart -= 1;
    },
    updateQty: (state, action) => {
      state.cart = state.cart.map((cartItem) => {
        if(cartItem.id === action.payload.id){
          cartItem.quantity = Number(action.payload.quantity);
        }
        return cartItem;
      })
    }
  },
});

// Export actions
export const { increasement, decreasement, updateQty } = countItemSlice.actions;

// Lấy ra state cartItems của cartItemsSlice;
export const selectCartItems = (state) => state.countItem.numberItemOfCart;

export const selectItem = (state) => state.countItem.cart;


// Export reducer
export default countItemSlice.reducer;
