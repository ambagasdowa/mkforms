// TODO send this in his own file or in a init file
// NOTE Example for objects
const param = "size";
const config = {
  [param]: 12,
  [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  default_width: 1275,
  default_height: 1650,
  css_files: {
    main: "./css/dashboard.css",
    awesomeFonts:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
  },
  srv_json: "baizabal.xyz",
  port_json: "8000",
  protocol_json: "https://",
  get_method: "items",
  // app: "ediq",
  app: "baizabal.xyz",
  templates: {
    Libros: { list: { icon: "fa-solid fa-book", other: "another" } },
    Uploads: { upload: { icon: "fa-solid fa-upload" } },
    Users: { users: { icon: "fa-solid fa-user" } },
  },
  get: {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  },
};
// NOTE Load the jquerys
import $ from "../modules/extend.js";
$(function () {
  console.log(`loading jquery as module ES6`);
});

import { setStyles } from "../modules/lib.js";
setStyles(config.css_files);

import { drawIn } from "../modules/frames.js";
drawIn(config.templates);

import "../modules/frames_add.js";
