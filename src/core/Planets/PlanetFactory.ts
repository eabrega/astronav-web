import { Planet } from "./Planet";

export default class PlanetFactory {
    private static readonly PLANET_RUS = new Map([
        ["Mercury", 2],
        ["Venus", 3],
        ["Mars", 4],
        ["Jupiter", 5],
        ["Saturn", 6],
        ["Moon", 1],
        ["Sun", 0]
    ]);

    constructor() {

    }

    Create(name: string): Planet {
        const number = PlanetFactory.PLANET_RUS.get(name)!;
        return new Planet(number, name)
    }
}