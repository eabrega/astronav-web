interface IDate{
    date:string;
    month:string;
    year:string;
}
export class DateParser {
    private readonly date: Date;
    constructor(date?: string) {
        this.date = new Date(date ?? "");
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
        let month = this.date.getMonth() >= 9 ? (this.date.getMonth() + 1).toString() : `0${this.date.getMonth() + 1}`
        let date = this.date.getDate() >= 9 ? this.date.getDate().toString() : `0${this.date.getDate()}`
        let year = this.date.getFullYear().toString();
        
        return {
            date: date,
            month: month,
            year: year
        };
    }
}