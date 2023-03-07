import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../redux-toolkit/reducers/cartReducer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const navigate = useNavigate();

    if (!shippingAddress) {
        navigate('/shipping')
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod === "Stripe") {
            alert("This payment method is not available now.")
        } else {
            dispatch(savePaymentMethod(paymentMethod))
            navigate("/placeorder")
        }

    }
    return (
        <>
            <div className="mt-3 mb-3">
                <CheckoutSteps step={3} />
            </div>
            <FormContainer>

                <h1>Payment Method</h1>
                <form onSubmit={submitHandler} action="">
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Select Method</label>
                    </div>
                    <select className="form-select" aria-label="Default select example" onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="Paypal">Paypal</option>
                        <option value="Stripe">Stripe</option>
                    </select>
                    <div className="text-center">
                        <button className="btn btn-primary mt-4">Continue</button>
                    </div>
                </form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen