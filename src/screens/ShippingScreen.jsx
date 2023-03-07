import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux-toolkit/reducers/cartReducer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, country, postalCode }))
        if(address === "" || city ==="" || country ==="" || postalCode === ""){
            alert('You must fill all the fields')
        }else{
            navigate("/payment")
        }
    }
    return (
        <FormContainer>
            <div className="mt-3 mb-3">
                <CheckoutSteps step={2}/>
            </div>

            <h1>Shipping</h1>
            <form onSubmit={submitHandler} action="">
                <div className="form-group">
                    <label htmlFor="address">address</label>
                    <input required id='address' name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">city</label>
                    <input required id='city' name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">postalCode</label>
                    <input required id='postalCode' name="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter your postalCode" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="country">country</label>
                    <input required id='country' name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" className="form-control" />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary mt-4">Continue</button>
                </div>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen