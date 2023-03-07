import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { ThreeDots } from "react-loader-spinner";
//redux
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { listProducts } from "../redux-toolkit/reducers/productReducer";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useQuery } from "react-query";
import axios from "axios";

const HomeScreen = () => {
  let { keyword } = useParams();
  let { pageNumber } = useParams();
  //const dispatch = useDispatch();
  //const productsList = useSelector(state => state.productsList)
  //const { loading, error, products, page, pages } = productsList

  /*     useEffect(() => {
        dispatch(listProducts({keyword, pageNumber}))
    }, [dispatch, keyword, pageNumber]) */

  const fetchProducts = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL +
        "products?keyword=" +
        keyword +
        "&pageNumber=" +
        pageNumber
    );
    return data;
  };
  //react query
  const { isLoading, error, data } = useQuery("productAll", () =>
    fetch(process.env.REACT_APP_API_URL + 'products').then((res) => res.json())
  );
  console.log(data);
  //end

  return (
    <div className="container">
      <Meta />

      {/*                {!keyword && <><div className="mt-3"><ProductCarousel /></div></>} */}

      <h1>Latest Products</h1>
      {isLoading ? (
        <ThreeDots wrapperStyle={{ justifyContent: "center" }} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            {data.products.map((product) => {
              return (
                <div key={product._id} className="col-md-4">
                  <Product product={product} />
                </div>
              );
            })}
          </div>
{/*           <div className="mt-5">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </div> */}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
