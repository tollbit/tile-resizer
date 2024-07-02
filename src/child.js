var iframeDimensionsOld = {};
var resizeObserver;

function setupResizeObserver() {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver(sendDimensionsToParent);
  }
  resizeObserver.observe(document.body);
}

// send the latest page dimensions to the parent page on which this iframe is embedded
function sendDimensionsToParent() {
  var iframeDimensionsNew = {
    height: document.body.scrollHeight,
  };

  if (iframeDimensionsNew.height != iframeDimensionsOld.height) {
    // if old width is not equal new width, or old height is not equal new height, then...
    window.parent.postMessage(iframeDimensionsNew, "*");
    iframeDimensionsOld = iframeDimensionsNew;
  }
}

// on load - send the page dimensions. (we do this on load because then all images have loaded...)
window.addEventListener("load", function () {
  iframeDimensionsOld = {
    height: document.body.scrollHeight,
  };

  window.parent.postMessage(iframeDimensionsOld, "*"); //send our dimensions once, initially - so the iFrame is initialized to the correct size

  if (window.MutationObserver) {
    var observer = new MutationObserver(sendDimensionsToParent);
    config = {
      attributes: true,
      attributeOldValue: false,
      characterData: true,
      characterDataOldValue: false,
      childList: true,
      subtree: true,
    };

    observer.observe(document.body, config);
  }

  setupResizeObserver();
});
