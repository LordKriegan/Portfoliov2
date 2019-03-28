import React from 'react';
import { Link } from 'react-router-dom'
function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="#">Qamar A. Stationwala</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className={((window.location.pathname === "/") || (window.location.pathname === "/home")) ? "nav-link active" : "nav-link"} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={window.location.pathname === "/portfolio" ? "nav-link active" : "nav-link"} to="/portfolio">Portfolio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"} to="/contact">Contact Me</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;