const param = "size";
const config_upload = {
  // [param]: 12,
  // [`copy${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 8,
  // default_width: 1275,
  // default_height: 1650,
  // css_files: { main: "./css/upload.css" },
  // srv_json: "baizabal.xyz",
  // port_json: "8000",
  // protocol_json: "https://",
  // method: ["books", "srcpositions", "upload"],
  // dev: true, //css developer-mode [true|false] , default:false
  // // app: "ediq",
  // app: "baizabal.xyz",
  // templates: {
  //   Libros: "fusion",
  //   Uploads: "upload",
  //   Editor: "index",
  // },
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
// console.log(config_upload);

const log_msg = "Initializing postModule";
export { log_msg };

function eventOnDom(element, typeEvent, url, user_id, page) {
  // |this| is a newly created object
  this.name = `Initialize Dom ${typeEvent}`;
  this.handleEvent = function (event) {
    console.log(this.name); // 'Something Good', as this is bound to newly created object
    // NOTE Handle events for post json data
    event.preventDefault();
    if (typeEvent == "save") {
      switch (event.type) {
        case "click":
          // console.log(`Sending Data ... :${JSON.stringify(event.target)}`);
          // console.log(event.target);
          // alert(url);
          sendData(url, user_id, page, event);
          break;
        case "dblclick":
          // some code here…
          break;
        case "change":
          console.log(`change is on`);
          break;
      }
    }
  };

  // Note that the listeners in this case are |this|, not this.handleEvent
  element.addEventListener("click", this, false);
  element.addEventListener("dblclick", this, false);
}
export { eventOnDom };
// const save = document.querySelector("#submit");
// console.log(`Send : ${save}`);
// let send_data = new eventOnDom(save, "save");

function sendData(url = "", user_id, page, event) {
  console.log("DEFINITIONS in sendData");
  console.log(url);
  console.log(user_id);
  console.log(page);

  let form = document.querySelector(`#form_${page}`);
  console.log(form);

  // const formData = new FormData();
  let datamx = JSON.parse('{"data":[]}');
  // let toData = JSON.parse(datamx);

  for (const [key, value] of Object.entries(form)) {
    console.log(
      `key in View : ${key} Xname -> ${value.name} Xvalue -> ${value.value}`
    );
    datamx["data"].push({
      bms_inputs_ctrls_id: value.name.replace("inp", ""),
      user_id: user_id,
      attribute: "value",
      value: value.value,
    });

    // const send = requestData.postFileData(url, config_upload, formData);
    // send.then((data) => console.log(data));
  }

  console.log(JSON.stringify(datamx));

  const send = requestData.postDataForm(url, datamx.data);
  send.then((data) => console.log(data));

  // }; //End HandleSubmit

  // form.addEventListener("submit", sendSubmit);
}
// export { sendData };
