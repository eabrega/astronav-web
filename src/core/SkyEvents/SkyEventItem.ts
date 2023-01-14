import { ISkyEventItem } from "../../store/ISkyInfo";

export class SkyEventItem {
    readonly Event: string;
    readonly Date: Date;
    readonly A: number;
    readonly H: number;

    constructor(item: ISkyEventItem) {
        this.Event = item.event
        this.Date = new Date(item.date);
        this.A = item.a;
        this.H = item.h;
    }
}