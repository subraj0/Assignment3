import React from 'react';
import { Link } from 'react-router-dom';
import '../Menu.css'; // Import the CSS file

const Menu = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className="navbar">
            <ul className="navList">
                <li className="navItem">
                    <Link to="/" className="navLink">
                        <button className="navButton">Home</button>
                    </Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="navItem">
                            <Link to="/profile" className="navLink">
                                <button className="navButton">Profile</button>
                            </Link>
                        </li>
                        <li className="navItem">
                            <button className="logoutButton" onClick={onLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navItem">
                            <Link to="/register" className="navLink">
                                <button className="navButton">Register</button>
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/login" className="navLink">
                                <button className="navButton">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
