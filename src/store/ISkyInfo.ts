export interface ISkyInfoItem {
    name: string;
    d: number;
    f: number;
}

export interface ISkyInfo {
    objects: Array<ISkyInfoItem>;
    time: string;
}

export interface ISkyEventItem {
    event: string;
    date: string;
    a: number;
}

export interface ISkyEvent {
    events: Array<ISkyEventItem>;
    name: string;
}