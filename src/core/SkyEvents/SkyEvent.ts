import { ISkyEvent } from "../../store/ISkyInfo";
import { Planet } from "../Planets/Planet";
import PlanetFactory from "../Planets/PlanetFactory";
import { SkyEventItem } from "./SkyEventItem";

export class SkyEvent {
    readonly Planet: Planet;
    readonly Events: Array<SkyEventItem>;

    constructor(skyEvent: ISkyEvent) {
        this.Planet = new PlanetFactory().Create(skyEvent.name);
        this.Events = skyEvent.events.map(i => new SkyEventItem(i))
    }
}