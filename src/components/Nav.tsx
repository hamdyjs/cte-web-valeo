import React from "react";
import {Link} from "react-router-dom";

const Nav: React.FC = () => {
    let pages = [
        {path: "tracer", name: "Tracer"},
    ];

    return (
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
                            {pages.map((page, i) => <Link key={i} className="dropdown-item" to={page.path}>{page.name}</Link>)}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;