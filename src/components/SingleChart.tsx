import React, { useEffect } from "react";
import Signal from "../classes/Signal";
import Chart from "chart.js";
import randomColor from "randomcolor";

let chart: Chart;

const SingleChart: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    useEffect(() => {
        if (chart) chart.destroy();
        if (signals.length === 0) return;

        let timestamps: number[] = [];
        
        for (let signal of signals) {
            for (let reading of signal.readings) {
                if (!timestamps.includes(reading.timestamp)) timestamps.push(reading.timestamp);
            }
        }
        timestamps = timestamps.sort((a, b) => a - b);
        
        let datasets: Chart.ChartDataSets[] = [];
        let scales: Chart.ChartScales = {};
        scales.yAxes = [];
        let colors = randomColor({count: signals.length, luminosity: "dark", format: "rgb"});
        for (let i in signals) {
            let signal = signals[i];
            let values: (number | undefined)[] = [];

            for (let timestamp of timestamps) {
                let value: number | undefined = undefined;
                let reading = signal.readings.find(r => r.timestamp === timestamp);
                if (reading) value = reading.value;
                values.push(value);
            }

            let yAxis: Chart.ChartYAxe;
            if (signal.valueTextMap && Object.keys(signal.valueTextMap).length > 0) {
                let minKey, maxKey;
                for (let key in signal.valueTextMap) {
                    let i = parseInt(key);
                    if (minKey === undefined || (i < minKey)) minKey = i;
                    if (maxKey === undefined || (i > maxKey)) maxKey = i;
                }

                yAxis = {
                    id: `y${i}`,
                    ticks: {
                        min: minKey,
                        max: maxKey,
                        stepSize: 1,
                        backdropColor: colors[i],
                        fontColor: colors[i],
                        callback: (label) => 
                            signal.valueTextMap && signal.valueTextMap[label] ? signal.valueTextMap[label]: label,
                    },
                };
            } else {
                let max = values[0];
                for (let v of values)
                    if (!max || (v && v > max)) max = v;

                yAxis = {
                    id: `y${i}`,
                    ticks: {
                        // min: 0,
                        // max: 1,
                        // stepSize: 0.1,
                        backdropColor: colors[i],
                        fontColor: colors[i],
                        // callback: v => max ? (v * max).toFixed(2) : "",
                    }
                };

                // values = values.map(v => v && max ? (v / max) : undefined);
            }

            scales.yAxes.push(yAxis);
            datasets.push({
                data: values,
                borderColor: colors[i],
                fill: false,
                label: signal.name,
                spanGaps: true,
                yAxisID: `y${i}`,
            });
        }

        chart = new Chart("single_chart", {
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

                            let signal = signals[item.datasetIndex];

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
                datasets,
            },
        });
    }, [signals]);

    return (
        <div>
        {
            signals.length > 0 &&
            (
                <div className="card mt-1">
                    <div className="card-header"><b>{signals.map((signal) => signal.name).join(", ")}</b></div>
                    <div className="card-body">
                        <canvas id="single_chart" width="150" height="300" />
                    </div>
                </div>
            )
        }
        </div>
    );
};

export default SingleChart;