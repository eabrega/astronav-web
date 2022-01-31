import { IPlotterSettings } from "../IPlotterSettings";
import { AxisPoint } from "../Points/axisPoint";
import { CanvaPoint } from "../Points/canvaPoint";
import { Size } from "../Sizes/size";
import { IOffset, Offset } from "./IOffset";
import * as Viewer from "./viewer"

export class PixelViewer {
    private _position: CanvaPoint;
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
        this._position = new CanvaPoint(0, 0);

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

    GetCanvaPosition(position: AxisPoint): CanvaPoint {
        const x = this._gridCanvaOffsetLeft + ((position.X * this._scale) * this._cellSize.Width) + this._position.X;
        const y = this._gridCanvaOffsetBottom + ((position.Y * this._scale) * this._cellSize.Height) + this._position.Y;

        return new CanvaPoint(x, y);
    }

    GetGridPosition(position: CanvaPoint): AxisPoint {
        const x = (position.X - this._position.X - this.GridCanvaPosition.X) / this._cellSize.Width / this._scale

        const canvaInvertY = -(position.Y - this._gridCanvaSize.Height);
        const y = ((canvaInvertY - this._position.Y + this.GridCanvaPosition.Y) / this._cellSize.Height) / this._scale;

        return new AxisPoint(x, y);
    }

    get GridZeroPoint() {
        const oX = -((this._position.X / this._cellSize.Width) / this._scale);
        const oY = -((this._position.Y / this._cellSize.Height) / this._scale);
        return new AxisPoint(oX, oY);
    }

    get GridSize() {
        const oW = this._settings.gridSize.Width / this._scale;
        const oH = this._settings.gridSize.Height / this._scale;
        return new Size(oW, oH);
    }

    get GridCanvaSize() {
        return this._gridCanvaSize;
    }

    get GridCanvaPosition():CanvaPoint {
        return new CanvaPoint(this._gridCanvaOffsetLeft, this._gridCanvaOffsetBottom);
    }

    public get _cellSize() {
        const cellWidth = this._gridCanvaSize.Width / this._settings.gridSize.Width;
        const cellHeight = this._gridCanvaSize.Height / this._settings.gridSize.Height;

        return new Size(cellWidth, cellHeight);
    }

    MoveCanvasFor(acceleration: CanvaPoint) {
        const newPosition = new CanvaPoint(this._position.X + acceleration.X, this._position.Y - acceleration.Y);
        this._position = newPosition;
    }

    Zoom(scale: number, mouse: CanvaPoint) {
        const gridMousePoint = this.GetGridPosition(mouse);
        const point = CanvaPoint.Scaled(new CanvaPoint(gridMousePoint.X, gridMousePoint.Y), scale);
        this._scale = scale;
        const newGridMousePoint = this.GetGridPosition(mouse);
        const newPoint = CanvaPoint.Scaled(new CanvaPoint(newGridMousePoint.X, newGridMousePoint.Y), scale);

        const dX = (newPoint.X - point.X) * this._cellSize.Width;
        const dY = (point.Y - newPoint.Y) * this._cellSize.Height

        this.MoveCanvasFor(new CanvaPoint(dX, dY));
    }

    Clear(): void {
        this._context.clearRect(0, 0, this._canva.width, this._canva.height);
        if (this._settings.isDebug) {
            this.DebugWindow();
        }
    }

    DrawOrdinatText(
        p: AxisPoint,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle",
        offsetX = 0) {
        const canvaXY = this.GetCanvaPosition(p);

        if (!this.IsVisible(canvaXY)) return;
        Viewer.DrawText(this._canva, canvaXY.X + offsetX, canvaXY.Y, text, size, color, alignVertical, alignHorizontal);
    }

    DrawOrdinatObject(p: AxisPoint): void {
        const canvaXY = this.GetCanvaPosition(p);

        if (!this.IsVisible(canvaXY)) return;
        Viewer.DrawObject(this._canva, canvaXY.X, canvaXY.Y);
    }

    IsVisible(position: CanvaPoint): boolean {
        console.log(position.X)
        const isVisibleX =
            position.X > this.GridCanvaPosition.X &&
            position.X <= this.GridZeroPoint.X + 900;

        const IsVisibleY = true;

        return isVisibleX && IsVisibleY;
    }

    private DebugWindow() {
        const params = [
            `zeroPoint: ${this.GridZeroPoint.ToString()}`,
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