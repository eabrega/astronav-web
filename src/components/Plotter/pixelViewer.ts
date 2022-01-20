import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    //положение в пикселях
    private _position: Point;
    private _ordinatPosition: Point;
    //виртуальный размер в ординатах
    private _ordinatSize: Size;
    private _scale: number;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _gridSizeByPixels: Point;
    private readonly _grigCanvaOffsetLeft: number = 10;
    private readonly _grigCanvaOffsetRight: number = 30;
    private readonly _grigCanvaOffsetTop: number = 10;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(position: Point, size: Size, canva: HTMLCanvasElement) {
        this._position = position
        this._ordinatPosition = new Point(0,0);
        this._scale = 1;
        this._ordinatSize = size;

        this._gridSizeByPixels = new Point(
            canva.width - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight),
            canva.height - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom));

        this._canva = canva;
        this._context = canva.getContext("2d")!;
    }

    public toCanvaPosition(position: Point) {
        const canvaX = ((this._grigCanvaOffsetLeft + (position.X * this.CellSize.Width)) + this._position.X);
        const canvaY = this._grigCanvaOffsetBottom + (position.Y * this.CellSize.Height) + this._position.Y;

        return new Point(canvaX, canvaY);
    }

    public toGridPosition(position: Point): Point {
        const x = ((position.X - this._position.X - this._grigCanvaOffsetLeft) / this.CellSize.Width) * this._scale
        const y = (this._ordinatSize.Height - ((this._position.Y + position.Y - this._grigCanvaOffsetTop) / this.CellSize.Height)) * (-1 * this._scale)

        return new Point(x, y);
    }

    public get Position() {
        return this._position;
    }

    public set Position(position: Point) {
        this._position = position;
    }

    public set Scale(scale: number) {
        this._scale = scale;
    }

    public get Size() {
        return this._ordinatSize;
    }

    public get GridWidthPixels() {
        return this._gridSizeByPixels.X + this._grigCanvaOffsetLeft;
    }

    public get GridHeightPixels() {
        return this._gridSizeByPixels.Y + this._grigCanvaOffsetBottom;
    }

    public get GridStartPixelX() {
        return this._grigCanvaOffsetLeft;
    }

    public get GridStartPixelsY() {
        return this._grigCanvaOffsetBottom;
    }

    public get CellSize() {
        const cellWidth = (this._gridSizeByPixels.X / this._ordinatSize.Width);
        const cellHeight = this._gridSizeByPixels.Y / this._ordinatSize.Height;

        return new Size(cellWidth, cellHeight);
    }

    public MoveFor(position: Point) {
        //const ordinatX = Math.round(-1 * (this.Position.X / this.CellSize.Width) / this._ordinatStepX);
        //const ordinatY = Math.round(-1 * (this.Position.Y / this.CellSize.Height) / this._ordinatStepY);

        const newPosition = new Point(this._position.X + position.X, this._position.Y - position.Y);
        this.Position = newPosition;
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this._canva.width, this._canva.height);
    }

    public DrawOrdinatText(
        x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle",
        offsetX = 0) {

        const canvaXY = this.toCanvaPosition(new Point(x / this._scale, y / this._scale));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawText(this._canva, canvaXY.X + offsetX, canvaXY.Y, text, size, color, alignVertical, alignHorizontal);
    }

    public DrawOrdinatObject(x: number, y: number): void {
        const canvaXY = this.toCanvaPosition(new Point(x / this._scale, y / this._scale));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawObject(this._canva, canvaXY.X, canvaXY.Y);
    }

    public IsVisible(position: Point): boolean {
        let isVisibleX = false;
        let isVisibleY = false;

        var s = this.toGridPosition(position);

        //   if (s.)

        return true;
        return isVisibleX && isVisibleY;
    }
}