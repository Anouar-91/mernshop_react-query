import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {getUserDetails, updateUserProfile, reset, update} from '../redux-toolkit/reducers/userReducer'
import { listMyOrders } from '../redux-toolkit/reducers/orderReducer';


const ProfileScreen = ({ }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    let location = useLocation();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading , error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    const {userInfo} = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            setMessage("Password do not match")
        }else{
            dispatch(updateUserProfile({id:user._id, name, email, password}))
        }
    }

    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }else{
            dispatch(listMyOrders())
            if(!user || !user.name || success || userInfo._id != user._id  ){
                dispatch(reset())
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <FormContainer>
                        <h2>USER PROFILE</h2>
                        {error && <Message variant="danger">{error}</Message>}
                        {message && <Message variant="danger">{message}</Message>}
                        {success && <Message variant="success">Profile updated</Message>}
                        {loading && <Loader />}
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
                            <button className="btn btn-primary mt-3">Update</button>
                        </form>

                    </FormContainer>
                </div>
                <div className="col-md-8">
                    <h2>MY ORDERS</h2>
                    {loadingOrders ? <Loader /> : errorOrders ? (<Message variant="danger">{errorOrders}</Message>) : (
                        <table className="table table-hover">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">ID</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">PAID</th>
                                    <th scope="col">DELIVERED</th>
                                    <th className="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <th scope="row">{order._id}</th>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10) : <i className="fa-solid fa-xmark text-danger"></i>} </td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <i className="fa-solid fa-xmark text-danger"></i>} </td>
                                        <td><Link to={"/order/" + order._id}><button className="btn btn-light">Details</button> </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

        </div>
    )
}

export default ProfileScreen