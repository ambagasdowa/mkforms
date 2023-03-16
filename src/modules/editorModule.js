import * as connect from "./uploadModule.js";
import $ from "./extend.js";
const message = "Initializing module ";

const hx = window.innerWidth;
const hy = window.innerHeight;
const msg = `The Window Width is :  ${hx} and the Heigth is : ${hy}`;
console.log(msg);
document.querySelector("#width").textContent = hx;
document.querySelector("#height").textContent = hy;

let m_pos;
// === === === === === === === === === === === === === === === === === === //
//          Construct for set the backgorund img and canvas
// === === === === === === === === === === === === === === === === === === //
// NOTE set 60% of the screen and 15% for the admin menu SET as Image div backgorund
// const percent_width = 95;
// const percent_height = 250;

const percent_width = 90;
const percent_height = 250;

const canvas_width = Math.abs((hx * percent_width) / 100);
const canvas_height = Math.abs((hy * percent_height) / 100);
//alert(`canvas_width ==> ${canvas_width} -- canvas_height ==> ${canvas_height}`);
//CREATE BOX INPUTS

var lineOffset = 4;
var anchrSize = 2;

var mousedown = false;
var clickedArea = { box: -1, pos: "o" };
var x1 = -1;
var y1 = -1;
var x2 = -1;
var y2 = -1;
let boxes = [];
var tmpBox = null;
var page = 1;
var pages = 0;
var off_page = 0;
var bookid;
var input_type = "text";
var this_config = {};

function initMsj(info = {}) {
  return `${message} : ${info.module} by ${info.author}`;
}

function initBooks(config = {}, paramsUrl = {}) {
  const options = { book_id: paramsUrl.book_id, user_id: paramsUrl.user_id };
  bookid = options.book_id;
  this_config = config;
  // funciton run(){
  // set book_id
  // set pages
  // request canvas info from api
  // redraw canvas
  //}
  // init app
  // run()
  // change page
  // run()
  // const xb = setInitial(config, options.book_id);
  // xb.then((data) => {
  //   xboxs = data;
  // });

  // console.log(`Calll previous boxes:`);
  // xboxs = config.xboxs;
  // console.log(config.xboxs);
  loadApi(config, options);
}

function setInitial(config = {}) {
  let get_url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[4]}/${bookid}/${page}`;
  return connect.getData(get_url, config);
}

function loadApi(config = {}, paramArray = {}) {
  // NOTE load info from Api

  let book_id = paramArray.book_id;
  let user_id = paramArray.user_id;

  let get_items = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[3]}/${book_id}/${user_id}`;

  let bookResponse = {};
  const response = connect.getData(get_items, config);
  response.then((data) => {
    if (data.length != 1) {
      bookResponse = data;
    } else {
      // set variables form api
      bookResponse = data[0];
    }
    //call xboxes?
    // console.log(bookResponse);
    let numberPages = document.querySelector(`#number-pages`);
    pages = numberPages.innerHTML = bookResponse.pages;
    //note draw book call turn.js lib for drawing the background
    drawBook(config, bookResponse);
  });

  return null;
}

function drawBook(config = {}, bookResponse = {}) {
  // load div with background images
  loadDivBlock(config, bookResponse);
  // console.log("CHECK CANVAS");
  // at first page is equal to 1
  initCanvasEngine(config, bookid, page);
  // console.log(document.querySelector(".canvas"));
  // set the options
  // load Book from api
  //  loadBook(config, bookResponse);
  initControlKeyboard(config, bookResponse);
  // drawCanvas(img_url,bookResponse)

  return null;
}

async function loadDivBlock(config = {}, bookResponse = {}) {
  // Check if the page is not in the book
  // console.log(`We known xboxs in add page ??? `);
  // console.log(config.bookElements.load);
  const book_section = document.querySelector(`${config.bookElements.load}`);
  // NOTE WORKING  HIR
  // console.log(config.xboxs);

  for (let page = 1; page <= bookResponse.pages; page++) {
    const background_img = bookResponse.book_pages[page];

    let page_book = document.createElement("div");
    page_book.setAttribute("data-in-page", `${page}`);
    page_book.classList.add(`off`);
    const book_attr = document.createAttribute("style");
    book_attr.value = `
                        background-image: url(${background_img});
                        background-size: contain;
                        background-repeat: no-repeat;
                        max-width :100%;
                        max-height: 100%;
                        width: ${canvas_width}px;
                        height: ${canvas_height}px;
    `;

    page_book.setAttributeNode(book_attr);

    page_book.append(attachCanvas(page));
    book_section.appendChild(page_book);
  }
}

// function loadBook(config = {}, bookResponse = {}) {
//   // WORKING HIR
//   // LOAD all Canvas set
//   initCanvasEngine(this_config, bookid, page);
// } //loadBook

function initCanvasEngine(config = {}, bookid, page) {
  // NOTE
  console.log(`In which page we are ${page}`);

  clearPageCanvas(page);

  const bookPages = setInitial(config);
  bookPages.then((data) => {
    // if (data.length > 0) {
    //   console.log(`DAATA`);
    //   boxes = convertSizes(data);
    //   console.log(`On initCanvasEngine :: After positions`);
    //   console.log(boxes);
    // }

    console.log(`off_page : ${off_page}`);
    if (page > 1) {
      let parentUpDiv = document.querySelector(`[data-in-page="${page - 1}"]`);
      // let parentDownDiv = document.querySelector(
      //   `[data-in-page="${page + 1}"]`
      // );
      parentUpDiv.classList.add("off");
      // parentDownDiv.classList.add("off");
      let hiddenDiv = document.querySelector(`[data-in-page="${off_page}"]`);
      hiddenDiv.classList.add("off");
    }
    if (page < 0) {
      // let parentDownDiv = document.querySelector(
      //   `[data-in-page="${pages + page + 1}"]`
      // );
      let hiddenDiv = document.querySelector(`[data-in-page="${off_page}"]`);
      hiddenDiv.classList.add("off");
      // parentDownDiv.classList.add("off");
      page = pages + page;
    }

    if (page == 0) {
      let prevDiv = document.querySelector(`[data-in-page="${1}"]`);
      prevDiv.classList.add("off");
      let hiddenDiv = document.querySelector(`[data-in-page="${off_page}"]`);
      hiddenDiv.classList.add("off");

      page = pages;
    }

    // console.log(page);
    let pageNumber = document.querySelector(`#page-number`);
    pageNumber.value = `${page}`;
    off_page = `${page}`;
    let currentDiv = document.querySelector(`[data-in-page="${page}"]`);
    currentDiv.classList.remove("off");
    // let curdiv = currentDiv.getBoundingClientRect();

    // currentDiv.append(attachCanvas(page));
    let canvas = document.getElementById(`canvas_${page}`);
    let context = canvas.getContext("2d");

    if (data.length > 0) {
      console.log(`DATABOXES`);
      boxes = convertSizes(data, canvas, currentDiv);
      console.log(`On initCanvasEngine :: After positions`);
      console.log(boxes);
    }
    // ===============================================================//
    reloadCanvas(boxes, context);
    // ===============================================================//
    //
    document.getElementById(`canvas_${page}`).onmousedown = function (e) {
      mousedown = true;
      // console.log(`mouse[DOWN] TRUE BOXES --> `);
      // console.log(xboxes[page]);
      // console.log(`mouse[DOWN] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);
      clickedArea = findCurrentArea(e.offsetX, e.offsetY);
      x1 = e.offsetX;
      y1 = e.offsetY;
      x2 = e.offsetX;
      y2 = e.offsetY;

      if (clickedArea.box != -1) {
        var selBox = boxes[clickedArea.box];
        // === === === === === === === === === === === === === === === === === === //
        //            Check if we need delete it
        // === === === === === === === === === === === === === === === === === === //
        let delStroke = document.querySelector("#delStroke");
        // console.log(delStroke);
        // console.log(`IsDeleteOn : ${delStroke.checked}`);

        let cpStroke = document.querySelector("#cpStroke");
        // console.log(cpStroke);
        // console.log(`IsCopyOn : ${cpStroke.checked}`);

        if (delStroke.checked) {
          boxes.splice(clickedArea.box, 1);
          let reload = new reloadCanvas(boxes, context);
        } else if (cpStroke.checked) {
          let xbox1 = selBox.x1 + config.copySize;
          let xboy1 = selBox.y1 + config.copySize;
          let xbox2 = selBox.x2 + config.copySize;
          let xboy2 = selBox.y2 + config.copySize;
          console.log(`boxesPUSH`);
          boxes.push(newBox(xbox1, xboy1, xbox2, xboy2));
          reloadCanvas(boxes, context);
        } else {
          //something else
        }
        //null
      } //ClickedArea
    }; // onmousedown

    document.getElementById(`canvas_${page}`).onmouseup = function (e) {
      if (clickedArea.box == -1 && tmpBox != null) {
        boxes.push(tmpBox);
      } else if (clickedArea.box != -1) {
        var selectedBox = boxes[clickedArea.box];
        //  } else {
        if (selectedBox.x1 > selectedBox.x2) {
          var previousX1 = selectedBox.x1;
          selectedBox.x1 = selectedBox.x2;
          selectedBox.x2 = previousX1;
        }
        if (selectedBox.y1 > selectedBox.y2) {
          var previousY1 = selectedBox.y1;
          selectedBox.y1 = selectedBox.y2;
          selectedBox.y2 = previousY1;
        }
      }

      clickedArea = { box: -1, pos: "o" };
      tmpBox = null;
      mousedown = false;
      //  console.log(`xboxes[page] that can be saved  :`);
      //  console.log(xboxes[page]);
    };

    document.getElementById(`canvas_${page}`).onmouseout = function (e) {
      // console.log(`mouse[OUT] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);

      if (clickedArea.box != -1) {
        var selectedBox = boxes[clickedArea.box];
        if (selectedBox.x1 > selectedBox.x2) {
          var previousX1 = selectedBox.x1;
          selectedBox.x1 = selectedBox.x2;
          selectedBox.x2 > previousX1;
        }
        if (selectedBox.y1 > selectedBox.y2) {
          var previousY1 = selectedBox.y1;
          selectedBox.y1 = selectedBox.y2;
          selectedBox.y2 > previousY1;
        }
      }
      mousedown = false;
      clickedArea = { box: -1, pos: "o" };
      tmpBox = null;
    };

    // Delete circles
    // https://stackoverflow.com/questions/32736999/remove-circle-drawn-in-html5-canvas-once-user-clicks-on-it

    document.getElementById(`canvas_${page}`).onmousemove = function (e) {
      //console.log(`mouse[MOVE] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);

      if (mousedown && clickedArea.box == -1) {
        console.log(`mousedown && clickedArea.box = -1`);
        x2 = e.offsetX;
        y2 = e.offsetY;
        redraw();
      } else if (mousedown && clickedArea.box != -1) {
        console.log(`mousedown && clickedArea.box != -1`);
        x2 = e.offsetX;
        y2 = e.offsetY;
        let xOffset = x2 - x1;
        let yOffset = y2 - y1;
        x1 = x2;
        y1 = y2;

        // NOTE RESIZE ENGINE:
        /*
        -> +---+---+ 
           |       |
        -> +   +   +
           |       |
        -> +---+---+
      */
        if (
          clickedArea.pos == "i" || //inner | init ?
          clickedArea.pos == "tl" || //top-left
          clickedArea.pos == "l" || //left
          clickedArea.pos == "bl" // bottom-left
        ) {
          boxes[clickedArea.box].x1 += xOffset;
        }
        if (
          clickedArea.pos == "i" || //inner
          clickedArea.pos == "tl" || //top-left
          clickedArea.pos == "t" || //top
          clickedArea.pos == "tr" // top-right
        ) {
          boxes[clickedArea.box].y1 += yOffset;
        }
        if (
          clickedArea.pos == "i" || //inner
          clickedArea.pos == "tr" || //top-right
          clickedArea.pos == "r" || //right
          clickedArea.pos == "br" // bottom-right
        ) {
          boxes[clickedArea.box].x2 += xOffset;
        }
        if (
          clickedArea.pos == "i" || // inner
          clickedArea.pos == "bl" || //botom-left
          clickedArea.pos == "b" || //bottom
          clickedArea.pos == "br" // bottom-right
        ) {
          boxes[clickedArea.box].y2 += yOffset;
        }
        // NOTE TEMPORA:
        //        xboxes[page] = boxes;
        // NOTE TEMPORA:
        redraw();
      }
    };
  });
} //initCanvasEngine

function attachCanvas(page) {
  let canvas = document.createElement(`canvas`);
  canvas.setAttribute(`data-page`, `${page}`);
  canvas.setAttribute("id", `canvas_${page}`);
  canvas.setAttribute(`width`, `${canvas_width}px`);
  canvas.setAttribute(`height`, `${canvas_height}px`);
  canvas.innerText = `Your browser doesn't suppor canvas on page ${page}`;

  // let canvas_attr = document.createAttribute("style");
  // canvas_attr.value = `
  //                       width: 100%;
  //                       height: 100%;
  //   `;

  // canvas.setAttributeNode(canvas_attr);

  //  element.appendChild(canvas);
  //  element.innerHTML(canvas);
  return canvas;
}

function redraw() {
  // canvas.width = canvas.width;
  console.log(`REDRAW Function : ${page}`);
  const context = document.getElementById(`canvas_${page}`).getContext("2d");
  context.clearRect(0, 0, canvas_width, canvas_height); // NOTE him or her define this in the canvas element
  context.strokeStyle = "blue";
  // WARNING get url source and set if exists
  // === === === === === === === === === === === === === === === //
  //   This can hold text,textare and crossword
  // === === === === === === === === === === === === === === === //
  context.beginPath();
  //When call a new page for some reason the set of var boxes is lost and if
  //i don't have some previous data the var is destroyed

  for (let i = 0; i < boxes.length; i++) {
    drawBoxOn(boxes[i], context);
  }
  if (clickedArea.box == -1) {
    tmpBox = newBox(x1, y1, x2, y2);
    if (tmpBox != null) {
      drawBoxOn(tmpBox, context);
    }
  }

  // === === === === === === === === === === === === === === === //
} // End of redraw

function findCurrentArea(x, y) {
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];

    // console.log(`what we have in box?`);
    // console.log(JSON.stringify(box));

    let xCenter = box.x1 + (box.x2 - box.x1) / 2;
    let yCenter = box.y1 + (box.y2 - box.y1) / 2;
    if (box.x1 - lineOffset < x && x < box.x1 + lineOffset) {
      if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
        return { box: i, pos: "tl" };
      } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
        return { box: i, pos: "bl" };
      } else if (yCenter - lineOffset < y && y < yCenter + lineOffset) {
        return { box: i, pos: "l" };
      }
    } else if (box.x2 - lineOffset < x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
        return { box: i, pos: "tr" };
      } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
        return { box: i, pos: "br" };
      } else if (yCenter - lineOffset < y && y < yCenter + lineOffset) {
        return { box: i, pos: "r" };
      }
    } else if (xCenter - lineOffset < x && x < xCenter + lineOffset) {
      if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
        return { box: i, pos: "t" };
      } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
        return { box: i, pos: "b" };
      } else if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
        return { box: i, pos: "i" };
      }
    } else if (box.x1 - lineOffset < x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
        return { box: i, pos: "i" };
      }
    }
  }
  return { box: -1, pos: "o" };
}

function newBox(x1, y1, x2, y2) {
  let boxX1 = x1 < x2 ? x1 : x2;
  let boxY1 = y1 < y2 ? y1 : y2;
  let boxX2 = x1 > x2 ? x1 : x2;
  let boxY2 = y1 > y2 ? y1 : y2;
  if (boxX2 - boxX1 > lineOffset * 2 && boxY2 - boxY1 > lineOffset * 2) {
    return {
      x1: boxX1,
      y1: boxY1,
      x2: boxX2,
      y2: boxY2,
      lineWidth: 1,
      color: "DeepSkyBlue",
      inputType: input_type,
      source_width: canvas_width,
      source_height: canvas_height,
      default_width: this_config.default_width,
      default_height: this_config.default_height,
      bms_books_id: bookid,
      bms_bookpages_id: page,
      page: page,
    };
  } else {
    return null;
  }
}

function drawBoxOn(box, context) {
  let xCenter = box.x1 + (box.x2 - box.x1) / 2;
  let yCenter = box.y1 + (box.y2 - box.y1) / 2;
  let ratio = (box.x2 - box.x1) / 2;

  context.shadowColor = "DeepSkyBlue";
  context.shadowBlur = 13;

  context.strokeStyle = box.color;
  context.fillStyle = box.color;
  context.lineWidth = box.lineWidth;

  // console.log(`DEBUG::`);

  //update rect coordinates
  // rect.top = rect.top * ratio_h;
  // rect.left = rect.left * ratio_w;
  // rect.height = rect.height * ratio_h;
  // rect.width = rect.width * ratio_w;

  // console.log(
  //   `Whe need to recalculate the size and positions so defaults : ${
  //     this_config.default_width
  //   } X ${this_config.default_height}
  //       Calling to redraw() size of canvas is : ${context.canvas.width} and ${
  //     context.canvas.height
  //   }
  //       and the saved sizes are : ${box.x1} X ${box.y1} for sizes ${
  //     box.source_width
  //   } X ${box.source_height}
  //       so the new sizes must be for defaults = ${
  //         (box.x1 / context.canvas.width) * this_config.default_width
  //       } and ${(box.y1 / context.canvas.height) * this_config.default_height}
  //       and sizes for defaults = ${
  //         (box.x1 / box.source_width) * context.canvas.width
  //       } and ${(box.y1 / box.source_height) * context.canvas.height}
  //     `
  // );
  // console.log(recalCanvasStrokes(box, context));
  // // console.log(`xCenter => ${xCenter} and yCenter ${yCenter}`);
  // // console.log(`position in x => ${box.x1} and y ${box.y1}`);
  // // console.log(`Color => ${box.color}`);
  // console.log(box);

  if (
    box.inputType == "text" ||
    box.inputType == "textarea" ||
    box.inputType == "crossword"
  ) {
    context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    //      context.closePath();
    context.stroke();

    // aesthetic resize decorator marks
    // +------------+------------+
    // |                         |
    // +            +            +
    // |                         |
    // +------------+------------+

    // top-left
    context.fillRect(
      box.x1 - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //top-center
    context.fillRect(
      box.x1 - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //top-right
    context.fillRect(
      box.x1 - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //middle-left
    context.fillRect(
      xCenter - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //middle-center
    context.fillRect(
      xCenter - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //middle-right
    context.fillRect(
      xCenter - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //bottom-left
    context.fillRect(
      box.x2 - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //bottom-center
    context.fillRect(
      box.x2 - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //bottom-right
    context.fillRect(
      box.x2 - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
  } // input type as text

  if (box.inputType == "option") {
    context.beginPath();
    //context.arc(xCenter, yCenter, ratio, 0, Math.PI * 2, true); // Outer circle
    var arco = new circle(xCenter, yCenter, ratio);
    context.stroke(arco);

    //top
    context.fillRect(
      xCenter - anchrSize,
      yCenter - ratio - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //left
    context.fillRect(
      xCenter - ratio - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //center
    context.fillRect(
      xCenter - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //right
    context.fillRect(
      xCenter + ratio - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    //bottom
    context.fillRect(
      xCenter,
      yCenter - 1.5 + ratio,
      2 * anchrSize,
      2 * anchrSize
    );
  }
}

// function clickHandler(e) {
//   var r = context.canvas.getBoundingClientRect(),
//     x = e.clientX - r.left,
//     y = e.clientY - r.top,
//     i;
//   console.log(`ClickHan R => `);
//   // console.log(clickedArea);
//   console.log(r);

//   console.log(context.getContextAttributes());
//   for (i = boxes.length - 1; i >= 0; --i) {
//     console.log(i);
//     if (context.isPointInPath(boxes[i], x, y, "nonzero")) {
//       boxes.splice(i, 1);
//     }
//   }

//   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//   context.beginPath();

//   for (var i = 0; i < boxes.length; i++) {
//     drawBoxOn(boxes[i], context);
//   }
// }

function reloadCanvas(boxes, context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  for (var i = 0; i < boxes.length; i++) {
    drawBoxOn(boxes[i], context);
  }
}

function clearPageCanvas(page) {
  console.log(`INSIDE CLEAR CANVAS`);
  console.log(boxes);
  console.log(`VARRS: ${x1} ${y1} ${x2} ${y2}`);
  mousedown = false;
  clickedArea = { box: -1, pos: "o" };
  x1 = -1;
  y1 = -1;
  x2 = -1;
  y2 = -1;
  boxes = [];
  tmpBox = null;
  console.log(`RESET BOXES??`);
  console.log(boxes);

  let canvas = document.getElementById(`canvas_${page}`);
  let context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "blue";

  context.beginPath();
}

function saveBox() {
  console.log(`BOXES in X`);
  console.log(boxes);

  let url = `${this_config.protocol_json}${this_config.srv_json}:${this_config.port_json}/${this_config.api_method[1]}/${bookid}/${page}`;

  let response_json = connect.postData(url, boxes);
  console.log(
    `url: ${url} and request : ${JSON.stringify(
      boxes
    )} and response ${JSON.stringify(response_json)}`
  );
}

function circle(x, y, radius) {
  var c = new Path2D();
  c.arc(x, y, radius, 0, Math.PI * 2);
  return c;
}

function recalCanvasStrokes(box, context) {
  //make canvas same as image, which may have changed size and position

  console.log(box);
  console.log(context);

  //compute ratio comparing the NEW canvas rect with the OLD (current)
  var ratio_w = box.source_width / context.canvas.width;
  var ratio_h = box.source_height / context.canvas.height;
  //update rect coordinates
  let xtop = box.x1 * ratio_h;
  let xleft = box.y1 * ratio_w;
  let xwidth = box.x2 * ratio_w;
  let xheight = box.y2 * ratio_h;

  console.log(
    `New sizez positions : ${xtop} X ${xleft} -> ${xwidth} : ${xheight}`
  );
  //NOTE set new positions
  // box.x1 = xtop;
  // box.y1 = xleft;
  // box.x2 = xwidth;
  // box.y2 = xheight;
}

function initControlKeyboard(config = {}, bookResponse = {}) {
  const inputs = document.querySelectorAll("[name=inpsel]");
  for (const input of inputs) {
    input.addEventListener("change", (evt) => {
      switch (evt.target.value) {
        case "text":
          console.log(`text`);
          input_type = "text";
          console.log(`set input_type to ${input_type}`);
          return input_type;
        case "option":
          console.log(`option`);
          input_type = "option";
          console.log(`set input_type to ${input_type}`);
          return input_type;
        case "textarea":
          console.log(`textarea`);
          input_type = "textarea";
          console.log(`set input_type to ${input_type}`);
          return input_type;
        case "crossword":
          console.log(`crossword`);
          input_type = "crossword";
          console.log(`set input_type to ${input_type}`);
          return input_type;
        default:
          console.log(`original or default`);
          input_type = "text";
          console.log(`set input_type to ${input_type}`);
          return input_type;
      }
    });
  }
}

function handleEventOnDom(element, typeEvent) {
  // |this| is a newly created object
  this.name = `Initialize Dom ${typeEvent}`;
  this.handleEvent = function (event) {
    console.log(this.name); // 'Something Good', as this is bound to newly created object

    // NOTE relative to the canvas UIX
    if (typeEvent == "canvas") {
      switch (event.type) {
        case "click":
          clearPageCanvas(page);
          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
    }
    // NOTE Handle events for post json data
    if (typeEvent == "postapi") {
      switch (event.type) {
        case "click":
          console.log(`Sending Data ... :${element}`);
          saveBox();
          // clearPageCanvas(page);
          redraw();
          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
      // saveBox();
    }
    // NOTE relative to the canvas UIX
    if (typeEvent == "next") {
      switch (event.type) {
        case "click":
          // saveBox();
          page = page + 1;
          console.log(`next :${page}`);

          initCanvasEngine(this_config, bookid, page, true);

          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
    }
    if (typeEvent == "prev") {
      switch (event.type) {
        case "click":
          // change page:
          // saveBox();
          page = page - 1;
          console.log(`prev :${page}`);
          initCanvasEngine(this_config, bookid, page);
          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
    }
  };

  // Note that the listeners in this case are |this|, not this.handleEvent
  element.addEventListener("click", this, false);
  element.addEventListener("dblclick", this, false);

  // You can properly remove the listeners
  //  element.removeEventListener('click', this, false);
  //  element.removeEventListener('dblclick', this, false);
}

const cleaner = document.querySelector("#cleanCanvas");
console.log(`Clean : ${cleaner}`);
let clean = new handleEventOnDom(cleaner, "canvas");

const send = document.querySelector("#save_page");
console.log(`Send : ${send}`);
let send_data = new handleEventOnDom(send, "postapi");

const next = document.querySelector("#next");
console.log(`Next : ${next}`);
let next_page = new handleEventOnDom(next, "next");

const prev = document.querySelector("#prev");
console.log(`Prev : ${prev}`);
let prev_page = new handleEventOnDom(prev, "prev");

// Working from hir
function convertSizes(xbox = {}, canvas, element) {
  //Dimensions for
  // console.log(data);
  let psp = {};
  psp = xbox;

  // let containerImg = document.querySelector(`canvas_${page}`);

  console.log(`::CANVAS::`);
  let canvasDimensions = canvas.getBoundingClientRect();
  console.log(canvasDimensions);
  console.log(`::ElementDiv::`);
  let div = element.getBoundingClientRect();
  console.log(div);

  let newDimensions = Math.hypot(
    canvasDimensions.width,
    canvasDimensions.height
  );
  console.log(newDimensions);

  Object.keys(xbox).forEach((keys) => {
    // Teorem
    let sourceDimensions = Math.hypot(
      xbox[keys].source_width,
      xbox[keys].source_height
    );
    console.log(sourceDimensions);
    let scaleFactor = newDimensions / sourceDimensions;
    console.log(scaleFactor);

    //calculate new dimensions and positions
    xbox[keys].x1 = xbox[keys].x1 * scaleFactor;
    xbox[keys].y1 = xbox[keys].y1 * scaleFactor;
    xbox[keys].x2 = xbox[keys].x2 * scaleFactor;
    xbox[keys].y2 = xbox[keys].y2 * scaleFactor;

    // calculate percents
    let top = (xbox[keys].x1 / div.width) * 100;
    let left = (xbox[keys].y1 / div.height) * 100;
    let width = (xbox[keys].x2 / div.width) * 100;
    let height = (xbox[keys].y2 / div.height) * 100;

    console.log(
      ` Top = ${xbox[keys].x1 * scaleFactor} vs : ${
        psp[keys].x1
      } and percents : ${top}`
    );
    console.log(
      ` Left = ${xbox[keys].y1 * scaleFactor} vs : ${
        psp[keys].y1
      } and percents : ${left}`
    );
    console.log(
      ` Width = ${xbox[keys].x2 * scaleFactor} vs : ${
        psp[keys].x2
      } and percents : ${width}`
    );
    console.log(
      ` Heigth = ${xbox[keys].y2 * scaleFactor} vs : ${
        psp[keys].y2
      } and percents : ${height}`
    );
  });
  // set new size and positions
  // data.x1 = x1 ...
  return xbox;
}

function reportWindowSize() {
  const heightOutput = document.querySelector("#height");
  const widthOutput = document.querySelector("#width");

  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;

  const msg = ` \
          reportWindowSize width :  ${window.innerWidth} \
          and the Heigth : ${window.innerHeight} \
  `;
  console.log(msg);
}
// window.addEventListener("resize", reportWindowSize);

// ControlPanel

function resize(e) {
  let parent = resize_el.parentNode;
  let dx = m_pos - e.x;
  m_pos = e.x;
  parent.style.width = parseInt(getComputedStyle(parent, "").width) + dx + "px";
}

let resize_el = document.getElementById("resize");
resize_el.addEventListener(
  "mousedown",
  function (e) {
    m_pos = e.x;
    document.addEventListener("mousemove", resize, false);
  },
  false
);

document.addEventListener(
  "mouseup",
  function () {
    document.removeEventListener("mousemove", resize, false);
  },
  false
);

export { initBooks, initMsj, setInitial, reportWindowSize };
