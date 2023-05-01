//Utils
import { error, log } from "./utils/functions/console.functions";

import {
  addClass,
  modifyAttribute,
  removeClass,
  selectQuery,
  setInnerHTML,
  setTextContent,
} from "./utils/functions/dom.functions";
import {
  checkFileType,
  fileToBase64String,
  getInputFiles,
  getTranferedFiles,
} from "./utils/functions/file.functions";

//Components
import "./components/spin-loader.component";
import { drawImageCanvas } from "./utils/functions/canvas.functions";

//Main code

const main: HTMLElement = selectQuery("main");
const labelDropzone: HTMLLabelElement = selectQuery(".index__label");
const fileUploadInput: HTMLInputElement = selectQuery(".index__input");

const rangeInput: HTMLInputElement = selectQuery(".index__resolution-range");
const rangeLabelSpan: HTMLSpanElement = selectQuery(
  ".index__resolution-label--span"
);
rangeInput.addEventListener("input", changeResolution);
function changeResolution(event: InputEvent) {
  //@ts-ignore
  const inputValue = event.target.value;

  setTextContent(rangeLabelSpan, `${inputValue}px`);
}

document.addEventListener("dragenter", handleDragEnter);
document.addEventListener("dragleave", handleDragLeave);

/**
 * Adds the overlay and highlight effect when dragging a file anywhere in the website
 *
 * @param {DragEvent} event - The dragenter event.
 */
function handleDragEnter(event: DragEvent): void {
  event.preventDefault();

  addOverlayAndHighlight();

  function addOverlayAndHighlight(): void {
    addClass(main, "dragging");
    addClass(labelDropzone, "dragging");
  }
}

/**
 * Updates the dropzone highlight effect when dragging over the dropzone
 * @param {DragEvent} event - The dragover event
 */
function handleDragOver(event: DragEvent): void {
  event.preventDefault();

  addClass(labelDropzone, "dragging-over");
}

/**
 * Removes the overlay and highlight effect when dragging a file outside the website
 * @param {DragEvent} event - The dragleave event
 */
function handleDragLeave(event: DragEvent): void {
  event.preventDefault();

  // Check if the mouse pointer is leaving the website to a child element
  const isLeavingWebsite =
    //Underflows on the X and Y coordinates
    event.clientX <= 0 ||
    event.clientY <= 0 ||
    //Overflows on the X and Y coordinates
    event.clientX >= window.innerWidth ||
    event.clientY >= window.innerHeight;
  if (isLeavingWebsite) {
    removeOverlayAndHighlight();
  }
  function removeOverlayAndHighlight() {
    removeClass(main, "dragging");
    removeClass(labelDropzone, "dragging");
    removeClass(labelDropzone, "dragging-over");
  }
}

labelDropzone.addEventListener("dragover", handleDragOver);
labelDropzone.addEventListener("drop", handleFileDrop);
/**
 * Handles the file drop event
 *
 * @param {DragEvent} event - The drag event object
 *
 * @returns {Promise<void>} A promise that resolves when the file drop is handled
 */

async function handleFileDrop(event: DragEvent): Promise<void> {
  event.preventDefault();
  showLoader();
  try {
    removeOverlayAndHighlight();

    //@ts-ignore
    const file: File = await getTranferedFiles(event);
    //@ts-ignore
    const isNotAnImage: boolean = !checkFileType(file, "image");
    if (isNotAnImage) {
      throw "File dropped is not an image!";
    }
    log(file);
    const base64String = await fileToBase64String(file);
    setImageSource(base64String);
  } catch (fileDropError) {
    error("File drop error:", { fileDropError });
    const labelSVG: string = /* html */ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="150" height="150" id="image"
          fill="currentColor" class="no-pointer-events">
        <path
            d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a2.81,2.81,0,0,0,.49-.05l.3-.07.07,0h0l.05,0,.37-.14.13-.07c.1-.06.21-.11.31-.18a3.79,3.79,0,0,0,.38-.32l.07-.09a2.69,2.69,0,0,0,.27-.32l.09-.13a2.31,2.31,0,0,0,.18-.35,1,1,0,0,0,.07-.15c.05-.12.08-.25.12-.38l0-.15A2.6,2.6,0,0,0,22,19V5A3,3,0,0,0,19,2ZM5,20a1,1,0,0,1-1-1V14.69l3.29-3.3h0a1,1,0,0,1,1.42,0L17.31,20Zm15-1a1,1,0,0,1-.07.36,1,1,0,0,1-.08.14.94.94,0,0,1-.09.12l-5.35-5.35.88-.88a1,1,0,0,1,1.42,0h0L20,16.69Zm0-5.14L18.12,12a3.08,3.08,0,0,0-4.24,0l-.88.88L10.12,10a3.08,3.08,0,0,0-4.24,0L4,11.86V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1ZM13.5,6A1.5,1.5,0,1,0,15,7.5,1.5,1.5,0,0,0,13.5,6Z">
        </path>
    </svg>
    `;
    const htmlContent: string = `${labelSVG} ${fileDropError}`;
    setInnerHTML(labelDropzone, htmlContent);
    hideLoader();
  }

  function removeOverlayAndHighlight() {
    removeClass(main, "dragging");
    removeClass(labelDropzone, "dragging");
    removeClass(labelDropzone, "dragging-over");
  }
}

fileUploadInput.addEventListener("change", handleFileUpload);
/**
 * Handles the file upload event
 *
 * @param {Event} event - The event object
 *
 * @returns {Promise<void>} A promise that resolves when the file upload is handled
 */
async function handleFileUpload(event: Event): Promise<void> {
  showLoader();
  try {
    //@ts-ignore
    const inputElement: HTMLInputElement = event.currentTarget;
    //@ts-ignore
    const file: File = await getInputFiles(inputElement);

    //@ts-ignore
    const isNotAnImage: boolean = !checkFileType(file, "image");
    if (isNotAnImage) {
      throw "File uploaded is not an image!";
    }
    log(file);
    const base64String = await fileToBase64String(file);
    setImageSource(base64String);
  } catch (fileUploadError) {
    error("File upload error:", { fileUploadError });
    const labelSVG: string = /* html */ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="150" height="150" id="image"
          fill="currentColor" class="no-pointer-events">
        <path
            d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a2.81,2.81,0,0,0,.49-.05l.3-.07.07,0h0l.05,0,.37-.14.13-.07c.1-.06.21-.11.31-.18a3.79,3.79,0,0,0,.38-.32l.07-.09a2.69,2.69,0,0,0,.27-.32l.09-.13a2.31,2.31,0,0,0,.18-.35,1,1,0,0,0,.07-.15c.05-.12.08-.25.12-.38l0-.15A2.6,2.6,0,0,0,22,19V5A3,3,0,0,0,19,2ZM5,20a1,1,0,0,1-1-1V14.69l3.29-3.3h0a1,1,0,0,1,1.42,0L17.31,20Zm15-1a1,1,0,0,1-.07.36,1,1,0,0,1-.08.14.94.94,0,0,1-.09.12l-5.35-5.35.88-.88a1,1,0,0,1,1.42,0h0L20,16.69Zm0-5.14L18.12,12a3.08,3.08,0,0,0-4.24,0l-.88.88L10.12,10a3.08,3.08,0,0,0-4.24,0L4,11.86V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1ZM13.5,6A1.5,1.5,0,1,0,15,7.5,1.5,1.5,0,0,0,13.5,6Z">
        </path>
    </svg>
    `;
    const htmlContent: string = `${labelSVG} ${fileUploadError}`;
    setInnerHTML(labelDropzone, htmlContent);
    hideLoader();
  }
}

const spinLoader: HTMLElement = selectQuery("spin-loader");

/**
 * Shows the loader by modifying the "show" attribute of the spin loader element to true
 *
 * @returns {void}
 */
function showLoader(): void {
  modifyAttribute(spinLoader, "show", true);
}

/**
 * Hides the loader by modifying the "show" attribute of the spin loader element to false.
 *
 * @returns {void}
 */
function hideLoader(): void {
  modifyAttribute(spinLoader, "show", false);
}

/**
 * Removes event listeners and hides the label dropzone element.
 *
 * @returns {void}
 */
function removeEvents(): void {
  addClass(labelDropzone, "hide");

  document.removeEventListener("dragenter", handleDragEnter);
  document.removeEventListener("dragleave", handleDragLeave);
}

/**
 * Sets the source of an image element with the provided Base64 string
 *
 * @param {string} base64String - The Base64 string representing the image
 *
 * @returns {void}
 */
function setImageSource(base64String: string): void {
  image.src = base64String;
}
/*
//Canvas effect
*/
const image: HTMLImageElement = selectQuery(".index__image");
image.addEventListener("load", handleImageChange);

/**
 * Handles the image change event and shows/hides the loader
 *
 * @param {Event} event - The event object
 *
 * @returns {Promise<void>} A promise that resolves when the loader is hidden
 */
async function handleImageChange(event: Event): Promise<void> {
  try {
    log("image change", event);
    removeEvents();
    canvasContext.drawImage(image, 0, 0);
  } catch (imageChangeError) {
    error({ imageChangeError });
  } finally {
    hideLoader();
  }
}

const canvas: HTMLCanvasElement = selectQuery(".index__canvas");
const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

const imagePreviewDiv: HTMLElement = selectQuery(".index__image-preview");

function resizeCanvas() {
  const { width, height }: DOMRect = imagePreviewDiv.getBoundingClientRect();
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
