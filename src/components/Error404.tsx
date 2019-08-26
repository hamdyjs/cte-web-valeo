import React from "react";

const Error404: React.FC = () => {
    return (
        <div style={{margin: "20px"}}>
            <h1>Error 404 - Page not found</h1>
            <p>{window.location.pathname} doesn't exist, please use the above navigation bar</p>
        </div>
    );
};

export default Error404;