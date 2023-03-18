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

// import { setStyles } from "../modules/lib.js";

// setStyles(config_upload.css_files, config_upload.dev);

import * as requestData from "../modules/uploadModule.js";

console.log(requestData.initial);
console.log(`Loading uploadInit module `);
console.log(config_upload);

const log_msg = "Initializing postModule";
export { log_msg };

function sendData(
  config_upload = {},
  url = "",
  tokenTag = "",
  is_file = false
) {
  const form = document.getElementById("form");

  if (is_file) {
    const inputFile = document.getElementById("file");
  }

  const formData = new FormData();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the form data from the event object
    console.log(event.target);

    for (const [key, value] of Object.entries(event.target)) {
      //FD.append(name, value);
      console.log(`key : ${key} name -> ${value.name} value -> ${value.value}`);
      console.log(value.name);

      // extract token

      if (value.name == tokenTag) {
        config_upload.headers[tokenTag] = value.value;
      }

      // if (is_file) {
      formData.append(value.name, value.value);
      // }
    }
    if (is_file) {
      for (const file of inputFile.files) {
        formData.append("files", file);
      }
    }

    const send = requestData.postFileData(url, config_upload, formData);
    send.then((data) => console.log(data));
  }; //End HandleSubmit

  form.addEventListener("submit", handleSubmit);
}
export { sendData };
