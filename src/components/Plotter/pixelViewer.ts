import { Point } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    _gridX = 0;
    private _gridWidth: number;
    private _gridHeight: number;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _canvaWidth: number;
    private readonly _canvaHeight: number;
    private readonly _gridPixelsWidth: number;
    private readonly _gridPixelsHeight: number;
    private readonly _grigCanvaOffsetLeft: number = 50;
    private readonly _grigCanvaOffsetRight: number = 30;
    private readonly _grigCanvaOffsetTop: number = 30;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(gridStartX: number, gridWidth: number, gridHeight: number, canva: HTMLCanvasElement) {
        this._gridX = gridStartX;

        this._gridWidth = Math.round(gridWidth);
        this._gridHeight = Math.round(gridHeight);

        this._canvaWidth = canva.width;
        this._canvaHeight = canva.height;

        this._gridPixelsWidth = this._canvaWidth - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight);
        this._gridPixelsHeight = this._canvaHeight - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom);

        this._canva = canva;
        this._context = canva.getContext("2d")!;
    }

    public toCanvaX(x: number) {
        return (this._grigCanvaOffsetLeft + ((x - this._gridX) * this._cellSizeX));
    }

    public toCanvaY(y: number) {
        return this._grigCanvaOffsetBottom + (y * this._cellSizeY);
    }

    public toGridX(xCanva: number): number {
        return xCanva / this._cellSizeX;
    }

    public toGridX2(xCanva: number): number {
        return (xCanva - this._grigCanvaOffsetLeft) / this._cellSizeX + this.GridX;
    }

    public get GridX() {
        return this._gridX;
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
        return this._gridPixelsWidth / this._gridWidth;
    }

    private get _cellSizeY() {
        return this._gridPixelsHeight / this._gridHeight;
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

        if (position.X > this._gridX && position.X < this._gridWidth + this._gridX) xVisible = true;
        if (position.Y > 0 && position.Y < this._gridHeight) yVisible = true;

        return xVisible && yVisible;
    }
}