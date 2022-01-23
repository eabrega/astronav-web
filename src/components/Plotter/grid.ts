import { PixelViewer } from "./pixelViewer";
import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class Grid {
    private _viewer: PixelViewer;
    private _scale: number = 1;
    private readonly _canva: HTMLCanvasElement;

    constructor(size: Size, canva: HTMLCanvasElement) {
        this._canva = canva;
        this._viewer = new PixelViewer(new Point(0, 0), size, this._canva);
    }

    public DrawGrid() {
        const startPositionX = this._viewer.GridCanvaPosition.X;
        const startPositionY = this._viewer.GridCanvaPosition.Y;
        const stopPositionX = this._viewer.GridCanvaSize.Width + startPositionX;
        const stopPositionY = this._viewer.GridCanvaSize.Height + startPositionY;

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, stopPositionY, stopPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, stopPositionX, startPositionY, 3);
        Viewer.DrawLine(this._canva, stopPositionX, stopPositionY, stopPositionX, startPositionY, 3);

        const ordX = [20, 10, 5, 5, 5, 3, 3, 2];

        let gridStepX = ordX[Math.round(this._scale - 1)] ?? 1;

        const startX = Math.round(this._viewer.OrdinatPosition.X / gridStepX) * gridStepX
        const stopX = startX + this._viewer.OrdinatSize.Width;

        for (let index = startX; index <= stopX; index += gridStepX) {
            const x = this._viewer.toCanvaPosition(new Point(index, 0)).X

            if (x < startPositionX) continue;
            if (x > stopPositionX) break;

            if (index == 0) {
                this.DrawOrdinatLine(x, startPositionY, x, stopPositionY, 11, index, "red", "red", 12);
                continue;
            }

            this.DrawOrdinatLine(x, startPositionY, x, stopPositionY, 9, index, "gray", "gray", 11);
        }

        const ord = [10, 5, 5, 5, 3, 3, 2, 2];

        let gridStep = ord[Math.round(this._scale - 1)] ?? 1;

        const startY = Math.round(this._viewer.OrdinatPosition.Y / gridStep) * gridStep
        const stopY = startY + this._viewer.OrdinatSize.Height;

        for (let index = startY; index <= stopY; index += gridStep) {
            const y = this._viewer.toCanvaPosition(new Point(0, index)).Y

            if (y < startPositionY) continue;
            if (y > stopPositionY) break;

            if (index == 0) {
                this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 11, index, "red", "red", 11);
                continue;
            }

            this.DrawAbscissaLine(startPositionX, y, stopPositionX, y, 9, index, "gray", "gray", 11);
        }
    }

    public DrawGridObject(x: number, y: number, label: string) {
        this._viewer.DrawOrdinatText(x, y, label, 15.5, "green", "left", "middle", 10)
        this._viewer.DrawOrdinatObject(x, y);
    }

    public Clear(): void {
        this._viewer.Clear();
    }

    public MoveGrid(position: Point) {
        this._viewer.MoveFor(position);
        this.Clear();
        this.DrawGrid();
    }

    public Zooming(scale: number, mouse: Point) {
        this._scale = scale;
        this._viewer.Zoom(scale, mouse);

        this.Clear();
        this.DrawGrid();
    }

    public toGridPosition(position: Point) {
        return this._viewer.toGridPosition(position);
    }

    private DrawOrdinatLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        Viewer.DrawLine(this._canva, x1, y1, x2, y1 - pineSize, 3, colorLine);
        Viewer.DrawText(this._canva, x1, y1 - pineSize - 5, (index).toFixed(0), fontSize, colorText, "center", "top")

        Viewer.DrawLine(this._canva, x1, y2, x2, y2 + pineSize, 3, colorLine);
        Viewer.DrawText(this._canva, x1, y2 + pineSize + 5, (index).toFixed(0), fontSize, colorText, "center", "bottom")
    }

    private DrawAbscissaLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        Viewer.DrawLine(this._canva, x1 - pineSize, y1, x1, y2, 3, colorLine);
        Viewer.DrawText(this._canva, x1 - pineSize - 5, y1, (index).toFixed(0), fontSize, colorText, "end", "middle")

        Viewer.DrawLine(this._canva, x2, y1, x2 + pineSize, y1, 3, colorLine);
        Viewer.DrawText(this._canva, x2 + pineSize + 5, y2, (index).toFixed(0), fontSize, colorText, "start", "middle")
    }
}
