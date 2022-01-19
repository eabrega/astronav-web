import { PixelViewer } from "./pixelViewer";
import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class Grid {
    private _viewer: PixelViewer;
    private _scale: number = 1;
    private readonly _canva: HTMLCanvasElement;
    private _gridWidth: number;
    private _gridHeight: number;
    private _ordinatX: number = 0;
    private _ordinatY: number = 0;
    private _ordinatStepX: number;
    private _ordinatStepY: number;

    constructor(width: number, height: number, ordinatStepX: number, ordinatStepY: number, canva: HTMLCanvasElement) {
        this._canva = canva;
        this._viewer = new PixelViewer(new Point(0, 0), width, height, this._canva);

        this._gridWidth = width;
        this._gridHeight = height;
        this._ordinatStepX = ordinatStepX;
        this._ordinatStepY = ordinatStepY;
    }

    public DrawGrid() {
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, 1);
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, 1);
        Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 1);
        Viewer.DrawLine(this._canva, this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 1);

        const startX = this._ordinatX * this._ordinatStepX
        const stopX = this._gridWidth + this._ordinatX * this._ordinatStepX

        for (let index = startX; index <= stopX; index += this._ordinatStepX) {
            if (this._viewer.toCanvaX(index) < this._viewer.GridStartPixelX) continue;
            if (this._viewer.toCanvaX(index) > this._viewer.GridWidthPixels) break;
            if (index == 0) {
                Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), this._viewer.GridHeightPixels, 2);

                Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), 20, 3);             
                Viewer.DrawText(this._canva, this._viewer.toCanvaX(index), 5, (index).toFixed(0), 13, "red", "center")
            }
            else {
                Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), this._viewer.GridHeightPixels, 1);

                Viewer.DrawLine(this._canva, this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), 20, 3);
                Viewer.DrawText(this._canva, this._viewer.toCanvaX(index), 5, (index*this._scale).toFixed(0), 11, "black", "center")
            }
        }

        const startY = this._ordinatY * this._ordinatStepY
        const stopY = this._gridHeight + this._ordinatY * this._ordinatStepY

        for (let index = startY; index <= stopY; index += this._ordinatStepY) {
            if (this._viewer.toCanvaY(index) < this._viewer.GridStartPixelsY) continue;
            if (this._viewer.toCanvaY(index) > this._viewer.GridHeightPixels) break;
            if (index == 0) {
                Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), 2);

                Viewer.DrawLine(this._canva, this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels + 10, this._viewer.toCanvaY(index), 3);
                Viewer.DrawText(this._canva, this._viewer.GridWidthPixels + 20, this._viewer.toCanvaY(index), index.toFixed(0), 13, "red", "center")
            }
            else {
                Viewer.DrawLine(this._canva, this._viewer.GridStartPixelX, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels, this._viewer.toCanvaY(index));

                Viewer.DrawLine(this._canva, this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels + 10, this._viewer.toCanvaY(index), 3);
                Viewer.DrawText(this._canva, this._viewer.GridWidthPixels + 20, this._viewer.toCanvaY(index), (index*this._scale).toFixed(0), 11, "black", "center")
            }
        }
    }

    public DrawGridObject(x: number, y: number, label: string) {
       // if (this._viewer.IsVisible(new Point(x, y))) {
            //Viewer.DrawText(this._canva, this._viewer.toCanvaX(x) + 10, this._viewer.toCanvaY(y), label, 15.5, "green", "left", "middle")
            this._viewer.DrawOrdinatText(x,y,label, 15.5, "green", "left", "middle", 10)
            this._viewer.DrawOrdinatObject(x, y);
      //  }
    }

    public Clear(): void {
        this._viewer.Clear();
    }

    public MoveGrid(position: Point) {
        this._ordinatX = Math.round(-1 * (this._viewer.Position.X / this._viewer._cellSizeX) / this._ordinatStepX);
        this._ordinatY = Math.round(-1 * (this._viewer.Position.Y / this._viewer._cellSizeY) / this._ordinatStepY);

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
}
