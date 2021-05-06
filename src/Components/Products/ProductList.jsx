import "./ProductList.css";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const { state, serverOperations, dispatch } = useCart();

  const sortingData = (productList, sortMethod) => {
    console.log(productList, sortMethod);
    if (sortMethod && sortMethod === "LOW-TO-HIGH") {
      return productList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortMethod && sortMethod === "HIGH-TO-LOW") {
      return productList.sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      return productList;
    }
  };

  const filteringData = (
    sortedData,
    listFastDelivery,
    listAllItems,
    maxPrice
  ) => {
    return sortedData
      .filter((item) => {
        return listFastDelivery ? item.fastDelivery : true;
      })
      .filter((item) => {
        return listAllItems ? true : item.inStock;
      })
      .filter((item) => {
        return maxPrice ? item.price <= parseInt(maxPrice) : true;
      });
  };

  const sortedData = sortingData(state.products, state.sort);
  const filteredData = filteringData(
    sortedData,
    state.fastDelivery,
    state.showOutOfStock,
    state.priceRange
  );

  // const minRange = sortingData(state.products, "LOW-TO-HIGH");

  // const maxRange = sortingData(state.products, "HIGH-TO-LOW");

  // const newg = maxRange[0];
  // console.log(Object.keys(newg));
  console.log({ sortedData });
  console.log({ filteredData });
  return (
    <div className="ProductList-Container">
      <div className="filter-container">
        <fieldset className="filter-fieldset-container">
          <legend>Sort By</legend>
          <input
            type="radio"
            name="sorting"
            value="low-to-high"
            onClick={() => {
              dispatch({ type: "SORTING", payload: "LOW-TO-HIGH" });
            }}
            checked={state.sort && state.sort === "LOW-TO-HIGH"}
          />
          <label htmlFor="low-to-high">Price: Low to High</label>
          <input
            type="radio"
            name="sorting"
            value="High-to-low"
            onClick={() => {
              dispatch({ type: "SORTING", payload: "HIGH-TO-LOW" });
            }}
            checked={state.sort && state.sort === "HIGH-TO-LOW"}
          />
          <label htmlFor="high-to-low">Price: High to low</label>
        </fieldset>
        <fieldset className="filter-fieldset-container">
          <legend>Filter By</legend>
          <input
            type="checkbox"
            name="include-out-of-stock"
            value="include-out-of-stock"
            checked={state.showOutOfStock}
            onClick={() => {
              dispatch({
                type: "INCLUDE-OUT-OF-STOCK",
                payload: !state.showOutOfStock,
              });
            }}
          />
          <label htmlFor="include-out-of-stock">Include out of stock</label>
          <br></br>
          <input
            type="checkbox"
            name="FastDelivery"
            value="FastDelivery"
            checked={state.fastDelivery}
            onClick={() => {
              dispatch({ type: "FAST-DELIVERY", payload: !state.fastDelivery });
            }}
          />
          <label htmlFor="FastDelivery">Fast Delivery</label>
          <br></br>
          <input
            type="range"
            min="1"
            max="1000"
            defaultValue={state.priceRange === null ? 500 : 100}
            onChange={(event) =>
              dispatch({ type: "PRICE-RANGE", payload: event.target.value })
            }
          />
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
          >
            Reset All
          </button>
        </fieldset>
      </div>
      <div className="product-list-wrapper">
        {filteredData.map((item) => {
          return (
            <div className="parent-card-container" key={item._id}>
              <div className="card">
                <Link to={`/productdetail/${item._id}`}>
                  <img
                    className="card-image-responsive"
                    src={item.image}
                    alt="image"
                  />
                </Link>

                <h3 className="card-heading">{item.name}</h3>
                <div className="card-pricing">
                  <span className="card-product-currentprice">
                    Rs:{item.price}
                  </span>
                  <span className="card-product-originalprice">Rs:1200</span>
                  <span className="card-prodcut-discount">60% Off</span>
                </div>

                <div className="card-rating">
                  <button className="badge-rating">
                    <span className="rating-badge">4.3</span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                  </button>
                </div>

                {state.wishListProductTrack.includes(item._id) ? (
                  <span
                    class="material-icons color-red like-location"
                    onClick={() => {
                      serverOperations({
                        buttonAction: "REMOVE-FROM-WISHLIST",
                        payload: item,
                      });
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      serverOperations({
                        buttonAction: "ADD-TO-WISHLIST",

                        payload: { ...item },
                      });
                    }}
                    class="material-icons like-location"
                  >
                    favorite_border
                  </span>
                )}
                <div className="product-detail-bottom-container">
                  <span>
                    {item.fastDelivery ? "Fast Delivery" : "No Fast Delivery"}
                  </span>
                  <span>{item.inStock ? "In Stock" : "Out of stock"}</span>
                  {/* <Link to={`/productdetail/${item._id}`}>View Details</Link> */}
                </div>

                <div className="card-button-container">
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
                      className="button-primary-one"
                      onClick={() => {
                        serverOperations({
                          buttonAction: "ADD-TO-CART-SERVER",

                          payload: { ...item },
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
