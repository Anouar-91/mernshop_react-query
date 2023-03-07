import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../redux-toolkit/reducers/orderReducer';

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo ])

    return (
        <>
            <h1>Orders</h1>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">ID</th>
                            <th scope="col">USER</th>
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
                                <td scope="row">{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)} </td>
                                <td>{order.totalPrice} </td>
                                <td>{order.isPaid ?
                                (order.paidAt.substring(0,10))
                                : (<i className="fa-solid fa-xmark"></i>)}
                                </td>
                  
                                <td>{order.isDelivered ?
                                (order.deliveredAt.substring(0,10))
                                : (<i className="fa-solid fa-xmark"></i>)}
                                </td>
                  
                                <td>
                                    <Link  className="btn btn-sm btn-light" to={`/order/${order._id}`}>Details</Link> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default OrderListScreen