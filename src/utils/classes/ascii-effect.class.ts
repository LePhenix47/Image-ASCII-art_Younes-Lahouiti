import { Cell } from "./cell.class";

export class AsciiEffect {
  private imageCellArray: any[];
  private pixels: ImageData;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    width: number,
    height: number
  ) {
    this.context = context;
    this.width = width;
    this.height = height;

    /*
    //We draw the image
    Doc:
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    */
    this.context.drawImage(image, 0, 0);

    //We get the image data
    /*

    If we have a 400 × 400 image, we have 160_000 total pixels

    And each pixel has 4 values representing the color of it in rgba(), it will give us a clamped unsigned (number >= 0) 8bit (0-255) integers array
    By "clamped" we mean that values that overflow will equal to 255 and underflow to 0
    So we will have an array of 160_000 × 4 = 640_000 values

    We now have all the pixel color values
    */
    //@ts-ignore
    this.pixels = this.context.getImageData(0, 0, this.width, this.height);
  }

  /*
  We scan the image by dividing it in multiple cells

  we will loop through each cell to look at its pixel data and replace it with a symbol matching the color
  */
  private scanImage(cellSize: number) {
    this.imageCellArray = [];

    //We loop on each row
    for (let y = 0; y < this.pixels.height; y += cellSize) {
      // const row = imageCellArray[y];

      //We loop on each cell of the row
      for (let x = 0; x < this.pixels.width; x += cellSize) {
        //We iterate through each pixel knowing that our pixel array hold rgba value for each pixel, 1 pixel = 4 *

        const cellPosX: number = x * 4;
        const cellPosY: number = y * 4;

        //Beyond here I have 0 idea what is happening
        const pos: number = cellPosY * this.pixels.width + cellPosX;

        const alpha = this.pixels.data[pos + 3];
        if (alpha > 128) {
          const red = this.pixels.data[pos];
          const green = this.pixels.data[pos + 1];
          const blue = this.pixels.data[pos + 2];

          const total = red + green + blue;
          const averageColor = total / 3;
          const color = `rgb(${red}, ${green}, ${blue})`;
          const symbol = this.convertToSymbol(averageColor);

          if (total > 200) {
            const newCell = new Cell(this.context, x, y, symbol, color);
            this.imageCellArray.push(newCell);
          }
        }
      }
    }
  }

  private convertToSymbol(averageColorValue: number): string {
    // Map the averageColorValue to an ASCII symbol based on a predefined range of values
    if (averageColorValue >= 250) {
      return "@"; // Use @ symbol for high values
    } else if (averageColorValue >= 200) {
      return "#"; // Use # symbol for medium-high values
    } else if (averageColorValue >= 180) {
      return "$"; // Use $ symbol for medium values
    } else if (averageColorValue >= 160) {
      return "%"; // Use % symbol for medium values
    } else if (averageColorValue >= 140) {
      return "&"; // Use & symbol for medium values
    } else if (averageColorValue >= 120) {
      return "+"; // Use + symbol for medium values
    } else if (averageColorValue >= 100) {
      return "*"; // Use * symbol for medium values
    } else if (averageColorValue >= 80) {
      return "-"; // Use - symbol for medium values
    } else if (averageColorValue >= 60) {
      return ":"; // Use . symbol for medium values
    } else if (averageColorValue >= 40) {
      return ","; // Use : symbol for medium values
    } else if (averageColorValue >= 20) {
      return "."; // Use space symbol for low values
    } else {
      return " "; // Use space symbol for very low values
    }
  }

  private drawAscii() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (const cell of this.imageCellArray) {
      cell.draw();
    }
  }

  draw(cellSize: number) {
    this.scanImage(cellSize);
    this.drawAscii();
  }
}
