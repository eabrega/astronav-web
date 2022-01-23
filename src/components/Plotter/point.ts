export class Point {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get X() {
        return this._x
    }

    public get Y() {
        return this._y
    }

    public ToString() {
        return `X:${this._x} Y:${this._y}`;
    }

    static Scaled(point: Point, scale: number): Point {
        return new Point(point.X * scale, point.Y * scale);
    }
}

export class Size {
    private readonly _width: number;
    private readonly _height: number;

    constructor(weight: number, height: number) {
        this._width = weight;
        this._height = height;
    }

    public get Width() {
        return this._width;
    }

    public get Height() {
        return this._height;
    }

    public ToString() {
        return `W:${this._width} H:${this._height}`;
    }
}