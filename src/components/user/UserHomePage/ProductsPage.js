// import "./UserHomePage.css";
import "./ProductsPage.css";
import { useDispatch } from "react-redux";
import {increasement} from "../../../features/countItemSlice";

export default function ProductPage({ stores, chooseStoreId }) {
  
  const dispatch = useDispatch();

  async function addToCart(productId){
    dispatch(increasement({type: 'increasement', payload: {id: productId}}));
  }
  
  let currentStore = [...stores];
  let currentStoreProductList = currentStore[chooseStoreId - 1].products;
  const productsList = currentStoreProductList.map((productList) => (
    <div className="product" key={productList.id}>
      <div className="product-detail">
        <p className="product-name">Name: {productList.productName}</p>
        <p className="product-price">Price: {productList.price}</p>
      </div>
      <button
        className="add-to-cart"
        onClick={() => addToCart(productList.id)}
      >
        Add To Cart
      </button>
    </div>
  ));

  return (
    
    <div className="product-page">
      <div className="current-store">
        <div className="right-store-list">
          <img src={currentStore[chooseStoreId - 1].thumbnail} alt="logo" />
        </div>
        <div className="left-store-list">
          <h2 className="store-name">{currentStore[chooseStoreId - 1].name}</h2>
          <p className="store-address">
            {currentStore[chooseStoreId - 1].address}
          </p>
          <p className="store-description">
            {currentStore[chooseStoreId - 1].description}
          </p>
        </div>
      </div>
      <div className="shop-product-list">{productsList}</div>
    </div>
  );
}
