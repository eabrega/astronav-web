export class Point { 
    private readonly _x: number;
    private readonly _y: number;

    constructor(x:number, y:number) { 
        this._x = x;
        this._y = y;
    }

    public get X() { 
        return this._x;
    }

    public get Y() { 
        return this._y;
    }
}