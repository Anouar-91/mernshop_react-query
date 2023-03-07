import react, { useEffect } from "react";
import Loader from "./Loader";
import Message from "./Message";
import { useQuery } from "react-query";
const ProductCarousel = () => {
  const fetchProductsTop = () =>
    fetch(process.env.REACT_APP_API_URL + "products/top").then((res) =>
      res.json()
    );
  const { isLoading, data:products, error } = useQuery(
    ["productsTop"],
    () => fetchProductsTop(),
    {}
  );

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={"danger"}>{error}</Message>
  ) : (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {products.map((product, key) => {
          return (
            <div class={key == 0 ? "active carousel-item" : "carousel-item"}>
              <img src={product.image} className="d-block" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h2>{product.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProductCarousel;
