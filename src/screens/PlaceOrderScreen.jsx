import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder, resetOrderCreate } from '../redux-toolkit/reducers/orderReducer';
const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart)
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //calculate prices 
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }


  let itemsPrice = addDecimals(cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0
  ))

  let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
  let taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
  let totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  useEffect(() => {
    if (success) {
      dispatch(resetOrderCreate());
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success, cart])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice
    }))
  }
  return (
    <>
      <div className="mt-3">
        <CheckoutSteps step={4} />
        <div className="row mt-5">

          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">
                <h3>Shipping</h3>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>

              </li>
              <li className="list-group-item">
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>

              </li>
              <li className="list-group-item">
                <h3>Order items</h3>
                {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                  <ul className="list-group">
                    {cart.cartItems.map((item, index) => (
                      <li key={index} className="list-group-item">
                        <div className="row">
                          <div className="col md-1">
                            <img src={item.image} alt={item.name} className="img-fluid rounded w-50" />
                          </div>
                          <div className="col">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-4">
                            {item.qty} X ${item.price} = ${item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}

                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card">
              <ul className="list-group">
                <li className="list-group-item">
                  <h3>Order Summary</h3>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Items
                    </div>
                    <div className="col">${itemsPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Shipping
                    </div>
                    <div className="col">${shippingPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Tax
                    </div>
                    <div className="col">${taxPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Total
                    </div>
                    <div className="col">${totalPrice}</div>
                  </div>
                </li>
                <li className="list-group-item text-center">
                  {error && <Message variant="danger">{error}</Message>}
                </li>
                <li className="list-group-item text-center">
                  <button className="btn btn-primary" disabled={cart.cartItems === 0} onClick={() => placeOrderHandler()}>Place order</button>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen