import { Point } from "./point";

export class PixelViewer {
    _gridX = 0;
    _step = 10;
    private _gridWidth: number;
    private _gridHeight: number;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canvaWidth: number;
    private readonly _canvaHeight: number;
    private readonly _gridPixelsWidth: number;
    private readonly _gridPixelsHeight: number;
    private readonly _grigCanvaOffsetLeft: number = 5;
    private readonly _grigCanvaOffsetRight: number = 30;
    private readonly _grigCanvaOffsetTop: number = 30;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(gridStartX: number, gridWidth: number, gridHeight: number, canva: HTMLCanvasElement) {
        this._gridX = gridStartX;

        this._gridWidth = gridWidth;
        this._gridHeight = gridHeight;

        this._canvaWidth = canva.width;
        this._canvaHeight = canva.height;

        this._gridPixelsWidth = this._canvaWidth - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight);
        this._gridPixelsHeight = this._canvaHeight - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom);

        this._context = canva.getContext("2d")!;
    }

    public toCanvaX(x: number) {
        return (this._grigCanvaOffsetLeft + ((x - this._gridX) * this._cellSizeX));
    }

    public toGridX(xCanva: number) { 
        return xCanva / this._cellSizeX;
    }

    public toCanvaY(y: number) {
        return this._grigCanvaOffsetBottom + (y * this._cellSizeY);
    }

    public get GridX() {
        return this._gridX;
    }

    public get Step() {
        return this._step;
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

        this.DrawLine(this.toCanvaX(x1), this.toCanvaY(y1), this.toCanvaX(x2), this.toCanvaY(y2), size);
    }

    public DrawLine(x1: number, y1: number, x2: number, y2: number, size: number = 1) {
        this._context.beginPath();

        this._context.moveTo(x1, this._canvaHeight - y1);
        this._context.lineTo(x2, this._canvaHeight - y2);
        this._context.lineWidth = size;
        this._context.strokeStyle = "#9e9e9e";
        this._context.stroke();
    }

    public DrawText(
        x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignHorizontal: CanvasTextAlign = "start",
        alignVertical: CanvasTextBaseline = "middle") {
        this._context.fillStyle = color;
        this._context.font = `bold ${size}px sans-serif`;
        this._context.textAlign = alignHorizontal;
        this._context.textBaseline = alignVertical;

        this._context.fillText(text, x, this._canvaHeight - y);
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

        this.DrawText(xCanva, yCanva, text, size, color, alignVertical, alignHorizontal);
    }

    public DrawObject(x: number, y: number): void {
        this._context.fillStyle = 'green';
        this._context.beginPath();
        this._context.arc(x, this._canvaHeight - y, 5, 0, 2 * Math.PI, false);
        this._context.fill();
        this._context.lineWidth = 1;
        this._context.strokeStyle = '#003300';
        this._context.stroke();
    }

    public DrawOrdinatObject(x: number, y: number): void {
        const xCanva = this.toCanvaX(x);
        const yCanva = this.toCanvaY(y);

        if (!this.IsVisible(new Point(x, y))) return;

        this.DrawObject(xCanva, yCanva);
    }

    public IsVisible(position: Point): boolean {
        let xVisible = false;
        let yVisible = false;

        if (position.X > this._gridX && position.X < this._gridWidth + this._gridX) xVisible = true;
        if (position.Y > 0 && position.Y < this._gridHeight) yVisible = true;

        return xVisible && yVisible;

        return true;
    }
}