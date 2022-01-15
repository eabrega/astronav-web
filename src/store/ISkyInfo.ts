export interface ISkyInfoItem {
    name: string;
    d: number;
    f: number;
    sm: number;
}

export interface ISkyInfo {
    objects: Array<ISkyInfoItem>;
    time: string;
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

export class SkyEvent {
    readonly PlanetName: string;
    readonly Events: Array<SkyEventItem>;

    constructor(skyEvent: ISkyEvent) {
        this.PlanetName = skyEvent.name
        this.Events = skyEvent.events.map(i => new SkyEventItem(i))
    }
}

export class SkyEventItem {
    readonly Event: string;
    readonly Date: Date;
    readonly A: number;

    constructor(item: ISkyEventItem) {
        this.Event = item.event
        this.Date = new Date(item.date);
        this.A = item.a
    }
}