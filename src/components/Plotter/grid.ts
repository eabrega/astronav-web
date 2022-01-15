export class Grid {
   // private _gridScale = 4.5;
   // private _moveX = -20;
    _gridX = 50;
    _step = 15;
    private _gridWidth: number;
    private _gridHeight: number;
    private readonly _canvaWidth: number;
    private readonly _canvaHeight: number;
    private readonly _gridPixelsWidth: number;
    private readonly _gridPixelsHeight: number;
    private readonly _grigCanvaOffsetLeft: number = 10;
    private readonly _grigCanvaOffsetRight: number = 25;
    private readonly _grigCanvaOffsetTop: number = 0;
    private readonly _grigCanvaOffsetBottom: number = 30;
    private readonly _context: CanvasRenderingContext2D;

    constructor(width: number, height: number, canva: HTMLCanvasElement) {
        this._gridWidth = width;
        this._gridHeight = height;

        this._canvaWidth = canva.width;
        this._canvaHeight = canva.height;

        this._gridPixelsWidth = this._canvaWidth - (this._grigCanvaOffsetLeft + this._grigCanvaOffsetRight);
        this._gridPixelsHeight = this._canvaHeight - (this._grigCanvaOffsetTop + this._grigCanvaOffsetBottom);

        this._context = canva.getContext("2d")!;
        this.DrawGrid();
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this._canvaWidth, this._canvaHeight);
    }

    public Zoom(scale: number) { 
        if (scale > 0) {
            this._gridX+=this._step
        }
        else { 
            this._gridX-=this._step
        }

        console.log(this._gridX);
        this.Clear();
        this.DrawGrid();
      //  this._gridX += scale;
    }

    public DrawGrid() {
        this.DrawGridLine(0, this._gridHeight, this._gridWidth, this._gridHeight);
        this.DrawGridLine(this._gridWidth, 0, this._gridWidth, this._gridHeight);

        for (let index = this._gridX; index < this._gridWidth + 1; index += this._step) {
            this.DrawGridLine(index, 0, index, this._gridHeight);

           // this.DrawLine(this.toCanvaX(index), this._gridPixelsHeight, this.toCanvaX(index), this._gridPixelsHeight + 11);
            this.DrawText(this.toCanvaX(index), this._gridPixelsHeight + 11 + 10, index.toString(), 11, "black", "center");
        }

        // for (let index = 0; index < this._gridHeight + 1; index += stepY) {
        //     this.DrawGridLine(0, index, this._gridWidth, index);
        // }

        this.DrawGridLine(10,0,50,50);
    }

    public toCanvaX(x: number) {
        return (this._grigCanvaOffsetLeft + ((x - this._gridX) * this._cellSizeX));
    }

    public toCanvaY(y: number) {
        return this._grigCanvaOffsetTop + (this._gridPixelsHeight - y * this._cellSizeY);
    }

    get _cellSizeX() {
        return this._gridPixelsWidth / this._gridWidth;
    }

    get _cellSizeY() {
        return this._gridPixelsHeight / this._gridHeight;
    }

    private DrawGridLine(x1: number, y1: number, x2: number, y2: number, size: number = 1) {
        this._context.beginPath();

        this._context.moveTo(this.toCanvaX(x1), this.toCanvaY(y1));
        this._context.lineTo(this.toCanvaX(x2), this.toCanvaY(y2));
        this._context.lineWidth = size;
        this._context.strokeStyle = "#9e9e9e";
        this._context.stroke();
    }

    private DrawLine(x1: number, y1: number, x2: number, y2: number, size: number = 1) {
        this._context.beginPath();

        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.lineWidth = size;
        this._context.strokeStyle = "#9e9e9e";
        this._context.stroke();
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
}
