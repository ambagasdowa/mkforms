$(window).on("load", function () {
  console.log("On window load then init ...");

  // ...
  console.log(`Initilizing Frames.js`);
  const openEls = document.querySelectorAll("[data-open]");
  console.log(openEls);

  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      console.log(`MODALID : ${modalId}`);

      const innerFrame = document.querySelector(".frm");
      innerFrame.src = `./${modalId}.html`;
      ////add attributes
      innerFrame.setAttribute("type", "text/html");
      ////innerFrame.setAttribute("data", `${template}`);
      innerFrame.width = "1200px";
      innerFrame.height = "880px";
      console.log(innerFrame);
      //innerFrame.src = template;
    });
  }
});
