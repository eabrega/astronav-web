export interface ISkyInfoItem {
    name: string;
    d: number;
    f: number;
}

export interface ISkyInfo {
    objects: Array<ISkyInfoItem>;
    time: Date;
}