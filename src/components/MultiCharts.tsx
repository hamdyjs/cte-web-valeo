import React from "react";
import Signal from "../classes/Signal";

const MultiCharts: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    return (
        <div>
            {
                signals.map((signal, i) => (
                    <div className="card mt-1">
                        <div className="card-header"><b>{signal.name}</b></div>
                        <div className="card-body">
                            <canvas id={signal.name} width="200" height="50" style={{display: "none"}} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MultiCharts;