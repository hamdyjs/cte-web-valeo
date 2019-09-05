class Signal {
    constructor(name: string, unit: string);
    constructor(name: string, unit: string, type: string, valueTextMap: {[key: number]: string});
    constructor(public name: string, public unit: string, public type: string = "signal",
        public valueTextMap: {[key: number]: string} | null = null, public readings: SignalReading[] = []) {}
}

class SignalReading {
    constructor(public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};