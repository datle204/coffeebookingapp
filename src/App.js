import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import UserLoginPage from "./components/user/UserLoginPage/UserLoginPage";
import UserHomePage from "./components/user/UserHomePage/UserHomePage";
import ProductPage from './components/user/UserHomePage/ProductsPage';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/products">
            <ProductPage />
          </Route>
          <Route path="/home">
            <UserHomePage />
          </Route>
          <Route path="/">
            <UserLoginPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
