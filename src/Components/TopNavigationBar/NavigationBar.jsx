import "./Navigation.css";
import "../../App.css";
import bellIcon from "../../assets/bell.svg";
import heartIcon from "../../assets/heart.svg";
import cartIcon from "../../assets/cart.svg";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import BrandImage from "../../assets/profit1.svg";
import { useAuth } from "../../Contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { login, setlogin } = useAuth();
  const { state, dispatch } = useCart();
  const cartItemCount = state.cartList.reduce((accumulator, item) => {
    return (accumulator = item.quantity + accumulator);
  }, 0);
  const wishListItemcount = state.wishListProductTrack.length;

  const logOutButtonHandler = () => {
    setlogin(false);
    localStorage.removeItem("islogin");
    navigate("/");
  };

  return (
    <nav className="navigation-bar-new">
      <div className="navigation-container-new">
        <div>
          <img src={BrandImage} className="brand-image" />
          <h4>FINMART</h4>
        </div>
      </div>
      <div className="navigation-container-new home-navigation-container">
        <Link class="top-navigation-link" to="/">
          Home
        </Link>
        {login ? (
          <button
            class="navigation-logout-button"
            onClick={logOutButtonHandler}
          >
            Logout
          </button>
        ) : null}

        {/* <Link to="/" className="brandicon"> */}

        {/* <img src={BrandImage} /> */}
        {/* </Link> */}
      </div>
      <div className="navigation-container-new">
        <Link to="/wishList" className="navigation-container-new-Link">
          <button className="badge-icon wishlist">
            <img src={heartIcon} alt="heart" className="badge-image" />
            {state.wishList.length > 0 ? (
              <span className="button-badge-number">{wishListItemcount}</span>
            ) : null}
          </button>
        </Link>

        <Link to="/cartList">
          <button className="badge-icon cart">
            <img src={cartIcon} alt="cart" className="badge-image" />
            {state.cartList.length > 0 ? (
              <span className="button-badge-number">{cartItemCount}</span>
            ) : null}
          </button>
        </Link>
      </div>
    </nav>
  );
};
