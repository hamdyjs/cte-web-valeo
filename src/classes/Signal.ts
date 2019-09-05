enum SignalType {
    Signal = "signal",
}

class Signal {
    constructor(name: string, unit: string);
    constructor(public name: string, public unit: string, public type: SignalType = SignalType.Signal,
        public valueTextMap: Map<number, string> | null = null, public readings: SignalReading[] = []) {}
}

class SignalReading {
    constructor(public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};