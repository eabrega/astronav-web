import { Size } from "./point";

export interface IPlotterSettings {
    isDebug?: boolean | undefined;
    gridSize: Size;
    gridType: Array<GridType>;
    gridLinears: Array<GridLinear>;
}

export enum GridLinear {
    Top,
    Bottom,
    Left,
    Right
}

export enum GridType { 
    InfinityX,
    InfinityY,
    FixedX,
    FixedY,
    LoopX,
    LoopY
}