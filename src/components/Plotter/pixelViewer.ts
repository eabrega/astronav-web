import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    //положение в пикселях
    private _position: Point;
    //виртуальный размер в ординатах
    private readonly _size: Size;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _gridPixelsWidth: number;
    private readonly _gridPixelsHeight: number;
    private readonly _grigCanvaOffsetLeft: number = 10;
    private readonly _grigCanvaOffsetRight: number = 30;
    private readonly _grigCanvaOffsetTop: number = 10;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(position: Point, gridWidth: number, gridHeight: number, canva: HTMLCanvasElement) {
        this._position = position
        this._size = new Size(Math.round(gridWidth), Math.round(gridHeight));

        this._gridPixelsWidth = canva.width - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight);
        this._gridPixelsHeight = canva.height - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom);

        this._canva = canva;
        this._context = canva.getContext("2d")!;
    }

    public toCanvaX(x: number) {
        return ((this._grigCanvaOffsetLeft + (x * this._cellSizeX)) + this._position.X);
    }

    public toCanvaY(y: number) {
        return this._grigCanvaOffsetBottom + (y * this._cellSizeY) + this._position.Y;
    }

    public toGridPosition(poz: Point): Point {
        const x = ((poz.X - this._position.X - this._grigCanvaOffsetLeft) / this._cellSizeX)
        const y = this._size.Height - ((this._position.Y + poz.Y - this._grigCanvaOffsetTop) / this._cellSizeY)

        return new Point(x, y);
    }

    public get Position() {
        return this._position;
    }

    public set Position(position: Point) {
        this._position = position;
    }

    public get Size() {
        return this._size;
    }

    public get CanvaWidth() {
        return this._canva.width;
    }

    public get CanvaHeight() {
        return this._canva.height;
    }

    public get GridWidthPixels() {
        return this._gridPixelsWidth + this._grigCanvaOffsetLeft;
    }

    public get GridHeightPixels() {
        return this._gridPixelsHeight + this._grigCanvaOffsetBottom;
    }

    public get GridStartPixelX() {
        return this._grigCanvaOffsetLeft;
    }

    public get GridStartPixelsY() {
        return this._grigCanvaOffsetBottom;
    }

    public get _cellSizeX() {
        return (this._gridPixelsWidth / this._size.Width);
    }

    public get _cellSizeY() {
        return this._gridPixelsHeight / this._size.Height;
    }

    public MoveFor(position: Point) {
        const newPosition = new Point(this._position.X + position.X, this._position.Y - position.Y);
        this.Position = newPosition;
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this.CanvaWidth, this.CanvaHeight);
    }

    public DrawOrdinatLine(x1: number, y1: number, x2: number, y2: number, size: number = 1) {
        if (!this.IsVisible) return;

        Viewer.DrawLine(this._canva, this.toCanvaX(x1), this.toCanvaY(y1), this.toCanvaX(x2), this.toCanvaY(y2), size);
    }

    public DrawOrdinatText(x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle") {

        const xCanva = this.toCanvaX(x);
        const yCanva = this.toCanvaY(y);

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawText(this._canva, xCanva, yCanva, text, size, color, alignVertical, alignHorizontal);
    }

    public DrawOrdinatObject(x: number, y: number): void {
        const xCanva = this.toCanvaX(x);
        const yCanva = this.toCanvaY(y);

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawObject(this._canva, xCanva, yCanva);
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