export class Locale {
    static PLANET_RUS = new Map([
        ["Mercury", "Меркурий"],
        ["Venus", "Венера"],
        ["Mars", "Марс"],
        ["Jupiter", "Юпитер"],
        ["Saturn", "Сатурн"],
        ["Moon", "Луна"],
        ["Sun", "Солнце"],
    ]);

    static EVENTS_RUS = new Map([
        ["Sunrise", "Восход"],
        ["Apogee", "Полдень"],
        ["Sunset", "Заход"]
    ]);

    static EVENTS_ICONS = new Map([
        ["Sunrise", "caret-up-fill"],
        ["Apogee", "sun"],
        ["Sunset", "caret-down-fill"]
    ]);
}
