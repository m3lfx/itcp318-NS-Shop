import React, { useState, useEffect } from 'react'

import '../../App.css'

import { Link, useNavigate } from 'react-router-dom'
import Search from './Search'
import { getUser, logout } from '../Utils/helpers'
import { toast } from 'react-toastify'



const Header = ({cartItems}) => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const logoutHandler = () => {
        logout(navigate('/'));

        toast.success('log out', {
            position: 'bottom-right'
        });
    }

    useEffect(() => {
        setUser(getUser())
    }, []);


    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="./images/shopit_logo.png" />
                        </Link>

                    </div>
                </div>
                <Search />
                {/* <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>
                    <Link to="/cart" style={{ textDecoration: 'none' }} >


                        <span className="ml-1" id="cart_count">2</span>
                    </Link>
                </div> */}

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                    {user ? (<div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <figure className="avatar avatar-nav">
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>

                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            {user && user.role === 'admin' && (
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                            )}
                            <Link className="dropdown-item" to="/orders/me">Orders</Link>
                            <Link className="dropdown-item" to="/me">Profile</Link>

                            <Link
                                className="dropdown-item text-danger" to="/" onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>) : <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>

                        {/* <span className="ml-1" id="cart_count">2</span> */}

                        <span className="ml-1" id="cart_count">{cartItems ? cartItems.length : null}</span>
                    </Link>
                </div>

            </nav>
        </>
    )
}

export default Header