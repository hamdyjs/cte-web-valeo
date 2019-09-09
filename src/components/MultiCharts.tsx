import React, {useEffect} from "react";
import Signal from "../classes/Signal";
import Chart from "chart.js";

let charts: {[s: string]: Chart} = {};

const MultiCharts: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    useEffect(() => {
        for (let entry of Object.entries(charts)) entry[1].destroy();
        charts = {};

        let timestamps: number[] = [];
        for (let signal of signals)
            for (let reading of signal.readings)
                if (!timestamps.includes(reading.timestamp)) timestamps.push(reading.timestamp);
        timestamps.sort((a, b) => a - b);

        for (let signal of signals) {
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

            let values: (number | undefined)[] = [];
            for (let timestamp of timestamps) {
                let value: number | undefined = undefined;
                let reading = signal.readings.find(r => r.timestamp === timestamp);
                if (reading) value = reading.value;
                values.push(value);
            }

            charts[signal.name] = new Chart(signal.name, {
                type: "line",
                options: {
                    maintainAspectRatio: false,
                    animation: undefined,
                    scales,
                    tooltips: {
                        callbacks: {
                            label: (item, data) => {
                                if (item.datasetIndex === undefined) return "";
                                if (item.value === undefined) return "";
                                if (data.datasets === undefined) return "";
                                
                                if (signal.valueTextMap && Object.keys(signal.valueTextMap).length > 0) {
                                    let text = signal.valueTextMap[parseInt(item.value)];
                                    return `${signal.name}: ${text} (${signal.unit})`;
                                }
    
                                return `${signal.name}: ${item.value} (${signal.unit})`;
                            },
                        },
                    },
                },
                data: {
                    labels: timestamps.map(t => t.toString()),
                    datasets: [{
                        data: values,
                        fill: false,
                        borderColor: "rgb(255, 0, 0)",
                        label: signal.unit || "",
                        spanGaps: true,
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