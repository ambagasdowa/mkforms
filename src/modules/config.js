let config = {
  author: "Jesus Baizabal",
  debug: false,
  xeditor: {
    module: "xeditor",
    strokeStyle: "#00bfff",
    fillStyle: "#00bfff",
    default_width: 1275,
    default_height: 1650,
    srv_json: "baizabal.xyz",
    port_json: "8000",
    protocol_json: "https://",
    api_method: ["books", "srcpositions", "upload", "items", "srcpos"],
    size: 10,
    copySize: 10,
    css_files: {
      font_hack: "./fonts/css/fa.css",
      awesomeFonts: "./fonts/css/fontawesome.min.css",
      all: "./fonts/css/all.min.css",
      regular: "./fonts/css/regular.min.css",
      brands: "./fonts/css/brands.min.css",
      solid: "./fonts/css/solid.min.css",
      icons: "./css/icons.css",
      controlPanel: "./css/controlPanel.css",
      contextMenu: "./css/contextMenu.css",
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
  },
};

export { config };
