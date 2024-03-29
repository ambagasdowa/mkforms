window.onload = function () {
  // NOTE boring paper old syntax
  let hx = window.innerWidth;
  let hy = window.innerHeight;
  let msg = `The Window Width is :  ${hx} and the Heigth is : ${hy}`;
  console.log(msg);

  // === === === === === === === === === === === === === === === === === === //
  //          Construct for set the backgorund img and canvas
  // === === === === === === === === === === === === === === === === === === //
  // NOTE set 60% of the screen and 15% for the admin menu SET as Image div backgorund
  let percent_width = 95;
  let percent_height = 250;

  var canvas_width = (window.innerWidth * percent_width) / 100;
  var canvas_height = (window.innerHeight * percent_height) / 100;

  // NOTE add background image to div
  console.log(`loading img`);
  page_book = document.querySelector(".canvas");
  url_img =
    "https://baizabal.xyz/assets/Panamericano/files/source/book/matematicas/002/bachillerato/pages/16.jpg";
  const book_attr = document.createAttribute("style");

  // .img-element: {url(images/bg.jpg) no-repeat center center fixed;
  //   -webkit-background-size: cover;
  //   -moz-background-size: cover;
  //   -o-background-size: cover;
  //   background-size: cover;
  // }

  ////size of the img
  // book_attr.value = `background-image: url(" ${url_img}");`;
  // book_attr.value += `background-size: contain;`;
  // book_attr.value += `background-repeat: no-repeat;`;
  // // size of the div
  // book_attr.value += `width: ${canvas_width}px;`;
  // book_attr.value += `height: ${canvas_height}px;`;

  ////size of the img
  book_attr.value = `background-image: url(" ${url_img}");`;
  book_attr.value += `background-size: contain;`;
  book_attr.value += `background-repeat: no-repeat;`;
  // size of the div
  // book_attr.value += `width: ${canvas_width}px;`;
  // book_attr.value += `height: ${canvas_height}px;`;

  book_attr.value += `max-width :100%;`;
  book_attr.value += `max-height: 100%;`;
  book_attr.value += `width: ${canvas_width}px;`;
  book_attr.value += `height: ${canvas_height}px;`;

  // size of the div

  page_book.setAttributeNode(book_attr);

  console.log(document.querySelector(".canvas"));
  // =======================================================================================//

  msg = `The New Canvas Width is : ${canvas_width} and the Heigth is : ${canvas_height}`;
  console.log(msg);

  console.log("The Div : ");
  const div_canvas = document.querySelector(".canvas").getBoundingClientRect();
  console.log(div_canvas);

  // set canvas dimension from img background
  //
  const context = document.querySelector("canvas").getContext("2d");
  context.canvas.width = canvas_width;
  context.canvas.height = canvas_height;

  //  drawCoords(context, context.canvas.width, context.canvas.height, "seagreen");

  console.log("The Canvas :");
  const can_canvas = document.querySelector("canvas").getBoundingClientRect();
  console.log(can_canvas);

  // === === === === === === === === === === === === === === === === === === //
  // === === === === === === === === === === === === === === === === === === //
  // NOTE CONFIG SECTION
  // === === === === === === === === === === === === === === === === === === //
  // === === === === === === === === === === === === === === === === === === //

  // Padding and border style widths for mouse offsets

  //  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

  //CREATE BOX INPUTS

  var lineOffset = 4;
  var anchrSize = 2;
  // var anchrSize = 4;

  var mousedown = false;
  var clickedArea = { box: -1, pos: "o" };
  var x1 = -1;
  var y1 = -1;
  var x2 = -1;
  var y2 = -1;

  var boxes = [];
  var tmpBox = null;

  let book = 1;
  let page = 3;
  input_type = "text";

  // NOTE Example for objects
  const param = "size";
  const config = {
    [param]: 12,
    [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
    default_width: 1275,
    default_height: 1650,
  };

  console.log(config); // {size: 12, mobileSize: 4}

  console.log(`bok_id -> ${book} and page_idd -> ${page}`);

  get_url = `https://baizabal.xyz:8000/srcpos/${book}/${page}`;
  const xboxes = getData(get_url);
  xboxes.then((data) => ((boxes = data), redraw()));

  //NOTE get boxes

  document.getElementById("canvas").onmousedown = function (e) {
    mousedown = true;
    console.log(`mouse[DOWN] TRUE BOXES --> `);
    console.log(boxes);
    console.log(`mouse[DOWN] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);
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
      console.log(delStroke);
      console.log(`IsDeleteOn : ${delStroke.checked}`);

      let cpStroke = document.querySelector("#cpStroke");
      console.log(cpStroke);
      console.log(`IsCopyOn : ${cpStroke.checked}`);

      if (delStroke.checked) {
        boxes.splice(clickedArea.box, 1);
        let reload = new reloadCanvas(boxes, context);
      } else if (cpStroke.checked) {
        xbox1 = selBox.x1 + config.copySize;
        xboy1 = selBox.y1 + config.copySize;
        xbox2 = selBox.x2 + config.copySize;
        xboy2 = selBox.y2 + config.copySize;
        boxes.push(newBox(xbox1, xboy1, xbox2, xboy2));
        reloadCanvas(boxes, context);
      } else {
        //something else
      }
      //null
    } //ClickedArea
  }; // onmousedown

  document.getElementById("canvas").onmouseup = function (e) {
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
    //  console.log(`BOXES that can be saved  :`);
    //  console.log(boxes);
  };

  document.getElementById("canvas").onmouseout = function (e) {
    console.log(`mouse[OUT] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);

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

  document.getElementById("canvas").onmousemove = function (e) {
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
      xOffset = x2 - x1;
      yOffset = y2 - y1;
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
      redraw();
    }
  };

  function redraw() {
    // canvas.width = canvas.width;
    var context = document.getElementById("canvas").getContext("2d");

    context.clearRect(0, 0, canvas_width, canvas_height); // NOTE him or her define this in the canvas element
    context.strokeStyle = "blue";
    // WARNING get url source and set if exists
    //console.log(context.canvas);
    console.log(`set type of input -> ${input_type}`);
    // === === === === === === === === === === === === === === === //
    //   This can hold text,textare and crossword
    // === === === === === === === === === === === === === === === //
    context.beginPath();
    console.log(`What is selected in [::REDRAW::] ==> ${input_type}`);

    //Call to WS and  SET the previus boxes
    // or null
    for (var i = 0; i < boxes.length; i++) {
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
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];

      console.log(`what we have in box?`);
      console.log(JSON.stringify(box));

      xCenter = box.x1 + (box.x2 - box.x1) / 2;
      yCenter = box.y1 + (box.y2 - box.y1) / 2;
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
    boxX1 = x1 < x2 ? x1 : x2;
    boxY1 = y1 < y2 ? y1 : y2;
    boxX2 = x1 > x2 ? x1 : x2;
    boxY2 = y1 > y2 ? y1 : y2;
    if (boxX2 - boxX1 > lineOffset * 2 && boxY2 - boxY1 > lineOffset * 2) {
      return {
        x1: boxX1,
        y1: boxY1,
        x2: boxX2,
        y2: boxY2,
        lineWidth: 1,
        color: "DeepSkyBlue",
        inputType: input_type,
        source_width: context.canvas.width,
        source_height: context.canvas.height,
        default_width: config.default_width,
        default_height: config.default_height,
        bms_books_id: book,
        bms_bookpages_id: page,
        page: page,
      };
    } else {
      return null;
    }
  }

  function drawBoxOn(box, context) {
    xCenter = box.x1 + (box.x2 - box.x1) / 2;
    yCenter = box.y1 + (box.y2 - box.y1) / 2;
    ratio = (box.x2 - box.x1) / 2;

    context.shadowColor = "DeepSkyBlue";
    context.shadowBlur = 13;

    context.strokeStyle = box.color;
    context.fillStyle = box.color;
    context.lineWidth = box.lineWidth;

    console.log(`DEBUG::`);

    //update rect coordinates
    // rect.top = rect.top * ratio_h;
    // rect.left = rect.left * ratio_w;
    // rect.height = rect.height * ratio_h;
    // rect.width = rect.width * ratio_w;

    console.log(
      `Whe need to recalculate the size and positions so defaults : ${
        config.default_width
      } X ${config.default_height}
        Calling to redraw() size of canvas is : ${context.canvas.width} and ${
        context.canvas.height
      }
        and the saved sizes are : ${box.x1} X ${box.y1} for sizes ${
        box.source_width
      } X ${box.source_height}
        so the new sizes must be for defaults = ${
          (box.x1 / context.canvas.width) * config.default_width
        } and ${(box.y1 / context.canvas.height) * config.default_height}
        and sizes for defaults = ${
          (box.x1 / box.source_width) * context.canvas.width
        } and ${(box.y1 / box.source_height) * context.canvas.height}
      `
    );
    console.log(recalCanvasStrokes(box, context));
    // console.log(`xCenter => ${xCenter} and yCenter ${yCenter}`);
    // console.log(`position in x => ${box.x1} and y ${box.y1}`);
    // console.log(`Color => ${box.color}`);
    console.log(box);

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

  // === === === === === === === === === === === === === === === === === === //
  //                     Menu Bar
  // === === === === === === === === === === === === === === === === === === //
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

  function handleEventOnDom(element, typeEvent) {
    // |this| is a newly created object
    this.name = `Initialize Dom ${typeEvent}`;
    this.handleEvent = function (event) {
      console.log(this.name); // 'Something Good', as this is bound to newly created object

      // NOTE relative to the canvas UIX
      if (typeEvent == "canvas") {
        switch (event.type) {
          case "click":
            // reset canvas
            boxes = null;
            send_post = null;
            boxes = [];
            context.clearRect(0, 0, canvas_width, canvas_height);
            context.strokeStyle = "blue";
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
        let url = `https://baizabal.xyz:8000/srcpositions/${book}/${page}`;
        let data = JSON.parse(JSON.stringify(boxes));

        console.log(`SEND POST : `);
        console.log(url);
        console.log(data);

        let response_json = postData(url, data);

        console.log(`RESPONSE : `);
        console.log(response_json);

        // Object.keys(boxes).forEach((key) => {
        //   console.log(`Index INPUT : ${key}`);
        //   Object.keys(boxes[key]).forEach((keys) => {
        //     console.log(`KEYNAME: ${keys} DATA: ${boxes[key][keys]}`);
        //   });
        // });

        alert(JSON.stringify(boxes));
      }
    };

    // Note that the listeners in this case are |this|, not this.handleEvent
    element.addEventListener("click", this, false);
    element.addEventListener("dblclick", this, false);

    // You can properly remove the listeners
    //  element.removeEventListener('click', this, false);
    //  element.removeEventListener('dblclick', this, false);
  }

  // const dbClick = document.querySelector("canvas");
  // console.log(`dbClick : ${dbClick}`);
  // let setFigure = new handleEventOnDom(dbClick, "canvas");

  const cleaner = document.querySelector("#cleanCanvas");
  console.log(`Clean : ${cleaner}`);
  let clean = new handleEventOnDom(cleaner, "canvas");

  const send = document.querySelector("#save_page");
  console.log(`Send : ${send}`);
  let send_data = new handleEventOnDom(send, "postapi");

  function clickHandler(e) {
    var r = context.canvas.getBoundingClientRect(),
      x = e.clientX - r.left,
      y = e.clientY - r.top,
      i;
    console.log(`ClickHan R => `);
    // console.log(clickedArea);
    console.log(r);

    console.log(context.getContextAttributes());
    for (i = boxes.length - 1; i >= 0; --i) {
      console.log(i);
      if (context.isPointInPath(boxes[i], x, y, "nonzero")) {
        boxes.splice(i, 1);
      }
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();

    for (var i = 0; i < boxes.length; i++) {
      drawBoxOn(boxes[i], context);
    }
  }

  function reloadCanvas(boxes, context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    for (var i = 0; i < boxes.length; i++) {
      drawBoxOn(boxes[i], context);
    }
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
    xtop = box.x1 * ratio_h;
    xleft = box.y1 * ratio_w;
    xwidth = box.x2 * ratio_w;
    xheight = box.y2 * ratio_h;

    console.log(
      `New sizez positions : ${xtop} X ${xleft} -> ${xwidth} : ${xheight}`
    );
    //NOTE set new positions
    // box.x1 = xtop;
    // box.y1 = xleft;
    // box.x2 = xwidth;
    // box.y2 = xheight;
  }

  /**
   *
   * @param {*} ctx
   * @param {*} x
   * @param {*} y
   * @param {*} color
   */

  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "no-cors", // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  async function getData(url) {
    //  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });

    console.log(`THE REQUEST :`);
    console.log(myHeaders);

    const request = new Request(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: myHeaders,
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const response = await fetch(request);
    console.log(`RESPONSE FOR XBOXES:`);
    console.log(response);
    const bookResponse = await response.json();
    console.log(bookResponse);
    //boxes = bookResponse;
    // bookResponse.forEach((xbox) => {
    //   boxes.push(xbox);
    // });
    return bookResponse;
  }

  // NOTE Needs time

  function drawCoords(ctx, x, y, color = "green") {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.fillRect(-45, -7, 30, 14);
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(x), -30, 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = color;
    ctx.fillRect(-45, -7, 30, 14);
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(y), -30, 0);
    ctx.restore();
  }
}; // WARNING End of windows onload
