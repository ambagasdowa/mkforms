const book_specs = {};
export { book_specs };

const message = "Initializing all libs and  modules for slider";
function greet(name) {
  return `Starting module =>, ${name} by Ambagasdowa`;
}
export { greet, message };

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
export { waitForElm };

function setStyles(documents, dev = false) {
  Object.keys(documents).forEach((key) => {
    console.log(`Index INPUT : ${key} with value : ${documents[key]}`);
    // NOTE This is constant for all books
    /* create the link element */
    let link = documents[key];
    if (dev == true) {
      link = link + `?dev=${Math.floor(Math.random() * 100)}`;
    }
    const linkElement = document.createElement("link");
    // add attributes
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href", link);
    // Attach to the document head
    document.getElementsByTagName("head")[0].appendChild(linkElement);
  });
}
export { setStyles };

function getAllUrlParams(url, framework) {
  // we'll store the parameters here
  var obj = {};

  if (framework) {
    //  pathtLocation = window.location.pathname;
    console.log(`URL -> ${url} are -> ${framework}`);
    const uri = new URL(url);
    let href = uri.pathname;
    let lastPath = href.match(/([^\/]*)\/*$/)[1];
    console.log(href.match(/([^\/]*)\/*$/)[1]);

    obj["id"] = lastPath;
  } else {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1);
    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0];

      // split our query string into its component parts
      var arr = queryString.split("&");

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split("=");

        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof a[1] === "undefined" ? true : a[1];

        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  } // END eval of param framework

  return obj;
}

export { getAllUrlParams };

document.onkeydown = function (e) {
  // disable F12 key
  if (e.keyCode == 123) {
    return false;
  }

  // disable I key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    return false;
  }

  // disable J key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
    return false;
  }

  // disable U key
  if (e.ctrlKey && e.keyCode == 85) {
    return false;
  }
};

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

//===========================================================================//
// TODO :
// NOTE : the slider , Carousel Mechanism
//===========================================================================//
let currentIndex = 1;
// TODO : response from server book logic
// NOTE : this must be a response query
// Insert a block of rules into a page with javascript
// This method creates a style element, inserts our CSS rules as a string, then attaches the element to the HTML head.
// And this come from external json source response
//	json_response = {
//		book_id:
//	[
//		{book_pages},
//		{book_inputs},
//      	{book_pages_maps}
//	]
//}
// NOTE book_pages
//const book_pages = "{book_pages}";
//// TODO : Positions section
//// NOTE book_pages_maps
//const book_pages_maps = "{book_pages_maps}";
//// NOTE book_inputs
//const book_inputs = "{book_inputs}";

//fetch("./json/source.json")
//  .then((response) => response.json())
//  .then((data) => (book = data));

//const myRequest = "json/source.json";

// Example POST method implementation:
// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "same-origin", // no-cors, *cors, same-origin
//     cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

//  postData(myRequest, { answer: 42 }).then((data) => {
//    console.log(data); // JSON data parsed by `data.json()` call
//  });

// NOTE first set global vars
//=== === === === === === === === === === === === === === === === === === === === === === //
// NOTE request json data
//=== === === === === === === === === === === === === === === === === === === === === === //

function cpages(obj) {
  const pages = Object.keys(obj).length;
  return pages;
}
export { cpages };

function buildDivBook(object = {}) {
  console.log(`Running BuildDivBook`);
  let obj;

  if (object.length != 1) {
    obj = object;
  } else {
    obj = object[0];
  }
  console.log(obj);
  const book_section = document.querySelector(".book");
  // const num_pages = cpages(obj.book_pages);
  console.log(obj.pages);
  const num_pages = obj.pages;
  //const num_pages = obj.pages;
  console.log(`Num of pages -> ${num_pages}`);

  //NOTE First load div#pages_$x->div#controls_$x->form.form_$x
  for (let index = 1; index <= num_pages; index++) {
    let element;
    console.log(window.location.hostname);

    // if (`${window.location.hostname}` != "baizabal.xyz") {
    element = obj.book_pages[index];
    // } else {
    //   element = obj.book_pages_ext[index];
    // }

    //console.log(`element => ${element}`);

    //NOTE start buiding of div an attach the img background
    const page_book = document.createElement("div");
    if (index == num_pages) {
      console.log(`Index and num_pages = ${index} and ${num_pages}`);
      page_book.className = `pages_last`;
    } else {
      // NOTE : set the search attribute to last page for awaitElement
      page_book.className = `pages_${index}`;
    }
    // NOTE add background image to div
    const book_attr = document.createAttribute("style");
    book_attr.value = "background-image: url(" + element + ") ";

    const img = new Image();
    img.onload = () => {
      console.log(`IMG SIZES : ${img.width} X ${img.height} on page ${index}`);
      // update the img dimensions
    };
    img.src = element;

    book_specs[index] = { w: img.width, h: img.height };
    // set positions passthrought
    //

    page_book.setAttributeNode(book_attr);

    // Add form hir

    // NOTE add forms to div
    if (obj.book_inputs[index]) {
      setForms(obj, index, page_book);
    }
    // NOTE this maps must come from an api json bridge
    // asking for a system_users.user_id
    //
    //============ NOTE CODE uncomment if needed ===========//
    //
    //if (obj.book_pages_maps[index]) {
    //  //NOTE add positions via css
    //  console.log(`Found something in book_pages_maps`);
    //  setMappings(obj, index);
    //}
    //============ NOTE CODE uncomment if needed ===========//
    //
    //
    book_section.appendChild(page_book);
    console.log(document.querySelector(".pages_last"));
  } //NOTE end for loop to json

  console.log(`Finished buildin div->pages`);
}
export { buildDivBook };

// NOTE WORK in progress  create inner page logic
function setForms(obj, index, div) {
  //  console.log(`Initializing setForms() process for index ${index}`);
  const inputs = obj.book_inputs[index];
  //console.log(inputs);
  //NOTE build form

  //create a form
  const formx = document.createElement("form");
  formx.id = `form_${index}`;
  for (const input of inputs) {
    let input_x = document.createElement("input");
    //  console.log(input);
    for (const key in input) {
      if (Object.hasOwnProperty.call(input, key)) {
        input_x[key] = input[key];
        //      console.log(`${key} : ${input[key]}`);
      }
    }
    formx.appendChild(input_x);
  } // NOTE end of main for

  // const createButton = document.createElement("button");
  // let button = document.createElement("input");
  // button.type = "button";
  // button.id = "submit";
  // button.value = "Save This Page";
  // button.className = "btn";
  // button.style =
  //   "bottom:20%;left:15%;display:block !important ;border:2px red solid !important;";
  // button.innerText = "Guardar";
  div.appendChild(formx);

  // div.appendChild(button);
} // NOTE End setForms

// NOTE Set Maps

function setMappings(obj, index) {
  console.log("Maps => " + index);
  let cssMaps = obj.book_pages_maps[index];

  console.log(cssMaps);
  /* create the style element */
  let styleMapsElement = document.createElement("style");
  /* add style rules to the style element */
  styleMapsElement.appendChild(document.createTextNode(cssMaps));
  /* attach the style element to the document head */
  document.getElementsByTagName("head")[0].appendChild(styleMapsElement);
} // NOTE End

//=== === === === === === === === === === === === === === === === === === === === === === //

function lpobj(obj_looper) {
  // console.log(`PropertyNames => ${Object.getOwnPropertyNames(obj_looper)}`);
  console.log(`PropertyKeys => ${Object.keys(obj_looper)}`);
  console.log(`PropertyValues => ${Object.values(obj_looper)}`);

  //  for (const prop in obj_looper) {
  //    console.log(`${prop} : ${obj_looper[prop]}`);
  //  }
}

// NOTE pure js
// based on using name tags (as with radio buttons) and a few lines of javascript.
// <input type="checkbox" name="check" onclick="onlyOne(this)">
// <input type="checkbox" name="check" onclick="onlyOne(this,tagname)">

function onlyOne(checkbox, tag) {
  let checkboxes = document.getElementsByName(tag);
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}
window.onlyOne = onlyOne;

// set dimensions image
function img2Viewport(bs, page, databook) {
  let viewport;
  const win = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  console.log(`BookSpecs inside lib:img2Viewport`);
  // console.log(JSON.stringify(databook[0].sourcePositions));
  let positions = {};
  for (const pos in databook[0].sourcePositions) {
    if (Object.hasOwnProperty.call(databook[0].sourcePositions, pos)) {
      const element = databook[0].sourcePositions[pos];
      if (element.bms_bookpages_id == page) {
        console.log(element);
        // call to setMappings(obj, index)
        positions[pos] = element;
      }
    }
  }
  console.log(`POSITIONS`);
  console.log(positions);
  viewport = dimensionsTranslate(bs, win);

  return viewport;
}

// set dimensions
function dimensionsTranslate(bs = {}, win = {}) {
  // Calculate img dimensions against inner window sizes
  const h = win.w * (bs.h / bs.w);
  const w = (win.w * (win.h / win.w)) / (bs.h / bs.w);

  let css =
    ".pages_1 > form > #input4851{top:120px;left:75px;width:130px;border:2px solid blue !important;}";
  inlineCss(css);

  console.log(`resize image => ${w} x ${h}`);

  return { w: w, h: win.h };
}

function inlineCss(cssAdd = "") {
  /* create the style element */
  // document.getElementsByTagName("head")[0].removeAttribute("style");

  let styleMapsElement = document.createElement("style");
  /* add style rules to the style element */
  styleMapsElement.appendChild(document.createTextNode(cssAdd));
  /* attach the style element to the document head */
  document.getElementsByTagName("head")[0].appendChild(styleMapsElement);
} // NOTE End

export { img2Viewport, dimensionsTranslate };
