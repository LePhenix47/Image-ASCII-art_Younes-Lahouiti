import { spliceArray } from "./string.functions";

/**
 * Retrieves the values of an object inside an array.
 *
 * @param {object} object The object to retrieve values from.
 *
 * @returns {any[]} An array containing the property values of the object.
 */
export function getObjectValues(object: object): any[] {
  //We check that the object passed is indeed an object
  const objectIsDefined: boolean = !Array.isArray(object);

  if (objectIsDefined) {
    //Returns the property values of the object in an array
    return Object.values(object);
  }
  return [];
}

/**
 * Retrieves the properties themselves of an object inside an array.
 *
 * @param {object} object The object to retrieve properties from.
 *
 * @returns An array containing the property names of the object.
 */
export function getObjectProperties(object: object): any[] {
  //We check that the object passed is indeed an object
  const objectIsDefined: boolean = !Array.isArray(object);

  if (objectIsDefined) {
    //Returns the property names of the object in an array
    return Object.keys(object);
  }
  return [];
}

/**
 * Retrieves the property names and values of an object inside an array.
 *
 * @param {object} object The object to retrieve property names and values from.
 *
 * @returns An array containing pairs of property names and values of the object, example:
 *
 * ```js
 * const obj = {foo: "hello", bar: "salve"}
 *
 * let objectKeyValuePair = getObjectEntries(obj);
 *
 * console.log(objectKeyValuePair) → [["foo", "hello"], ["bar", "salve"]]
 * ```
 */
export function getObjectEntries(object: object): any[] {
  //We check that the object passed is indeed an object
  const objectIsDefined: boolean = !Array.isArray(object);

  if (objectIsDefined) {
    //Returns the property names and its values in pair inside an array
    return Object.entries(object);
  }
  return [];
}

/**
 * Update an array of objects by a specific property value while preserving the order of objects inside.
 *
 * @param {Array} arrayOfObjects - The array of objects to update.
 * @param {string} property - The name of the property to compare.
 * @param {Object} newObject - The new object to replace the existing one.
 *
 * @returns {Array|null} A new array of objects with the updated object or null if the object was not found.
 */
export function updateArrayOfObjectByProp(
  arrayOfObjects: any[],
  property: string,
  newObject: object
): any[] | null {
  /**
   * Object to be updated
   */
  const objectToRemove: object = arrayOfObjects.find((object) => {
    return object[property] === newObject[property];
  });

  /**
   * Boolean value to know if the object was found
   */
  const notFound: boolean = !objectToRemove;

  if (notFound) {
    return null;
  }

  /**
   * We get the starting index for the
   */
  const startIndex: number = arrayOfObjects.indexOf(objectToRemove);

  const { removedItems, newArray } = spliceArray(
    arrayOfObjects,
    startIndex,
    1,
    newObject
  );

  return newArray;
}
