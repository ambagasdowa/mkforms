const param = "size";
const config_upload = {
  [param]: 12,
  [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  default_width: 1275,
  default_height: 1650,
  css_files: { main: "./css/upload.css" },
  srv_json: "baizabal.xyz",
  port_json: "8000",
  protocol_json: "https://",
  method: ["books", "srcpositions", "upload"],
  dev: true, //css developer-mode [true|false] , default:false
  // app: "ediq",
  app: "baizabal.xyz",
  templates: {
    Libros: "fusion",
    Uploads: "upload",
    Editor: "index",
  },
  post: {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  },
  headers: {},
};

import { setStyles } from "../modules/lib.js";

setStyles(config_upload.css_files, config_upload.dev);

import * as requestData from "../modules/uploadModule.js";

console.log(requestData.initial);
// window.onload = (event) => {
//   console.log("page is fully loaded");
// };

//$(window).on("load", function () {
//(function () {
console.log(`Loading uploadInit module `);
console.log(config_upload);

const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

const handleSubmit = (event) => {
  event.preventDefault();

  // Get the form data from the event object

  //  console.log(form);
  console.log(event.target);

  for (const [key, value] of Object.entries(event.target)) {
    //FD.append(name, value);
    console.log(`key : ${key} name -> ${value.name} value -> ${value.value}`);
    console.log(value.name);
    if (value.name == "token") {
      config_upload.headers["token"] = value.value;
    }
    if (value.name == "book_name") {
      formData.append("book_name", value.value);
    }
  }

  for (const file of inputFile.files) {
    formData.append("files", file);
  }

  console.log(config_upload);

  let url_upload = `${config_upload.protocol_json}${config_upload.srv_json}:${config_upload.port_json}/${config_upload.method[2]}`;

  console.log(url_upload);

  const send = requestData.postFileData(url_upload, config_upload, formData);
  // const xboxes = getData(get_url);
  // xboxes.then((data) => ((boxes = data), redraw()));
  send.then((data) => console.log(data));
};
form.addEventListener("submit", handleSubmit);
//});
