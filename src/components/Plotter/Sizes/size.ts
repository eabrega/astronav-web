export class Size {
    private readonly _width: number;
    private readonly _height: number;

    constructor(weight: number, height: number) {
        this._width = weight;
        this._height = height;
    }

    get Width() {
        return this._width;
    }

    get Height() {
        return this._height;
    }

    ToString() {
        return `W:${this._width.toFixed(3)} H:${this._height.toFixed(3)}`;
    }
}
