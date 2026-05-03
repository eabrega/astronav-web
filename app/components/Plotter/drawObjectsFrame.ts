import { IDrawObject, DrawObject } from './drawObject'

export interface IDrawObjects {
    time: string;
    objects: Array<IDrawObject>
}

export class DrawObjectFrame {
    //TODO заменить на id
    private _dateTime: string;
    private _drawObjects: Array<DrawObject>;
    constructor(skyInfo: IDrawObjects) {
        this._dateTime = skyInfo.time;
        this._drawObjects = skyInfo.objects.map(o => new DrawObject(o));
    }

    get Objects(): Array<DrawObject> {
        return this._drawObjects;
    }
    get Time(): string {
        return this._dateTime;
    }
}