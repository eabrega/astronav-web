import { Component, Vue } from "vue-property-decorator";

@Component
export default class Mappers extends Vue {
    public localize(value: number, min: number, max: number): string {
        return value.toLocaleString("ru-RU", {
            style: "decimal",
            minimumFractionDigits: min,
            maximumFractionDigits: max,
        });
    }
}

export function OffsetMapToUtc(offset: number): string {
    return offset < 0
        ? '+' + offset / -60
        : '-' + offset / 60;
}