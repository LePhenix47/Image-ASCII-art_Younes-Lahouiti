import { log } from "./utils/functions/console.functions";

import {
  addClass,
  getAncestor,
  removeClass,
  selectQuery,
} from "./utils/functions/dom.functions";

log("Hello world! Just imported from the console functions");

const main: HTMLElement = selectQuery("main");
const dropzoneComponent: HTMLElement = selectQuery("drop-zone");

main.addEventListener("dragenter", handleDragEnter);

main.addEventListener("dragleave", handleDragLeave);
/*
    Functions for the event listeners
*/
function handleDragEnter(event: DragEvent) {
  event.preventDefault();

  addClass(event.currentTarget, "dragging");

  const section: HTMLElement = selectQuery("section");

  addClass(section, "dragging");
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault();

  removeClass(event.currentTarget, "dragging");

  const section: HTMLElement = selectQuery("section");

  removeClass(section, "dragging");
}
