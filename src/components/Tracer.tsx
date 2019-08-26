import React, {useState, useEffect} from "react";

const Tracer: React.FC = () => {
    let [signals, setSignals] = useState(([] as string[]));

    useEffect(() => {
        setTimeout(() => setSignals(["Signal 1", "Signal 2", "Signal 3", "Signal 4"]), 3000);
    }, []);

    return (
        <div>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Signals</div>
                <div className="list-group list-group-flush">
                    {signals.map((signal, i) => {
                        return (
                            <div className="form-check ml-3">
                                <input className="form-check-input" type="checkbox" name="signal" value={signal} id={"signal"+ i}/>
                                <label className="form-check-label" htmlFor={"signal"+ i}>{signal}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <h1 className="mt-4">Simple Sidebar</h1>
                    <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on
                        larger screens. When toggled using the button below, the menu will change.</p>
                    <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is
                        optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which
                        will toggle the menu when clicked.</p>
                </div>
            </div>
        </div>
    );
};

export default Tracer;