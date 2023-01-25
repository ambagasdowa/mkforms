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

async function getData(url = "", config = {}) {
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
  return await response.json();
}

export { initial, postFileData, getData };
