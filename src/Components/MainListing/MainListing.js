import "../../App.css";
import "./MainListing.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductList } from "../Products/ProductList";
import { ProductDetail } from "../Products/ProductDetail";
import { CartList } from "../Cart/CartList";
import { WishList } from "../Wishlist/WishList";
import { Login } from "../Login/Login";
import { PrivateRoute } from "../../Routes/PrivateRoute";
import { RouteNotFound } from "../../Routes/routeNotFound";
import { useAuth } from "../../Contexts/AuthContext/AuthProvider";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";

export const MainListing = () => {
  const { login, setlogin } = useAuth();
  const { toast, toastMessage } = useCart();
  useEffect(() => {
    const loginResponse = JSON.parse(localStorage.getItem("islogin"));
    console.log({ loginResponse });
    setlogin(loginResponse?.login);
  }, []);
  return (
    <div class="main-listing-container">
      <div
        id="toastDiv"
        style={{
          display: toast,
          zIndex: 5,

          alignItems: "center",
        }}
      >
        {toastMessage}
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />
        <PrivateRoute path="/cartList" element={<CartList />} />
        <PrivateRoute path="/wishList" element={<WishList />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </div>
  );
};
