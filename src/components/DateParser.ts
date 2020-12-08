interface IDate{
    date:string;
    month:string;
    year:string;
}

export default class DateParser {
    private readonly date: Date;
    constructor(date?: Date) {
        this.date = date ?? new Date();
    }

    public toString(): string {
        let parsedDate = this.parse();
        return `${this.date.getFullYear()}-${parsedDate.month}-${parsedDate.date}`;
    }

    public toApiString(): string {
        let parsedDate = this.parse();
        return `${parsedDate.date}-${parsedDate.month}-${parsedDate.year}`;
    }

    private parse():IDate{
        let month = this.date.getMonth() >= 10 ? (this.date.getMonth() + 1).toString() : `0${this.date.getMonth() + 1}`
        let date = this.date.getDate() >= 10 ? this.date.getDate().toString() : `0${this.date.getDate()}`
        let year = this.date.getFullYear().toString();
        
        return {
            date: date,
            month: month,
            year: year
        };
    }
}