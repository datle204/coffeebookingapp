import "./UserCart.css";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectItem, updateQty } from "../../../features/countItemSlice";

export default function UserCart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectItem);
  console.log(cart);
  

  // UPDATE TOTAL PRICE

  let totalPrice = cart.reduce(
    (total, cartItem) => (total += cartItem.quantity * cartItem.price),
    0
  );

  function updateQuantity(event, cartItemId) {
    dispatch(updateQty({quantity: event.target.value, id: cartItemId}))
  }

  const cartItems = cart.map((cartItem) => (
    <div className="cart-detail" key={cartItem.id}>
      <div className="cart-info-wrap">
        <p className="product-name">Name: {cartItem.productName}</p>
        <p className="product-price">Price: {cartItem.price}</p>
      </div>
      <div className="change-qty">
        <label htmlFor="qty">Quantity: </label>
        <input
          min="1"
          type="number"
          name="qty"
          value={cartItem.quantity}
          onChange={(event)=> updateQuantity(event,cartItem.id)}
        />
      </div>
    </div>
  ));
  return (
    <div className="cart-page">
      <div className="cart-title">Your Shopping Cart</div>
      <div className="cart-page-detail">
        <div className="left-cart-page">{cartItems}</div>
        <div className="right-cart-page">
          <div className="cart-payment">Total: ${totalPrice}</div>
          <div className="shipping-info"></div>
          <button className="check-out">Check Out</button>
        </div>
      </div>
    </div>
  );
}
