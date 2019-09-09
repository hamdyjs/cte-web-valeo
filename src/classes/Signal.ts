class Signal {
    constructor(name: string, unit: string);
    constructor(name: string, unit: string, type: string, valueTextMap: {[key: number]: string});
    constructor(public name: string, public unit: string, public type: string = "signal",
        public valueTextMap: {[key: number]: string} | null = null,
        public color: string = `#${Math.floor(Math.random()*16777215).toString(16)}`,
        public readings: SignalReading[] = []) {}
}

class SignalReading {
    constructor(public timestamp: number, public value: number) {}
}

export default Signal;
export {SignalReading};