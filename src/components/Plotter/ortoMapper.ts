import { Point } from "./point";

export function MapToCanva(): Point {
    return new Point(0, 0);
}

export function MapToOrdinat(canvaX: number, canvaY: number): Point {
    return new Point(10, 10);
}