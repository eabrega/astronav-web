import { IPlotterSettings } from "../IPlotterSettings";
import { CanvaPoint } from "../Points/canvaPoint";
import { MoveDirection } from "./moveDirection";

export class AxisMover { 
    private readonly _settings: IPlotterSettings; 

    constructor(settings: IPlotterSettings) { 
        this._settings = settings;
    }
   
    PositionMapper(acceleration: CanvaPoint, position: CanvaPoint): CanvaPoint {
        const direction = this.MoveDirector(acceleration);
        
        const newPosition = new CanvaPoint(position.X + acceleration.X, position.Y - acceleration.Y);

        return newPosition;
    }

    private MoveDirector(acceleration: CanvaPoint): Array<MoveDirection> {
        let direction = new Array<MoveDirection>();

        if (acceleration.Y > 0) direction.push(MoveDirection.Down)
        if (acceleration.Y < 0) direction.push(MoveDirection.Up)

        if (acceleration.X > 0) direction.push(MoveDirection.Right)
        if (acceleration.X < 0) direction.push(MoveDirection.Left)

        return direction
    }
}