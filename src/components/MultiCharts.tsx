import React, {useEffect} from "react";
import Signal from "../classes/Signal";
import Chart from "chart.js";

let charts: {[s: string]: Chart} = {};

const MultiCharts: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    useEffect(() => {
        for (let signal of signals) {
            if (charts[signal.name]) charts[signal.name].destroy();

            // Value text map
            let scales: Chart.ChartScales = {};
            if (signal.valueTextMap) {
                scales.yAxes = [{
                    ticks: {
                        min: 0,
                        max: Object.keys(signal.valueTextMap).length - 1,
                        callback: (label) => signal.valueTextMap ? signal.valueTextMap[label]: label,
                    },
                }];
            }

            charts[signal.name] = new Chart(signal.name, {
                type: "line",
                options: {
                    maintainAspectRatio: false,
                    animation: undefined,
                    scales,
                },
                data: {
                    labels: signal.readings.map((reading) => reading.timestamp.toString()),
                    datasets: [{
                        data: signal.readings.map((reading) => reading.value),
                        fill: false,
                        borderColor: "rgb(255, 0, 0)",
                        label: signal.unit || "",
                    }],
                },
            });
        }
    }, [signals]);

    return (
        <div>
            {
                signals.map((signal, i) => (
                    <div className="card mt-1" key={i}>
                        <div className="card-header"><b>{signal.name}</b></div>
                        <div className="card-body">
                            <canvas id={signal.name} width="150" height="300" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MultiCharts;