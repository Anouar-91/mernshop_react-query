import { fetchProductById } from '../reducers/cartReducer';
import { removeFromCartById } from '../reducers/cartReducer';

export const addCart = (id, qty) => async (dispatch, getState) => {
    const product = { id, qty }
    await dispatch(fetchProductById(product))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    await dispatch(removeFromCartById(id))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}