export class Point {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get X() {
        return this._x;
    }

    public get Y() {
        return this._y;
    }
}

export class Size {
    private readonly _width: number;
    private readonly _height: number;

    constructor(weight: number, height: number) {
        this._width = weight;
        this._height = height;
    }

    public get Weight() {
        return this._width;
    }

    public get Height() {
        return this._height;
    }
}