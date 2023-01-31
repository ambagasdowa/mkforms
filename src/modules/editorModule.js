import * as connect from "./uploadModule.js";
import $ from "./extend.js";
const message = "Initializing module ";

const hx = window.innerWidth;
const hy = window.innerHeight;
const msg = `The Window Width is :  ${hx} and the Heigth is : ${hy}`;
console.log(msg);
// === === === === === === === === === === === === === === === === === === //
//          Construct for set the backgorund img and canvas
// === === === === === === === === === === === === === === === === === === //
// NOTE set 60% of the screen and 15% for the admin menu SET as Image div backgorund
// const percent_width = 95;
// const percent_height = 250;

const percent_width = 80;
const percent_height = 150;

const canvas_width = (hx * percent_width) / 100;
const canvas_height = (hy * percent_height) / 100;
//alert(`canvas_width ==> ${canvas_width} -- canvas_height ==> ${canvas_height}`);
//CREATE BOX INPUTS

const lineOffset = 4;
const anchrSize = 2;
// const anchrSize = 4;

let mousedown = false;
let clickedArea = { box: -1, pos: "o" };
const x1 = -1;
const y1 = -1;
const x2 = -1;
const y2 = -1;
let xboxs = {};
let boxes = [];
let tmpBox = null;

function initMsj(info = {}) {
  return `${message} : ${info.module} by ${info.author}`;
}

function initBooks(config = {}, paramsUrl = {}) {
  const options = { book_id: paramsUrl.book_id, user_id: paramsUrl.user_id };
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

  console.log(`Calll previous boxes:`);
  xboxs = config.xboxs;
  console.log(config.xboxs);
  loadApi(config, options);
}

function setInitial(config = {}, book_id) {
  let get_url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method[1]}/${book_id}`;
  console.log(`positions : ${get_url}`);
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
    console.log(bookResponse);
    //note draw book call turn.js lib for drawing the background
    drawBook(config, bookResponse);
  });

  return null;
}

function drawBook(config = {}, bookResponse = {}) {
  // load div with background images
  loadDivBlock(config, bookResponse);
  console.log("CHECK CANVAS");
  console.log(document.querySelector(".canvas"));
  // set the options
  // load Book from api
  loadBook(config, bookResponse);
  initControlKeyboard(config, bookResponse);
  // drawCanvas(img_url,bookResponse)

  return null;
}

async function loadDivBlock(config = {}, bookResponse = {}) {
  // Check if the page is not in the book
  console.log(`We known xboxs in add page ??? `);
  console.log(config.bookElements.load);
  const book_section = document.querySelector(`${config.bookElements.load}`);
  // NOTE WORKING  HIR
  console.log(config.xboxs);

  // Create an element for this page
  // const sizes = ruled();
  // console.log(sizes);

  for (let page = 1; page <= bookResponse.pages; page++) {
    const background_img = bookResponse.book_pages[page];

    let page_book = document.createElement("div");
    page_book.setAttribute("data-in-page", `${page}`);

    const book_attr = document.createAttribute("style");
    book_attr.value = `
                        background-image: url(${background_img});
                        background-size: contain;
                        background-repeat: no-repeat;
                        max-width :100%;
                        max-height: 100%;
                        width: ${canvas_width}px;
                        height: ${canvas_height}px;
                        display:block;
    `;

    page_book.setAttributeNode(book_attr);

    book_section.appendChild(page_book);
  }
}

function loadBook(config = {}, bookResponse = {}) {
  $(function () {
    console.log(`loading jquery as module ES6`);
  });

  let flipbook = $(`${config.bookElements.load}`);
  console.log(flipbook);

  // const sizes = ruled();

  flipbook.turn({
    display: "single",
    // Magazine width
    width: canvas_width,
    // Magazine height
    height: canvas_height,
    // Duration in millisecond
    duration: 1000,
    // Hardware acceleration
    acceleration: true, //!isChrome(),
    // Enables gradients
    gradients: true, //!$.isTouch,
    // Auto center this flipbook
    autoCenter: true,
    // Elevation from the edge of the flipbook when turning a page
    elevation: 50,
    //    The number of pages
    pages: bookResponse.pages,
    // Events
    when: {
      turning: function (event, page, view) {}, //turning
      //load the canvas
      turned: function (e, page) {
        $("#page-number").val(page);
        console.log("Current page: ", $(this).turn("view"));
        console.log(
          `[send data] book_id : ${bookResponse.book_id}, page_id : ${$(
            this
          ).turn("view")}`
        );
        initCanvasEngine(config, bookResponse.book_id, page);
        console.log(`turned goes to #page-number : ${page}`);
      },
    },
  });

  $("#number-pages").html(bookResponse.pages);

  $("#page-number").keydown(function (e) {
    if (e.keyCode == 13) $(flipbook).turn("page", $("#page-number").val());
  });
} //loadBook

function initCanvasEngine(config = {}, book_id, page) {
  // NOTE
  console.log(`We known xboxs in add page ??? `);
  // NOTE WORKING  HIR

  console.log(`PROMISE XBOXS`);
  config.xboxs.then((data) => {
    let sourcePositions = data[0].sourcePositions;
    console.log(sourcePositions[page]);

    let currentDiv = document.querySelector(`[data-in-page="${page}"]`);
    let curdiv = currentDiv.getBoundingClientRect();
    currentDiv.append(attachCanvas(page));
    let canvas = document.getElementById(`canvas_${page}`);
    let context = canvas.getContext("2d");
    console.log(canvas);
    let bound = context.canvas.getBoundingClientRect();
    console.log(bound);
    let msg = `The New DIV Width is : ${curdiv.width} and the Heigth is : ${curdiv.height}`;
    console.log(msg);
    msg = `The New Canvas Width is : ${bound.width} and the Heigth is : ${bound.height}`;
    console.log(msg);
    console.log(`LOAD XBOXES on page : ${page}`);

    console.log(`INITIAL XBOXES`);
    console.log(boxes);
  });
} //initCanvasEngine

function attachCanvas(page) {
  // console.log(`ELEMENT:`);
  // console.log(element);
  let canvas = document.createElement(`canvas`);
  canvas.setAttribute(`data-page`, `${page}`);
  canvas.setAttribute("id", `canvas_${page}`);
  //  canvas.setAttribute("id", `canvas`);

  // canvas.setAttribute(`width`, `${canvas_width}px`);
  // canvas.setAttribute(`height`, `${canvas_height}px`);
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

function initControlKeyboard(config = {}, bookResponse = {}) {
  let keyControls = $(`${config.bookElements.load}`);

  $(document).keydown(function (e) {
    var previous = 37,
      next = 39,
      esc = 27;

    switch (e.keyCode) {
      case previous:
        // left arrow
        keyControls.turn("previous");
        // keyControls.turn("page".$("#page-number").val());
        e.preventDefault();

        break;
      case next:
        //right arrow
        keyControls.turn("next");
        // keyControls.turn("page".$("#page-number").val());
        e.preventDefault();

        break;
      case esc:
        $(".magazine-viewport").zoom("zoomOut");
        e.preventDefault();

        break;
    }
  });
}

export { initBooks, initMsj, setInitial };
