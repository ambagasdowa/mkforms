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
let page = 1;
let bookid;
let input_type = "text";
let this_config = {};

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
    let numberPages = document.querySelector(`#number-pages`);
    numberPages.innerHTML = bookResponse.pages;
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

    book_section.appendChild(page_book);
  }
}

function loadBook(config = {}, bookResponse = {}) {
  // let page = 15;

  // if (next_page != "Undefined") {
  //   page = page + next_page;
  // }
  // WORKING HIR
  // LOAD all Canvas set
  initCanvasEngine(this_config, bookid, page);
} //loadBook

function initCanvasEngine(config = {}, bookid, page) {
  // NOTE
  console.log(`We known xboxs in add page ??? `);
  // NOTE WORKING  HIR

  console.log(`PROMISE XBOXS`);
  config.xboxs.then((data) => {
    let sourcePositions = data[0].sourcePositions;
    console.log(sourcePositions[page]);

    let pageNumber = document.querySelector(`#page-number`);
    pageNumber.value = `${page}`;

    if (page > 1) {
      let prevDiv = document.querySelector(`[data-in-page="${page - 1}"]`);
      prevDiv.classList.add("off");
    }

    let currentDiv = document.querySelector(`[data-in-page="${page}"]`);

    currentDiv.classList.remove("off");

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

      //      let response_json = postData(url, data);

      //      console.log(`RESPONSE : `);
      //      console.log(response_json);

      alert(JSON.stringify(boxes));
    }
    // NOTE relative to the canvas UIX
    if (typeEvent == "navigator") {
      switch (event.type) {
        case "click":
          // change page:
          let current_page = document.querySelector(`#page-number`);
          page = page + 1;

          console.log(`next :${page}`);

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
let next_page = new handleEventOnDom(next, "navigator");

export { initBooks, initMsj, setInitial };
