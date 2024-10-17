"use strict";
var W_WIDTH = window.innerWidth;
var W_HEIGHT = window.innerHeight;
var JUMP_SCROLL_MOVE = 50;
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
var SCALE_JUMP = 0.1;
var drawPosition = document.getElementById("project_draw_position");
var drawRect = document.getElementById("project_draw_rect");
var draw = document.getElementById("project_draw");
var body = document.querySelector("body");
var isScrolling;
var selectionBox = new SelectionBox();
function setPositionDraw(x, y) {
    if (drawPosition) {
        drawPosition.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
    }
}
function setPositionProject(x, y) {
    if (current_project) {
        if (current_project.position) {
            current_project.position.x = x;
            current_project.position.y = y;
        }
    }
}
function calcPositionCursorX(x) {
    var rect = drawPosition === null || drawPosition === void 0 ? void 0 : drawPosition.getBoundingClientRect();
    return x - (rect ? rect.left : 0);
}
function calcPositionCursorY(y) {
    var rect = drawPosition === null || drawPosition === void 0 ? void 0 : drawPosition.getBoundingClientRect();
    return y - (rect ? rect.top : 0);
}
function setScaleDraw(scale) {
    if (draw) {
        if (scale < 3.0 && scale > 0.1) {
            draw.style.scale = String(scale);
        }
    }
}
function setScaleProject(scale) {
    if (current_project && scale < 3.0 && scale > 0.1) {
        current_project.zoom = scale;
    }
}
function getScale() {
    if (current_project) {
        if (current_project.zoom) {
            return current_project.zoom;
        }
    }
    return 1;
}
window.addEventListener("keydown", function (e) {
    if (e.shiftKey && EDIT_MODE === "SELECTION" && body) {
        body.setAttribute("selected", "move-h");
    }
    switch (e.key) {
        case " ":
            setMoveMode();
            break;
        default:
            break;
    }
});
window.addEventListener("keyup", function (e) {
    decelAllElement();
    setSelectionMode();
    e.preventDefault();
});
window.addEventListener("mousemove", function (e) {
    var _a;
    M_X = e.clientX;
    M_Y = e.clientY;
    M_DELTA_X = M_X - M_INIT_X;
    M_DELTA_Y = M_Y - M_INIT_Y;
    var rect = (_a = document
        .getElementById("project_draw_rect")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var isInside = rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT && isInside) {
        if (current_project) {
            if (current_project.position) {
                setPositionDraw(current_project.position.x + M_DELTA_X, current_project.position.y + M_DELTA_Y);
            }
        }
    }
    selectionBox.actionsSelectionModeMouseMove();
});
window.addEventListener("wheel", function (e) {
    if (e.ctrlKey) {
        setZoomMode();
        e.preventDefault();
    }
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
    var scaleJump;
    var newScle;
    switch (EDIT_MODE) {
        case "SELECTION":
            switch (SCROLL_STATE) {
                case "UP":
                    if (current_project) {
                        if (current_project.position) {
                            if (e.shiftKey) {
                                setPositionDraw(current_project.position.x + JUMP_SCROLL_MOVE, current_project.position.y);
                                setPositionProject(current_project.position.x + JUMP_SCROLL_MOVE, current_project.position.y);
                            }
                            else {
                                setPositionDraw(current_project.position.x, current_project.position.y + JUMP_SCROLL_MOVE);
                                setPositionProject(current_project.position.x, current_project.position.y + JUMP_SCROLL_MOVE);
                            }
                        }
                    }
                    break;
                case "DOWN":
                    if (current_project) {
                        if (current_project.position) {
                            if (e.shiftKey) {
                                setPositionDraw(current_project.position.x - JUMP_SCROLL_MOVE, current_project.position.y);
                                setPositionProject(current_project.position.x - JUMP_SCROLL_MOVE, current_project.position.y);
                            }
                            else {
                                setPositionDraw(current_project.position.x, current_project.position.y - JUMP_SCROLL_MOVE);
                                setPositionProject(current_project.position.x, current_project.position.y - JUMP_SCROLL_MOVE);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
            break;
        case "ZOOM":
            scaleJump = SCROLL_STATE === "UP" ? SCALE_JUMP : -SCALE_JUMP;
            newScle = getScale() + scaleJump;
            setScaleDraw(newScle);
            setScaleProject(newScle);
            break;
        case "SELECTION":
            selectionBox.actionsSelectionModeWheel();
            break;
        default:
            break;
    }
}, { passive: false });
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
            if (current_project) {
                if (current_project.position) {
                    setPositionProject(current_project.position.x + M_DELTA_X, current_project.position.y + M_DELTA_Y);
                }
            }
            break;
        case "SELECTION":
            selectionBox.actionsSelectionModeMouseUp();
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
    switch (EDIT_MODE) {
        case "SELECTION":
            if (M_BUTTON_LEFT && e.button === 0) {
                selectionBox.actionsSelectionModeMouseDown(e);
            }
            break;
        default:
            break;
    }
});
window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
