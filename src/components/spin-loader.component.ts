import { log } from "../utils/functions/console.functions";
import {
  addClass,
  removeClass,
  selectQuery,
} from "../utils/functions/dom.functions";

const spinLoaderTemplateElement: HTMLTemplateElement =
  document.createElement("template");

const resetCSS: string = /*css*/ `
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hide{
    display: none !important;
}
`;

const spinLoaderStyle: string = /*css*/ `
:host {
  --stroke-color: black;
}

@media (prefers-color-scheme: dark) {
  :host {
    --stroke-color: white;
  }
}

.svg__circle {
    stroke-width: 5px;
    stroke: var(--stroke-color);
    transform-origin: center;
    -webkit-animation: spin-loader 2s ease-in-out infinite normal backwards;
    animation: spin-loader 2s ease-in-out infinite normal backwards;
    z-index: 69420;
}

@-webkit-keyframes spin-loader {
  0% {
    stroke-dasharray: 249.706;
    stroke-dashoffset: 124.853;
    rotate: 0deg;
  }
  50% {
    stroke-dasharray: 124.853;
    stroke-dashoffset: 124.853;
    rotate: -90deg;
  }
  100% {
    stroke-dasharray: 124.853;
    stroke-dashoffset: 249.706;
    rotate: -360deg;
  }
}

@keyframes spin-loader {
  0% {
    stroke-dasharray: 249.706;
    stroke-dashoffset: 124.853;
    rotate: 0deg;
  }
  50% {
    stroke-dasharray: 124.853;
    stroke-dashoffset: 124.853;
    rotate: -90deg;
  }
  100% {
    stroke-dasharray: 124.853;
    stroke-dashoffset: 249.706;
    rotate: -360deg;
  }
}
`;
const spinLoaderContent: string = /*html*/ `
 <svg class="svg" viewBox="0 0 50 50" width="50" height="50">
  <circle class="svg__circle" cx="25" cy="25" r="20" fill="transparent" stroke-linecap="round" />
</svg>
`;

spinLoaderTemplateElement.innerHTML = /*html*/ `
  <style>
    ${resetCSS}
    ${spinLoaderStyle}
  </style>
  
  ${spinLoaderContent}
`;

class SpinLoader extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    //We clone the template
    const clonedTemplate: Node =
      spinLoaderTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component

    shadowRoot.appendChild(clonedTemplate);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["show"];
  }

  /*

  Setters and getters
  */
  get show(): string {
    return this.getAttribute("show");
  }

  set show(value: any) {
    this.setAttribute("show", value);
  }

  /*
  Component mount/unmount methods
  */
  connectedCallback() {}

  disconnectedCallback() {}

  /*
  Component's attributes change
  */
  attributeChangedCallback(
    changedAttribute: string,
    oldValue: string,
    newValue: string
  ) {
    const svgElement: SVGElement = selectQuery("svg", this.shadowRoot);
    switch (changedAttribute) {
      case "show": {
        const needsToBeHidden: boolean = newValue === "false";
        if (needsToBeHidden) {
          log("needs to be hidden");
          addClass(svgElement, "hide");
        } else {
          log("needs to be shown");
          removeClass(svgElement, "hide");
        }
        //…
        break;
      }
      default:
        break;
    }
  }
}

customElements.define("spin-loader", SpinLoader);
