import * as requestData from "./uploadModule.js";
import "../js/node_modules/tablefilter/dist/tablefilter/tablefilter.js";
import { addElement } from "./frames.js";

function init(config_list = {}) {
  let url_list = `${config_list.protocol_json}${config_list.srv_json}:${config_list.port_json}/${config_list.method[0]}`;

  const send = requestData.getData(url_list, config_list);
  send.then((data) => createTable(data, config_list));
}

function createTable(objectArray, config_list = {}) {
  //
  const config = config_list.tables;
  const fields = config.fieldsBooks;
  const fieldTitles = config.fieldTitleBooks;

  let body = document.getElementsByTagName("body")[0];
  let tbl = document.createElement("table");
  tbl.setAttribute("id", "listBooks");
  let thead = document.createElement("thead");
  let thr = document.createElement("tr");
  fieldTitles.forEach((fieldTitle) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(fieldTitle));
    thr.appendChild(th);
  });
  thead.appendChild(thr);
  tbl.appendChild(thead);

  let tbdy = document.createElement("tbody");
  let tr = document.createElement("tr");
  let tag;
  let setValue, selector;
  objectArray.forEach((object) => {
    let tr = document.createElement("tr");
    fields.forEach((field) => {
      var td = document.createElement("td");

      // CHECKING

      // console.log(field);

      if (config.column_options[field]) {
        const fieldTag = config.column_options[field];
        Object.keys(fieldTag).forEach((keytag) => {
          tag = document.createElement(`${keytag}`);

          Object.keys(fieldTag[keytag]).forEach((attr) => {
            // attribute:value

            if (attr == "id" || attr == "class" || attr == "data-open-modal") {
              setValue = `${fieldTag[keytag][attr]}${
                object[config.idIdentifier]
              }`;
            } else if (attr == "href") {
              // console.log(`${alink(config_list, fieldTag[keytag])}`);
              setValue = alink(
                config_list,
                fieldTag[keytag],
                object[config.idIdentifier]
              );
            } else {
              setValue = `${fieldTag[keytag][attr]}`;
            }
            // console.log(`attr ${attr} setValue ${setValue}`);
            tag.setAttribute(`${attr}`, setValue);
          });
        });
        tag.innerHTML = `${object[field]}`;
        td.append(tag);
      } else {
        td.appendChild(document.createTextNode(object[field]));
      }

      tr.appendChild(td);
    });
    tbdy.appendChild(tr);
  });
  tbl.appendChild(tbdy);
  body.appendChild(tbl);

  // Active modal behaviour uncomment line below
  // attach(config_list, true);
  attach(config_list, false);

  //Open link in new tab
  //attRoute()

  // return tbl;
  let tf = new TableFilter(tbl, config_list.tableFilterConfig);
  tf.init();
}

function attach(config_list = {}, setModal = false) {
  if (setModal) {
    modal(config_list);
    // } else {
    //   alink(config_list)
  }
}
function alink(config_list = {}, selector, dataId) {
  // selector can be an array
  // console.log(`INSIDE ALINK`);
  // console.log(selector);
  // console.log(selector["data-frame"]);
  let confSel = config_list.frame_source[selector["data-frame"]];
  // data-frame = View||Edit
  // data-open-modal = book_id
  let linkSrc = `./${confSel.src}.html?${confSel.params.param1}=${dataId}&${confSel.params.param2}=${confSel.testValues.User}`;
  return linkSrc;
}

function modal(config_list = {}) {
  console.log(`INIT:ATTACH`);
  console.log(config_list);
  const openEls = document.querySelectorAll("[data-open-modal]");
  const closeEls = document.querySelectorAll("[data-close-modal]");
  const isVisible = "is-visible";

  for (const el of openEls) {
    el.addEventListener("click", function () {
      console.log(this.dataset.openModal);
      // alert(this.dataset.frame);

      const modalId = "modal_frame";

      const openFrame = document.querySelector(".frame");

      // IF etc...
      let selector = this.dataset.frame;
      let confSel = config_list.frame_source[selector];

      let frameSrc = `./${confSel.src}.html?${confSel.params.param1}=${this.dataset.openModal}&${confSel.params.param2}=${confSel.testValues.User}`;
      // return framesrc
      openFrame.src = frameSrc;

      ////add attributes
      openFrame.setAttribute("type", "text/html");
      openFrame.width = window.innerWidth;
      openFrame.height = window.innerHeight;
      console.log(openFrame);

      document.getElementById(modalId).classList.add(isVisible);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible [data-close-modal]").click();
    }
  });

  document.addEventListener("keyup", (e) => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible [data-close-modal]").click();
    }
  });
}

export { init };

function attachLink() {
  return null;
}
