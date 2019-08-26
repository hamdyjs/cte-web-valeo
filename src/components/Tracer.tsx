import React, {useState, useEffect, ChangeEvent} from "react";

const Tracer: React.FC = () => {
    let [loading, setLoading] = useState(true);
    let [signals, setSignals] = useState(([] as string[]));
    let [activeSignals, setActiveSignals] = useState([] as string[]);

    useEffect(() => {
        // TODO: Integrate with the CTE server
        setTimeout(() => setSignals(["Signal 1", "Signal 2", "Signal 3", "Signal 4"]), 2000);
        setTimeout(() => setLoading(false), 2000);
    }, []);

    function onSignalCheckedChange({target: {value, checked}}: ChangeEvent<HTMLInputElement>) {
        let newActiveSignals = [...activeSignals];
        if (checked && !newActiveSignals.includes(value)) newActiveSignals.push(value);
        else if (!checked && newActiveSignals.includes(value))
            newActiveSignals = newActiveSignals.filter(s => s !== value);

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
                                               type="checkbox" name="signal" value={signal} id={"signal"+ i}/>
                                        <label className={"form-check-label " +
                                            (activeSignals.includes(signal) ? "text-success" : "text-danger")}
                                            htmlFor={"signal"+ i}>{signal}</label>
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