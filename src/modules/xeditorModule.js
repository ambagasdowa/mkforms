import * as configuration from "./config.js";
import * as connect from "./uploadModule.js";

let conf = configuration.config;
let page = 1;
let pages = {};
const message = "Initializing module";

function initMsj() {
  return `${message} : ${conf.xeditor["module"]} by ${conf.author}`;
}

function initBooks(paramsUrl = {}) {
  const options = { book_id: paramsUrl.book_id, user_id: paramsUrl.user_id };
  let book_id = options.book_id;
  let user_id = options.user_id;
  let config = conf.xeditor;

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

    console.log(bookPages.length);

    for (const key in bookPages) {
      if (bookPages.hasOwnProperty.call(bookPages, key)) {
        const element = bookPages[key];
        console.log(element);
      }
    }
    pages = bookPages;
    attachPage();
    initControl();
    // =========================//
  });
}

//=========================================//
//       BOOK CANVAS INITIALIZING
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
      ctx.drawImage(img, 0, (window.innerHeight - h) / 2, window.innerWidth, h);
    }
    if (
      (imgRatio > winRatio && type === "contain") ||
      (imgRatio < winRatio && type === "cover")
    ) {
      const w = (window.innerWidth * winRatio) / imgRatio;
      ctx.drawImage(img, (win.w - w) / 2, 0, w, window.innerHeight);
    }
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

    loadEngine();
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
}

function loadEngine() {
  return null;
}

function initControl() {
  const next = document.querySelector("#next");
  console.log(`Next : ${next}`);
  let next_page = new handleEventOnDom(next, "next");

  const prev = document.querySelector("#prev");
  console.log(`Prev : ${prev}`);
  let prev_page = new handleEventOnDom(prev, "prev");
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
          // initCanvasEngine(this_config, bookid, page);
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

export { initMsj, initBooks };
