let config = {
  author: "Jesus Baizabal",
  xeditor: {
    module: "xeditor",
    default_width: 1275,
    default_height: 1650,
    srv_json: "baizabal.xyz",
    port_json: "8000",
    protocol_json: "https://",
    api_method: ["books", "srcpositions", "upload", "items", "srcpos"],
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
  },
};

export { config };
