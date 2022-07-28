export interface IElProp{
    left: number,
    top: number,
    width: number,
    height: number,
    scrollTop: number,
    scrollHeight: number
}

export enum Direction {
    UP = 'up',
    DOWN = 'down'
}
export interface IMouseCoord {
    curseX: number,
    curseY: number
}
