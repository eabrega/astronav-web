import { IPlotterSettings } from "../IPlotterSettings";
import { Point, Size } from "../point";
import { IOffset, Offset } from "./IOffset";
import * as Viewer from "./viewer"

export class PixelViewer {
    //положение в пикселях
    private _position: Point;
    private _scale: number = 1;
    private readonly _settings: IPlotterSettings;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _canva: HTMLCanvasElement;
    private readonly _gridCanvaSize: Size;
    private readonly _gridCanvaOffsetLeft: number = 0;
    private readonly _gridCanvaOffsetRight: number = 0;
    private readonly _gridCanvaOffsetTop: number = 0;
    private readonly _gridCanvaOffsetBottom: number = 0;

    constructor(canva: HTMLCanvasElement, settings: IPlotterSettings, offsets: Array<IOffset> | null = null) {
        this._settings = settings;
        this._position = new Point(0, 0);

        this._gridCanvaOffsetTop = offsets?.find(x => x.offset == Offset.Top)?.size ?? 0;
        this._gridCanvaOffsetBottom = offsets?.find(x => x.offset == Offset.Bottom)?.size ?? 0;
        this._gridCanvaOffsetLeft = offsets?.find(x => x.offset == Offset.Left)?.size ?? 0;
        this._gridCanvaOffsetRight = offsets?.find(x => x.offset == Offset.Right)?.size ?? 0;

        this._gridCanvaSize = new Size(
            canva.width - this._gridCanvaOffsetLeft - this._gridCanvaOffsetRight,
            canva.height - this._gridCanvaOffsetTop - this._gridCanvaOffsetBottom);

        this._canva = canva;
        this._context = canva.getContext("2d", { alpha: true })!;
    }

    GetCanvaPosition(position: Point) {
        const x = this._gridCanvaOffsetLeft + ((position.X * this._scale) * this._cellSize.Width) + this._position.X;
        const y = this._gridCanvaOffsetBottom + ((position.Y * this._scale) * this._cellSize.Height) + this._position.Y;

        return new Point(x, y);
    }

    GetGridPosition(position: Point): Point {
        const x = (position.X - this._position.X - this.GridCanvaPosition.X) / this._cellSize.Width / this._scale

        const canvaInvertY = -(position.Y - this._gridCanvaSize.Height);
        const y = ((canvaInvertY - this._position.Y + this.GridCanvaPosition.Y) / this._cellSize.Height) / this._scale;

        return new Point(x, y);
    }

    get GridZeroPont() {
        const oX = -((this._position.X / this._cellSize.Width) / this._scale);
        const oY = -((this._position.Y / this._cellSize.Height) / this._scale);
        return new Point(oX, oY);
    }

    get GridSize() {
        const oW = this._settings.gridSize.Width / this._scale;
        const oH = this._settings.gridSize.Height / this._scale;
        return new Size(oW, oH);
    }

    get GridCanvaSize() {
        return this._gridCanvaSize;
    }

    get GridCanvaPosition() {
        return new Point(this._gridCanvaOffsetLeft, this._gridCanvaOffsetBottom);
    }

    public get _cellSize() {
        const cellWidth = this._gridCanvaSize.Width / this._settings.gridSize.Width;
        const cellHeight = this._gridCanvaSize.Height / this._settings.gridSize.Height;

        return new Size(cellWidth, cellHeight);
    }

    MoveCanvasFor(acceleration: Point) {
        const newPosition = new Point(this._position.X + acceleration.X, this._position.Y - acceleration.Y);
        this._position = newPosition;
    }

    Zoom(scale: number, mouse: Point) {
        const point = Point.Scaled(this.GetGridPosition(mouse), scale);
        this._scale = scale;
        const newPoint = Point.Scaled(this.GetGridPosition(mouse), scale);

        const dX = (newPoint.X - point.X) * this._cellSize.Width;
        const dY = (point.Y - newPoint.Y) * this._cellSize.Height

        this.MoveCanvasFor(new Point(dX, dY));
    }

    Clear(): void {
        this._context.clearRect(0, 0, this._canva.width, this._canva.height);
        if (this._settings.isDebug) {
            this.DebugWindow();
        }
    }

    DrawOrdinatText(
        x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle",
        offsetX = 0) {

        const canvaXY = this.GetCanvaPosition(new Point(x, y));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawText(this._canva, canvaXY.X + offsetX, canvaXY.Y, text, size, color, alignVertical, alignHorizontal);
    }

    DrawOrdinatObject(x: number, y: number): void {
        const canvaXY = this.GetCanvaPosition(new Point(x, y));

        if (!this.IsVisible(new Point(x, y))) return;

        Viewer.DrawObject(this._canva, canvaXY.X, canvaXY.Y);
    }

    IsVisible(position: Point): boolean {
        return true;
    }

    private DebugWindow() {
        const params = [
            `zeroPoint: ${this.GridZeroPont.ToString()}`,
            `gridSiz:      ${this.GridSize.ToString()}`,
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