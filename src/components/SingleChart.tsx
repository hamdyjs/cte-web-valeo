import React from "react";
import Signal from "../classes/Signal";

const SingleChart: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    return (
        <div>
        {
            signals.length > 0 &&
            (
                <div className="card mt-1">
                    <div className="card-header"><b>{signals.map((signal) => signal.name).join(", ")}</b></div>
                    <div className="card-body">
                        <canvas id="single-chart" width="200" height="50" style={{display: "none"}} />
                    </div>
                </div>
            )
        }
        </div>
    );
};

export default SingleChart;