/**
 * Draws an image on a canvas, automatically scaling it to fit within the canvas while maintaining aspect ratio.
 *
 * @param {CanvasRenderingContext2D} canvasContext - The rendering context of the canvas.
 * @param {HTMLImageElement} imageElement - The image element to be drawn.
 * @param {number} destX - The x-coordinate of the top-left corner of the destination rectangle.
 * @param {number} destY - The y-coordinate of the top-left corner of the destination rectangle.
 * @param {number} canvasWidth - The width of the canvas.
 * @param {number} canvasHeight - The height of the canvas.
 *
 * @returns {void}
 */
export function drawImageCanvas(
  canvasContext: CanvasRenderingContext2D,
  imageElement: HTMLImageElement,
  destX: number,
  destY: number,
  canvasWidth: number,
  canvasHeight: number
): void {
  const imageAspectRatio: number = imageElement.width / imageElement.height;
  const canvasAspectRatio: number = canvasWidth / canvasHeight;

  let destWidth: number = 0;
  let destHeight: number = 0;

  const imageHasGreaterRatio: boolean = imageAspectRatio > canvasAspectRatio;
  if (imageHasGreaterRatio) {
    destWidth = canvasWidth;
    destHeight = canvasWidth / imageAspectRatio;
  } else {
    destWidth = canvasHeight * imageAspectRatio;
    destHeight = canvasHeight;
  }

  const destOffsetX = (canvasWidth - destWidth) / 2;
  const destOffsetY = (canvasHeight - destHeight) / 2;

  canvasContext.drawImage(
    imageElement,
    destX + destOffsetX,
    destY + destOffsetY,
    destWidth,
    destHeight
  );
}
