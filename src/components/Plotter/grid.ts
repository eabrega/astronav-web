import { PixelViewer } from "./pixelViewer";
import { Point } from "./point";

export class Grid {
    private _viewer: PixelViewer;
    private readonly _canva: HTMLCanvasElement;
    private _isMoving = false;
    private _mouseDownX = 0;
    private _scale = 1;
    private _gridWidth: number;
    private _gridHeight: number;
    private startX = 0

    constructor(width: number, height: number, canva: HTMLCanvasElement) {
        this._canva = canva;
        this._viewer = new PixelViewer(this.startX, width, height, this._canva);

        this._gridWidth = width;
        this._gridHeight = height;

        this._canva.addEventListener("wheel", (event: WheelEvent) => this.Scrolling(event));
        this._canva.addEventListener("mousemove", (event: MouseEvent) => this.Moving(event));
        this._canva.addEventListener("mousedown", e => { this._isMoving = true; this._mouseDownX = e.offsetX });
        this._canva.addEventListener("mouseup", e => { this._isMoving = false; this.startX = this._viewer._gridX });
    }

    public DrawGrid() {
        this._viewer.DrawLine(this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, 2);
        this._viewer.DrawLine(this._viewer.GridStartPixelX, this._viewer.GridStartPixelsY, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 2);
        this._viewer.DrawLine(this._viewer.GridStartPixelX, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, 2);
        this._viewer.DrawLine(this._viewer.GridWidthPixels, this._viewer.GridHeightPixels, this._viewer.GridWidthPixels, this._viewer.GridStartPixelsY, 2);

        for (let index = this._viewer.GridX; index <= this._gridWidth; index += this._viewer.Step) {
            if (this._viewer.toCanvaX(index) > this._viewer.GridWidthPixels) break;
            this._viewer.DrawLine(this._viewer.toCanvaX(index), this._viewer.GridStartPixelsY, this._viewer.toCanvaX(index), this._viewer.GridHeightPixels);

            this._viewer.DrawLine(this._viewer.toCanvaX(index), 20, this._viewer.toCanvaX(index), 30);
            this._viewer.DrawText(this._viewer.toCanvaX(index), 5, index.toFixed(0), 11, "black", "center")
        }

        for (let index = 0; index <= this._gridHeight; index += this._viewer.Step) {
            if (this._viewer.toCanvaY(index) > this._viewer.GridHeightPixels) break;
            this._viewer.DrawLine(this._viewer.GridStartPixelX, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels, this._viewer.toCanvaY(index));

            this._viewer.DrawLine(this._viewer.GridWidthPixels, this._viewer.toCanvaY(index), this._viewer.GridWidthPixels + 10, this._viewer.toCanvaY(index));
            this._viewer.DrawText(this._viewer.GridWidthPixels + 20, this._viewer.toCanvaY(index),  index.toFixed(0), 11, "black", "center")
        }

        this._viewer.DrawOrdinatLine(0, 0, 40, 40);
    }

    public DrawGridObject(x: number, y: number, label: string) {
        if (this._viewer.IsVisible(new Point(x, y))) {
            this._viewer.DrawText(this._viewer.toCanvaX(x) + 10, this._viewer.toCanvaY(y), label, 15.5, "green", "left", "middle")
            this._viewer.DrawOrdinatObject(x, y);
        }
    }

    public Clear(): void {
        this._viewer.Clear();
    }
    private Scrolling(e: WheelEvent) {
        if (e.deltaY > 0) {
            this._scale += 0.1;
        }
        else {
            this._scale += -0.1;
        }

        if (this._scale < 1) this._scale = 1;

        this._viewer = new PixelViewer(this.startX, this._gridWidth / this._scale, this._gridHeight / this._scale, this._canva)
        this.Clear();
        this.DrawGrid();
        //this.DrawPlanetCollection(this._frames![this._frameId].Objects);
    }

    private Moving(e: MouseEvent) {
        if (this._isMoving) {
            const dx = this._viewer.toGridX(this._mouseDownX - e.offsetX)
            this.Clear();
            this._viewer = new PixelViewer(this.startX + dx, this._gridWidth / this._scale, this._gridHeight / this._scale, this._canva)
            this.DrawGrid();
        }
    }
}
