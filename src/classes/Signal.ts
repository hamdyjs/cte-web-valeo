enum SignalType {
    Signal,
}

class Signal {
    constructor(name: string);
    constructor(public name: string, public type: SignalType = SignalType.Signal) {}
}

class SignalReading {
    constructor(public signal: Signal, public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};