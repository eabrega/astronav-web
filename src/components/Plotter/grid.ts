import { GridLinear, IPlotterSettings } from "./IPlotterSettings";
import { PixelViewer } from "./Viewer/pixelViewer";
import { Point } from "./point";
import * as Viewer from "./Viewer/viewer"
import { IOffset, Offset } from "./Viewer/IOffset";

export class Grid {
    private _viewer: PixelViewer;
    private _scale: number = 1;
    private readonly _settings: IPlotterSettings;
    private readonly _canva: HTMLCanvasElement;
    private readonly _isHasTopLinears: boolean;
    private readonly _isHasBottomLinears: boolean;
    private readonly _isHasLeftLinears: boolean;
    private readonly _isHasRightLinears: boolean;


    constructor(canva: HTMLCanvasElement, settings: IPlotterSettings) {
        this._canva = canva;
        this._settings = settings;

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

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, stopPositionY, stopPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, stopPositionX, startPositionY, 3);
        Viewer.DrawLine(this._canva, stopPositionX, stopPositionY, stopPositionX, startPositionY, 3);

        let gridStep = 10

        const startX = Math.round(this._viewer.GridPosition.X / gridStep) * gridStep
        const stopX = startX + this._viewer.OrdinatSize.Width;

        for (let index = startX; index <= stopX; index += gridStep) {
            const x = this._viewer.GetCanvaPosition(new Point(index, 0)).X

            // if (x < startPositionX) continue;
            // if (x > stopPositionX) break;

            if (index == 0) {
                this.DrawOrdinatLine(x, startPositionY, x, stopPositionY, 11, index, "red", "red", 12);
                //continue;
            }

            this.DrawOrdinatLine(x, startPositionY, x, stopPositionY, 9, index, "gray", "Silver", 11);

            const dX2 = this._viewer.GetCanvaPosition(new Point(index + gridStep, 0)).X
            const t = (dX2 - x) / Math.round(this._scale)

            for (let i = x + t; i < dX2 - 1; i += t) {
                this.DrawOrdinatLine(i, startPositionY, i, stopPositionY, 9, 0, "Gainsboro", "Gainsboro", 11);
            }
        }

        const startY = Math.round(this._viewer.GridPosition.Y / gridStep) * gridStep
        const stopY = startY + this._viewer.OrdinatSize.Height;

        for (let index = startY; index <= stopY; index += gridStep) {
            const y = this._viewer.GetCanvaPosition(new Point(0, index)).Y

            // if (y < startPositionY) continue;
            // if (y > stopPositionY) break;

            if (index == 0) {
                this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 11, index, "red", "red", 11);
               // continue;
            }

            this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 9, index, "gray", "Silver", 11);

            const dY2 = this._viewer.GetCanvaPosition(new Point(0, index + gridStep)).Y
            const t = (dY2 - y) / Math.round(this._scale)

            for (let i = y + t; i < dY2 - 1; i += t) {
                this.DrawAbscissaLine(startPositionX, i, stopPositionX, i, 9, 0, "Gainsboro", "Gainsboro", 11);
            }
        }
    }

    DrawGridObject(x: number, y: number, label: string) {
        this._viewer.DrawOrdinatText(x, y, label, 15.5, "green", "left", "middle", 10)
        this._viewer.DrawOrdinatObject(x, y);
    }

    Clear(): void {
        this._viewer.Clear();
    }

    MoveGrid(position: Point) {
        this._viewer.MoveFor(position);
        this.Clear();
        this.DrawGrid();
    }

    Zooming(scale: number, mouse: Point) {
        this._scale = scale;
        this._viewer.Zoom(scale, mouse);

        this.Clear();
        this.DrawGrid();
    }

    ToGridPosition(position: Point) {
        return this._viewer.GetGridPosition(position);
    }

    private DrawOrdinatLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        if (this._isHasBottomLinears) {
            Viewer.DrawLine(this._canva, x1, y1, x2, y1 - pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, x1, y1 - pineSize - 5, (index).toFixed(0), fontSize, colorText, "center", "top")
        }

        if (this._isHasTopLinears) {
            Viewer.DrawLine(this._canva, x1, y2, x2, y2 + pineSize, 3, colorLine);
            Viewer.DrawText(this._canva, x1, y2 + pineSize + 5, (index).toFixed(0), fontSize, colorText, "center", "bottom")
        }
    }

    private DrawAbscissaLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        if (this._isHasLeftLinears) {
            Viewer.DrawLine(this._canva, x1 - pineSize, y1, x1, y2, 3, colorLine);
            Viewer.DrawText(this._canva, x1 - pineSize - 5, y1, (index).toFixed(0), fontSize, colorText, "end", "middle")
        }

        if (this._isHasRightLinears) {
            Viewer.DrawLine(this._canva, x2, y1, x2 + pineSize, y1, 3, colorLine);
            Viewer.DrawText(this._canva, x2 + pineSize + 5, y2, (index).toFixed(0), fontSize, colorText, "start", "middle")
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
