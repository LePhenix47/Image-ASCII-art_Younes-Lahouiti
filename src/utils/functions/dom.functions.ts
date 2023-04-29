/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {any} container - HTML Element to select the query from
 * @returns  - The element selected or `null` if the element doesn't exist
 */

export function selectQuery(query: string, container?: any): any {
  if (!container) {
    return document.querySelector(query);
  }
  /**
   * We check if it's a web component, they always have a hyphen in their tag name
   */
  const isWebComponent: boolean = container?.tagName?.includes("-");

  if (isWebComponent) {
    return container.shadowRoot.querySelector(query);
  }

  return container.querySelector(query);
}

/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param {string} query - HTML Element to select
 * @param {any} container - HTML Element to select the query from
 * @returns {any[]|null} - An array with all the elements selected or `null` if the element doesn't exist
 */
export function selectQueryAll(query: string, container?: any): any[] {
  if (!container) {
    return Array.from(document.querySelectorAll(query));
  }

  const isWebComponent: boolean = container.tagName.includes("-");

  if (isWebComponent) {
    return Array.from(container.shadowRoot.querySelectorAll(query));
  }

  return Array.from(container.querySelectorAll(query));
}

/**
 * Function that returns an array containing all child nodes of an HTML element.
 *
 * @param {any} elementOfReference The parent HTML element whose children to select.
 * @returns {any[]} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
export function getChildren(elementOfReference: any | null): any[] {
  if (!elementOfReference) {
    return [];
  }
  return Array.from(elementOfReference.children);
}

/**
 * Returns the parent element of a given element.
 * @param {HTMLElement} elementOfReference - The child element for which to find the parent.
 * @returns {any} - The parent element of the child element, or null if the parent cannot be found.
 */
export function getParent(elementOfReference: HTMLElement): any {
  return elementOfReference.parentElement;
}

/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {any} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {any|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */

export function getAncestor(
  elementOfReference: any,
  cssSelector: string = ""
): any | null {
  return elementOfReference.closest(cssSelector);
}

/**
 *Returns the host element of a web component given a reference element within it.
 *
 *@param {any} elementOfReference - An element that is a child of the web component.
 *
 * @returns {any} - The host element of the web component.
 */

export function getComponentHost(elementOfReference: any): any {
  //@ts-ignore
  return elementOfReference.getRootNode().host;
}

/**
 * Returns the next sibling element of the specified element.
 *
 * @param {any} elementOfReference - The reference element whose sibling to return.
 * @returns {any | null} The next sibling element, or null if there is none.
 */
export function getSibling(elementOfReference: any): any | null {
  return elementOfReference.nextElementSibling;
}

/**
 *
 * Returns an array of strings representing the classes of the specified element.
 *
 * @param {any} elementOfReference - The element to retrieve class values from.
 *
 * @returns An array of strings representing the classes of the specified element.
 */
export function getClassListValues(elementOfReference: any): string[] {
  return Array.from(elementOfReference.classList);
}

/**
 * Sets the value of a specified CSS property for the given HTML element.
 *
 * @param {string} property - The name of the style property to set.
 * @param {any} value - The value to set for the specified style property.
 * @param {any} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.

* @returns {void}
 */
export function setStyleProperty(
  property: string,
  value: any,
  element: any = document.body
): void {
  const stringifiedValue = value.toString();
  return element.style.setProperty(property, stringifiedValue);
}

/**
 * Appends a child element to a parent element
 *
 * @param {any} childElement - The child element to append to the parent element
 * @param {any} parentElement - The parent element to which the child element should be appended
 * @returns {HTMLElement} - The appended child element
 */
export function appendChildToParent(
  childElement: any,
  parentElement: any
): HTMLElement {
  return parentElement.appendChild(childElement);
}

/**
 * Adds or modifies an attribute to the given element
 *
 * @param element The element to add the attribute to
 * @param property The name of the attribute to add
 * @param value The value to set the attribute to
 */
export function modifyAttribute(
  element: any,
  property: string,
  value: any
): void {
  element.setAttribute(property, value.toString());
}

/**
 * Retrieves the value of the specified attribute from the given element
 *
 * @param {string} attributeName - The name of the attribute to retrieve
 * @param {any} element - The element from which to retrieve the attribute
 *
 * @returns {string} The value of the attribute
 */
export function getAttribute(attributeName: string, element: any): string {
  return element.getAttribute(attributeName);
}

/**
 * Removes an attribute from an element and sets a new attribute in its place.
 *
 * @param {any} element - The element from which to remove the attribute.
 * @param {string} oldAttribute - The name of the attribute to remove.
 * @param {string} newAttribute - The name of the new attribute to set.
 */
export function replaceAttribute(
  element: any,
  oldAttribute: string,
  newAttribute: string
) {
  element.removeAttribute(oldAttribute);
  element.setAttribute(newAttribute, "");
}

/**
 * Enables the specified element by removing the "disabled" attribute and setting the "enabled" attribute.
 *
 * @param element - The element to enable.
 */
export function enableElement(element: any): void {
  replaceAttribute(element, "disabled", "enabled");
}

/**
 * Disables the specified element by removing the "enabled" attribute and setting the "disabled" attribute.
 *
 * @param element - The element to disable.
 */
export function disableElement(element: any): void {
  replaceAttribute(element, "enabled", "disabled");
}

/**
 * Adds a class name to a given element's class list
 * @param {any} element - The element to add the class to
 * @param {string} className - The class name to add
 * @returns {void}
 */
export function addClass(element: any, className: string): void {
  element.classList.add(className);
}

/**
 * Removes a class name from a given element's class list
 * @param {any} element - The element to remove the class from
 * @param {string} className - The class name to remove
 * @returns {void}
 */
export function removeClass(element: any, className: string): void {
  element.classList.remove(className);
}

/**
 * Replaces an old class name with a new class name in a given element's class list
 * @param {any} element - The element to replace the class name in
 * @param {string} oldClassName - The old class name to replace
 * @param {string} newClassName - The new class name to replace with
 * @returns {void}
 */
export function replaceClass(
  element: any,
  oldClassName: string,
  newClassName: string
): void {
  element.classList.replace(oldClassName, newClassName);
}
