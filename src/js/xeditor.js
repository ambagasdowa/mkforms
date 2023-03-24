import { initMsj, initBooks } from "../modules/xeditorModule.js";
import { getAllUrlParams } from "../modules/lib.js";
console.log(initMsj());

const paramsUrl = getAllUrlParams(window.location.href, false);

console.log(paramsUrl);

window.onload = (event) => {
  console.log(`onload`);
  initBooks(paramsUrl);
}; // WARNING End of windows onload

// window.onresize = reportWindowSize;
