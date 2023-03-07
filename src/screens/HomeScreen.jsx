import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import {ThreeDots} from  'react-loader-spinner'
//redux
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { listProducts } from '../redux-toolkit/reducers/productReducer';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';


const HomeScreen = () => {
    let {keyword} = useParams();
    let { pageNumber } = useParams();
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productsList)
    const { loading, error, products, page, pages } = productsList

    useEffect(() => {
        dispatch(listProducts({keyword, pageNumber}))
    }, [dispatch, keyword, pageNumber])



    return (
        <div className="container">
                        <Meta />

                        {!keyword && <><div className="mt-3"><ProductCarousel /></div></>}

            <h1>Latest Products</h1>
            {loading 
            ? <ThreeDots wrapperStyle={{justifyContent: 'center'}} /> 
            : error 
            ? (<Message variant="danger">{error}</Message>) :
            <>
            <div className="row">
                {products.map(product => {
                    return (
                        <div key={product._id} className="col-md-4">
                            <Product product={product} />
                        </div>
                    )

                })}
            </div>
            <div className="mt-5">
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
            </div>
        </>

            }

        </div>
    )
}

export default HomeScreen