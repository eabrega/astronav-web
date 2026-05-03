interface IDate {
    date: string
    month: string
    year: string
}

export class DateParser {
    private readonly date: Date

    constructor(date: Date | string) {
        this.date =
            typeof date === 'string'
                ? new Date(`${date}T00:00:00`)
                : date
    }

    get Date(): Date {
        return this.date
    }

    public toString(): string {
        const p = this.parse()
        return `${this.date.getFullYear()}-${p.month}-${p.date}`
    }

    public toApiString(): string {
        const p = this.parse()
        return `${p.date}-${p.month}-${p.year}`
    }

    private parse(): IDate {
        const m = this.date.getMonth() + 1
        const d = this.date.getDate()
        return {
            date: d >= 10 ? String(d) : `0${d}`,
            month: m >= 10 ? String(m) : `0${m}`,
            year: String(this.date.getFullYear()),
        }
    }
}
