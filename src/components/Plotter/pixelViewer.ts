import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    //положение в пикселях
    private _position: Point;
    //виртуальный размер в ординатах
    //public _ordinatPosition: Point = new Point(0, 0);
    private _ordinatSize: Size;
    private _scale: number = 1;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _gridCanvaSize: Size;
    private readonly _grigCanvaOffsetLeft: number = 0;
    private readonly _grigCanvaOffsetRight: number = 0;
    private readonly _grigCanvaOffsetTop: number = 25;
    private readonly _grigCanvaOffsetBottom: number = 25;

    constructor(position: Point, size: Size, canva: HTMLCanvasElement) {
        this._position = position
        this._ordinatSize = size;

        this._gridCanvaSize = new Size(
            canva.width - this._grigCanvaOffsetLeft - this._grigCanvaOffsetRight,
            canva.height - this._grigCanvaOffsetTop - this._grigCanvaOffsetBottom);

        this._canva = canva;
        this._context = canva.getContext("2d")!;
    }

    public toCanvaPosition(position: Point) {
        const x = this._grigCanvaOffsetLeft + ((position.X * this._scale) * this.CellSize.Width) + this._position.X;
        const y = this._grigCanvaOffsetBottom + ((position.Y * this._scale) * this.CellSize.Height) + this._position.Y;

        return new Point(x, y);
    }

    public toGridPosition(position: Point): Point {
        const x = ((position.X - this._position.X - this._grigCanvaOffsetLeft) / this.CellSize.Width) / this._scale
        const y = (this._ordinatSize.Height - ((this._position.Y + position.Y + this._grigCanvaOffsetBottom) / this.CellSize.Height)) / (-1 * this._scale)

        return new Point(x, y);
    }

    public get Position() {
        return this._position;
    }

    public set Position(position: Point) {
        this._position = position;
    }

    public get OrdinatPosition() {
        const oX = Math.round(-1 * (this.Position.X / this.CellSize.Width)) / this._scale;
        return new Point(oX, 0);
    }

    public set Scale(scale: number) {
        this._scale = scale;
    }

    public get Size() {
        return this._ordinatSize;
    }

    public get GridCanvaSize() {
        return this._gridCanvaSize;
    }

    public get GridCanvaPosition() {
        return new Point(this._grigCanvaOffsetLeft, this._grigCanvaOffsetBottom);
    }

    public get CellSize() {
        const cellWidth = this._gridCanvaSize.Width / this._ordinatSize.Width;
        const cellHeight = this._gridCanvaSize.Height / this._ordinatSize.Height;

        return new Size(cellWidth, cellHeight);
    }

    public MoveFor(position: Point) {
        const newPosition = new Point(this._position.X + position.X, this._position.Y - position.Y);
        this.Position = newPosition;
    }

    public Zoom(scale: number, x: number) {
        const point = this.toGridPosition(new Point(x, 0)).X * scale;
        this.Scale = scale;
        const newPoint = this.toGridPosition(new Point(x, 0)).X * scale;

        const dX = (point - newPoint) * -this.CellSize.Width;
        this.MoveFor(new Point(dX, 0));
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this._canva.width, this._canva.height);
        this.DebugWindow();
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

        const canvaXY = this.toCanvaPosition(new Point(x, y));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawText(this._canva, canvaXY.X + offsetX, canvaXY.Y, text, size, color, alignVertical, alignHorizontal);
    }

    public DrawOrdinatObject(x: number, y: number): void {
        const canvaXY = this.toCanvaPosition(new Point(x, y));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawObject(this._canva, canvaXY.X, canvaXY.Y);
    }

    public IsVisible(position: Point): boolean {
        return true;
    }

    public DebugWindow() {
        const params = [
            `oPos${this.OrdinatPosition.ToString()}`,
            `oSiz${this._ordinatSize.ToString()}`,
            "---",
            `Scale:${this._scale.toString()}`,
            "---",
            ` Pos:${this._position.ToString()}`,
            this.GridCanvaPosition.ToString(),
            this._gridCanvaSize.ToString()
        ];

        const dY = this._canva.height - 50;
        for (let i = 0; i < params.length; i++) {
            Viewer.DrawText(this._canva, 50, dY - i * 20, params[i], 16, "black");
        }
    }
}