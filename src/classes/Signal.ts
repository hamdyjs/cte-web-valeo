enum SignalType {
    Signal,
}

class Signal {
    constructor(name: string);
    constructor(public name: string, public type: SignalType = SignalType.Signal) {}
}

export default Signal;