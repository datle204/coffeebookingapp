import "./UserHomePage.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStores } from "../../Api";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../features/countItemSlice";
import Body from "./UserBody";
import ProductPage from "./ProductsPage";
import CartPage from "./UserCart";
import { selectUsername, selectUserAvatar } from "../../../features/userSlice";

export default function UserHomePage() {
  const history = useHistory();
  const [stores, setStoresList] = useState([]);
  const [chooseStoreId, setChooseStoreId] = useState();
  const [isStore, setIsStore] = useState(true);
  const [isProductPage, setIsProductPage] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);
  const [currentBtnId, setCurrentBtnId] = useState("btn-1");

  const username = useSelector(selectUsername);
  const avatar = useSelector(selectUserAvatar);
  const numberOfCartItem = useSelector(selectCartItems);

  const [isLoadingImg, setIsLoadingImg] = useState(true);

  async function Logout() {
    localStorage.removeItem("token");
    history.push("/");
  }

  useEffect(() => {
    async function fetchData() {
      const { stores } = await getStores(1);
      setIsLoadingImg(false);
      setStoresList(stores);
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
    
    <div className="main">
      {isLoadingImg ? <img src="/Spinner.gif" alt="loading" className="loading-img"/>:
      <div className="user-homepage">
        <Navbar bg="light" expand="lg">
          <Nav.Link to="/home">
            <img src="/coffie-logo.png" alt="logo" />
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-auto">
              <Nav.Link
                to="/home"
                className={currentBtnId === "btn-1" ? "current-btn" : ""}
                id="btn-1"
                onClick={() => goToHomePage("btn-1")}
              >
                Cafe Store
              </Nav.Link>

              <Nav.Link
                to="/home"
                className={currentBtnId === "btn-2" ? "current-btn" : ""}
                id="btn-2"
                onClick={() => goToCart("btn-2")}
              >
                <div className="cart-count">{numberOfCartItem}</div>
                Cart
              </Nav.Link>
              <Nav.Link
                to="/home"
                className={currentBtnId === "btn-3" ? "current-btn" : ""}
                id="btn-3"
                onClick={() => goToOrder("btn-3")}
              >
                Order
              </Nav.Link>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Find Cafe Store"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>
            <div className="user-info">
              <Nav.Link to="/home">
                <img src={avatar} className="user-avatar" alt="user-avatar" />
              </Nav.Link>
              <NavDropdown
                title={`Hi, ${username}`}
                alignRight
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Item onClick={() => Logout()}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div className="content">
          <div className="shop-list">
            {isStore && <Body stores={stores} getProduct={getProduct} />}
            {isProductPage && (
              <ProductPage stores={stores} chooseStoreId={chooseStoreId} />
            )}
            {isCartPage && <CartPage/>}
          </div>
        </div>
      </div>
      }
    </div>
          
  );
}
