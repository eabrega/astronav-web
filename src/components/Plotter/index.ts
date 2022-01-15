import { PlotterF } from './plotter'
import { IDrawObjects } from './drawObjectsFrame'

export interface IPlotterOptions {
    cellSizeX: number;
    cellSizeY: number;
}
export class Plotter {
    private readonly _plotter: PlotterF;
    constructor() {
        this._plotter = new PlotterF("canva");
    }

    public DataFrameSelect(frameId: number) {
        this._plotter.DataFrameSelect = frameId;
    }

    public set UpdateDataset(objects: Array<IDrawObjects>) {
        this._plotter.Dataset = objects;
    }
}
