
export declare global {
    interface Window {
        client: any;
        Empty: any;
    }
}

export interface Trace {
	entries: TraceEntry[];
}

export interface TraceEntry {
	timestamp: number;
	name: string;
	type: string;
	value: number;
	unit: string;
	valueTextMap: {[key: number]: string};
}
