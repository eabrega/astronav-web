export class AxisPoint {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get X() {
        return this._x
    }

    get Y() {
        return this._y
    }

    ToString() {
        return `X:${this._x} Y:${this._y}`;
    }

    static Scaled(point: AxisPoint, scale: number): AxisPoint {
        return new AxisPoint(point.X * scale, point.Y * scale);
    }
}