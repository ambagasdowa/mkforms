import * as configuration from "./config.js";
import * as connect from "./uploadModule.js";

let conf = configuration.config;
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

    // =========================//
  });
}

//=========================================//
//       BOOK CANVAS INITIALIZING
//=========================================//

function attachPage(source) {
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
  };

  /*--------------------
Preload Image
--------------------*/
  //const imgSrc = "https://baizabal.xyz/assets/Panamericano/files//source/guia/uv/002/demo/pages/5.jpg";
  //const imgSrc =
  // "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/autumn.jpg";
  const imgSrc = source;
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
export { initMsj, initBooks };
