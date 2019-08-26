import React from 'react';
import './App.css';

import Nav from "../Nav";
import Tracer from "../Tracer";

const App: React.FC = () => {
    return (
        <div id="container">
            <Nav/>
            <div className="d-flex" id="wrapper">
                <Tracer/>
            </div>
        </div>
    );
};

export default App;
