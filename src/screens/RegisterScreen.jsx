import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../redux-toolkit/reducers/userReducer';
import FormContainer from '../components/FormContainer';


const RegisterScreen = ({ }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    let location = useLocation();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {loading , error, userInfo} = userRegister;
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            setMessage("Password do not match")
        }else{
            dispatch(register({name, email, password}))
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
                <h1>Sign Up</h1>
                {error && <Message variant="danger">{error}</Message> }
                {message && <Message variant="danger">{message}</Message> }
                {loading && <Loader/>}
                <form onSubmit={submitHandler} action="" className="mt-4">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id='name' name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id='email' name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id='password' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm password</label>
                        <input id='confirm' name="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="form-control" />
                    </div>
                    <button className="btn btn-primary mt-3">Register</button>
                </form>
                <div className="row mt-3">
                    <div className="col">
                        Already have account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </div>
                </div>
            </FormContainer>
        </div>
    )
}

export default RegisterScreen