import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect } from "react";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Product/ProductDetail.js";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignup from "./components/User/LoginSignup";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/Useroptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";

import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import DashBoard from "./components/Admin/DashBoard";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct.js";

import ProductList from "./components/Admin/ProductList.js";
import OrderList from "./components/Admin/OrderList.js";
import UpdateOrder from "./components/Admin/UpdateOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import Contact from "./components/layout/Contact.js";
import About from "./components/layout/About";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const key =
    "pk_test_51NSIeBSGX3JSS49jstOrnIdBQBlliuHVu4FvGIO9GZX9Xm7wQqfYsdnLYNnPwkSnJx7w8FUM53PiRZEmA86a4Ocb00V15zpdqd";

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Dorid Sans", "chilanaka"],
      },
    });

    store.dispatch(loadUser());
  }, [key]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/product/:id" Component={ProductDetail} />
          <Route exact path="/products" Component={Products} />
          <Route path="/products/:keyword" Component={Products} />
          <Route exact path="/search" Component={Search} />
          <Route exact path="/contact" Component={Contact} />
          <Route exact path="/about" Component={About} />
          <Route
            exact
            path="/account"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            exact
            path="/me/update"
            element={<ProtectedRoute Component={UpdateProfile} />}
          />
          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute Component={UpdatePassword} />}
          />
          <Route exact path="/password/forgot" Component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            Component={ResetPassword}
          />
          <Route exact path="/login" Component={LoginSignup} />
          <Route exact path="/cart" Component={Cart} />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute Component={Shipping} />}
          />

          {key && (
            <Route
              path="/process/payment"
              element={
                isAuthenticated && (
                  <Elements stripe={loadStripe(key)}>
                    <Payment />
                  </Elements>
                )
              }
            />
          )}

          <Route
            exact
            path="/success"
            element={<ProtectedRoute Component={OrderSuccess} />}
          />

          <Route
            exact
            path="/orders"
            element={<ProtectedRoute Component={MyOrders} />}
          />
          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute Component={ConfirmOrder} />}
          />
          <Route
            exact
            path="/orders/:id"
            element={<ProtectedRoute Component={OrderDetails} />}
          />

          <Route
            exact
            path="/admin/dashboard"
            element={<ProtectedRoute isAdmin={true} Component={DashBoard} />}
          />

          <Route
            exact
            path="/admin/products"
            element={<ProtectedRoute isAdmin={true} Component={ProductList} />}
          />
          <Route
            exact
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} Component={NewProduct} />}
          />
          <Route
            exact
            path="/admin/products/:id"
            element={
              <ProtectedRoute isAdmin={true} Component={UpdateProduct} />
            }
          />

          <Route
            exact
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} Component={OrderList} />}
          />

          <Route
            exact
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true} Component={UpdateOrder} />}
          />
          <Route
            exact
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} Component={UsersList} />}
          />
          <Route
            exact
            path="/admin/user/:id"
            element={<ProtectedRoute isAdmin={true} Component={UpdateUser} />}
          />
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true} Component={ProductReviews} />
            }
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
