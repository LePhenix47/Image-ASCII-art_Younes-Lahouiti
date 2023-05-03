//Utils

import { getArrayFrom } from "./array.functions";
import { error } from "./console.functions";
import { splitString } from "./string.functions";

/**
 * Retrieves the selected files from an input element or an event object
 *
 * @param {HTMLInputElement} inputElement - The input element or event object from which to retrieve the files
 *
 * @returns {File | File[]} - The selected file(s) from the input element or event
 */
export async function getInputFiles(
  inputElement: HTMLInputElement
): Promise<File | File[]> {
  try {
    const filesUploaded: File[] = getArrayFrom(inputElement.files);

    const hasOnlyOneFile: boolean = filesUploaded.length === 1;
    if (hasOnlyOneFile) {
      return filesUploaded[0];
    }
    return filesUploaded;
  } catch (fileRetrievalError) {
    error({ fileRetrievalError });
  }
}

/**
 * Retrieves the transferred files from a DragEvent.
 *
 * @param {DragEvent} event - The DragEvent object containing the transferred files.
 *
 * @returns {Promise<File | File[]>} - A Promise that resolves to either a single File or an array of Files.
 */
export async function getTranferedFiles(
  event: DragEvent
): Promise<File | File[]> {
  try {
    const filesTranfered: File[] = getArrayFrom(event.dataTransfer.files);
    const hasOnlyOneFile: boolean = filesTranfered.length <= 1;
    if (hasOnlyOneFile) {
      return filesTranfered[0];
    }
    return filesTranfered;
  } catch (fileRetrievalError) {
    error({ fileRetrievalError });
  }
}

/**
 * Checks whether the file has the expected file type.
 *
 * @param {File} file - The File object to check.
 * @param {string} typeExpected - The expected file type, e.g., "audio", "image", etc.
 *
 * @returns {boolean} - Returns true if the file has the expected file type, false otherwise.
 */
export function checkFileType(file: File, typeExpected: string): boolean {
  //We get the type, for instance: audio/mpeg
  const { type }: File = file;
  //We verify if it's an audio file by checking the type wihtout the extension
  const fileType: string = splitString(type, "/")[0];

  return fileType === typeExpected;
}

/**
 * Converts a File object to a base64 string.
 *
 * @param {File} fileToConvert - The File object to convert.
 *
 * @returns {Promise<string>} - A Promise that resolves with the base64 string representation of the file.
 */
export function fileToBase64String(fileToConvert: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    //Allows the conversion of binary data, in this case audio files, into a text format
    reader.readAsDataURL(fileToConvert);

    // When the audio file is loaded, extract the base64 string and resolve the promise with it
    reader.addEventListener("load", () => {
      const base64MediaString: string | ArrayBuffer = reader.result;

      const isNotString: boolean = typeof base64MediaString !== "string";
      if (isNotString) {
        reject("Error: Base64 string not found.");
        return;
      }

      //@ts-ignore
      resolve(base64MediaString);
    });

    // If there's an error while reading the audio file, reject the promise with an error message
    reader.addEventListener("error", () => {
      reject("Error: Failed to read audio file.");
    });
  });
}
