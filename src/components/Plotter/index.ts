import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";
import { IPlotterSettings } from './IPlotterSettings';
import { CanvaPoint } from './Points/canvaPoint';
import { AxisPoint } from './Points/axisPoint';

export class Plotter {
    private readonly _grid: Grid;
    private _isMoved = false;
    private _scale = 1;
    private _frames: Array<DrawObjectFrame> | null = null;
    private _frameId = 0;

    constructor(name: string, settings: IPlotterSettings) {
        const canva = document.getElementById(name) as HTMLCanvasElement;
        this._grid = new Grid(canva, settings);

        if (settings?.isZooming) {
            canva.addEventListener("wheel", (event: WheelEvent) => this.Zoom(event));
        }
        if (settings?.isMoving) {
            document.addEventListener("mousemove", (event: MouseEvent) => this.Moving(event));
        }
        if (settings?.isMoving || settings?.isClicked) {
            canva.addEventListener("mousedown", (event: MouseEvent) => this.MouseDown(event));
            document.addEventListener("mouseup", e => { this._isMoved = false; });
        }
    }

    set DataFrameSelect(frameId: number) {
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

    DrawPlanetCollection(objects: Array<DrawObject>) {
        objects.forEach(p => this._grid.DrawGridObject(new AxisPoint(p.X, p.Y), p.Name));
    }

    set Dataset(objects: Array<IDrawObjects>) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this.DrawPlanetCollection(this._frames[0].Objects);
    }

    private Moving(e: MouseEvent) {
        if (this._isMoved) {
            this._grid.MoveGrid(new CanvaPoint(e.movementX, e.movementY));
            this.DrawPlanetCollection(this._frames![this._frameId].Objects);
        }
    }

    private MouseDown(e: MouseEvent) {
        this._isMoved = true;
        const points = this._grid.Click(new CanvaPoint(e.offsetX, e.offsetY))

        //console.log("clickAxis", points[0]);
        console.log("clickPixels", points[1]);
    }

    private Zoom(e: WheelEvent) {
        if (e.deltaY > 0) {
            this._scale += 0.5;
        }
        else {
            this._scale += -0.5;
        }

        if (this._scale < 1) this._scale = 1;
        if (this._scale > 100) this._scale = 100

        this._grid.Zooming(this._scale, new CanvaPoint(e.offsetX, e.offsetY));
        this.DrawPlanetCollection(this._frames![this._frameId].Objects);
    }
}
