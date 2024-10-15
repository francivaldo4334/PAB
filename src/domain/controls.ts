const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;
let M_X = 0;
let M_Y = 0;
let M_BUTTON_LEFT = false;
let M_BUTTON_MIDDLE = false;
let M_BUTTON_RIGHT = false;
let SCROLL_STATE = "STOP";

let isScrolling;
window.addEventListener("mousemove", (e) => {
  M_X = e.clientX;
  M_Y = e.clientY;
});
window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    SCROLL_STATE = "UP"
  }
  else if (e.deltaY > 0) {
    SCROLL_STATE = "DOWN"
  }
  clearTimeout(isScrolling)
  isScrolling = setTimeout(() => {
    SCROLL_STATE = "STOP"
  }, 300);
});
window.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    M_BUTTON_LEFT = false;
  }
  else if (e.button === 1) {
    M_BUTTON_MIDDLE = false;
  }
  else if (e.button === 2) {
    M_BUTTON_RIGHT = false;
  }
});
window.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    M_BUTTON_LEFT = true;
  }
  else if (e.button === 1) {
    M_BUTTON_MIDDLE = true;
  }
  else if (e.button === 2) {
    M_BUTTON_RIGHT = true;
  }
  console.log(M_BUTTON_LEFT,M_BUTTON_MIDDLE, M_BUTTON_RIGHT);
});
