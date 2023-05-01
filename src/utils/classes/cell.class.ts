export class Cell {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  symbol: string;
  color: string;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    symbol: string,
    color: string
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillText(this.symbol, this.x, this.y);
  }
}
