import React, { useEffect } from "react";
import Signal from "../classes/Signal";
import Chart from "chart.js";
import randomColor from "randomcolor";

// TODO: Customize each signal's y-axis to show actual values
// TODO: Show actual value of reading in tooltip

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
            let values: number[] = [];

            for (let timestamp of timestamps) {
                let value = 0;
                let reading = signal.readings.find(r => r.timestamp === timestamp);
                if (reading) value = reading.value;
                values.push(value);
            }

            let max = Math.max(...values);
            values = values.map(v => v / max);

            datasets.push({
                data: values,
                borderColor: colors[i],
                fill: false,
                label: signal.name
            });

            scales.yAxes.push({
                ticks: {
                    min: 0,
                    max: 1,
                    stepSize: 0.1,
                    backdropColor: colors[i],
                    fontColor: colors[i],
                    callback: v => (v * max).toFixed(2),
                }
            });
        }

        chart = new Chart("single_chart", {
            type: "line",
            options: {
                maintainAspectRatio: false,
                animation: undefined,
                scales,
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