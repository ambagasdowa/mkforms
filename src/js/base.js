// TODO send this in his own file or in a init file
// NOTE This is constant for all books
/* create the link element */
const linkElement = document.createElement("link");
/* add attributes */
linkElement.setAttribute("rel", "stylesheet");
linkElement.setAttribute("href", "/src/bms/src/css/layers.css");
/* attach to the document head */
console.log(`loading stylesheet layout ,layers ...`);
document.getElementsByTagName("head")[0].appendChild(linkElement);

const layers = document.createElement("link");
layers.setAttribute("rel", "stylesheet");
layers.setAttribute("href", "/src/bms/src/css/uix.css");
document.getElementsByTagName("head")[0].appendChild(layers);

// NOTE Load the jquerys
//import $ from "./extend.js";
import { getAllUrlParams } from "./lib.js";

$(function () {
  console.log(`loading jquery as module ES6`);
});

// TODO build the provisional slider mechanism
//import * as slideModule from "./lib.min.js";
import * as slideModule from "./lib.js";
let greet_scaler = slideModule.greet("Slider.js");
console.log(greet_scaler); // Initialize module -> Slider.js
console.log(slideModule.message); // Init all libs and modules ...

// NOTE set the ws json query

const bookinit = {
  1: "https://ediq.mx/public/guias/guia_demo_uv_040321_2/pages/1.jpg",
  221: "json/source.json",
  3: "/src/bms/src/json/source.json",
  228: "/src/bms/src/json/source.json",
};

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
let book_id = getAllUrlParams(window.location.href, true).id;

console.log(`Book ID -> ${book_id}`);

// NOTE where to search in db --> db_ediq2021.system_users.{user_id}

let div = document.getElementById("dom-target");
let myData = div.textContent;

console.log(`user-id --> ${myData}`);
let userid = JSON.parse(myData);
console.log(userid);
console.log(userid.user_id);

//let srv_json = window.location.hostname;
let srv_json = "baizabal.xyz";
//let srv_json = "10.14.17.105";
//let srv_json = "localhost";
let port_json = "8000";
let protocol_json = "https://";

let book_url = `${protocol_json}${srv_json}:${port_json}/items/${book_id}/${userid.user_id}`;
console.log(`the url is --> ${book_url}`);
//initializing the first page

//// NOTE better for local input files
//slideModule.book_request_url(book_url);
//NOTE better for url input files
slideModule.book_request(book_url);

const elm = await slideModule.waitForElm(".pages_last");

//
//NOTE logic for turn lib-->

$(function () {
  $(window).ready(function () {
    $("#magazine").turn({
      display: "single",
      acceleration: true,
      gradients: !$.isTouch,
      elevation: 50,
      when: {
        turned: function (e, page) {
          console.log("Base:71 Current view: ", $(this).turn("view"));
          console.log(
            `pages ? : ${slideModule.cpages(document.querySelector(".book"))}`
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
