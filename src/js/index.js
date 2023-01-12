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
  let percent_width = 100;
  let percent_height = 145;

  var canvas_width = (window.innerWidth * percent_width) / 100;
  var canvas_height = (window.innerHeight * percent_height) / 100;

  // NOTE add background image to div
  console.log(`loading img`);
  page_book = document.querySelector(".canvas");
  url_img =
    "https://baizabal.xyz/assets/Panamericano/files//source/book/matematicas/002/bachillerato/pages/16.jpg";
  const book_attr = document.createAttribute("style");

  ////size of the img
  book_attr.value = `background-image: url(" ${url_img}");`;
  //book_attr.value += `background-size: ${canvas_width}px ${canvas_height}px;`;
  book_attr.value += `background-size: contain;`;
  book_attr.value += `background-repeat: no-repeat;`;
  // size of the div
  book_attr.value += `width: ${canvas_width}px;`;
  book_attr.value += `height: ${canvas_height}px;`;

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
  //var anchrSize = 2;
  var anchrSize = 4;

  var mousedown = false;
  var clickedArea = { box: -1, pos: "o" };
  var x1 = -1;
  var y1 = -1;
  var x2 = -1;
  var y2 = -1;

  var boxes = [];
  var tmpBox = null;

  let page = 1;
  let book = 3;
  input_type = "text";

  // NOTE Example for objects
  const param = "size";
  const config = {
    [param]: 12,
    [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  };

  console.log(config); // {size: 12, mobileSize: 4}

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

    //    console.log(context.getContextAttributes());
    console.log(
      `Calling to redraw() size is : ${canvas_width} and ${canvas_height}`
    );

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
        book: book,
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
    console.log(`xCenter => ${xCenter} and yCenter ${yCenter}`);
    console.log(`position in x => ${box.x1} and y ${box.y1}`);
    console.log(`Color => ${box.color}`);
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
      // if (typeEvent == "rm") {
      //   console.log(`EVENT : ${event.type}`);

      //   switch (event.type) {
      //     // case "click":
      //     //   // reset canvas
      //     //   break;
      //     case "dblclick":
      //       break;
      //     case "click":
      //       // some code here…
      //       console.log(`The Element ${element}`);
      //       if (element.checked) {
      //         var r = context.canvas.getBoundingClientRect(),
      //           x = event.clientX - r.left,
      //           y = event.clientY - r.top,
      //           i;

      //         for (i = boxes.length - 1; i >= 0; --i) {
      //           console.log(i);
      //           if (context.isPointInPath(boxes[i], x, y, "nonzero")) {
      //             boxes.splice(i, 1);
      //           }
      //         }

      //         context.clearRect(
      //           0,
      //           0,
      //           context.canvas.width,
      //           context.canvas.height
      //         );
      //         context.beginPath();

      //         for (var i = 0; i < boxes.length; i++) {
      //           drawBoxOn(boxes[i], context);
      //         }
      //         context.canvas.addEventListener("dblclick", this, false);
      //       }
      //       break;
      //   }
      // }
      // NOTE Handle events for post json data
      if (typeEvent == "postapi") {
        console.log(boxes);

        console.log(Object.keys(boxes));
        console.log(JSON.stringify(boxes));

        Object.keys(boxes).forEach((key) => {
          console.log(`Index INPUT : ${key}`);
          Object.keys(boxes[key]).forEach((keys) => {
            console.log(`KEYNAME: ${keys} DATA: ${boxes[key][keys]}`);
          });
        });

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
