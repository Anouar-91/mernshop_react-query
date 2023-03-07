import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux-toolkit/reducers/userReducer';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {

  }, [userInfo, dispatch])
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <SearchBox />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <ul className="navbar-nav d-flex">
            <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              {userInfo ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{userInfo.name}</a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={() => logoutHandler()} >Logout</a>
                  </div>
                </li>
              )
                : (
                  <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Sign in</Link>
                  </li>
                )}
                              {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">ADMIN</a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/admin/userlist">Users</Link>
                    <Link className="dropdown-item" to="/admin/productlist">Products</Link>
                    <Link className="dropdown-item" to="/admin/orderlist">Orders</Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header