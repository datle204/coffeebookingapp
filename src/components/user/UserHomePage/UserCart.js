import "./UserCart.css";
import productList from "./ProductsPage";
import { useState } from "react";

export default function UserCart() {
  const [input, setInput] = useState();

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    // adjustQty(item.id, e.target.value);
  };

  return (
    <div className="cart-page">
      <div className="cart-title">Your Shopping Cart</div>
      <div className="cart-page-detail">
        <div className="left-cart-page">
          <div className="cart-detail">
            <div className="cart-info-wrap">
              <p className="product-name">Name: {productList.productName}</p>
              <p className="product-price">Price: {productList.price}</p>
            </div>
            <div className="change-qty">
              <label htmlFor="qty">Qty: </label>
              <input
                min="1"
                type="number"
                id="qty"
                name="qty"
                value={input}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="right-cart-page">
          <div className="cart-payment"></div>
          <div className="shipping-info"></div>
          <button className="check-out">Check Out</button>
        </div>
      </div>
    </div>
  );
}
