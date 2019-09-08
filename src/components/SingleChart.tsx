import React from "react";
import Signal from "../classes/Signal";

// TODO: Implement single charts
// TODO: Normalize readings by dividing on the max value received
// TODO: Show actual value of reading in tooltip
// TODO: Provide multi y-axes for each signal

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