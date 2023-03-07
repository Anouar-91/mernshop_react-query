import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../redux-toolkit/reducers/userReducer';
import FormContainer from '../components/FormContainer';


const LoginScreen = ({ }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let location = useLocation();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {loading , error, userInfo} = userLogin;
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(login({email, password}))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [dispatch, userInfo, redirect])
    return (
        <div>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant="danger">{error}</Message> }
                {loading && <Loader/>}
                <form onSubmit={submitHandler} action="" className="mt-4">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id='email' name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id='password' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="form-control" />
                    </div>
                    <button className="btn btn-primary mt-3">Sign in</button>
                </form>
                <div className="row mt-3">
                    <div className="col">
                        New customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default LoginScreen