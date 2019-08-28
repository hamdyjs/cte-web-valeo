import React, {useState, useEffect, ChangeEvent} from "react";
import Signal from "../classes/Signal";

const Tracer: React.FC = () => {
    let [loading, setLoading] = useState(true);
    let [signals, setSignals] = useState(([] as Signal[]));
    let [activeSignals, setActiveSignals] = useState([] as Signal[]);

    useEffect(() => {
        // TODO: Integrate with the CTE server
        setTimeout(() => {
            setSignals([
                new Signal("Signal 1"),
                new Signal("Signal 2"),
                new Signal("Signal 3"),
                new Signal("Signal 4"),
            ]);

            setLoading(false);
        }, 500);
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

    return (
        <div>
            <div className="bg-light border-right" id="sidebar-wrapper">
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
                <div className="container-fluid">
                </div>
            </div>
        </div>
    );
};

export default Tracer;