import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

const initialState = {
  products: [],
  cartList: [],
  wishList: [],
  cartListProductTrack: [],
  wishListProductTrack: [],
  sort: null,
  showOutOfStock: false,
  fastDelivery: false,
  priceRange: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT-DATA-FROM-SERVER":
      return { ...state, products: action.payload };

    case "ADDING-TO-LOCAL-CART-FROM-SERVER-RESPONSE":
      console.log("Updating cart");
      console.log("payload is here", action.payload);
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
        cartListProductTrack: [
          ...state.cartListProductTrack,
          action.payload._id,
        ],
      };

    case "UPDATE-LOCAL-CART":
      console.log(action.type, action.payload);
      return {
        ...state,
        cartList: [...action.payload],
        cartListProductTrack: action.payload.map((item) => {
          return item._id;
        }),
      };

    case "ADDING-TO-LOCAL-WISHLIST-FROM-SERVER-RESPONSE":
      console.log("updating wishlist");
      return {
        ...state,
        wishList: [...action.payload],
        wishListProductTrack: action.payload.map((item) => item._id),
      };

    case "UPDATE-LOCAL-WISHLIST":
      return {
        ...state,
        wishList: [...action.payload],
        wishListProductTrack: action.payload.map((item) => item._id),
      };

    case "SORTING":
      console.log("SORTING in dispatch");
      return { ...state, sort: action.payload };

    case "FAST-DELIVERY":
      return { ...state, fastDelivery: action.payload };

    case "INCLUDE-OUT-OF-STOCK":
      return { ...state, showOutOfStock: action.payload };

    case "PRICE-RANGE":
      return { ...state, priceRange: action.payload };

    case "RESET":
      return {
        ...state,
        fastDelivery: false,
        showOutOfStock: false,
        sort: null,
        priceRange: null,
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [toast, setToast] = useState("none");
  const [toastMessage, setToastMessage] = useState("walla");
  const [state, dispatch] = useReducer(reducer, initialState);

  const toastCreator = (message, state) => {
    if (state === true) {
      setToast("flex");
      setToastMessage(message);
    }
    setTimeout(() => {
      setToast("none");
      setToastMessage("");
    }, 3000);
  };

  const productDataFetch = async () => {
    const serverRespone = await axios.get(
      "https://secret-gorge-47362.herokuapp.com/products"
    );
    console.log({ serverRespone });
    console.log("updating products");

    dispatch({
      type: "PRODUCT-DATA-FROM-SERVER",
      payload: serverRespone.data.product,
    });
  };

  const cartUpdater = async () => {
    const updatedCart = await axios.get(
      "https://secret-gorge-47362.herokuapp.com/cartitems"
    );
    console.log({ updatedCart });
    console.log("updating cart");

    dispatch({
      type: "UPDATE-LOCAL-CART",
      payload: updatedCart.data.cartItems,
    });
  };
  const cartProductTrackUpdater = (id) => {
    console.log("entered cartProdcutTrackUpdater");
    dispatch({
      type: "REMOVE-FROM-CART-TRACK",
      payload: id,
    });
  };

  const wishListUpdater = async () => {
    const updatedWishList = await axios.get(
      "https://secret-gorge-47362.herokuapp.com/wishlists/6081a05c0058b464caf45b1a"
    );
    // console.log({ updatedWishList });
    console.log("updating wishlist");

    dispatch({
      type: "UPDATE-LOCAL-WISHLIST",
      payload: updatedWishList.data.wishListItem,
    });
  };

  const serverOperations = async ({ buttonAction, payload }) => {
    console.log("clicked");
    console.log(buttonAction, payload);
    switch (buttonAction) {
      case "ADD-TO-CART-SERVER":
        console.log("adding to cart", payload);
        const cartServerResponse = await axios.post(
          "https://secret-gorge-47362.herokuapp.com/cartitems",
          { ...payload, quantity: payload.quantity + 1 }
        );
        console.log({ cartServerResponse });

        dispatch({
          type: "ADDING-TO-LOCAL-CART-FROM-SERVER-RESPONSE",
          payload: cartServerResponse.data.responseDb,
        });

        cartUpdater();
        toastCreator("Added to Cart", true);
        break;

      case "REMOVE-FROM-CART":
        console.log("clicked remove button");
        console.log(payload);
        const cartDeleteServerResponse = await axios.delete(
          `https://secret-gorge-47362.herokuapp.com/cartitems/${payload._id}`
        );
        cartProductTrackUpdater(payload._id);
        // console.log(cartDeleteServerResponse);
        cartUpdater();
        toastCreator("Removed from Cart", true);

        break;

      case "INCREASE-QUANTITY-FROM-CART":
        console.log("entered increment");
        console.log("payload id for incre", payload._id);
        const itemToBeIncremented = state.cartList.filter((item) => {
          return item._id === payload._id;
        });
        console.log("filtered itemupdate", itemToBeIncremented);

        const latestCartItemQuantityValueForIncrement = await axios.post(
          `https://secret-gorge-47362.herokuapp.com/cartitems/${payload._id}`,
          { quantity: itemToBeIncremented[0].quantity + 1 }
        );
        console.log({ latestCartItemQuantityValueForIncrement });

        cartUpdater();
        break;

      case "DECREASE-QUANTITY-FROM-CART":
        const itemToBeDecremented = state.cartList.filter((item) => {
          return item._id === payload._id;
        });
        console.log("filtered itemupdate", itemToBeDecremented);

        if (itemToBeDecremented[0].quantity > 1) {
          const latestCartItemQuantityValueForIncrement = await axios.post(
            `https://secret-gorge-47362.herokuapp.com/cartitems/${payload._id}`,
            { quantity: itemToBeDecremented[0].quantity - 1 }
          );
          console.log({ latestCartItemQuantityValueForIncrement });
          cartUpdater();
        }

        break;

      case "ADD-TO-WISHLIST":
        const wishListServerResponse = await axios.post(
          "https://secret-gorge-47362.herokuapp.com/wishlists/6081a05c0058b464caf45b1a",
          {
            productId: [{ _id: payload._id }],
          }
        );
        console.log({ wishListServerResponse });
        dispatch({
          type: "ADDING-TO-LOCAL-WISHLIST-FROM-SERVER-RESPONSE",
          payload: wishListServerResponse.data.updatedWishListItem.productId,
        });
        toastCreator("Added to Wishlist", true);

        break;

      case "REMOVE-FROM-WISHLIST":
        console.log("remove from wishlist", payload);
        const wishListDeleteServerResponse = await axios.delete(
          `https://secret-gorge-47362.herokuapp.com/wishlists/6081a05c0058b464caf45b1a/${payload._id}`
        );
        wishListUpdater();
        toastCreator("Removed From Wishlist", true);

        break;

      default:
        break;
    }

    // console.log(cartServerResponse);
  };

  useEffect(() => {
    productDataFetch();
    cartUpdater();
    wishListUpdater();
  }, []);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        serverOperations,
        toast,
        toastMessage,
        toastCreator,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
