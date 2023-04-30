import { log } from "./utils/functions/console.functions";

import {
  addClass,
  removeClass,
  selectQuery,
} from "./utils/functions/dom.functions";

log("Hello world! Just imported from the console functions");

const main: HTMLElement = selectQuery("main");
const dropzone: HTMLElement = selectQuery(".index__label"); // Assuming this is the dropzone element

document.addEventListener("dragenter", handleDragEnter);
document.addEventListener("dragleave", handleDragLeave);

/**
 * Adds the overlay and highlight effect when dragging a file anywhere in the website.
 * @param {DragEvent} event - The dragenter event.
 */
function handleDragEnter(event: DragEvent) {
  event.preventDefault();

  addClass(main, "dragging");
  addClass(dropzone, "dragging");
}

/**
 * Updates the dropzone highlight effect when dragging over the dropzone.
 * @param {DragEvent} event - The dragover event.
 */
function handleDragOver(event: DragEvent) {
  event.preventDefault();

  addClass(dropzone, "dragging-over");
}

/**
 * Removes the overlay and highlight effect when dragging a file outside the website.
 * @param {DragEvent} event - The dragleave event.
 */
function handleDragLeave(event: DragEvent) {
  event.preventDefault();

  // Check if the mouse pointer is leaving the website to a child element
  const isLeavingWebsite =
    event.clientX <= 0 ||
    event.clientY <= 0 ||
    event.clientX >= window.innerWidth ||
    event.clientY >= window.innerHeight;
  if (isLeavingWebsite) {
    removeClass(main, "dragging");
    removeClass(dropzone, "dragging");
    removeClass(dropzone, "dragging-over");
  }
}

dropzone.addEventListener("dragover", handleDragOver);
