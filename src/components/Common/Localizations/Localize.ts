const localize = (value: number, min: number, max: number): string => {
    return value.toLocaleString("ru-RU", {
        style: "decimal",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
    });
}

export default {localize};
