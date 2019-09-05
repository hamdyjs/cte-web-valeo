import React, {useState, useEffect, ChangeEvent} from "react";
import Signal, {SignalReading} from "../classes/Signal";
import MultiCharts from "./MultiCharts";
import SingleChart from "./SingleChart";
import { Trace } from "../types/cte-client";

enum Mode {
    Single,
    Multi,
}

const Tracer: React.FC = () => {
    let [loading, setLoading] = useState(true);
    let [signals, setSignals] = useState(([] as Signal[]));
    let [activeSignals, setActiveSignals] = useState([] as Signal[]);
    let [mode, setMode] = useState(Mode.Multi);

    useEffect(() => {
        window.client.getTrace(new window.Empty(), {}, function(err: Error, response: Trace) {
            if (err) return console.error(err);
            console.log(response.entries);
            let newSignals = [...signals];
            for (let entry of response.entries) {
                let signal = newSignals.find(s => s.name === entry.name);
                if (!signal) {
                    signal = new Signal(entry.name, entry.unit, entry.type, entry.valueTextMap);
                    newSignals.push(signal);
                }

                if (entry.timestamp && entry.value) {
                    signal.readings.push(new SignalReading(entry.timestamp, entry.value));
                }
            }
            setLoading(false);
            setSignals(newSignals);
        });
    }, []);

    function onSignalCheckedChange({target: {value, checked}}: ChangeEvent<HTMLInputElement>) {
        let signal = signals.find(s => s.name === value);
        if (!signal) return;

        let newActiveSignals = [...activeSignals];
        let found = !!newActiveSignals.find(s => s.name === (signal && signal.name));
        if (checked && !found) newActiveSignals.push(signal);
        else if (!checked && found) newActiveSignals = newActiveSignals.filter(s => s.name !== (signal && signal.name));

        setActiveSignals(newActiveSignals);
    }

    function onModeChange({target: {value, checked}}: ChangeEvent<HTMLInputElement>) {
        setMode(parseInt(value));
    }

    return (
        <div>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Graph Mode</div>
                <div className="list-group list-group-flush ml-3">
                    <label className="radio">
                        <input type="radio" name="graphMode" id="singleMode" value={Mode.Single} onChange={onModeChange}
                            checked={mode === Mode.Single}/> Single Mode
                    </label>
                    <label className="radio">
                        <input type="radio" name="graphMode" id="multiMode" value={Mode.Multi} onChange={onModeChange}
                            checked={mode === Mode.Multi}/> Multi Mode
                    </label>
                </div>
                <div className="sidebar-heading">Signals</div>
                <div className="list-group list-group-flush">
                    {
                        loading ? (
                            <div className="spinner-border spinner-border-sm ml-4" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            signals.map((signal, i) => {
                                return (
                                    <div className="form-check ml-3" key={i}>
                                        <input onChange={onSignalCheckedChange} className="form-check-input"
                                               type="checkbox" name="signal" value={signal.name} id={"signal"+ i}/>
                                        <label className={"form-check-label " +
                                            (activeSignals.find(s => s.name === signal.name) ?
                                                "text-success" : "text-danger")}
                                            htmlFor={"signal"+ i}>{signal.name}</label>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </div>
            <div id="page-content-wrapper">
                <div className="container-fluid mt-2">
                    {
                        (mode === Mode.Multi && <MultiCharts signals={activeSignals}/>)
                        ||
                        (mode === Mode.Single && <SingleChart signals={activeSignals}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Tracer;