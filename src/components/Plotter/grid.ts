import { GridLinear, IPlotterSettings } from "./IPlotterSettings";
import { PixelViewer } from "./Viewer/pixelViewer";
import * as Viewer from "./Viewer/viewer"
import { IOffset, Offset } from "./Viewer/IOffset";
import { AxisPoint } from "./Points/axisPoint";
import { CanvaPoint } from "./Points/canvaPoint";
import { IPoint } from "./Points/iPoint";

export class Grid {
    private _viewer: PixelViewer;
    private readonly _settings: IPlotterSettings;
    private readonly _canva: HTMLCanvasElement;
    private readonly _isHasTopLinears: boolean;
    private readonly _isHasBottomLinears: boolean;
    private readonly _isHasLeftLinears: boolean;
    private readonly _isHasRightLinears: boolean;
    private readonly _mainGridStepX = 100;
    private readonly _extensionGridStepX = 50;
    private readonly _mainGridStepY = 100;
    private readonly _extensionGridStepY = 45;
    private gridStepX: number;
    private gridStepY: number;


    constructor(canva: HTMLCanvasElement, settings: IPlotterSettings) {
        this._canva = canva;
        this._settings = settings;

        this.gridStepX = this._mainGridStepX / (this._canva.width / this._settings.axisSize.Width);
        this.gridStepY = this._mainGridStepY / (this._canva.height / this._settings.axisSize.Height);

        this._isHasTopLinears = settings.gridLinears.includes(GridLinear.Top);
        this._isHasBottomLinears = settings.gridLinears.includes(GridLinear.Bottom);
        this._isHasLeftLinears = settings.gridLinears.includes(GridLinear.Left);
        this._isHasRightLinears = settings.gridLinears.includes(GridLinear.Right);

        const offsets = this.OffsetMapper();
        this._viewer = new PixelViewer(this._canva, settings, offsets);
    }

    DrawGrid() {
        const startPositionX = this._viewer.GridCanvaStartPosition.X;
        const startPositionY = this._viewer.GridCanvaStartPosition.Y;
        const stopPositionX = this._viewer.GridCanvaSize.Width + startPositionX;
        const stopPositionY = this._viewer.GridCanvaSize.Height + startPositionY;

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, stopPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, startPositionX, stopPositionY, stopPositionX, stopPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, stopPositionX, startPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, stopPositionX, stopPositionY, stopPositionX, startPositionY, 2, "LightSlateGrey");

        const constantGridStepX = (this._mainGridStepX / (this._canva.width / this._settings.axisSize.Width))
        const deltaX = ((this._viewer.GridSize.Width / this.gridStepX) / (this._settings.axisSize.Width / constantGridStepX)) * 100;

        if (deltaX < 50) {
            this.gridStepX = this.gridStepX / 2;
        }
        if (deltaX > 100) {
            this.gridStepX = this.gridStepX * 2;
        }

        const startX = Math.round(this._viewer.GridZeroPoint.X / this.gridStepX) * this.gridStepX
        const stopX = startX + this._viewer.GridSize.Width;

        for (let index = startX - this.gridStepX; index <= stopX + this.gridStepX; index += this.gridStepX) {
            const x = this._viewer.GetCanvaPosition(new AxisPoint(index, startPositionY)).X

            const p1 = new CanvaPoint(x, startPositionY)
            const p2 = new CanvaPoint(x, stopPositionY)

            if (index == 0) {
                this.DrawOrdinatLine(p1, p2, 11, index, "red", "red", 12);
            } else {
                this.DrawOrdinatLine(p1, p2, 8, index, "gray", "Silver", 11);
            }

            const dX2 = this._viewer.GetCanvaPosition(new AxisPoint(index + this.gridStepX, 0)).X
            const t1 = Math.round((dX2 - x) / this._extensionGridStepX);
            const t = (dX2 - x) / t1;

            for (let i = x + t; i < dX2; i += t) {
                const number = this._viewer.GetGridPosition(new CanvaPoint(i, 0)).X;
                const p1 = new CanvaPoint(i, startPositionY);
                const p2 = new CanvaPoint(i, stopPositionY);
                this.DrawOrdinatLine(p1, p2, 8, number, "Gainsboro", "Gainsboro", 11);
            }
        }

        const constantGridStepY = (this._mainGridStepY / (this._canva.height / this._settings.axisSize.Height))
        const deltaY = ((this._viewer.GridSize.Height / this.gridStepY) / (this._settings.axisSize.Height / constantGridStepY)) * 100;

        if (deltaY < 50) {
            this.gridStepY = this.gridStepY / 2;
        }
        if (deltaY > 100) {
            this.gridStepY = this.gridStepY * 2;
        }

        const startY = Math.round(this._viewer.GridZeroPoint.Y / this.gridStepY) * this.gridStepY
        const stopY = startY + this._viewer.GridSize.Height;

        for (let index = startY - this.gridStepY; index <= stopY + this.gridStepY; index += this.gridStepY) {
            const y = this._viewer.GetCanvaPosition(new AxisPoint(0, index)).Y

            const p1 = new CanvaPoint(startPositionX, y)
            const p2 = new CanvaPoint(stopPositionX, y)
            if (index == 0) {
                this.DrawAbscissaLine(p1, p2, 11, index, "red", "red", 11);
            } else {
                this.DrawAbscissaLine(p1, p2, 8, index, "gray", "Silver", 11);
            }
            const dY2 = this._viewer.GetCanvaPosition(new AxisPoint(0, index + this.gridStepY)).Y
            const t1 = Math.round((y - dY2) / this._extensionGridStepY);
            const t = (y - dY2) / t1

            for (let i = y + t; i < dY2; i += t) {
                const p1 = new CanvaPoint(startPositionX, i)
                const p2 = new CanvaPoint(stopPositionX, i)
                const number = this._viewer.GetGridPosition(new CanvaPoint(0, this._canva.height - i)).Y;
                this.DrawAbscissaLine(p1, p2, 8, number, "Gainsboro", "Gainsboro", 11);
            }
        }
    }

    DrawGridObject(p: AxisPoint, label: string) {
        this._viewer.DrawOrdinatText(p, label, 15.5, "green", "left", "middle", 10)
        this._viewer.DrawOrdinatObject(p);
    }

    Clear(): void {
        this._viewer.Clear();
    }

    MoveGrid(position: CanvaPoint) {
        this._viewer.MoveCanvasFor(position);
        this.Clear();
        this.DrawGrid();
    }

    Click(mousePosition: CanvaPoint): Array<IPoint> {
        const axis = this._viewer.GetGridPosition(mousePosition);
        const pixels = this._viewer.GetCanvaPosition(axis);

        console.log(axis);

        return [axis, pixels];
    }

    Zooming(scale: number, mouse: CanvaPoint) {
        this._viewer.Zoom(scale, mouse);

        this.Clear();
        this.DrawGrid();
    }

    private DrawOrdinatLine(p1: CanvaPoint, p2: CanvaPoint, pineSize: number, axis: number, colorText: string, colorLine: string, fontSize: number) {
        if (!this._viewer.IsVisible(p1) && !this._viewer.IsVisible(p2)) return

        Viewer.DrawLine(this._canva, p1.X, p1.Y, p2.X, p2.Y, 1, colorLine);

        if (this._isHasBottomLinears) {
            Viewer.DrawLine(this._canva, p1.X, p1.Y, p2.X, p1.Y - pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, p1.X, p1.Y - pineSize - 5, (axis).toFixed(this._settings.gridAccuracy), fontSize, colorText, "center", "top")
        }

        if (this._isHasTopLinears) {
            Viewer.DrawLine(this._canva, p1.X, p2.Y, p2.X, p2.Y + pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, p1.X, p2.Y + pineSize + 5, (axis).toFixed(this._settings.gridAccuracy), fontSize, colorText, "center", "bottom")
        }
    }

    private DrawAbscissaLine(p1: CanvaPoint, p2: CanvaPoint, pineSize: number, axis: number, colorText: string, colorLine: string, fontSize: number) {
        if (!this._viewer.IsVisible(p1) && !this._viewer.IsVisible(p2)) return
        Viewer.DrawLine(this._canva, p1.X, p1.Y, p2.X, p2.Y, 1, colorLine);

        if (this._isHasLeftLinears) {
            Viewer.DrawLine(this._canva, p1.X - pineSize, p1.Y, p1.X, p2.Y, 3, colorLine);
            Viewer.DrawText(this._canva, p1.X - pineSize - 5, p1.Y, (axis).toFixed(this._settings.gridAccuracy), fontSize, colorText, "end", "middle")
        }

        if (this._isHasRightLinears) {
            Viewer.DrawLine(this._canva, p2.X, p1.Y, p2.X + pineSize, p1.Y, 3, colorLine);
            Viewer.DrawText(this._canva, p2.X + pineSize + 5, p2.Y, (axis).toFixed(this._settings.gridAccuracy), fontSize, colorText, "start", "middle")
        }
    }

    private OffsetMapper(): Array<IOffset> {
        let offsets = new Array<IOffset>();

        this._isHasTopLinears ? offsets.push({ offset: Offset.Top, size: 30 }) : null;
        this._isHasBottomLinears ? offsets.push({ offset: Offset.Bottom, size: 30 }) : null;
        this._isHasLeftLinears ? offsets.push({ offset: Offset.Left, size: 40 }) : null;
        this._isHasRightLinears ? offsets.push({ offset: Offset.Right, size: 40 }) : null;

        return offsets;
    }
}
