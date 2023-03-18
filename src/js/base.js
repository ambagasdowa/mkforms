// TODO send this in his own file or in a init file
// NOTE Example for objects
const param = "size";
const config = {
  [param]: 12,
  [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  default_width: 1275,
  default_height: 1650,
  css_files: {
    layers: "./css/layers.css",
    uix: "./css/uix.css",
  },
  dev: false, //css developer-mode [true|false] , default:false
  srv_json: "baizabal.xyz",
  port_json: "8000",
  protocol_json: "https://",
  get_method: "items",
  api_method: "?",
  // app: "ediq",
  app: "baizabal.xyz",
  get: {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  },
  headersGet: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// TODO build the provisional slider mechanism
import * as connect from "../modules/uploadModule.js";
import * as slideModule from "../modules/lib.js";
import * as send from "../modules/postModule.js";

let currentPage = {
  index: 1,
  get pag() {
    return this.index;
  },
  set pag(value) {
    this.index = value;
  },
};

let greet_scaler = slideModule.greet("Slider.js");
console.log(greet_scaler); // Initialize module -> Slider.js
console.log(slideModule.message); // Init all libs and modules ...

console.log(send.log_msg);
//import { setStyles } from "./lib.js";
slideModule.setStyles(config.css_files, config.dev);
// NOTE Load the jquerys
import $ from "../modules/extend.js";
//import { getAllUrlParams } from "./lib.js";

$(function () {
  console.log(`loading jquery as module ES6`);
});

// NOTE set the ws json query

// const bookinit = {
//   1: "https://ediq.mx/public/guias/guia_demo_uv_040321_2/pages/1.jpg",
//   221: "json/source.json",
//   3: "/src/bms/src/json/source.json",
//   228: "/src/bms/src/json/source.json",
// };

// NOTE fetch -> url/content/content/id
// db sources fasciculos
// [preferred] src :  https://www.sitepoint.com/get-url-parameters-with-javascript/
// src : https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript/55576345#55576345
// Example : https://10.14.17.105/learner/content/content/202   <-- the last part is the id parameter

// NOTE Emulation of the pathname form framework
// Create and url passthrought

// let anchor = document.createElement("a");
// anchor.href = "https://some/url/from/framework/2";
// const url = new URL(anchor);

//let book_id = getAllUrlParams(url, true).id;
// let book_id = getAllUrlParams(window.location.href, false).id; //normal url scheme [?, &]
// NOTE where to search in db --> db_ediq2021.system_users.{user_id}
// if system is ediq
if (config.app == "ediq") {
  console.log(`We are in ediq`);
  var book_id = slideModule.getAllUrlParams(window.location.href, true).id;
  console.log(`Book ID -> ${book_id}`);
  let div = document.getElementById("dom-target");
  let myData = div.textContent;
  console.log(`user-id --> ${myData}`);
  let userid = JSON.parse(myData);
  var user_id = userid.user_id;
  console.log(userid);
  console.log(userid.user_id);
} else {
  console.log(`We are Independent`);
  let bookid = slideModule.getAllUrlParams(window.location.href, false);
  console.log(`PropertyKeys => ${Object.keys(bookid)}`);
  console.log(`PropertyValues => ${Object.values(bookid)}`);
  var book_id = bookid.book_id;
  var user_id = bookid.user_id;
}
console.log(`prop : ${book_id} and ${user_id}`);
//let srv_json = window.location.hostname;
//let srv_json = "baizabal.xyz";
////let srv_json = "10.14.17.105";
////let srv_json = "localhost";
//let port_json = "8000";
//let protocol_json = "https://";
// console.log(window.location.hostname);
// if (window.location.hostname == config.srv_json) {
//   config.srv_json = "127.0.0.1";
// }
let book_url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.get_method}/${book_id}/${user_id}`;

console.log(`the url is --> ${book_url}`);
//initializing the first page

const response = connect.getData(book_url, config, true);
response.then((data) => {
  console.log(`response of getData`);
  slideModule.buildDivBook(JSON.parse(data));
});

const elm = await slideModule.waitForElm(".pages_last");

// Working from hir ofr update user response

let save_url = `${config.protocol_json}${config.srv_json}:${config.port_json}/${config.api_method}/${book_id}/`;

// let send_data = new send.eventOnDom(save, "save", xurl);
//
console.log("PAGE:L");
console.log(`SETTER : ${currentPage.pag}`);
const save = document.querySelector("#submit");
let send_data = new send.eventOnDom(save, "save", save_url, currentPage.pag);

//NOTE logic for turn lib-->

$(function () {
  $(window).ready(function () {
    $("#magazine").turn({
      display: "single",
      acceleration: true,
      gradients: !$.isTouch,
      width: config.default_width,
      height: config.default_height,
      elevation: 50,
      when: {
        turned: function (e, page) {
          currentPage.pag = $(this).turn("view");
          console.log(`INSIDE TURN SETTER is : ${currentPage.pag}`);
          console.log(
            `[send data] book_id : ${book_id}, page_id : ${$(this).turn(
              "view"
            )}`
          );
        },
      },
    });
  });

  $(window).bind("keydown", function (e) {
    if (e.keyCode == 37) {
      $("#magazine").turn("previous");
      console.log(`base:80 keycode ==> 37`);
    } else if (e.keyCode == 39) {
      $("#magazine").turn("next");
      console.log(`base:84 keycode ==> 39`);
    }
  });
});
