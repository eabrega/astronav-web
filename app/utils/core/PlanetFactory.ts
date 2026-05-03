import { Planet } from './Planet'

export class PlanetFactory {
    private static readonly SERIAL = new Map([
        ['Mercury', 2],
        ['Venus', 3],
        ['Mars', 4],
        ['Jupiter', 5],
        ['Saturn', 6],
        ['Moon', 1],
        ['Sun', 0],
    ])

    Create(name: string): Planet {
        const number = PlanetFactory.SERIAL.get(name) ?? 0
        return new Planet(number, name)
    }
}
