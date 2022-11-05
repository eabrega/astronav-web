import { IPlotterSettings } from "../IPlotterSettings";
import { AxisPoint } from "../Points/axisPoint";
import { CanvaPoint } from "../Points/canvaPoint";
import { PixelViewer } from "../Viewer/pixelViewer";
import { MoveDirection } from "./moveDirection";

export class AxisMover {
    private readonly _gridStartPosition: AxisPoint;
    private readonly _gridEndPosition: AxisPoint;
    constructor(
        _settings: IPlotterSettings,
        private _viewer: PixelViewer
    ) {
        const xMinExtremum = _settings.xExtremum ? _settings.xExtremum[0] : -(_settings.axisSize.Width);
        const xMaxExtremum = _settings.xExtremum ? _settings.xExtremum[1] : _settings.axisSize.Width;

        this._gridStartPosition = new AxisPoint(xMinExtremum, -(_settings.axisSize.Height))
        this._gridEndPosition = new AxisPoint(xMaxExtremum, _settings.axisSize.Height)
    }

    PositionMapper(acceleration: CanvaPoint): CanvaPoint {
        const direction = this.MoveDirector(acceleration);
        const newPosition = this.FixedAxis(direction, acceleration)
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

    private FixedAxis(directions: Array<MoveDirection>, acceleration: CanvaPoint): CanvaPoint {
        let newY = this._viewer.CanvasPosition.Y - acceleration.Y
        let newX = this._viewer.CanvasPosition.X + acceleration.X

        if (directions.includes(MoveDirection.Up)) {
            if (this._viewer.GridZeroPoint.Y <= this._gridStartPosition.Y) {
                newY = this._viewer.CalcCanvaPosition(this._gridStartPosition).Y
            }
        }

        if (directions.includes(MoveDirection.Down)) {
            if (this._viewer.GridZeroPoint.Y + this._viewer.GridSize.Height >= this._gridEndPosition.Y) {
                newY = this._viewer.CalcCanvaPosition(this._gridEndPosition).Y + this._viewer.GridCanvaSize.Height;
            }
        }

        if (directions.includes(MoveDirection.Right)) {
            if (this._viewer.GridZeroPoint.X < this._gridStartPosition.X + 0.1) {
                newX = this._viewer.CalcCanvaPosition(this._gridStartPosition).X
            }
        }

        if (directions.includes(MoveDirection.Left)) {
            if (this._gridEndPosition.X < this._viewer.GridZeroPoint.X + this._viewer.GridSize.Width + 0.1) {
                newX = this._viewer.CalcCanvaPosition(this._gridEndPosition).X + this._viewer.GridCanvaSize.Width
            }
        }

        return new CanvaPoint(newX, newY);
    }
}