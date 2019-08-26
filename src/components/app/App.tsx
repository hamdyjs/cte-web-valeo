import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import './App.css';

import Nav from "../Nav";
import Tracer from "../Tracer";
import Error404 from "../Error404";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div id="container">
                <Nav />
                <div className="d-flex" id="wrapper">
                    <Switch>
                        <Route path="/tracer" component={Tracer} />
                        <Redirect exact path="/" to="/tracer" />
                        <Route component={Error404} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
