const initial = "Init UploadModule ... ";

async function postFileData(url = "", config = {}, data = {}) {
  let post = config.post;
  if (data) {
    post["body"] = data;
  }
  //  if (config.headers.length > 0) {
  const myHeaders = new Headers(config.headers);
  post["headers"] = myHeaders;
  //  }
  const request = new Request(url, post);
  const response = await fetch(request);
  return response.json();
} //postFileData

// Example POST method implementation:
async function postDataForm(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "no-cors", // no-cors, *cors, same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

async function getData(url = "", config = {}, txt = false) {
  let get = config.get;

  const myHeaders = new Headers(config.headersGet);
  const request = new Request(url, {
    method: get.method,
    mode: get.mode,
    cache: get.cache,
    credentials: get.credentials,
    headers: myHeaders,
  });
  const response = await fetch(request);
  if (txt == true) {
    return await response.text();
  } else {
    return await response.json();
  }
}

export { initial, postFileData, getData, postData, postDataForm };
