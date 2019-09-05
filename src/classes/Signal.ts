class Signal {
    constructor(name: string, unit: string);
    constructor(name: string, unit: string, type: string, valueTextMap: Map<number, string>);
    constructor(public name: string, public unit: string, public type: string = "signal",
        public valueTextMap: Map<number, string> | null = null, public readings: SignalReading[] = []) {}
}

class SignalReading {
    constructor(public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};