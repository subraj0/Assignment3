import React from 'react';
import { Link } from 'react-router-dom';
import "../HomePage.css"

const HomePage = ({ isLoggedIn }) => {
    return (
        <div className="homepage">
            <header>
                <p style={{ color: 'black' }}>Welcome to my (somewhat) secure website.</p>
            </header>
            <main className="homepage-content">
                <div className="button-container">
                    {/* Conditionally render buttons based on isLoggedIn */}
                    {!isLoggedIn && (
                        <>
                            <Link to="/register" className="cta-button">
                                Register
                            </Link>
                            <Link to="/login" className="cta-button">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </main>
            <footer className="homepage-footer">
                <p>&copy; {new Date().getFullYear()} Subrajit Surendran. Assignment 3.</p>
            </footer>
        </div>
    );
};

export default HomePage;
