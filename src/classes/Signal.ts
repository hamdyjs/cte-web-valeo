enum SignalType {
    Signal,
}

class Signal {
    constructor(name: string);
    constructor(public name: string, public type: SignalType = SignalType.Signal,
                public readings: SignalReading[] = []) {}
}

class SignalReading {
    constructor(public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};