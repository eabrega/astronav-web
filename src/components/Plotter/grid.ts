import { PixelViewer } from "./pixelViewer";
import { Point, Size } from "./point";
import * as Viewer from "./viewer"

export class Grid {
    private _viewer: PixelViewer;
    private _scale: number = 1;
    private readonly _canva: HTMLCanvasElement;
    //   private _ordinatX: number = 0;
    //   private _ordinatY: number = 0;
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
        const stopPositionX = this._viewer.GridCanvaSize.Width + startPositionX;
        const stopPositionY = this._viewer.GridCanvaSize.Height + startPositionY;

        Viewer.DrawLine(this._canva, startPositionX, startPositionY, startPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, stopPositionY, stopPositionX, stopPositionY, 3);
        Viewer.DrawLine(this._canva, startPositionX, startPositionY, stopPositionX, startPositionY, 3);
        Viewer.DrawLine(this._canva, stopPositionX, stopPositionY, stopPositionX, startPositionY, 3);

        //  const startX = this._viewer._ordinatPosition.X * this._ordinatStepX
        // const stopX = this._viewer.Size.Width + this._viewer._ordinatPosition.X * this._ordinatStepX

        // for (let index = this._viewer._ordinatPosition.X; index <= this._viewer._ordinatPosition.X+360; index++) {
        //     const canvaX = this._viewer.toCanvaPosition(new Point(index*20, 0)).X * this._scale;

        //     // if (canvaX < startPositionX) continue;
        //     // if (canvaX > gridCanvaWidth) break;

        //     // if (index == 0 ){
        //     //     this.DrawOrdinatLine(canvaX, startPositionY, canvaX, gridCanvaHeight, 12, index, "red", "red", 12);
        //     // }
        //     // else {
        //         this.DrawOrdinatLine(canvaX, startPositionY, canvaX, gridCanvaHeight, 9, index, "gray", "gray", 11);
        //    // }
        // }

        // const startX = this._viewer.OrdinatPosition.X * this._ordinatStepX
        // const stopX = this._viewer.Size.Width + this._viewer.OrdinatPosition.X * this._ordinatStepX

        // console.log(startX, stopX);
        // let count = 0;
        // for (let index = startX; index <= stopX; index += this._ordinatStepX, count++) {
        //     const X = this._viewer.toCanvaPosition(new Point(index, 0)).X * this._scale;

        // if (canvaY < startPositionY) continue;
        // if (canvaY > gridCanvaHeight) break;
        // if (index == 0) {
        //     this.DrawAbscissaLine(startPositionX, canvaY, gridCanvaWidth, canvaY, 12, index, "red", "red", 12);
        // }
        // else {
        // this.DrawOrdinatLine(X, startPositionY, X, stopPositionY, 9, index, "gray", "gray", 11);
        // }
        // }
        // console.log(count);
        // const startY = this._ordinatY * this._ordinatStepY
        // const stopY = this._viewer.Size.Height + this._ordinatY * this._ordinatStepY

        // for (let index = startY; index <= stopY; index += this._ordinatStepY) {
        //     const canvaY = this._viewer.toCanvaPosition(new Point(0, index)).Y * this._scale;

        //     if (canvaY < startPositionY) continue;
        //     if (canvaY > gridCanvaHeight) break;
        //     if (index == 0) {
        //         this.DrawAbscissaLine(startPositionX, canvaY, gridCanvaWidth, canvaY, 12, index, "red", "red", 12);
        //     }
        //     else {
        //         this.DrawAbscissaLine(startPositionX, canvaY, gridCanvaWidth, canvaY, 9, index, "gray", "gray", 11);
        //     }
        // }

        //        const points = [-100,-50,-25,-10,0,10,25,50,100,200]
        //const points = [0, 20, 40, 60, 80, 100, 120, 142.485, 150, 190, 200, 285, 300];

        // for (let index = 0; index < points.length; index++) {
        //     const z = this._viewer.toCanvaPosition(new Point(points[index], 0)).X 
        //     this.DrawOrdinatLine(z, startPositionY, z, stopPositionY, 9, points[index] , "gray", "gray", 11);

        // }
        const ord = [30, 10, 5, 5, 3.5];

        for (let index = 0; index < 136; index++) {
            const x = (index * ord[Math.round(this._scale - 1)]);
            const n = Math.round(x)
            const z = this._viewer.toCanvaPosition(new Point(x, 0)).X

            this.DrawOrdinatLine(z, startPositionY, z, stopPositionY, 9, n, "gray", "gray", 11);
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
        // this._ordinatX = Math.round(-1 * (this._viewer.Position.X / this._viewer.CellSize.Width) / this._ordinatStepX);
        // this._ordinatY = Math.round(-1 * (this._viewer.Position.Y / this._viewer.CellSize.Height) / this._ordinatStepY);

        this._viewer.MoveFor(position);
        this.Clear();
        this.DrawGrid();
    }

    public Zooming(scale: number, mouseX: number) {
        this._scale = scale;
        // this._viewer.Scale = scale;

        this._viewer.Zoom(scale, mouseX);

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

    // private DrawAbscissaLine(x1: number, y1: number, x2: number, y2: number, pineSize: number, index: number, colorText: string, colorLine: string, fontSize: number) {
    //     Viewer.DrawLine(this._canva, x1, y1, x2, y2, 1, colorLine);

    //     Viewer.DrawLine(this._canva, x1 - pineSize, y1, x1, y2, 3, colorLine);
    //     Viewer.DrawText(this._canva, x1 - pineSize - 5, y1, (index).toFixed(0), fontSize, colorText, "end", "middle")

    //     Viewer.DrawLine(this._canva, x2, y1, x2 + pineSize, y1, 3, colorLine);
    //     Viewer.DrawText(this._canva, x2 + pineSize + 5, y2, (index).toFixed(0), fontSize, colorText, "start", "middle")
    // }
}
