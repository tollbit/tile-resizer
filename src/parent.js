function resizeListener(event) {
  var matches = document.querySelectorAll("iframe"); // iterate through all iFrames on page
  for (i = 0; i < matches.length; i++) {
    if (matches[i].contentWindow == event.source) {
      matches[i].style.height = `${event.data.height}px`;
      return 1;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("message", resizeListener, false);
});
