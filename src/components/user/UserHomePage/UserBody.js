import "./UserBody.css";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Body({ stores, getProduct }) {
  const storesList = stores.map((store) => (
    <div key={store.id} className="store-list-item">
      <div className="right-store-list">
        <img src={store.thumbnail} alt="logo"/>
      </div>
      <div className="left-store-list">
        <Link to ="/home" onClick={() => getProduct(store.id)} className="get-product-link">
          <h2 className="store-name">{store.name}</h2>
        </Link>
        <p className="store-address">{store.address}</p>
        <p className="store-description">{store.description}</p>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="search">
        <input className="search-store" placeholder="Tìm quán cafe"></input>
        <button className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {storesList}
    </div>
  );
}
