const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

const handleSubmit = (event) => {
  event.preventDefault();

  for (const file of inputFile.files) {
    formData.append("files", file);
  }

  // fetch("http://localhost:8080/files", {
  //     method: "post",
  //     body: formData,
  // }).catch((error) => ("Something went wrong!", error));

  // get_url = `https://baizabal.xyz:8000/srcpos/${book}/${page}`;
  // const xboxes = getData(get_url);
  // xboxes.then((data) => ((boxes = data), redraw()));
};

form.addEventListener("submit", handleSubmit);

async function postFileData(url = "", data = {}) {
  //  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  });

  const request = new Request(url, {
    method: get.method,
    mode: get.mode,
    cache: get.cache,
    credentials: get.credentials,
    headers: myHeaders,
  });

  const response = await fetch(request);
  //const bookResponse = await response.json();
  //buildDivBook(bookResponse[0]);
}
//export { book_request_url };
