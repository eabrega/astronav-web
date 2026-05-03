import type { ISkyEventItem } from '~/types/ISkyInfo'

export class SkyEventItem {
    readonly Event: string
    readonly Date: Date
    readonly A: number

    constructor(item: ISkyEventItem) {
        this.Event = item.event
        this.Date = new Date(item.date)
        this.A = item.a
    }
}
