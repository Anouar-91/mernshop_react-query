import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, listUsers } from '../redux-toolkit/reducers/userReducer';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, successDelete, userInfo])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteUser(id))
        }
    }


    return (
        <>
            <h1>Users</h1>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">ADMIN</th>
                            <th className="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td scope="row">{user._id}</td>
                                <td>{user.name}</td>
                                <td> <a href={`mailot:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className="fa-solid fa-check text-success"></i> : <i className="fa-solid fa-xmark text-danger"></i>}</td>
                                <td>
                                    <Link className="btn btn-sm btn-warning" to={`/admin/user/${user._id}/edit`}><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(user._id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UserListScreen