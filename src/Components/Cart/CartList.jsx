import "./CartList.css";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";

export function CartList() {
  const { state, serverOperations } = useCart();
  const totalValue = state.cartList.reduce((accumulator, item) => {
    return (accumulator = item.quantity * item.price + accumulator);
  }, 0);
  return (
    <div className="cart-page-container">
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>

        {state.cartList.map((item) => {
          return (
            <tr>
              <td>
                <div className="cart-info-container">
                  <img src={item.image} />
                  <div className="cart-item-description">
                    <h3>{item.name}</h3>
                    <small>Price {item.price}</small>
                    <div className="cart-button-div">
                      {state.wishListProductTrack.includes(item._id) ? (
                        <button
                          className="button-secondary-cartlist"
                          style={{ cursor: "not-allowed" }}
                          disabled
                        >
                          In WishList
                        </button>
                      ) : (
                        <button
                          className="button-primary-cartlist"
                          onClick={() => {
                            serverOperations({
                              buttonAction: "ADD-TO-WISHLIST",
                              payload: item,
                            });
                            serverOperations({
                              buttonAction: "REMOVE-FROM-CART",
                              payload: item,
                            });
                          }}
                        >
                          To Wishlist
                        </button>
                      )}

                      <button
                        className="button-secondary-cartlist"
                        onClick={() => {
                          serverOperations({
                            buttonAction: "REMOVE-FROM-CART",
                            payload: item,
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="quantity-container">
                  <button
                    onClick={() => {
                      serverOperations({
                        buttonAction: "INCREASE-QUANTITY-FROM-CART",
                        payload: item,
                      });
                    }}
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      serverOperations({
                        buttonAction: "DECREASE-QUANTITY-FROM-CART",
                        payload: item,
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              </td>
              <td>Rs. {item.quantity * item.price}</td>
            </tr>
          );
        })}
      </table>

      {state.cartList.length > 0 ? (
        <div className="total-price-div">
          <table>
            <tr>
              <td>SubTotal</td>
              <td>Rs:{totalValue}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>Rs:{Math.floor(totalValue * 0.18)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>Rs:{totalValue + Math.floor(totalValue * 0.18)}</td>
            </tr>
          </table>
        </div>
      ) : null}
      <div class="confirm-button-container">
        <button class="button-primary-cartlist mg-top">Confirm</button>
      </div>
    </div>
  );
}
