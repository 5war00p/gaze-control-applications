// Save prediction data over different sessions
window.saveDataAcrossSessions = true;

const LOOK_DELAY = 1000;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

let lookDirection = null;
let startLookTime = Number.POSITIVE_INFINITY;
let imageElement = getNewImage();
let nextImageElement = getNewImage(true);

// Begin the iris recognition process
webgazer
  .setGazeListener((data, ts) => {
    if (data == null || lookDirection === "STOP") return;

    if (
      data.x < LEFT_CUTOFF &&
      lookDirection !== "LEFT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = ts;
      lookDirection = "LEFT";
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = ts;
      lookDirection = "RIGHT";
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }

    // Looking for 1 second condition
    if (startLookTime + LOOK_DELAY < ts) {
      if (lookDirection === "LEFT") {
        imageElement.classList.add("left");
      } else if (lookDirection === "RIGHT") {
        imageElement.classList.add("right");
      }

      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = "STOP";
      setTimeout(() => {
        imageElement.remove();
        nextImageElement.classList.remove("next");

        imageElement = nextImageElement; // changing current image
        nextImageElement = getNewImage(true); // getting new image for nextone
        lookDirection = "RESET"; // by default to look into center
      }, 200); // image transition-timeout
    }
  })
  .begin();

// webgazer.setTracker('clmtrackr');
// webgazer.setVideoViewerSize(256,256);

function getNewImage(next = false) {
  const img = document.createElement("img");
  img.src = "https://picsum.photos/1000?" + Math.random();

  if (next) img.classList.add("next");

  document.getElementById("mid").append(img);

  return img;
}
