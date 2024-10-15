"use strict";
var W_WIDTH = window.innerWidth;
var W_HEIGHT = window.innerHeight;
var M_X = 0;
var M_Y = 0;
var M_INIT_X = 0;
var M_INIT_Y = 0;
var M_DELTA_X = 0;
var M_DELTA_Y = 0;
var M_BUTTON_LEFT = false;
var M_BUTTON_MIDDLE = false;
var M_BUTTON_RIGHT = false;
var SCROLL_STATE = "STOP";
var SHIFT = false;
var isScrolling;
function setPositionDraw(x, y) {
    var draw = document.getElementById("project_draw_position");
    draw.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
}
function setPositionProject(x, y) {
    current_project.position.x = x;
    current_project.position.y = y;
}
function setScaleDraw(scale) {
    var draw = document.getElementById("project_draw");
    draw.style.scale = scale;
}
function setScaleProject(scale) {
    current_project.zoom = scale;
}
function getScale() {
    return current_project.zoom;
}
window.addEventListener("keydown", function (e) {
    if (e.key == "Shift") {
        SHIFT = true;
    }
});
window.addEventListener("keyup", function (e) {
    if (e.key == "Shift") {
        SHIFT = false;
    }
});
window.addEventListener("mousemove", function (e) {
    M_X = e.clientX;
    M_Y = e.clientY;
    M_DELTA_X = M_X - M_INIT_X;
    M_DELTA_Y = M_Y - M_INIT_Y;
    if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT) {
        setPositionDraw(current_project.position.x + M_DELTA_X, current_project.position.y + M_DELTA_Y);
    }
});
window.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
        SCROLL_STATE = "UP";
    }
    else if (e.deltaY > 0) {
        SCROLL_STATE = "DOWN";
    }
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
        SCROLL_STATE = "STOP";
    }, 300);
    switch (EDIT_MODE) {
        case "SELECTION":
            var space = 20;
            switch (SCROLL_STATE) {
                case "UP":
                    if (SHIFT) {
                        setPositionDraw(current_project.position.x + space, current_project.position.y);
                        setPositionProject(current_project.position.x + space, current_project.position.y);
                    }
                    else {
                        setPositionDraw(current_project.position.x, current_project.position.y + space);
                        setPositionProject(current_project.position.x, current_project.position.y + space);
                    }
                    break;
                case "DOWN":
                    if (SHIFT) {
                        setPositionDraw(current_project.position.x - space, current_project.position.y);
                        setPositionProject(current_project.position.x - space, current_project.position.y);
                    }
                    else {
                        setPositionDraw(current_project.position.x, current_project.position.y - space);
                        setPositionProject(current_project.position.x, current_project.position.y - space);
                    }
                    break;
                default:
                    break;
            }
            break;
        case "ZOOM":
            var scale_space = 0.1;
            switch (SCROLL_STATE) {
                case "UP":
                    setScaleDraw(current_project.zoom + scale_space);
                    setScaleProject(current_project.zoom + scale_space);
                    break;
                case "DOWN":
                    setScaleDraw(current_project.zoom - scale_space);
                    setScaleProject(current_project.zoom - scale_space);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});
window.addEventListener("mouseup", function (e) {
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
            setPositionProject(current_project.position.x += M_DELTA_X, current_project.position.y += M_DELTA_Y);
            break;
        default:
            break;
    }
    M_INIT_X = 0;
    M_INIT_Y = 0;
    M_DELTA_Y = 0;
    M_DELTA_Y = 0;
});
window.addEventListener("mousedown", function (e) {
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
