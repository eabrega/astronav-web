export function DrawText(
    canva: HTMLCanvasElement,
    x: number,
    y: number,
    text: string,
    size: number,
    color: string = "black",
    alignHorizontal: CanvasTextAlign = "start",
    alignVertical: CanvasTextBaseline = "middle") {

    const context = canva.getContext("2d")!;

    context.fillStyle = color;
    context.font = `bold ${size}px sans-serif`;
    context.textAlign = alignHorizontal;
    context.textBaseline = alignVertical;

    context.fillText(text, x, context.canvas.height - y);
}

export function DrawLine(canva: HTMLCanvasElement, x1: number, y1: number, x2: number, y2: number, size: number = 1) {
    const context = canva.getContext("2d")!;

    context.beginPath();

    context.moveTo(x1, context.canvas.height - y1);
    context.lineTo(x2, context.canvas.height - y2);
    context.lineWidth = size;
    context.strokeStyle = "#9e9e9e";
    context.stroke();
}

export function DrawObject(canva: HTMLCanvasElement, x: number, y: number): void {
    const context = canva.getContext("2d")!;

    context.fillStyle = 'green';
    context.beginPath();
    context.arc(x, context.canvas.height - y, 5, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
}