import { PixelViewer } from "./pixelViewer";

export class Grid {
    private readonly _viewer: PixelViewer;
    private _gridWidth: number;
    private _gridHeight: number;

    constructor(width: number, height: number, canva: HTMLCanvasElement) {
        this._viewer = new PixelViewer(width, height, canva);

        this._gridWidth = width;
        this._gridHeight = height;

        this.DrawGrid();
    }

    public DrawGrid() {
        this._viewer.DrawOrdinatLine(0, this._gridHeight, this._gridWidth, this._gridHeight, 2);
        this._viewer.DrawOrdinatLine(this._gridWidth, 0, this._gridWidth, this._gridHeight, 2);

        this._viewer.DrawOrdinatLine(0, 0, 0, this._gridHeight, 2);
        this._viewer.DrawOrdinatLine(0, 0, this._gridWidth, 0, 2);

        for (let index = this._viewer.GridX; index < this._gridWidth + 1; index += this._viewer.Step) {
            this._viewer.DrawOrdinatLine(index, 0, index, this._gridHeight);

            this._viewer.DrawLine(this._viewer.toCanvaX(index), 20, this._viewer.toCanvaX(index), 30);
            this._viewer.DrawText(this._viewer.toCanvaX(index), 5, index.toString(), 11, "black", "center")
        }

        for (let index = 0; index < this._gridHeight + 1; index += this._viewer.Step) {
            this._viewer.DrawOrdinatLine(0, index, this._gridWidth, index);

            this._viewer.DrawLine(this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels + 10, this._viewer.toCanvaY(index));
            this._viewer.DrawText(this._viewer.GridWidthPixels + 20, this._viewer.toCanvaY(index), index.toString(), 11, "black", "center")
        }

        this._viewer.DrawOrdinatLine(0, 0, 40, 40);
    }

    public Clear(): void {
        this._viewer.Clear();
    }

    public DrawGridObject(x: number, y: number, label: string) {
        this._viewer.DrawOrdinatText(x + 2, y, label, 15.5, "green")
        this._viewer.DrawOrdinatObject(x, y);
    }
}
