import { Grid } from './grid'
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'
import { DrawObject } from "./drawObject";

export class PlotterF {
    private _scale: number = 1;
    private readonly _gridWidth = 180;

    private _grid: Grid;
    private readonly _canva: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;

    private _frameId: number = 0;
    private _frames: Array<DrawObjectFrame> | null;

    constructor(name: string) {
        this._canva = document.getElementById(name) as HTMLCanvasElement;
        this._context = this._canva.getContext("2d")!;
        this._grid = new Grid(this._gridWidth, 50, this._canva);
        this._frames = null;

        this._canva.addEventListener("wheel", (event: WheelEvent) => this.Scrolling(event));
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
        this.DrawPlanetCollection(this._frames![frameId].Objects);
    }

    public DrawPlanetCollection(objects: Array<DrawObject>) {
        objects.forEach(p => this.DrawPlanet(p));
    }

    private DrawPlanet(skyObject: DrawObject): void {
        const x = this._grid.toCanvaX(skyObject.X);
        const y = this._grid.toCanvaY(skyObject.Y);

        if (skyObject.Y < 0 || skyObject.X > this._gridWidth) return;
        this._context.fillStyle = 'green';
        this._context.beginPath();
        this._context.arc(x, y, 5, 0, 2 * Math.PI, false);
        this._context.fill();
        this._context.lineWidth = 1;
        this._context.strokeStyle = '#003300';
        this._context.stroke();

        this.DrawText(x + 10, y - 10, skyObject.Name, 20, "green");
    }

    public set Dataset(objects: Array<IDrawObjects>) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this.DrawPlanetCollection(this._frames[0].Objects);
    }

    private DrawText(
        x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle") {
        this._context.fillStyle = color;
        this._context.font = `bold ${size}px sans-serif`;
        this._context.textAlign = alignVertical;
        this._context.textBaseline = alignHorizontal;
        this._context.fillText(text, x, y);
    }

    private Scrolling(e: WheelEvent) {
        if (e.deltaY < 0) {
            this._grid.Zoom(1);
        }
        else {
            this._grid.Zoom(-1);
        }

        // this._grid.Clear();
        
        this.DrawPlanetCollection(this._frames![this._frameId].Objects);
    }
}