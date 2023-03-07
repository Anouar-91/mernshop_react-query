import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step }) => {
    return (
        <nav className="nav nav-pills nav-fill">
            <Link className={`nav-link ${step === 1 ? "active" : ""}` } aria-current="page" to="/login">Sign In</Link>
            <Link className={`nav-link ${step === 2 && "active"} ${step < 2 && "disabled"}` }  to="/shipping">Shipping</Link>
            <Link className={`nav-link ${step === 3 && "active"} ${step < 3 && "disabled"}` }  to="/payment">Payment</Link>
            <Link className={`nav-link ${step === 4 && "active"} ${step < 4 && "disabled"}` }  to="/payment" >Place order</Link>
        </nav>
    )
}

export default CheckoutSteps