import { PixelViewer } from "./pixelViewer";

export class Grid {
    private readonly _viewer: PixelViewer;
    private _gridWidth: number;
    private _gridHeight: number;

    constructor(width: number, height: number, canva: HTMLCanvasElement) {
        this._gridWidth = width;
        this._gridHeight = height;

        this._viewer = new PixelViewer(width, height, canva);

        this.DrawGrid();
    }

    public DrawGrid() {
        this._viewer.DrawOrdinatLine(0, this._gridHeight, this._gridWidth, this._gridHeight);
        this._viewer.DrawOrdinatLine(this._gridWidth, 0, this._gridWidth, this._gridHeight);

        for (let index = this._viewer.GridX; index < this._gridWidth + 1; index += this._viewer.Step) {
            this._viewer.DrawOrdinatLine(index, 0, index, this._gridHeight);

            //this._viewer.DrawLine(this.toCanvaX(index), this._gridPixelsHeight, this.toCanvaX(index), this._gridPixelsHeight + 11);
            //this.DrawText(this._viewer.toCanvaX(index), this._viewer.GridWidthPixels + 11 + 10, index.toString(), 11, "black", "center");
        }

        for (let index = 0; index < this._gridHeight + 1; index += this._viewer.Step) {
            this._viewer.DrawOrdinatLine(0, index, this._gridWidth, index);
        }

        //this._viewer.DrawOrdinatLine(10, 0, 50, 50);
    }

    public Clear(): void {
        this._viewer.Clear();
    }

    public DrawGridObject(x: number, y: number, label:string) {
        this._viewer.DrawOrdinatText(x+2, y, label, 15.5, "green")
        this._viewer.DrawOrdinatObject(x, y);
    }
}
