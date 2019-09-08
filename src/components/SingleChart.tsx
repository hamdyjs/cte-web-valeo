import React, { useEffect } from "react";
import Signal from "../classes/Signal";
import Chart, { controllers } from "chart.js";
import randomColor from "randomcolor";

// TODO: Implement single charts
// TODO: Normalize readings by dividing on the max value received
// TODO: Show actual value of reading in tooltip
// TODO: Customize each signal's y-axis to show actual values

const SingleChart: React.FC<{signals: Signal[]}> = (props) => {
    let {signals} = props;

    useEffect(() => {
        let timestamps: number[] = [];
        
        for (let signal of signals) {
            for (let reading of signal.readings) {
                if (!timestamps.includes(reading.timestamp)) timestamps.push(reading.timestamp);
            }
        }
        timestamps = timestamps.sort((a, b) => a - b);
        
        let datasets: Chart.ChartDataSets[] = [];
        let scales: Chart.ChartScales = {};
        let colors = randomColor({count: signals.length, luminosity: "dark", format: "rgb"});
        scales.yAxes = [];
        for (let i in signals) {
            let signal = signals[i];
            let dataset: Chart.ChartDataSets = {fill: false, label: signal.name};
            dataset.data = [];
            dataset.borderColor = colors[i];

            for (let timestamp of timestamps) {
                let value = 0;
                let reading = signal.readings.find(r => r.timestamp === timestamp);
                if (reading) value = reading.value;
                dataset.data.push(value);
            }

            let yAxis: Chart.ChartYAxe = {};
            yAxis.ticks = {
                min: Math.min(...(dataset.data as number[])),
                max: Math.max(...(dataset.data as number[])),
                backdropColor: colors[i],
                fontColor: colors[i],
            };

            datasets.push(dataset);
            scales.yAxes.push(yAxis);
        }

        new Chart("single_chart", {
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