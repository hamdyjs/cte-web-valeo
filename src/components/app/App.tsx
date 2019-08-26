import React from 'react';
import './App.css';

import Tracer from "../Tracer";

const App: React.FC = () => {
    return (
        <div id="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                {/*<button type="button" className="btn btn-primary"*/}
                {/*        onClick={(e) => $("#wrapper").toggleClass("toggled")}>*/}
                {/*    <i className="fa fa-bars"></i>*/}
                {/*</button>*/}

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="index.html" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                CTE Web Interface
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/tracer">Signal Tracer</a>
                                {/*<a className="dropdown-item" href="index.html">Another action</a>*/}
                                {/*<div className="dropdown-divider"></div>*/}
                                {/*<a className="dropdown-item" href="index.html">Something else here</a>*/}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="d-flex" id="wrapper">
                <Tracer/>
            </div>
        </div>
    );
};

export default App;
