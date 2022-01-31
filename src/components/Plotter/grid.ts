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
    private readonly _extensionGridStepX = 40;
    private readonly _mainGridStepY = 100;
    private readonly _extensionGridStepY = 40;
    private gridStepX: number;
    private gridStepY: number;


    constructor(canva: HTMLCanvasElement, settings: IPlotterSettings) {
        this._canva = canva;
        this._settings = settings;

        this.gridStepX = this._mainGridStepX / (this._canva.width / this._settings.gridSize.Width);
        this.gridStepY = this._mainGridStepY / (this._canva.height / this._settings.gridSize.Height);

        this._isHasTopLinears = settings.gridLinears.includes(GridLinear.Top);
        this._isHasBottomLinears = settings.gridLinears.includes(GridLinear.Bottom);
        this._isHasLeftLinears = settings.gridLinears.includes(GridLinear.Left);
        this._isHasRightLinears = settings.gridLinears.includes(GridLinear.Right);

        const offsets = this.OffsetMapper();
        this._viewer = new PixelViewer(this._canva, settings, offsets);
    }

    DrawGrid() {
        const startPositionX = this._viewer.GridCanvaPosition.X;
        const startPositionY = this._viewer.GridCanvaPosition.Y;
        const stopPositionX = this._viewer.GridCanvaSize.Width + startPositionX;
        const stopPositionY = this._viewer.GridCanvaSize.Height + startPositionY;

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, stopPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, startPositionX, stopPositionY, stopPositionX, stopPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, stopPositionX, startPositionY, 2, "LightSlateGrey");
        Viewer.DrawLine(this._canva, stopPositionX, stopPositionY, stopPositionX, startPositionY, 2, "LightSlateGrey");

        const constantGridStepX = (this._mainGridStepX / (this._canva.width / this._settings.gridSize.Width))
        const deltaX = ((this._viewer.GridSize.Width / this.gridStepX) / (this._settings.gridSize.Width / constantGridStepX)) * 100;

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

            if (index == 0) {
                this.DrawOrdinatLine(new CanvaPoint(x, startPositionY),new CanvaPoint(x, stopPositionY), 11, index, "red", "red", 12);
            } else {
                this.DrawOrdinatLine(new CanvaPoint(x, startPositionY),new CanvaPoint(x, stopPositionY), 8, index, "gray", "Silver", 11);
            }

           const dX2 = this._viewer.GetCanvaPosition(new AxisPoint(index + this.gridStepX, 0)).X
           const t1 = Math.round((dX2 - x) / this._extensionGridStepX);
           const t = (dX2 - x) / t1;

            for (let i = x + t; i < dX2; i += t) {
                this.DrawOrdinatLine(new CanvaPoint (i, startPositionY), new CanvaPoint(i, stopPositionY), 8, this._viewer.GetGridPosition(new CanvaPoint(i, 0)).X, "Gainsboro", "Gainsboro", 11);
            }
        }

        const constantGridStepY = (this._mainGridStepY / (this._canva.height / this._settings.gridSize.Height))
        const deltaY = ((this._viewer.GridSize.Height / this.gridStepY) / (this._settings.gridSize.Height / constantGridStepY)) * 100;

        if (deltaY < 50) {
            this.gridStepY = this.gridStepY / 2;
        }
        if (deltaY > 100) {
            this.gridStepY = this.gridStepY * 2;
        }

        const startY = Math.round(this._viewer.GridZeroPoint.Y / this.gridStepY) * this.gridStepY
        const stopY = startY + this._viewer.GridSize.Height;

        for (let index = startY; index <= stopY; index += this.gridStepY) {
            const y = this._viewer.GetCanvaPosition(new AxisPoint(0, index)).Y

            if (index == 0) {
                this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 11, index, "red", "red", 11);
            } else {
                this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 8, index, "gray", "Silver", 11);
            }
            const dY2 = this._viewer.GetCanvaPosition(new AxisPoint(0, index + this.gridStepY)).Y
            const t1 = Math.round((y - dY2) / this._extensionGridStepY);
            const t = (y - dY2) / t1
            //console.log(index);
            for (let i = y + t; i < dY2; i += t) {
                //console.log(i);
                const point = this._viewer.GetGridPosition(new CanvaPoint(0, i)).Y
                this.DrawAbscissaLine(startPositionX, i, stopPositionX, i, 8, 0, "Gainsboro", "Gainsboro", 11);
            }
        }
    }

    DrawGridObject(p:AxisPoint, label: string) {
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

        return [axis, pixels];
    }

    Zooming(scale: number, mouse: CanvaPoint) {
        this._viewer.Zoom(scale, mouse);

        this.Clear();
        this.DrawGrid();
    }

    private DrawOrdinatLine(p1: CanvaPoint, p2: CanvaPoint, pineSize: number, axis: number, colorText: string, colorLine: string, fontSize: number) {      
        if (!this._viewer.IsVisible(p1) && !this._viewer.IsVisible(p1)) return

        Viewer.DrawLine(this._canva, p1.X, p1.Y, p2.X, p2.Y, 1, colorLine);

        if (this._isHasBottomLinears) {
            Viewer.DrawLine(this._canva, p1.X, p1.Y, p2.X, p1.Y - pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, p1.X, p1.Y - pineSize - 5, (axis).toFixed(1), fontSize, colorText, "center", "top")
        }

        if (this._isHasTopLinears) {
            Viewer.DrawLine(this._canva, p1.X, p2.Y, p2.X, p2.Y + pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, p1.X, p2.Y + pineSize + 5, (axis).toFixed(0), fontSize, colorText, "center", "bottom")
        }
    }

    private DrawAbscissaLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, axis: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        if (this._isHasLeftLinears) {
            Viewer.DrawLine(this._canva, x1 - pineSize, y1, x1, y2, 3, colorLine);
            Viewer.DrawText(this._canva, x1 - pineSize - 5, y1, (axis).toFixed(1), fontSize, colorText, "end", "middle")
        }

        if (this._isHasRightLinears) {
            Viewer.DrawLine(this._canva, x2, y1, x2 + pineSize, y1, 3, colorLine);
            Viewer.DrawText(this._canva, x2 + pineSize + 5, y2, (axis).toFixed(0), fontSize, colorText, "start", "middle")
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
