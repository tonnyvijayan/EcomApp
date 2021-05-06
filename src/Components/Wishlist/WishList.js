import "./WishList.css";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";

export const WishList = () => {
  const { state, serverOperations } = useCart();

  return (
    <div class="wishList-container">
      {state.wishList.map((item) => {
        return (
          <div class="card" key={item.id}>
            <img class="card-image-responsive" src={item.image} alt="image" />

            <h3 class="card-heading">{item.name}</h3>
            <div class="card-pricing">
              <span class="card-product-currentprice">Rs:{item.price}</span>
              <span class="card-product-originalprice">Rs:1200</span>
              <span class="card-prodcut-discount">60% Off</span>
            </div>

            <div class="card-rating">
              <button class="badge-rating">
                <span class="rating-badge">4.3</span>
                <span>
                  <i class="fa fa-star"></i>
                </span>
              </button>
            </div>
            <p class="card-description">
              printer took a galley of type and scrambled it to make a type
              specimen book. s of Lorem Ipsum
            </p>
            <div class="card-button-container">
              {state.cartListProductTrack.includes(item._id) ? (
                <button
                  className="button-secondary-one"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  In Cart
                </button>
              ) : (
                <button
                  class="button-primary-one"
                  onClick={() => {
                    serverOperations({
                      buttonAction: "ADD-TO-CART-SERVER",
                      payload: { ...item },
                    });
                    serverOperations({
                      buttonAction: "REMOVE-FROM-WISHLIST",
                      payload: item,
                    });
                  }}
                >
                  Move to Cart
                </button>
              )}
            </div>
            <div class="card-button-container">
              <button
                class="button-secondary-one"
                onClick={() => {
                  serverOperations({
                    buttonAction: "REMOVE-FROM-WISHLIST",
                    payload: item,
                  });
                }}
              >
                Remove from List
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
