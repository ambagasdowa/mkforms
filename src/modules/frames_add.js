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

      //  let opdoc = document.getElementById(modalId).classList.add(isVisible);
    });
  }

  // for (const el of closeEls) {
  //   el.addEventListener("click", function () {
  //     this.parentElement.parentElement.parentElement.classList.remove(
  //       isVisible
  //     );
  //   });
  // }

  // document.addEventListener("click", (e) => {
  //   if (e.target == document.querySelector(".modal.is-visible")) {
  //     document.querySelector(".modal.is-visible [data-close]").click();
  //   }
  // });

  // document.addEventListener("keyup", (e) => {
  //   // if we press the ESC
  //   if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
  //     document.querySelector(".modal.is-visible [data-close]").click();
  //   }
  // });
});
