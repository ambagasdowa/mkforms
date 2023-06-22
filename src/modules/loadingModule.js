function spinner(element, sw = true) {
  if (sw) {
    let initSpin = document.createElement("div");
    initSpin.className = "run";
    initSpin.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin-pulse fa-lg"></i>';
    element.appendChild(initSpin);
  } else {
    element.remove();
  }
}

export { spinner };
