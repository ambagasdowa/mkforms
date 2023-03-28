import * as configuration from "./config.js";
import * as connect from "./uploadModule.js";
import { zoom } from "./zoom.js";

let conf = configuration.config;
let config = conf.xeditor;
let page = 1;
let pages = {};
let bookid;
let totalPages = 0;

// Editor Engine
let lineOffset = 4;
let anchrSize = 2;
let mousedown = false;
let clickedArea = { box: -1, pos: "o" };
let x1 = -1;
let y1 = -1;
let x2 = -1;
let y2 = -1;
let boxes = [];
let tmpBox = null;
let off_page = 0;
let input_type = "text";
let canvas_width;
let canvas_height;

let img_width = 0;
let img_heigth = 0;

const message = "Initializing module";

function initMsj() {
  return `${message} : ${conf.xeditor["module"]} by ${conf.author}`;
}

function initBooks(paramsUrl = {}) {
  const options = { book_id: paramsUrl.book_id, user_id: paramsUrl.user_id };
  let book_id = options.book_id;
  let user_id = options.user_id;
  bookid = book_id;
  let get_book = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[3]}/${book_id}/${user_id}`;

  let bookResponse = {};
  const response = connect.getData(get_book, config);
  response.then((data) => {
    if (data.length != 1) {
      bookResponse = data;
    } else {
      bookResponse = data[0];
    }
    //   console.log(bookResponse);
    let bookPages = JSON.parse(JSON.stringify(bookResponse.book_pages));

    // console.log(bookPages.length);

    for (const key in bookPages) {
      if (bookPages.hasOwnProperty.call(bookPages, key)) {
        const element = bookPages[key];
        console.log(element);
      }
    }
    pages = bookPages;
    if (debug) {
      document.querySelector("#number-pages").innerText = bookPages["pages"];
    }
    // loadBoxes();
    // RUN APP
    attachPage();
    initControl();
    initControlKeyboard();

    // =========================//
  });
}

//=========================================//
//       BOOK PAGE REDERING
//=========================================//

function attachPage() {
  /*--------------------
Setup
--------------------*/
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const win = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  canvas_width = win.w;
  canvas_height = win.h;

  cleanPageCanvasStrokes(canvas, ctx);

  if (debug) {
    document.querySelector(
      "#dcanvas"
    ).innerHTML = ` Window: ${canvas_width} X ${canvas_height}`;
  }

  document.querySelector("#page-number").value = page;

  //LAB
  const bookBoxes = getBoxes();
  bookBoxes.then((data) => {
    // console.log(JSON.stringify(data));

    boxes = data;

    const img = new Image();
    /*--------------------
Cover Image
--------------------*/
    const coverImg = (img, type = "cover") => {
      const imgRatio = img.height / img.width;
      const winRatio = window.innerHeight / window.innerWidth;
      if (
        (imgRatio < winRatio && type === "contain") ||
        (imgRatio > winRatio && type === "cover")
      ) {
        const h = window.innerWidth * imgRatio;
        ctx.drawImage(
          img,
          0,
          (window.innerHeight - h) / 2,
          window.innerWidth,
          h
        );
        // console.log(`COVER`);
      }
      if (
        (imgRatio > winRatio && type === "contain") ||
        (imgRatio < winRatio && type === "cover")
      ) {
        const w = (window.innerWidth * winRatio) / imgRatio;
        ctx.drawImage(img, (win.w - w) / 2, 0, w, window.innerHeight);
        // console.log(`CONTAIN`);
      }

      loadEngine(canvas, ctx, img);
    };

    /*--------------------
Render
--------------------*/
    const render = () => {
      ctx.clearRect(0, 0, win.w, win.h);
      const type = document.querySelector('input[name="type"]:checked').value;

      coverImg(img, type);

      requestAnimationFrame(render);
    };

    /*--------------------
Init
--------------------*/
    const init = () => {
      resize();
      render();
      // ============== TODO ================= //
      // SET img dimensions
      img_width = img.width;
      img_heigth = img.height;

      let domImg = document.querySelector("#dimg");
      domImg.innerHTML = `Image : ${img.width} X ${img.height}`;
      console.log(`image ${img.width} X ${img.height}`);
    };

    /*--------------------
Preload Image
--------------------*/
    //const imgSrc =
    // "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/autumn.jpg";
    const imgSrc = pages[page];
    img.onload = init;
    img.src = imgSrc;

    /*--------------------
Resize
--------------------*/
    const resize = () => {
      win.w = window.innerWidth;
      win.h = window.innerHeight;
      canvas.width = win.w;
      canvas.height = win.h;
      canvas.style.width = `${win.w}px`;
      canvas.style.height = `${win.h}px`;
    };
    window.addEventListener("resize", init);
  }); // boxes data
} //attachPage

//////////////////////////////////////////////
//=========================================//
//        Canvas Engine Section
//=========================================//
function loadEngine(canvas, ctx, img) {
  // console.log(`loadEngine`);
  dimensions(canvas, ctx, img, boxes, "contain");
  redraw(ctx);
  canvasEngine(canvas, ctx);
}

function dimensions(canvas, ctx, img, boxes, process) {
  let dimensions = canvas.getBoundingClientRect();
  console.log(
    `Canvas dimensions => ${dimensions.width} x ${dimensions.height}`
  );
  // =====================  //
  // set ratios
  console.log(`SET DIMENSIONS`);

  // oloop(boxes);
  // const boxRatio = h/w
  const imgRatio = img.height / img.width;
  const winRatio = window.innerHeight / window.innerWidth;

  const h = window.innerWidth * imgRatio;
  const w = (window.innerWidth * winRatio) / imgRatio;

  console.log(`DIMENSIONS IMAGE ${img.width} X ${img.height}`);

  for (const key in boxes) {
    const jsonElement = boxes[key];
    console.log(jsonElement);

    // if (
    //   (imgRatio < winRatio && type === "contain") ||
    //   (imgRatio > winRatio && type === "cover")
    // ) {
    //   // const h = window.innerWidth * imgRatio;
    //   // ctx.drawImage(
    //   //   img,
    //   //   0,
    //   //   (window.innerHeight - h) / 2,
    //   //   window.innerWidth,
    //   //   h
    //   // );
    //   // // console.log(`COVER`);
    // }
    // if (
    //   (imgRatio > winRatio && type === "contain") ||
    //   (imgRatio < winRatio && type === "cover")
    // ) {
    //   // const w = (window.innerWidth * winRatio) / imgRatio;
    //   // ctx.drawImage(img, (win.w - w) / 2, 0, w, window.innerHeight);
    //   // console.log(`CONTAIN`);
    // }
  }

  //return new_boxes;
} // Dimensions

function oloop(data) {
  for (const key in data) {
    if (data.hasOwnProperty.call(data, key)) {
      const element = data[key];
      console.log(`key ==> ${key}`);
      for (const k in element) {
        if (Object.hasOwnProperty.call(element, k)) {
          console.log(`${k} -> ${element[k]}`);
        }
      }
    }
  }
}

function canvasEngine(canvas, ctx) {
  // // ===============================================================//
  // Canvas Engine
  // // ===============================================================//
  //
  document.getElementById(`canvas`).onmousedown = function (e) {
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
        let reload = new reloadCanvas(boxes, ctx);
      } else if (cpStroke.checked) {
        let xbox1 = selBox.x1 + config.copySize;
        let xboy1 = selBox.y1 + config.copySize;
        let xbox2 = selBox.x2 + config.copySize;
        let xboy2 = selBox.y2 + config.copySize;
        console.log(`boxesPUSH`);
        boxes.push(newBox(xbox1, xboy1, xbox2, xboy2));
        reloadCanvas(boxes, ctx);
      } else {
        //something else
      }
      //null
    } //ClickedArea
  }; // onmousedown

  document.getElementById(`canvas`).onmouseup = function (e) {
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

  document.getElementById(`canvas`).onmouseout = function (e) {
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

  document.getElementById(`canvas`).onmousemove = function (e) {
    //console.log(`mouse[MOVE] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);

    if (mousedown && clickedArea.box == -1) {
      console.log(`mousedown && clickedArea.box = -1`);
      x2 = e.offsetX;
      y2 = e.offsetY;
      redraw(ctx);
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
      redraw(ctx);
    }
  };
  //////////
}

function getBoxes() {
  console.log(`in getBoxes call to book id as  ${bookid}`);
  let get_url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[4]}/${bookid}/${page}`;
  return connect.getData(get_url, config);
}

function mkzoom(event) {
  console.log(`running zoom engine`);
  console.log(event.target);
  event.preventDefault();
  zoom.to({
    element: event.target,
    // Amount of empty space around zoomed element
    padding: 20,
    // Function to call once zooming completes
    callback: function () {
      console.log(`zooming is complete `);
    },
  });
  // });
}

function initControl() {
  const next = document.querySelector("#next");
  console.log(`Next : ${next}`);
  new handleEventOnDom(next, "next");

  const prev = document.querySelector("#prev");
  console.log(`Prev : ${prev}`);
  new handleEventOnDom(prev, "prev");

  const cleaner = document.querySelector("#cleanCanvas");
  console.log(`Clean : ${cleaner}`);
  new handleEventOnDom(cleaner, "canvas");

  const send = document.querySelector("#save_page");
  console.log(`Send : ${send}`);
  new handleEventOnDom(send, "postapi");

  //zoom engine
  // const zoom = document.querySelector("canvas");
  // console.log(`Zoom : ${zoom}`);
  // handleEventOnDom(zoom, "zoom");
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
          //clearPageCanvas();
          attachPage();
          //initCanvasEngine(this_config, bookid, page, true);

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
          //clearPageCanvas();
          attachPage();
          // initCanvasEngine(this_config, bookid, page);
          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
    }

    if (typeEvent == "zoom") {
      switch (event.type) {
        case "click":
          console.log(`makeclick`);
          // change page:
          // saveBox();
          break;
        case "dblclick":
          console.log(`make DBLCLICK`);
          console.log(`ZOOM is CAlled on dblclick`);
          mkzoom(event);
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

//=================================//
// Canvas Engine Tools
//=================================//
function redraw(ctx) {
  // canvas.width = canvas.width;
  // console.log(`REDRAW Function : ${page}`);
  // console.log(typeof ctx);
  // // console.log(oloop(ctx));
  // // if (typeof ctx === "undefined") {
  // console.log(`no CTX ? `);
  // const ctx = document.getElementById("canvas").getContext("2d");
  // }
  //  let cv = document.getElementById("canvas").getBoundingClientRect();
  //  console.log(`widthCanvas => ${cv.width} HeigthCavnsas => ${cv.height}`);

  // context.clearRect(0, 0, canvas_width, canvas_height); // NOTE him or her define this in the canvas element
  ctx.strokeStyle = "blue";
  // WARNING get url source and set if exists
  // === === === === === === === === === === === === === === === //
  //   This can hold text,textare and crossword
  // === === === === === === === === === === === === === === === //
  // console.log(`BOXES AND LENgth IN REDRAW`);
  // console.log(JSON.stringify(boxes));
  // console.log(boxes.length);
  ctx.beginPath();
  //When call a new page for some reason the set of var boxes is lost and if
  //i don't have some previous data the var is destroyed
  for (let i = 0; i < boxes.length; i++) {
    drawBoxOn(boxes[i], ctx);
  }
  if (clickedArea.box == -1) {
    tmpBox = newBox(x1, y1, x2, y2);
    if (tmpBox != null) {
      drawBoxOn(tmpBox, ctx);
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
      default_width: 0,
      default_height: 0,
      bms_books_id: bookid,
      bms_bookpages_id: page,
      page: page,
    };
  } else {
    return null;
  }
}

function drawBoxOn(box, context) {
  // console.log(`DEBUG::drawBoxOn --> ${box.inputType}`);
  let xCenter = box.x1 + (box.x2 - box.x1) / 2;
  let yCenter = box.y1 + (box.y2 - box.y1) / 2;
  let ratio = (box.x2 - box.x1) / 2;

  context.shadowColor = "DeepSkyBlue";
  context.shadowBlur = 13;

  context.strokeStyle = box.color;
  context.fillStyle = box.color;
  context.lineWidth = box.lineWidth;

  if (
    box.inputType == "text" ||
    box.inputType == "textarea" ||
    box.inputType == "crossword"
  ) {
    context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    // console.log(`Which INPUT TYPE is ${box.inputType} whidth anchor ${anchrSize}
    // and lineOffset > ${lineOffset}`);
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
    // console.log(`IS an ARC ??`);
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

function reloadCanvas(boxes, context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  for (var i = 0; i < boxes.length; i++) {
    drawBoxOn(boxes[i], context);
  }
}

function clearPageCanvas() {
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

  let canvas = document.getElementById(`canvas`);
  let context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas_width, canvas_height);
  context.strokeStyle = "blue";

  context.beginPath();
}

function cleanPageCanvasStrokes(canvas, ctx) {
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

  // let canvas = document.getElementById(`canvas`);
  // let context = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas_width, canvas_height);
  ctx.strokeStyle = "blue";

  // context.beginPath();
}

function saveBox() {
  console.log(`BOXES in X`);
  console.log(boxes);

  let url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[1]}/${bookid}/${page}`;

  //TODO make boxes conversion then save

  let response_json = connect.postData(url, boxes);
  response_json.then((data) => {
    console.log(
      `url: ${url} and request : ${JSON.stringify(
        boxes
      )} and response ${JSON.stringify(data)}`
    );

    attachPage();
    document.querySelector("#msj").innerText = "ok";
  });
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

//function convertSizes(xbox = {}, canvas, element) {
//  //Dimensions for
//  // console.log(data);
//  let psp = {};
//  psp = xbox;

//  // let containerImg = document.querySelector(`canvas_${page}`);

//  console.log(`::CANVAS::`);
//  let canvasDimensions = canvas.getBoundingClientRect();
//  console.log(canvasDimensions);
//  console.log(`::ElementDiv::`);
//  let div = element.getBoundingClientRect();
//  console.log(div);

//  let newDimensions = Math.hypot(
//    canvasDimensions.width,
//    canvasDimensions.height
//  );
//  console.log(newDimensions);

//  Object.keys(xbox).forEach((keys) => {
//    // Teorem
//    let sourceDimensions = Math.hypot(
//      xbox[keys].source_width,
//      xbox[keys].source_height
//    );
//    console.log(sourceDimensions);
//    let scaleFactor = newDimensions / sourceDimensions;
//    console.log(scaleFactor);

//    //calculate new dimensions and positions
//    xbox[keys].x1 = xbox[keys].x1 * scaleFactor;
//    xbox[keys].y1 = xbox[keys].y1 * scaleFactor;
//    xbox[keys].x2 = xbox[keys].x2 * scaleFactor;
//    xbox[keys].y2 = xbox[keys].y2 * scaleFactor;

//    // calculate percents
//    let top = (xbox[keys].x1 / div.width) * 100;
//    let left = (xbox[keys].y1 / div.height) * 100;
//    let width = (xbox[keys].x2 / div.width) * 100;
//    let height = (xbox[keys].y2 / div.height) * 100;

//    console.log(
//      ` Top = ${xbox[keys].x1 * scaleFactor} vs : ${
//        psp[keys].x1
//      } and percents : ${top}`
//    );
//    console.log(
//      ` Left = ${xbox[keys].y1 * scaleFactor} vs : ${
//        psp[keys].y1
//      } and percents : ${left}`
//    );
//    console.log(
//      ` Width = ${xbox[keys].x2 * scaleFactor} vs : ${
//        psp[keys].x2
//      } and percents : ${width}`
//    );
//    console.log(
//      ` Heigth = ${xbox[keys].y2 * scaleFactor} vs : ${
//        psp[keys].y2
//      } and percents : ${height}`
//    );
//  });
//  // set new size and positions
//  // data.x1 = x1 ...
//  return xbox;
//}

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

// Draggable element
function draggable(el) {
  el.addEventListener("mousedown", function (e) {
    var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
    var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

    function mouseMoveHandler(e) {
      el.style.top = e.clientY - offsetY + "px";
      el.style.left = e.clientX - offsetX + "px";
    }

    function reset() {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", reset);
    }

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", reset);
  });
}

export { initMsj, initBooks, draggable };
