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
    name: string;
    date: Date;
}

export interface ISkyEvent {
    objects: Array<ISkyEventItem>;
    name: string;
}