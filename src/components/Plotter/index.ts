import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";
import * as Mapper from "./ortoMapper"
import { PixelViewer } from './pixelViewer';
import { Point } from './point';

export class Plotter {
    private _isMoving = false;
    private _mouseDownX = 0;
    private _grid: Grid;
    private startX = 0;

    private _frames: Array<DrawObjectFrame> | null = null;
    private _frameId = 0;
    constructor(name: string) {
        const canva = document.getElementById(name) as HTMLCanvasElement;
        this._grid = new Grid(360, 90, canva);

        canva.addEventListener("wheel", (event: WheelEvent) => this.Scrolling(event));
        canva.addEventListener("mousemove", (event: MouseEvent) => this.Moving(event));
        canva.addEventListener("mousedown", (event: MouseEvent) => this.MouseDown(event));
        canva.addEventListener("mouseup", e => { this._isMoving = false; }); //this.startX = this._viewer._gridX });
    }

    public set DataFrameSelect(frameId: number) {
        if (isNaN(Number(frameId))) {
            throw new Error(`FrameId mast be integer!`)
        }

        const id = Number(frameId);

        if (id > this._frames!.length - 1) {
            throw new Error(`Frame with id ${frameId} no found.`);
        }

        this._frameId = id;

        this._grid.Clear();
        this._grid.DrawGrid();
        this.DrawPlanetCollection(this._frames![this._frameId].Objects);
    }

    public DrawPlanetCollection(objects: Array<DrawObject>) {
        objects.forEach(p => this._grid.DrawGridObject(p.X, p.Y, p.Name));
    }

    public set Dataset(objects: Array<IDrawObjects>) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this.DrawPlanetCollection(this._frames[0].Objects);
    }

    private Scrolling(e: WheelEvent) {
        // if (e.deltaY > 0) {
        //     this._scale += 0.1;
        // }
        // else {
        //     this._scale += -0.1;
        // }

        // if (this._scale < 1) this._scale = 1;

        // this._viewer = new PixelViewer(this.startX, this._gridWidth / this._scale, this._gridHeight / this._scale, this._canva)
        // this.Clear();
        // this.DrawGrid();
        //this.DrawPlanetCollection(this._frames![this._frameId].Objects);
    }

    private Moving(e: MouseEvent) {
        if (this._isMoving) {           
            const moveTo = e.offsetX - this._mouseDownX;
            console.log(e);

            this._grid.MoveGrid = new Point(-1, 20);
        }
    }

    private MouseDown(e: MouseEvent) {
        this._isMoving = true;
        this._mouseDownX = e.offsetX;
        //console.log(this._grid.toGridX(e.offsetX, e.offsetY));

       // this._grid.MoveGrid = new Point(10, 20);
       //this._grid.MoveGrid = new Point(-1, 20);
    }
}
