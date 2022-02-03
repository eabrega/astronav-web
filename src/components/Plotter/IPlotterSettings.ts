import { Size } from "./Sizes/size";

export interface IPlotterSettings {
    isDebug?: boolean | undefined;
    gridSize: Size;
    axisConstraint: Array<GridType>;
    gridLinears: Array<GridLinear>;
}

export enum GridLinear {
    Top,
    Bottom,
    Left,
    Right
}

export enum GridType { 
    FixedX,
    FixedY,
    LoopX,
    LoopY
}
