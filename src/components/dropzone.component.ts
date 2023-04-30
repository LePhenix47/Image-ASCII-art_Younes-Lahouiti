const dropzoneTemplateElement: HTMLTemplateElement =
  document.createElement("template");

const cssReset: string = /*css */ `
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap);

:root {
    --bg-primary: #a4d6de;
    --bg-secondary: #ddd;
    --bg-tertiary: #a5a5a5;
    --color-primary: #000;
    --selection-bg-color: #005aff;
    --scrollbar-track-bg-color: transparent;
    --scrollbar-thumb-bg-color: #757575;
    --scrollbar-thumb-bg-color--hover: #9d9d9d;
    --scrollbar-thumb-bg-color--active: #9d9d9d
}

::backdrop {
    --scrollbar-track-bg-color: transparent;
    --scrollbar-thumb-bg-color: #757575;
    --scrollbar-thumb-bg-color--hover: #9d9d9d;
    --scrollbar-thumb-bg-color--active: #9d9d9d
}

.hide {
    display: none !important
}

.no-pointer-events {
    pointer-events: none
}

@media(prefers-reduced-motion:reduce) {
    *, :after, :before {
        animation: none !important;
        transition: none !important
    }
}

*, :after, :before {
    box-sizing: border-box;
    margin: 0;
    padding: 0
}

::-moz-selection {
    -webkit-text-stroke: transparent;
    background-color: var(--selection-bg-color);
    color: currentColor
}

::selection {
    -webkit-text-stroke: transparent;
    background-color: var(--selection-bg-color);
    color: currentColor
}

html {
    color-scheme: dark light;
    scroll-behavior: smooth;
    scroll-padding-top: 50%
}

body {
    background-image: linear-gradient(180deg, #a4d6de, #ddd, #4f4869, #1d1d1d);
    background-position: 0 0;
    background-size: 300% 300%;
    color: var(--color-primary);
    min-height: 100dvh;
    overflow-x: hidden;
    transition: background-position .6s ease-in-out, color .35s ease-in-out
}

:is(ul, ol) {
    list-style-type: none
}

button {
    background-color: transparent;
    border-color: transparent;
    color: inherit;
    font-family: inherit
}

button:hover {
    cursor: pointer
}

button:hover:disabled {
    cursor: not-allowed
}

input {
    font-family: inherit
}

input, input:focus {
    border-color: transparent
}

input:focus {
    outline: transparent
}

textarea {
    font-family: inherit
}

textarea, textarea:focus {
    border-color: transparent
}

textarea:focus {
    outline: transparent
}

a {
    color: inherit;
    text-decoration: none
}

a:visited {
    color: currentColor
}

label:hover {
    cursor: pointer
}

fieldset {
    border-color: transparent
}

legend {
    position: static
}

dialog {
    inset: 50%;
    margin: 0;
    padding: 0;
    position: fixed;
    translate: -50% -50%;
    z-index: 0
}

dialog, select {
    border: transparent
}

select {
    font-family: inherit
}

select:hover {
    cursor: pointer
}

option {
    font-family: inherit
}

:is(p, h1, h2, h3, h4, h5, h6, span):empty {
    display: none !important
}

body {
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif
}

h1 {
    font-size: 48px
}

h2 {
    font-size: 24px;
    font-weight: 500
}

::-webkit-scrollbar {
    background-color: var(--scrollbar-track-bg-color);
    border-radius: 100vmax;
    margin-block: 15px;
    width: 10px
}

::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-bg-color);
    border: 3px solid var(--bg-primary);
    border-radius: 100vmax
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-bg-color--hover)
}

::-webkit-scrollbar-thumb:active {
    background-color: var(--scrollbar-thumb-bg-color--active)
}

@supports(scrollbar-color:black white) {
    :root {
        scrollbar-color: var(--scrollbar-thumb-bg-color) var(--scrollbar-track-bg-color);
        scrollbar-width: thin
    }
}
`;

const cssDropzoneStyle: string = /* css */ `
.index__dropzone {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: center;
    position: relative;
    --bg: #f7fafb;
    --border: #d7dcde;
    aspect-ratio: 1/1;
    background-color: var(--bg);
    border: 5px dashed var(--border);
    border-radius: 15px;
    height: 300px;
    transition: border .35s ease-in-out, filter .35s ease-in-out
}

.index__dropzone.active {
    border: 5px solid var(--border);
    filter: brightness(1.25)
}

.index__label {
    --color: #62615b;
    align-items: center;
    aspect-ratio: 1/1;
    color: var(--color);
    display: inline-flex;
    flex-direction: column;
    gap: 35px;
    height: inherit;
    justify-content: center
}

.index__label>svg {
    order: -1
}

.index__canvas {
    color: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1
}

@media(prefers-color-scheme:dark) {
    :root {
        --bg-primary: #2e3043;
        --bg-secondary: #1d1d1d;
        --bg-tertiary: #5a5a5a;
        --color-primary: #fff;
        --selection-bg-color: orange;
        --scrollbar-track-bg-color: transparent;
        --scrollbar-thumb-bg-color: #757575;
        --scrollbar-thumb-bg-color--hover: #9d9d9d;
        --scrollbar-thumb-bg-color--active: #9d9d9d
    }

    body {
        background-position: 100% 100% !important
    }

    .index__dropzone {
        --bg: #030607;
        --border: #202527
    }

    .index__label {
        --color: #9d9ea4
    }

    ::backdrop {
        --scrollbar-track-bg-color: transparent;
        --scrollbar-thumb-bg-color: #757575;
        --scrollbar-thumb-bg-color--hover: #9d9d9d;
        --scrollbar-thumb-bg-color--active: #9d9d9d
    }
}
`;
const htmlDropzoneContent: string = /* html */ `
 <section class="index__dropzone">
                <!-- <drop-zone></drop-zone> -->
                <label class="index__label" for="dropzone">Upload or drag image here
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="150" height="150" id="image"
                        fill="currentColor">
                        <path
                            d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a2.81,2.81,0,0,0,.49-.05l.3-.07.07,0h0l.05,0,.37-.14.13-.07c.1-.06.21-.11.31-.18a3.79,3.79,0,0,0,.38-.32l.07-.09a2.69,2.69,0,0,0,.27-.32l.09-.13a2.31,2.31,0,0,0,.18-.35,1,1,0,0,0,.07-.15c.05-.12.08-.25.12-.38l0-.15A2.6,2.6,0,0,0,22,19V5A3,3,0,0,0,19,2ZM5,20a1,1,0,0,1-1-1V14.69l3.29-3.3h0a1,1,0,0,1,1.42,0L17.31,20Zm15-1a1,1,0,0,1-.07.36,1,1,0,0,1-.08.14.94.94,0,0,1-.09.12l-5.35-5.35.88-.88a1,1,0,0,1,1.42,0h0L20,16.69Zm0-5.14L18.12,12a3.08,3.08,0,0,0-4.24,0l-.88.88L10.12,10a3.08,3.08,0,0,0-4.24,0L4,11.86V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1ZM13.5,6A1.5,1.5,0,1,0,15,7.5,1.5,1.5,0,0,0,13.5,6Z">
                        </path>
                    </svg>
                </label>
                <input type="file" class="hide" id="dropzone" accept="image/*" />
    </section>
`;

dropzoneTemplateElement.innerHTML = /*html */ `
  <style>
    ${cssReset}
    ${cssDropzoneStyle}
  </style>
  
  ${htmlDropzoneContent}
`;

class DropZone extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    //We clone the template
    const clonedTemplate: Node =
      dropzoneTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("drop-zone", DropZone);
