export interface ISkyInfo {
    name: string;
    d: number;
    f: number;
}

export interface IInfo {
    objects: Array<ISkyInfo>;
    time: Date;
}