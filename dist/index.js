(()=>{"use strict";(()=>{const{log:e,error:n,table:t,time:r,timeEnd:o,timeStamp:i,timeLog:d,assert:a,clear:l,count:c,countReset:g,group:u,groupCollapsed:s,groupEnd:v,trace:m,warn:f,debug:p,info:w,dir:L,dirxml:E}=console;function h(e,n){var t;if(!n)return document.querySelector(e);return(null===(t=null==n?void 0:n.tagName)||void 0===t?void 0:t.includes("-"))?n.shadowRoot.querySelector(e):n.querySelector(e)}function S(e,n){e.classList.add(n)}function b(e,n){e.classList.remove(n)}e("Hello world! Just imported from the console functions");const q=h("main"),y=h(".index__label");document.addEventListener("dragenter",(function(e){e.preventDefault(),S(q,"dragging"),S(y,"dragging")})),document.addEventListener("dragleave",(function(e){e.preventDefault();(e.clientX<=0||e.clientY<=0||e.clientX>=window.innerWidth||e.clientY>=window.innerHeight)&&(b(q,"dragging"),b(y,"dragging"),b(y,"dragging-over"))})),y.addEventListener("dragover",(function(e){e.preventDefault(),S(y,"dragging-over")}))})()})();