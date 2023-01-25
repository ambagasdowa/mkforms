// ==================== Set Visual Engine =======================
// ...
// =====================  Fetch Objects ==========================
var i = 0;

let get = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function () {
    console.log(this.responseText);
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
    console.log(
      `Menu Build DASHBOARD : ${keys} with value : ${templates[keys]}`
    );

    const list = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.setAttribute("class", "nav-link");
    anchor.setAttribute("href", "#");
    anchor.setAttribute("data-open", `${templates[keys]}`);

    const inntxt = document.createElement("span");
    inntxt.setAttribute("class", "nav-item");
    inntxt.innerHTML = keys;

    anchor.appendChild(inntxt);
    list.appendChild(anchor);
    nav_menu.appendChild(list);

    console.log(nav_menu);
  });
}
export { drawIn };
