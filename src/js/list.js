const paramClass = "class";
const paramId = "id";
const param = "size";
const config_list = {
  [param]: 12,
  [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  default_width: 1275,
  default_height: 1650,
  srv_json: "baizabal.xyz",
  port_json: "8000",
  protocol_json: "https://",
  method: ["books", "srcpositions", "upload"],
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
    list: "./css/list.css",
    awesomeFonts:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
  },
  // app: "ediq",
  app: "baizabal.xyz", // [ediq|baizabal.xyz]
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
      // "id",
      "book_name",
      "created",
      // "is_url",
      "modified",
      "book_id",
      "pages",
      "status",
    ],
    fieldTitleBooks: [
      // "ID",
      "NOMBRE DEL LIBRO",
      "FECHA DE CREACION",
      // "IS_URL",
      "MODIFICADO",
      "BOOK_ID",
      "PAGINAS TOTALES",
      "EDICION",
    ],
  },
  tableFilterConfig: {
    base_path: "./js/node_modules/tablefilter/dist/tablefilter/",
    paging: {
      results_per_page: ["Registros: ", [10, 25, 50, 100]],
    },
    btn_reset: true,
    rows_counter: true,
    loader: true,
    status_bar: true,
    single_filter: true,
    highlight_keywords: true,
    ignore_diacritics: true,
    // responsive: true,
    rows_counter: {
      text: "Libros: ",
    },
    help_instructions: false, //{
    // Instructions text (accepts HTML)
    // text: "Ayuda",
    // btn_text: "?", // btn_text oder btn_html
    // },
    // loader: {
    //   html: '<div id="loader_msj"></div>',
    //   css_class: "loader",
    // },
    // status_bar: {
    //   target_id: "statusBar",
    //   css_class: "status",
    // },
    no_results_message: false,
    // single_filter: {
    //   exclude_cols: [3, 4, 5, 6, 7, 8],
    //   css_class: "form-control",
    // },
    watermark: "Filtrar Libros :",
    auto_filter: true,
    themes: [{ name: "transparent" }],
    // themes: [{ name: "default" }],
    extensions: [
      {
        name: "sort",
      },
    ],
  },
};
import { setStyles } from "../modules/lib.js";
import * as ls from "../modules/listModule.js";

setStyles(config_list.css_files, true);

ls.init(config_list);

// window.load = reportWindowSize;
// window.onload = reportWindowSize;

// window.addEventListener("onload", reportWindowSize);
// window.onload = function () {
//   alert(`window onload`);
// };
