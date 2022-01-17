import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";

export class Plotter {
    private _grid: Grid;
    
    private _frames: Array<DrawObjectFrame> | null = null;
    private _frameId = 0;
    constructor(name: string) {
        const canva = document.getElementById(name) as HTMLCanvasElement;

        this._grid = new Grid(360, 90, canva);
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
}
