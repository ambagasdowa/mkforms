import { config } from "../modules/config.js";
import { initMsj, initBooks, draggable } from "../modules/xeditorModule.js";
import { getAllUrlParams, setStyles } from "../modules/lib.js";
console.log(initMsj());

const paramsUrl = getAllUrlParams(window.location.href, false);

setStyles(config.xeditor["css_files"], true);

console.log(paramsUrl);

window.onload = (event) => {
  console.log(`onload`);
  draggable(document.getElementById("detach"));
  initBooks(paramsUrl);
}; // WARNING End of windows onload

// window.onresize = reportWindowSize;
