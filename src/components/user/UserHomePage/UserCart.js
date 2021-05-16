import "./UserCart.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectItem, updateQty, deleteQty} from "../../../features/countItemSlice";
import { Container, Row, Col } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    dispatch(updateQty({ quantity: event.target.value, id: cartItemId }));
  }

  function deleteCartItem(cartItemId){
    const newCartList = cart.filter(
      (cartItem) => cartItem.id !== cartItemId
    );
    dispatch(deleteQty({newList: newCartList, id: cartItemId}))
  
  }

  const cartItems = cart.map((cartItem) =>  (
    
    <div className="cart-detail" key={cartItem.id}>
      <div className="cart-info-wrap">
        <div className="right-product-detail">
          <img
            src={
              "https://user-coffee.herokuapp.com/upload" + cartItem.productImage
            }
            alt="photos-product"
          />
        </div>
        <div className="left-product-detail">
          <p className="product-name">Name: {cartItem.productName}</p>
          <p className="product-price">Price: {cartItem.price}</p>
        </div>
      </div>
      <div className="change-qty">
        <label htmlFor="qty">Quantity: </label>
        <input
          min="1"
          type="number"
          name="qty"
          value={cartItem.quantity}
          onChange={(event) => updateQuantity(event, cartItem.id)}
        />
        <div className="delete-btn">
          <button
            className="delete"
            onClick={()=>deleteCartItem(cartItem.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="fontawesome" />
          </button>
        </div>
      </div>
    </div>    
  ));
  return (
    <Container>
      <div className="cart-page">
        <div className="cart-title">Your Shopping Cart</div>
        <div className="cart-page-detail">
          <Row>
            <Col md={8}>
              <div className="left-cart-page">{cartItems}</div>
            </Col>
            <Col md={4}>
              <div className="right-cart-page">
                <div className="cart-payment">Total: ${totalPrice}</div>
                <div className="shipping-info"></div>
                <button className="check-out">Check Out</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
