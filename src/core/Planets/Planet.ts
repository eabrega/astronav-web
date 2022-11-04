export class Planet {
    readonly SerialNumber: number;
    readonly Name: string;

    constructor(serialNumber: number, name: string) {
        this.Name = name;
        this.SerialNumber = serialNumber;
    }
}