import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import Message from '../components/Message';
import { useNavigate } from "react-router-dom";
import { createProductReview, detailProduct, resetProductCreate, resetProductCreateReview } from '../redux-toolkit/reducers/productReducer';
import Meta from '../components/Meta';

const ProductScreen = () => {
    let { id } = useParams();
    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail)
    const { product, loading, error } = productDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productCreateReview = useSelector(state => state.productCreateReview)
    const { success: successProductReview, error: errorProductReview } = productCreateReview;

    const [qty, setQty] = useState();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview({
            id, 
            review:{
                rating,
                comment
            }
            }
        ))
    }

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    useEffect(() => {
        dispatch(resetProductCreateReview())
        if(successProductReview){
            alert('Review Submited !')
            setRating(0);
            setComment("")
            dispatch(resetProductCreateReview())
        }
        dispatch(detailProduct(id))
    }, [id, dispatch,successProductReview ])

    return (
        <>
            <Link to={"/"} className="btn btn-light my-3">Retour</Link>
            {loading
                ? <ThreeDots wrapperStyle={{ justifyContent: 'center' }} />
                : error ? <Message variant='danger'>{error}</Message> : (
                    <>
                     <Meta title={product.name} />

                        <div className="row ">
                            <div className="col-md-6 mt-3">
                                <img  className='img-fluid' src={product.image} alt="produit" />
                            </div>
                            <div className="col-md-3 mt-3">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <h4>{product.name}</h4>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <h4>Price : {product.price}$</h4>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Description : {product.description}
                                    </li>

                                </ul>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="row">
                                                <div className="col">
                                                    Price:
                                                </div>
                                                <div className="col">
                                                    <strong>{product.price}$</strong>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="row">
                                                <div className="col">
                                                    Status:
                                                </div>
                                                <div className="col">
                                                    <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                                </div>
                                            </div>
                                        </li>
                                        {product.countInStock > 0 && (
                                            <li className="list-group-item d-flex justify-content-center align-items-center ">
                                                <div className="row">
                                                    <div className="col">Qty</div>
                                                    <div className="col">
                                                        <select className="form-select" value={qty} onChange={(e) => setQty(e.target.value)} >
                                                            <option selected>Open this select menu</option>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                        <li className="list-group-item d-flex justify-content-center align-items-center ">
                                            <button onClick={() => addToCartHandler()} disabled={product.countInStock === 0 || isNaN(qty)} className="btn btn-primary">Add to cart</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 && <Message>No reviews</Message>}
                                <ul className="list-group">
                                    {product.reviews.map(review => (
                                        <li key={review._id} className="list-group-item">
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </li>
                                    ))}
                                    <li className="list-group-item">
                                        <h2>Write a Customer Review</h2>
                                        {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                        {userInfo ? (
                                            <form onSubmit={submitHandler}>
                                                <select required className="form-select mb-3" aria-label="Default select example" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value="" >Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </select>
                                                <div className="form-floating mb-2">
                                                    <textarea required className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{"height": 100}} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                                    <label htmlFor="floatingTextarea2">Comments</label>
                                                </div>
                                                <button className="btn btn-sm btn-primary">Submit</button>
                                            </form>
                                        )
                                            : <Message>Please <Link to="/login">Sign in</Link> to write a review</Message>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}
export default ProductScreen