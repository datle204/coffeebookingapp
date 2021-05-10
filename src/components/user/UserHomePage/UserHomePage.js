import "./UserHomePage.css";
import { Link } from "react-router-dom";
import {
  faStore,
  faMugHot,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStores } from "../../Api";
import { useSelector} from "react-redux";
import { selectCartItems } from "../../../features/countItemSlice";
import Body from "./UserBody";
import ProductPage from "./ProductsPage";
import CartPage from "./UserCart";


export default function UserHomePage() {
  const history = useHistory();
  const [stores, setStoresList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [chooseStoreId, setChooseStoreId] = useState();
  const [isStore, setIsStore] = useState(true);
  const [isProductPage, setIsProductPage] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);
  const [currentBtnId, setCurrentBtnId] = useState("btn-1");


  const numberOfCartItem = useSelector(selectCartItems);

  async function Logout() {
    history.push("/");
  }

  useEffect(() => {
    async function fetchData() {
      const { stores, totalCount } = await getStores(1);
      setStoresList(stores);
      setTotalItems(totalCount);
    }
    fetchData();
  }, []);

  function getProduct(storeId) {
    setIsProductPage(true);
    setIsStore(false);
    setIsCartPage(false);
    let index = stores.findIndex((store) => store.id === storeId);
    if (index > -1) {
      setChooseStoreId(storeId);
    }
  }

  async function goToHomePage(btnId) {
    setIsStore(true);
    setIsProductPage(false);
    setIsCartPage(false);
    setCurrentBtnId(btnId);
  }

  async function goToCart(btnId) {
    setIsCartPage(true);
    setIsStore(false);
    setIsProductPage(false);
    setCurrentBtnId(btnId);
    
  }
  async function goToOrder(btnId) {
    setCurrentBtnId(btnId);
  }

  return (
    <div className="container">
      <div className="user-homepage">
        <div className="content-left">
          <div className="user-info">
            <img className="user-avatar" alt="avatar" src="ava.png" />
            <p className="username">Dat Le</p>
          </div>
          <div className="menu">
            <ul className="menu-list">
              <li className={currentBtnId === "btn-1" ? "current-btn" : ""} id="btn-1">
                <Link to="/home" onClick={() => goToHomePage("btn-1")}>
                  <FontAwesomeIcon icon={faStore} className="fontawesome" />{" "}
                  Cafe Store
                </Link>
              </li>
              <div className="cart-count">{numberOfCartItem}</div>
              <li className={currentBtnId === "btn-2" ? "current-btn" : ""} id="btn-2">
                <Link to="/home" onClick={()=> goToCart("btn-2")}>
                  <FontAwesomeIcon icon={faMugHot} className="fontawesome" />{" "}
                  Cart
                </Link>
              </li>
              <li className={currentBtnId === "btn-3" ? "current-btn" : ""} id="btn-3">
                <Link to="/home" onClick={()=> goToOrder("btn-3")}>
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="fontawesome"
                  />{" "}
                  Order
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={Logout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-right">
          <div className="shop-list">
            {isStore &&
              <Body stores={stores} getProduct={getProduct} />
            }
            {isProductPage &&
              <ProductPage
                stores={stores}
                chooseStoreId={chooseStoreId}
              />
            }
            {isCartPage && 
              <CartPage/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
