export class DateParser{
    private readonly date: Date;
    constructor(date:Date){
        this.date = date ?? Date.now();
    }

    toString():string {
        let monthStr = this.date.getMonth() >= 9 ? this.date.getMonth() + 1 : `0${this.date.getMonth() + 1}`
        let dateStr = this.date.getDate() >= 9 ? this.date.getDate() : `0${this.date.getDate()}`

        return `${this.date.getFullYear()}-${monthStr}-${dateStr}`;
    }
}