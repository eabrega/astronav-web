export interface ISkyInfoItem {
    name: string;
    d: number;
    f: number;
}

export interface ISkyInfo {
    objects: Array<ISkyInfoItem>;
    time: Date;
}

export interface ISkyEventItem {
    event: string;
    date: Date;
    a: number;
}

export interface ISkyEvent {
    events: Array<ISkyEventItem>;
    name: string;
}