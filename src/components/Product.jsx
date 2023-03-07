import React from 'react';
import Rating from './Rating';
import {Link,useParams } from "react-router-dom";
const Product = ({ product }) => {

    return (
        <div className="card my-3 p-3 rounder" style={{ height:"100%"}}>
            <Link to={`/product/${product._id}`}>
                <img className="card-img" src={product.image} />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <div className="card-title">
                        {product.name}
                    </div>
                </Link>
                <div className="my-3">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>
                <h3>{product.price}$</h3>
            </div>
        </div>
    )
}

export default Product