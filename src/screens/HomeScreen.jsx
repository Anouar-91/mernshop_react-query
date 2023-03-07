import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { ThreeDots } from "react-loader-spinner";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useQuery, useQueryClient } from "react-query";

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  let { keyword } = useParams();
  const fetchProducts = (page = 0, keyword = "") =>
    fetch(
      process.env.REACT_APP_API_URL +
        "products/react-query/?" +
        "page=" +
        page +
        "&keyword=" +
        keyword
    ).then((res) => res.json());

  const { isLoading, status, data, error, isFetching, isPreviousData } =
    useQuery(["products", page, keyword], () => fetchProducts(page, keyword), {
      keepPreviousData: true,
    });

  useEffect(() => {
    // Vérifie si l'objet data a une propriété "hasMore" qui est vraie
    if (data?.hasMore) {
      // Précharge les données de la page suivante en utilisant la méthode prefetchQuery du queryClient
      // La clé pour cette requête est un tableau qui contient "products" et la page suivante
      // La fonction fetchProducts est utilisée pour effectuer la requête
      queryClient.prefetchQuery(
        ["productsNext", page + 1],
        () => fetchProducts(page + 1),
        keyword
      );
    }
  }, [data, page, queryClient, keyword]);

  return (
    <div className="container">
      <Meta />

      {!keyword && (
        <>
          <div className="mt-3">
            <ProductCarousel />
          </div>
        </>
      )}

      <h1>
        Latest Products{" "}
        {isFetching && (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </h1>
      {isLoading ? (
        <ThreeDots wrapperStyle={{ justifyContent: "center" }} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            {data.productsForPage.map((product) => {
              return (
                <div key={product._id} className="col-md-4">
                  <Product product={product} />
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <span>Current Page: {page + 1}</span>
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
              class="btn btn-warning"
            >
              Previous Page
            </button>{" "}
            <button
              onClick={() => {
                if (!isPreviousData && data.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPreviousData || !data?.hasMore}
              class="btn btn-primary"
            >
              Next Page
            </button>
            {isFetching ? <span> Loading...</span> : null}{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
