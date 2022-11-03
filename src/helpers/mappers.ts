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