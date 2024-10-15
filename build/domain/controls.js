"use strict";
var W_WIDTH = window.innerWidth;
var W_HEIGHT = window.innerHeight;
var M_X = 0;
var M_Y = 0;
var M_BUTTON_LEFT = false;
var M_BUTTON_MIDDLE = false;
var M_BUTTON_RIGHT = false;
var SCROLL_STATE = "STOP";
var isScrolling;
window.addEventListener("mousemove", function (e) {
    M_X = e.clientX;
    M_Y = e.clientY;
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
    console.log(M_BUTTON_LEFT, M_BUTTON_MIDDLE, M_BUTTON_RIGHT);
});
