window.saveDataAcrossSessions = true;

const TOP_CUTOFF = window.innerHeight / 8;
const BOTTOM_CUTOFF = window.innerHeight - window.innerHeight / 8;
const scrollPercent = 8;

// how much to scroll
scrollFactor = (data, percent) => {
  return (percent / 100) * data;
};

webgazer
  .setGazeListener((data, ts) => {
    if (data === null) return;

    if (data.y < TOP_CUTOFF || data.y > BOTTOM_CUTOFF) {
      y = scrollFactor(data.y, scrollPercent);
      pageScroll(0, y);
    }
  })
  .begin();

function pageScroll(x, y) {
  // window.scrollBy(x,y, 'smooth'); // Window scroll
  document.getElementById("content").contentWindow.scrollBy(x, y, "smooth"); // IFrame scroll
  scrolldelay = setTimeout(pageScroll, 1000); // delay by 1000ns
}
