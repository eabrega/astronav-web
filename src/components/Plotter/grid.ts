import { PixelViewer } from "./pixelViewer";
import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class Grid {
    private _viewer: PixelViewer;
    private _scale: number = 1;
    private readonly _canva: HTMLCanvasElement;
    private _ordinatX: number = 0;
    private _ordinatY: number = 0;
    private _ordinatStepX: number;
    private _ordinatStepY: number;

    constructor(size: Size, ordinatStepX: number, ordinatStepY: number, canva: HTMLCanvasElement) {
        this._canva = canva;
        this._viewer = new PixelViewer(new Point(0, 0), size, this._canva);

        this._ordinatStepX = ordinatStepX;
        this._ordinatStepY = ordinatStepY;
    }

    public DrawGrid() {
        const startPositionX = this._viewer.GridCanvaPosition.X;
        const startPositionY = this._viewer.GridCanvaPosition.Y;
        const gridCanvaHeight = this._viewer.GridCanvaSize.Height;
        const gridCanvaWidth = this._viewer.GridCanvaSize.Width;

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, gridCanvaHeight, 1);
        Viewer.DrawLine(this._canva, startPositionX, gridCanvaHeight, gridCanvaWidth, gridCanvaHeight, 1);
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, gridCanvaWidth, startPositionY, 1);
        Viewer.DrawLine(this._canva, gridCanvaWidth, gridCanvaHeight, gridCanvaWidth, startPositionY, 1);

        const startX = this._ordinatX * this._ordinatStepX
        const stopX = this._viewer.Size.Width + this._ordinatX * this._ordinatStepX

        for (let index = startX; index <= stopX; index += this._ordinatStepX) {
            const canvaX = this._viewer.toCanvaPosition(new Point(index, 0)).X;

            if (canvaX < startPositionX) continue;
            if (canvaX > gridCanvaWidth) break;

            if (index == 0 || index == 90 || index == 180 || index == 270) {
                this.DrawOrdinatLine(canvaX, startPositionY, canvaX, gridCanvaHeight, 12, index, "red", "red", 12);
            }
            else {
                this.DrawOrdinatLine(canvaX, startPositionY, canvaX, gridCanvaHeight, 9, index, "gray", "gray", 11);
            }
        }

        const startY = this._ordinatY * this._ordinatStepY
        const stopY = this._viewer.Size.Height + this._ordinatY * this._ordinatStepY

        for (let index = startY; index <= stopY; index += this._ordinatStepY) {
            const canvaY = this._viewer.toCanvaPosition(new Point(0, index)).Y;

            if (canvaY < startPositionY) continue;
            if (canvaY > gridCanvaHeight) break;
            if (index == 0) {
                this.DrawAbscissaLine(startPositionX, canvaY, gridCanvaWidth, canvaY, 12, index, "red", "red", 12);
            }
            else {
                this.DrawAbscissaLine(startPositionX, canvaY, gridCanvaWidth, canvaY, 9, index, "gray", "gray", 11);
            }
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
        this._ordinatX = Math.round(-1 * (this._viewer.Position.X / this._viewer.CellSize.Width) / this._ordinatStepX);
        this._ordinatY = Math.round(-1 * (this._viewer.Position.Y / this._viewer.CellSize.Height) / this._ordinatStepY);

        this._viewer.MoveFor(position);
        this.Clear();
        this.DrawGrid();
    }

    public Zooming(scale: number) {
        this._scale = scale;
        this._viewer.Scale = scale;
        this.Clear();
        this.DrawGrid();
    }

    public toGridPosition(position: Point) {
        return this._viewer.toGridPosition(position);
    }

    private DrawOrdinatLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        Viewer.DrawLine(this._canva, x1, y1, x2, y1 - pineSize, 3, colorLine);
        Viewer.DrawText(this._canva, x1, y1 - pineSize - 5, (index * this._scale).toFixed(0), fontSize, colorText, "center", "top")

        Viewer.DrawLine(this._canva, x1, y2, x2, y2 + pineSize, 3, colorLine);
        Viewer.DrawText(this._canva, x1, y2 + pineSize + 5, (index * this._scale).toFixed(0), fontSize, colorText, "center", "bottom")
    }

    private DrawAbscissaLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
        Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

        Viewer.DrawLine(this._canva, x1 - pineSize, y1, x1, y2, 3, colorLine);
        Viewer.DrawText(this._canva, x1 - pineSize - 5, y1, (index * this._scale).toFixed(0), fontSize, colorText, "end", "middle")

        Viewer.DrawLine(this._canva, x2, y1, x2 + pineSize, y1, 3, colorLine);
        Viewer.DrawText(this._canva, x2 + pineSize + 5, y2, (index * this._scale).toFixed(0), fontSize, colorText, "start", "middle")
    }
}
