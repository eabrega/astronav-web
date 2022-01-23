import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class PixelViewer {
    //положение в пикселях
    private _position: Point;
    //размерность координатной сетки
    private _gridSize: Size;
    private _scale: number = 1;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _gridCanvaSize: Size;
    private readonly _grigCanvaOffsetLeft: number = 40;
    private readonly _grigCanvaOffsetRight: number = 40;
    private readonly _grigCanvaOffsetTop: number = 30;
    private readonly _grigCanvaOffsetBottom: number = 30;

    constructor(position: Point, size: Size, canva: HTMLCanvasElement) {
        this._position = position
        this._gridSize = size;

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
        const x = (position.X - this._position.X - this._grigCanvaOffsetLeft) / this.CellSize.Width / this._scale

        const canvaInvertY = -(position.Y - this._gridCanvaSize.Height);
        const y = ((canvaInvertY - this._position.Y + this._grigCanvaOffsetTop) / this.CellSize.Height) / this._scale;

        return new Point(x, y);
    }

    public get Position() {
        return this._position;
    }

    public get OrdinatPosition() {
        const oX = Math.round(-1 * (this.Position.X / this.CellSize.Width) / this._scale);
        const oY = Math.round(-1 * (this.Position.Y / this.CellSize.Height) / this._scale);
        return new Point(oX, oY);
    }

    public get OrdinatSize() {
        const oW = Math.round(this._gridSize.Width / this._scale);
        const oH = Math.round(this._gridSize.Height / this._scale);
        return new Size(oW, oH);
    }

    public set Scale(scale: number) {
        this._scale = scale;
    }

    public get GridSize() {
        return this._gridSize;
    }

    public get GridCanvaSize() {
        return this._gridCanvaSize;
    }

    public get GridCanvaPosition() {
        return new Point(this._grigCanvaOffsetLeft, this._grigCanvaOffsetBottom);
    }

    public get CellSize() {
        const cellWidth = this._gridCanvaSize.Width / this._gridSize.Width;
        const cellHeight = this._gridCanvaSize.Height / this._gridSize.Height;

        return new Size(cellWidth, cellHeight);
    }

    public MoveFor(position: Point) {
        const newPosition = new Point(this._position.X + position.X, this._position.Y - position.Y);
        this._position = newPosition;
    }

    public Zoom(scale: number, mouse: Point) {
        const point = Point.Scaled(this.toGridPosition(mouse), scale);
        this.Scale = scale;
        const newPoint = Point.Scaled(this.toGridPosition(mouse), scale);

        const dX = (newPoint.X - point.X) * this.CellSize.Width;
        const dY = (point.Y - newPoint.Y) * this.CellSize.Height
        
        this.MoveFor(new Point(dX, dY));
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this._canva.width, this._canva.height);
        //this.DebugWindow();
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
            `gridSiz${this._gridSize.ToString()}`,
            `oSiz${this.OrdinatSize.ToString()}`,
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