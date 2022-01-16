import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";

export class Plotter {
    private _grid: Grid;

    private readonly _canva: HTMLCanvasElement;

    private _frames: Array<DrawObjectFrame> | null = null;

    constructor(name: string) {
        this._canva = document.getElementById(name) as HTMLCanvasElement;
        this._canva.addEventListener("wheel", (event: WheelEvent) => this.Scrolling(event));

        this._grid = new Grid(360, 90, this._canva);
    }

    public set DataFrameSelect(frameId: number) {
        if (isNaN(Number(frameId))) {
            throw new Error(`FrameId mast be integer!`)
        }

        const id = Number(frameId);

        if (id > this._frames!.length - 1) {
            throw new Error(`Frame with id ${frameId} no found.`);
        }

        this._grid.Clear();
        this._grid.DrawGrid();
        this.DrawPlanetCollection(this._frames![frameId].Objects);
    }

    public DrawPlanetCollection(objects: Array<DrawObject>) {
        objects.forEach(p => this._grid.DrawGridObject(p.X, p.Y, p.Name));
    }

    public set Dataset(objects: Array<IDrawObjects>) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this.DrawPlanetCollection(this._frames[0].Objects);
    }

    private Scrolling(e: WheelEvent) {
        console.log(10)
    }
}
