import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    private _position: Point = new Point(0, 0);
    private readonly _size: Size;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _canvaWidth: number;
    private readonly _canvaHeight: number;
    private readonly _gridPixelsWidth: number;
    private readonly _gridPixelsHeight: number;
    private readonly _grigCanvaOffsetLeft: number = 5;
    private readonly _grigCanvaOffsetRight: number = 30;
    private readonly _grigCanvaOffsetTop: number = 0;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(position: Point, gridWidth: number, gridHeight: number, canva: HTMLCanvasElement) {
        this._position = position
        this._size = new Size(Math.round(gridWidth), Math.round(gridHeight));

        this._canvaWidth = canva.width;
        this._canvaHeight = canva.height;

        this._gridPixelsWidth = this._canvaWidth - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight);
        this._gridPixelsHeight = this._canvaHeight - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom);

        this._canva = canva;
        this._context = canva.getContext("2d")!;
    }

    public toCanvaX(x: number) {
        return (this._grigCanvaOffsetLeft + ((x - this._position.X) * this._cellSizeX));
    }

    public toCanvaY(y: number) {
        return this._grigCanvaOffsetBottom + (y * this._cellSizeY);
    }

    public toGridX(xCanva: number, yCanva: number): Point {
        const x = (xCanva - this._grigCanvaOffsetLeft) / this._cellSizeX + this._position.X
        return new Point(x, yCanva);
    }

    public get Position() {
        return this._position;
    }

    public get CanvaWidth() {
        return this._canvaWidth;
    }

    public get CanvaHeight() {
        return this._canvaHeight;
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
        return this._gridPixelsWidth / this._size.Weight;
    }

    private get _cellSizeY() {
        return this._gridPixelsHeight / this._size.Height;
    }

    public set Position(position: Point) {
        this._position = position;
    }

    public MoveFor(position: Point) {
        const newPosition = new Point(this._position.X + position.X, position.Y + position.Y);
        this._position = newPosition;
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
        let xVisible = false;
        let yVisible = false;

        if (position.X > this._position.X && position.X < this._size.Weight + this._position.X) xVisible = true;
        if (position.Y > 0 && position.Y < this._size.Height) yVisible = true;

        return xVisible && yVisible;
    }
}