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
      // Gateway Frame after open module from list dashboard
      innerFrame.width = "1820px";
      innerFrame.height = "980px";

      console.log(innerFrame);
      //innerFrame.src = template;
    });
  }
});
