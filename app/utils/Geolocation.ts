export class GeolocationApiWrapper {
    private readonly _isAvailable: boolean

    constructor() {
        this._isAvailable =
            typeof navigator !== 'undefined' && !!navigator.geolocation
    }

    get IsAvailable() {
        return this._isAvailable
    }

    async UpdateCoords(): Promise<GeolocationCoordinates> {
        const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            }
        )
        return position.coords
    }
}
