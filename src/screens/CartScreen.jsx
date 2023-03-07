import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { addCart, removeFromCart } from '../redux-toolkit/actions/cartActions';

const CartScreen = ({ }) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [queryParameters] = useSearchParams();
  const qty = queryParameters.get("qty") ? Number(queryParameters.get("qty")) : 1;
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/shipping')
    
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  useEffect(() => {
    if (id) {
      dispatch(addCart(id, qty))
    }
  }, [dispatch, id, qty])
  return (
    <div className="container">
    <div className="row mt-3">
      <div className="col-md-8">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go back</Link></Message>
          : (
            <ul className="list-unstyled" >
              {cartItems.map((item) => {
                return (
                  <li key={item.product}>
                    <div className="row">
                      <div className="col-md-2"><img src={item.image} alt={item.name} className="img-fluid rounded" /></div>
                      <div className="col-md-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-md-2">{item.price}$</div>
                      <div className="col-md-2">
                        <select className="form-select" value={item.qty} onChange={(e) => dispatch(addCart(item.product, Number(e.target.value)))} >
                          {
                            [...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-light" onClick={() => removeFromCartHandler(item.product)}><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </div>
                  </li>
                )

              })}

            </ul>
          )

        }
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <ul className="list-unstyled" >
            <li>
              <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0 )}) items</h4>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </li>
            <hr />
            <li>
              <button className="btn btn-block btn-dark" disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>Proceed to checkout</button>
            </li>
          </ul>
        </div>
      </div>
    
    </div>
    </div>

  )
}

export default CartScreen