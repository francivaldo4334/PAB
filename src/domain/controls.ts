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
let SHIFT = false;

let isScrolling;
function setPositionDraw(x,y) {
  const draw = document.getElementById("project_draw_position");
  draw.style.transform = `translate(${x}px, ${y}px)`;
}
function setPositionProject(x,y) {
  current_project.position.x = x;
  current_project.position.y = y;
}
function setScaleDraw(scale) {
  const draw = document.getElementById("project_draw");
  draw.style.scale = scale;
}
function setScaleProject(scale) {
  current_project.zoom = scale;
}
function getScale() {
  return current_project.zoom;
}
window.addEventListener("keydown", (e) => {
  if(e.key == "Shift") {
    SHIFT = true;
  }
});
window.addEventListener("keyup", (e) => {
  if(e.key == "Shift") {
    SHIFT = false;
  }
});
window.addEventListener("mousemove", (e) => {
  M_X = e.clientX;
  M_Y = e.clientY;
  M_DELTA_X = M_X - M_INIT_X;
  M_DELTA_Y = M_Y - M_INIT_Y;
  if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT) {
    setPositionDraw(
      current_project.position.x + M_DELTA_X,
      current_project.position.y + M_DELTA_Y
    );
  }
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
  switch (EDIT_MODE) {
    case "SELECTION":
      const space = 20;
      switch (SCROLL_STATE) {
        case "UP":
          if (SHIFT) {
            setPositionDraw(current_project.position.x + space,current_project.position.y);
            setPositionProject(current_project.position.x + space,current_project.position.y);
          }
          else {
            setPositionDraw(current_project.position.x,current_project.position.y + space);
            setPositionProject(current_project.position.x,current_project.position.y + space);
          }
          break;
        case "DOWN":
          if (SHIFT) {
            setPositionDraw(current_project.position.x - space,current_project.position.y);
            setPositionProject(current_project.position.x - space,current_project.position.y);
          }
          else {
            setPositionDraw(current_project.position.x,current_project.position.y - space);
            setPositionProject(current_project.position.x,current_project.position.y - space);
          }
          break;
        default:
          break;
      }
      break;
    case "ZOOM":
      const scale_space = 0.1;
      switch (SCROLL_STATE) {
        case "UP":
          setScaleDraw(current_project.zoom + scale_space)
          setScaleProject(current_project.zoom + scale_space)
          break;
        case "DOWN":
          setScaleDraw(current_project.zoom - scale_space)
          setScaleProject(current_project.zoom - scale_space)
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
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
  switch (EDIT_MODE) {
    case "MOVE":
      setPositionProject(
        current_project.position.x += M_DELTA_X,
        current_project.position.y += M_DELTA_Y
      )
      break;

    default:
      break;
  }
  M_INIT_X = 0;
  M_INIT_Y = 0;
  M_DELTA_Y = 0;
  M_DELTA_Y = 0;
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
