import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { useCart } from "../../Contexts/ProductConetxt/CartContextProvider";

export function ProductDetail() {
  const { productId } = useParams();
  const { state, serverOperations } = useCart();

  const productDetail = state.products.find((item) => item._id === productId);

  return (
    <div class="small-container single-product">
      <div class="row">
        <div class="col-2">
          <img class="product-detail-image" src={productDetail?.image} />
        </div>
        <div class="col-2">
          <h2>{productDetail?.name}</h2>
          <div className="card-pricing">
            <span className="card-product-currentprice">
              Rs:{productDetail?.price}
            </span>
            <span className="card-product-originalprice">Rs:1200</span>
            <span className="card-prodcut-discount">60% Off</span>
          </div>
          <div className="productdetail-button-row">
            {state.cartListProductTrack.includes(productDetail?._id) ? (
              <button
                className="button-secondary-one pd-1 mg-half"
                style={{ cursor: "not-allowed" }}
                disabled
              >
                In Cart
              </button>
            ) : (
              <button
                className="button-primary-one pd-1 mg-half"
                onClick={() => {
                  serverOperations({
                    buttonAction: "ADD-TO-CART-SERVER",

                    payload: { ...productDetail },
                  });
                }}
              >
                Add to Cart
              </button>
            )}

            {state.wishListProductTrack.includes(productDetail._id) ? (
              <button
                className="button-secondary-one pd-1 mg-half"
                style={{ cursor: "not-allowed" }}
                disabled
              >
                In WishList
              </button>
            ) : (
              <button
                className="button-primary-one pd-1 mg-half"
                onClick={() => {
                  serverOperations({
                    buttonAction: "ADD-TO-WISHLIST",
                    payload: productDetail,
                  });
                }}
              >
                To Wishlist
              </button>
            )}
          </div>

          {/* <button class="button-primary-one">Add to cart</button> */}
          <h3>Product details</h3>
          <br />
          <p>
            This basic book on Indian Share market will help those who are
            looking to start investing in the Indian stock market..This is
            written in a simple, easy to understand language to help grasp the
            basics of the share markets and lead a profitable journey of
            investing
          </p>
        </div>
      </div>
    </div>

    // <div className="product-detail-container">
    //   <div className="product-image-container">
    //     <img src={productDetail?.image} class="product-detail-image" />
    //   </div>
    //   <div className="product-description-container">
    //     <h2>{productDetail?.name}</h2>
    //     <span>Price:Rs{productDetail?.price}</span>

    //     <p>
    //       Availability:
    //       {productDetail?.inStock ? "Available" : "Currently Out of stock"}
    //     </p>
    //     <p className="card-description">
    //       printer took a galley of type and scrambled it to make a type specimen
    //       book. s of Lorem Ipsum
    //     </p>
    //     <div>
    //       {state.cartListProductTrack.includes(productDetail?._id) ? (
    //         <button
    //           className="button-secondary-one"
    //           style={{ cursor: "not-allowed" }}
    //           disabled
    //         >
    //           In Cart
    //         </button>
    //       ) : (
    //         <button
    //           className="button-primary-one"
    //           onClick={() => {
    //             serverOperations({
    //               buttonAction: "ADD-TO-CART-SERVER",

    //               payload: { ...productDetail },
    //             });
    //           }}
    //         >
    //           Add to Cart
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
