import "./UserBody.css";
import { Link } from "react-router-dom";
import {
  Container, Row, Col
} from "react-bootstrap";


export default function Body({ stores, getProduct }) {
  const storesList = stores.map((store) => (
    <Col md={4}>
      <div key={store.id} className="store-list-item">
        <div className="top-store-list">
          <img src={"https://user-coffee.herokuapp.com/upload"+ store.thumbnail} alt="logo"/>
        </div>
        <div className="bottom-store-list">
          <Link to ="/home" onClick={() => getProduct(store.id)} className="get-product-link">
            <h2 className="store-name">{store.name}</h2>
          </Link>
          <p className="store-address">{store.address}</p>
          <p className="store-description">{store.description}</p>
        </div>
      </div>
    </Col>
  ));
  return (
    <Container>
    <h1 className="store-title">Danh Sách Cửa Hàng</h1>
    <div className="store-list">
      <Row>
        {storesList}
      </Row>
    </div>
    </Container>
  );
}
