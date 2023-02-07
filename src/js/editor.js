import { getAllUrlParams, setStyles } from "../modules/lib.js";
import {
  initBooks,
  initMsj,
  setInitial,
  reportWindowSize,
} from "../modules/editorModule.js";

const paramClass = "class";
const paramId = "id";
const param = "size";
const moduleName = "editor";

const config_editor = {
  [param]: 12,
  [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  default_width: 1275,
  default_height: 1650,
  srv_json: "baizabal.xyz",
  port_json: "8000",
  protocol_json: "https://",
  info: {
    module: [`${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}`],
    author: "Ambagasdowa",
  },
  api_method: ["books", "srcpositions", "upload", "items", "srcpos"],
  frame_source: {
    View: {
      src: "fusion",
      params: {
        param1: "book_id",
        param2: "user_id",
      },
      testValues: {
        User: "1702",
      },
    },
    Edit: {
      src: "editor",
      params: {
        User: "1702",
        param1: "book_id",
        param2: "user_id",
      },
      testValues: {
        User: "1702",
      },
    },
  },
  css_files: {
    list: "./css/editor.css",
    awesomeFonts:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
  },
  // app: "ediq",
  app: "baizabal.xyz",
  post: {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  },
  headers: {},
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
  tables: {
    column_options: {
      status: {
        a: {
          href: "#",
          [paramClass]: "edit_",
          [paramId]: "editId_",
          ["data-open-modal"]: "",
          ["data-frame"]: "Edit",
        },
      },
      book_name: {
        a: {
          href: "#",
          [paramClass]: "modal_url",
          [paramId]: "modal_",
          ["data-open-modal"]: "",
          ["data-frame"]: "View",
        },
      },
    },
    idIdentifier: "book_id",
    classIdentifier: "book_id",
    dataIdentifier: "book_id",
    fieldsBooks: [
      "book_id",
      "book_name",
      "created",
      "id",
      "is_url",
      "modified",
      "pages",
      "status",
    ],
    fieldTitleBooks: [
      "BOOK_ID",
      "BOOK_NAME",
      "CREATED",
      "ID",
      "IS_URL",
      "MODIFIED",
      "PAGES",
      "EDIT",
    ],
  },
  bookElements: { load: ".canvas" },
  xboxs: "",
};

console.log(initMsj(config_editor.info));
setStyles(config_editor.css_files, true);
const paramsUrl = getAllUrlParams(window.location.href, false);

window.onload = (event) => {
  console.log(`onload`);
  initBooks(config_editor, paramsUrl);
}; // WARNING End of windows onload

window.onresize = reportWindowSize;
