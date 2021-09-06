import { ISkyEventItem } from "@/store/ISkyInfo";

export class PlainEventItem {
    Name: string;
    Event: string;
    Time: Date;
    A: number;
    
    constructor(name: string, event: ISkyEventItem) {
        this.Name = name;
        this.Event = event.event;
        this.Time = new Date(event.date);
        this.A = event.a;
    }
}