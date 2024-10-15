const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;
let M_X = 0;
let M_Y = 0;
let M_INIT_X = 0;
let M_INIT_Y = 0;
let M_DELTA_X = 0;
let M_DELTA_Y = 0;
let M_BUTTON_LEFT = false;
let M_BUTTON_MIDDLE = false;
let M_BUTTON_RIGHT = false;
let SCROLL_STATE = "STOP";

let isScrolling;
window.addEventListener("mousemove", (e) => {
  M_X = e.clientX;
  M_Y = e.clientY;
  M_DELTA_X = M_X - M_INIT_X;
  M_DELTA_Y = M_Y - M_INIT_Y;
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
  if (EDIT_MODE === "MOVE") {
    current_project.position.x += M_DELTA_X;
    current_project.position.y += M_DELTA_Y;
  }
  M_INIT_X = 0;
  M_INIT_Y = 0;
  M_DELTA_Y = 0;
  M_DELTA_Y = 0;
  console.log("here")
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
  M_INIT_X = e.clientX;
  M_INIT_Y = e.clientY;
});

window.addEventListener("mousemove", (e) => {
  if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT) {
    const draw = document.getElementById("project_draw");
    draw.style.transform = `translate(${current_project.position.x + M_DELTA_X}px, ${current_project.position.y + M_DELTA_Y}px)`;
  }
});
