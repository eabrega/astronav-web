import { PixelViewer } from "./pixelViewer";
import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class Grid {
    private _viewer: PixelViewer;
    private readonly _canva: HTMLCanvasElement;
    private _gridWidth: number;
    private _gridHeight: number;

    constructor(width: number, height: number, canva: HTMLCanvasElement) {
        this._canva = canva;
        this._viewer = new PixelViewer(new Point(0, 0), width, height, this._canva);

        this._gridWidth = width;
        this._gridHeight = height;
    }

    public DrawGrid() {
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, 2);
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, 2);
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 2);
        Viewer.DrawLine(this._canva, this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 2);

         for (let index =0; index <= 360; index += 10) {
            //if (this._viewer.toCanvaX(index) > this._viewer.GridWidthPixels) break;
            //  if (this._viewer.toCanvaX(index) < this._viewer.GridStartPixelX) break;
            Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), this._viewer.GridHeightPixels);
            //Viewer.DrawLine(this._canva, this._viewer._cellSizeX*index, this._viewer.GridStartPixelsY, this._viewer._cellSizeX*index, this._viewer.GridHeightPixels);
            Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), 20, this._viewer.toCanvaX(index), 30);     
            Viewer.DrawText(this._canva, this._viewer.toCanvaX(index), 5, index.toFixed(0), 11, "black", "center")
        }

        for (let index = 0; index <= this._gridHeight; index += 10) {
            if (this._viewer.toCanvaY(index) > this._viewer.GridHeightPixels) break;
            Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels, this._viewer.toCanvaY(index));

            Viewer.DrawLine(this._canva, this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels + 10, this._viewer.toCanvaY(index));
            Viewer.DrawText(this._canva, this._viewer.GridWidthPixels + 20, this._viewer.toCanvaY(index), index.toFixed(0), 11, "black", "center")
        }

    }

    public DrawGridObject(x: number, y: number, label: string) {
        if (this._viewer.IsVisible(new Point(x, y))) {
            Viewer.DrawText(this._canva, this._viewer.toCanvaX(x) + 10, this._viewer.toCanvaY(y), label, 15.5, "green", "left", "middle")
            this._viewer.DrawOrdinatObject(x, y);
        }
    }

    public Clear(): void {
        this._viewer.Clear();
    }

    public MoveGrid(position: Point) {
        this._viewer.MoveFor(position);
        this.Clear();
        this.DrawGrid();
    }

    public toGridPosition(position: Point) {
        return this._viewer.toGridPosition(position);
    }
}
