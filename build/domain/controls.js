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
var isScrolling;
window.addEventListener("mousemove", function (e) {
    M_X = e.clientX;
    M_Y = e.clientY;
    M_DELTA_X = M_X - M_INIT_X;
    M_DELTA_Y = M_Y - M_INIT_Y;
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
    if (EDIT_MODE === "MOVE") {
        current_project.position.x += M_DELTA_X;
        current_project.position.y += M_DELTA_Y;
    }
    M_INIT_X = 0;
    M_INIT_Y = 0;
    M_DELTA_Y = 0;
    M_DELTA_Y = 0;
    console.log("here");
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
window.addEventListener("mousemove", function (e) {
    if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT) {
        var draw = document.getElementById("project_draw");
        draw.style.transform = "translate(".concat(current_project.position.x + M_DELTA_X, "px, ").concat(current_project.position.y + M_DELTA_Y, "px)");
    }
});
