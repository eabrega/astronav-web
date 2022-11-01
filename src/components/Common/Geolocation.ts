export default class GeolocationApiWrapper {
    private readonly _isAvialable: boolean;
    private Lat: number = 0;
    private Lon: number = 0;
    private Accuracy: number = 0;

    constructor() {       
        if ('geolocation' in navigator) {     
            this._isAvialable = true;
        }
        else { 
            this._isAvialable = false;
        }
    }

    get IsAvialable() {
        return this._isAvialable;
    }

    UpdateCoorgs(){ 
        navigator.geolocation.getCurrentPosition((position) => { 
            this.Lat = position.coords.latitude;
            this.Lon = position.coords.longitude;
            this.Accuracy = position.coords.accuracy;
        }); 
    }
}

interface ICoords { 
    latitude: number;
    longitude: number;
    accuracy: number;
}