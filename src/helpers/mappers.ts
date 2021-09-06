export default class Mappers {
    public static toLocaleString(value: Number, min: number, max: number): string {
        return value.toLocaleString("ru-RU", {
            style: "decimal",
            minimumFractionDigits: min,
            maximumFractionDigits: max,
        });
    }
}
