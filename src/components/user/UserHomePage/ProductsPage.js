// import "./UserHomePage.css";
import "./ProductsPage.css";
import { useDispatch } from "react-redux";
import { increasement } from "../../../features/countItemSlice";
import { Container} from "react-bootstrap";

export default function ProductPage({ stores, chooseStoreId }) {
  const dispatch = useDispatch();

  async function addToCart(product) {
    dispatch(increasement(product));
  }

  let currentStore = [...stores];

  let index = currentStore.find((storeItem) => storeItem.id === chooseStoreId);

  let currentStoreProductList = index.products;

  const productsList = currentStoreProductList.map((product) => (
    <div className="product" key={product.id}>
      <div className="product-detail">
        <div className="right-product-detail">
          <img
            src={
              "https://user-coffee.herokuapp.com/upload" + product.productImage
            }
            alt="photos-product"
          />
        </div>
        <div className="left-product-detail">
          <p className="product-name">Name: {product.productName}</p>
          <p className="product-price">Price: {product.price}</p>
        </div>
      </div>
      <button className="add-to-cart" onClick={() => addToCart(product)}>
        Add To Cart
      </button>
    </div>
  ));

  return (
    <Container>
      <div className="product-page">
        <div className="current-store">
          
            <div className="right-store-list">
              <img
                src={
                  "https://user-coffee.herokuapp.com/upload" +
                  currentStore[chooseStoreId - 1].thumbnail
                }
                alt="logo"
              />
            </div>
            <div className="left-store-list">
              <h2 className="store-name">
                {currentStore[chooseStoreId - 1].name}
              </h2>
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
    </Container>
  );
}
