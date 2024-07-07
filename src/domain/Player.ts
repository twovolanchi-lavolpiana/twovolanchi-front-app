export default class Player {
    number: number;
    top: string;
    left: string;

    constructor(number: number, top: string, left: string) {
        this.number = number;
        this.top = top;
        this.left = left;
    }

    move(newTop: string, newLeft: string): void {
        this.top = newTop;
        this.left = newLeft;
    }
}