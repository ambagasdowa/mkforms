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
  var anchrSize = 2;

  var mousedown = false;
  var clickedArea = { box: -1, pos: "o" };
  var x1 = -1;
  var y1 = -1;
  var x2 = -1;
  var y2 = -1;

  var boxes = [];
  var tmpBox = null;

  var arcs = [];
  var tmpArcs = null;

  let page = 1;
  let book = 3;
  input_type = "text";
  // NOTE Example for objects
  const param = "size";
  const config = {
    [param]: 12,
    [`mobile${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 4,
  };

  console.log(config); // {size: 12, mobileSize: 4}

  const send_post = {
    page: `${page}`,
    book: `${book}`,
    inputs: boxes,
  };

  console.log(send_post);

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
  };

  document.getElementById("canvas").onmouseup = function (e) {
    console.log(`mouse[UP] TRUE --> ${e.offsetX} ::: ${e.offsetY}`);
    console.log(`mouse[UP] TRUE ClickedArea --> ${clickedArea}`);
    console.log(clickedArea);
    console.log(tmpBox);

    if (clickedArea.box == -1 && tmpBox != null) {
      boxes.push(tmpBox);
    } else if (clickedArea.box != -1) {
      var selectedBox = boxes[clickedArea.box];
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
    console.log(`BOXES that can be saved  :`);
    console.log(boxes);

    console.log(
      `Where i'm => in page : ${send_post.page} and book : ${send_post.book}`
    );

    console.log(Object.keys(send_post.inputs));

    Object.keys(send_post.inputs).forEach((key) => {
      console.log(`Index INPUT : ${key}`);
      Object.keys(send_post.inputs[key]).forEach((keys) => {
        console.log(`KEYNAME: ${keys} DATA: ${send_post.inputs[key][keys]}`);
      });
    });
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

      if (
        clickedArea.pos == "i" ||
        clickedArea.pos == "tl" ||
        clickedArea.pos == "l" ||
        clickedArea.pos == "bl"
      ) {
        boxes[clickedArea.box].x1 += xOffset;
      }
      if (
        clickedArea.pos == "i" ||
        clickedArea.pos == "tl" ||
        clickedArea.pos == "t" ||
        clickedArea.pos == "tr"
      ) {
        boxes[clickedArea.box].y1 += yOffset;
      }
      if (
        clickedArea.pos == "i" ||
        clickedArea.pos == "tr" ||
        clickedArea.pos == "r" ||
        clickedArea.pos == "br"
      ) {
        boxes[clickedArea.box].x2 += xOffset;
      }
      if (
        clickedArea.pos == "i" ||
        clickedArea.pos == "bl" ||
        clickedArea.pos == "b" ||
        clickedArea.pos == "br"
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

    console.log(context.canvas);
    console.log(`set type of input -> ${input_type}`);
    // === === === === === === === === === === === === === === === //
    //   This can hold text,textare and crossword
    // === === === === === === === === === === === === === === === //
    context.beginPath();

    console.log(`What is selected in [::REDRAW::] ==> ${input_type}`);

    // if (input_type == "text") {
    for (var i = 0; i < boxes.length; i++) {
      drawBoxOn(boxes[i], context);
    }
    if (clickedArea.box == -1) {
      tmpBox = newBox(x1, y1, x2, y2);
      //Draw circles :
      //NOTE ok, know , step by step
      context.arc(x1, y1, 10, 0, Math.PI * 2, true); // Outer circle

      if (tmpBox != null) {
        drawBoxOn(tmpBox, context);
      }
    }
    // }

    // === === === === === === === === === === === === === === === //
  } // End of redraw

  function findCurrentArea(x, y) {
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];

      console.log(`what we have in box?`);
      console.log(box);

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
        type: input_type,
      };
    } else {
      return null;
    }
  }

  // NOTE Added new funcitons
  // function newArc(){

  // }

  function drawBoxOn(box, context) {
    xCenter = box.x1 + (box.x2 - box.x1) / 2;
    yCenter = box.y1 + (box.y2 - box.y1) / 2;

    context.strokeStyle = box.color;
    context.fillStyle = box.color;

    context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    context.lineWidth = box.lineWidth;
    context.stroke();

    context.fillRect(
      box.x1 - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      box.x1 - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      box.x1 - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      xCenter - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      xCenter - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      xCenter - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      box.x2 - anchrSize,
      box.y1 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      box.x2 - anchrSize,
      yCenter - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
    context.fillRect(
      box.x2 - anchrSize,
      box.y2 - anchrSize,
      2 * anchrSize,
      2 * anchrSize
    );
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
