import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";
import { Point } from './point';

export class Plotter {
    private _isMoving = false;
    private _grid: Grid;

    private _frames: Array<DrawObjectFrame> | null = null;
    private _frameId = 0;
    constructor(name: string) {
        const canva = document.getElementById(name) as HTMLCanvasElement;
        this._grid = new Grid(60, 90, canva);

       // canva.addEventListener("wheel", (event: WheelEvent) => this.Scrolling(event));
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

    private Moving(e: MouseEvent) {
        if (this._isMoving) {
            this._grid.MoveGrid(new Point(e.movementX, e.movementY));
            this.DrawPlanetCollection(this._frames![this._frameId].Objects);
        }     
    }

    private MouseDown(e: MouseEvent) {
        this._isMoving = true;
        console.log(this._grid.toGridPosition(new Point(e.offsetX, e.offsetY)));
    }
}
