export function useLocalize() {
    function localize(value: number, min: number, max: number): string {
        return value.toLocaleString('ru-RU', {
            style: 'decimal',
            minimumFractionDigits: min,
            maximumFractionDigits: max,
        })
    }
    return { localize }
}
