window.saveDataAcrossSessions = true;

const alienImage = "./assets/alien.png";
const alienPortalImage = "./assets/alien-portal.png";
const alienSplashImage = "./assets/alien-blood.png";

let gameSpace;

function getRandomNumber(range) {
  // generates random number in given range
  rndm = Math.floor(Math.random() * range);
  return rndm;
}

function genAlien() {
  gameSpace = document.getElementById("main");

  // generation of alien within gamespace
  randomXPosition = getRandomNumber(
    gameSpace.offsetWidth - 75
  );
  randomYPosition = getRandomNumber(
    gameSpace.offsetHeight - 75
  );

  // creation of portal on gamespace
  portal = document.createElement("img");
  portal.src = alienPortalImage;
  portal.classList.add("portal");
  portal.style.left = randomXPosition + "px";
  portal.style.top = randomYPosition + "px";

  portal.classList.add("fadeInX");

  gameSpace.append(portal);

  // creation of alien on gamespace
  alien = document.createElement("img");
  alien.src = alienImage;
  alien.classList.add("alien");
  alien.style.left = randomXPosition + "px";
  alien.style.top = randomYPosition + "px";

  // alien transititon effect
  alien.classList.add("fadeInBottom");

  gameSpace.append(alien);
}

function shootAlien(element) {
  // remove alien from gamespace while you look into it
  element.remove(); // removing
  genSplash(element.style.left, element.style.top); // splash generation
  incrementCount(); // score & count calculation
}

function incrementCount() {
  // function increases count of the alien you shot
  count = ++document.getElementById("count-val").innerText;
  incrementScore(count);
}

function incrementScore(count) {
  // function calculates score
  document.getElementById("score-val").innerText =
    count * 5;
}

function genSplash(x, y) {
  // creation of splash
  splash = document.createElement("img");
  splash.src = alienSplashImage;
  splash.classList.add("splash");
  splash.style.left = x;
  splash.style.top = y;

  splash.classList.add("fadeOut"); // applying fadeIn transition

  gameSpace.append(splash);

  setTimeout(() => {
    splash.classList.remove("fadeIn");
  }, 500); // remove fadeIn transiition after the transition completes

  splash.classList.add("fadeOut"); // applying fadeOut transition

  setTimeout(() => {
    gameSpace.removeChild(splash);
  }, 1000); // remove splash after 1 second
}

setInterval(() => {
  genAlien(); // generate alien

  // old aliens & portals need to disappear
  var aliens = document.getElementsByClassName("alien");
  var portals = document.getElementsByClassName("portal");
  if (portals.length - 1 > 0) portals[0].remove();
  if (aliens.length - 1 > 0) aliens[0].remove();
}, 2000); // every 2 seconds new alien visits

webgazer
  .setGazeListener((data, ts) => {
    // to delete accidental presence of splash image while removing them
    var elements =
      document.getElementsByClassName("splash");
    if (elements.length - 1 > 0) elements[0].remove();

    // if predicted points unavailable then return none
    if (data === null) return;

    // get html element at the coordinate
    ele = document.elementFromPoint(data.x, data.y);

    if (ele !== null && ele.classList.contains("alien")) {
      // shoot alien if it in on our eye sight
      shootAlien(ele);
    }
  })
  .begin();
