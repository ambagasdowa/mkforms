// ==================== Set Visual Engine =======================
// ...
// =====================  Fetch Objects ==========================
var i = 0;

let get = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function () {
    // console.log(this.responseText);
    if (this.readyState === 4 && this.status === 200) {
      callback(this.responseText);
    }
  };
  request.send();
};

let append = function (template) {
  const element = document.createElement("div");
  element.setAttribute("id", `${template}`);
  element.innerHTML = template;
};

function drawIn(templates) {
  console.log(`Drawing ...`);

  const nav_menu = document.querySelector(".menus");

  Object.keys(templates).forEach((keys) => {
    //
    let label = Object.keys(templates[keys]);
    let value = Object.values(templates[keys]);

    const list = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.setAttribute("class", "nav-link");
    anchor.setAttribute("href", "#");
    anchor.setAttribute("data-open", `${Object.keys(templates[keys])}`);

    if (value != "undefined") {
      // console.log(`Value Exists`);
      Object.keys(value).forEach((items) => {
        Object.keys(value[items]).forEach((itemName) => {
          // Ask for element insert
          addElement(anchor, itemName, value[items][itemName]);
        });
      });
    }

    const inntxt = document.createElement("span");
    inntxt.setAttribute("class", "nav-item");
    inntxt.innerHTML = keys;

    anchor.appendChild(inntxt);
    list.appendChild(anchor);
    nav_menu.appendChild(list);

    console.log(nav_menu);
  });
}

function addElement(element, name, value) {
  // add case
  if (name == "icon") {
    const icon = document.createElement("li");
    icon.setAttribute("class", `${value}`);
    element.appendChild(icon);
  }
  if (name == "other") {
    //
  }
  return null;
}
export { drawIn };
