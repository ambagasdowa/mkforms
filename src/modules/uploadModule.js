const initial = "Init UploadModule ... ";

async function postFileData(url = "", config = {}, data = {}) {
  console.log(config);

  let post = config.post;

  if (data) {
    post["body"] = data;
  }

  //  if (config.headers.length > 0) {
  const myHeaders = new Headers(config.headers);
  post["headers"] = myHeaders;
  //  }

  const request = new Request(url, post);

  console.log(request);
  const response = await fetch(request);
  //  console.log(response);
  //const bookResponse = await response.json();
  return response.json();
} //postFileData
export { initial, postFileData };
