export default class GeolocationApiWrapper {
    private readonly _isAvialable: boolean;

    constructor() {
        if (navigator.geolocation) {
            this._isAvialable = true;
        }
        else {
            this._isAvialable = false;
        }
    }

    get IsAvialable() {
        return this._isAvialable;
    }

    async UpdateCoorgs(): Promise<GeolocationCoordinates> {
        const position = await new Promise((resolve: PositionCallback, reject: PositionErrorCallback) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        return position.coords;
    }
}
