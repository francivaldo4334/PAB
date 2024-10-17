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
var isSelecting = false;
var selectionBox = document.getElementById("selection_box");
var drawPosition = document.getElementById("project_draw_position");
var draw = document.getElementById("project_draw");
var isScrolling;
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
function setScaleDraw(scale) {
    if (draw && scale < 3.0 && scale > 0.1) {
        draw.style.scale = String(scale);
    }
}
function setScaleProject(scale) {
    if (current_project && scale < 3.0 && scale > 0.1) {
        current_project.zoom = scale;
    }
}
function getScale() {
    if (current_project) {
        return current_project.zoom;
    }
    return 0;
}
function calcPositionCursorX(x) {
    var projectDrawPosition = document.getElementById("project_draw_position");
    var rect = projectDrawPosition === null || projectDrawPosition === void 0 ? void 0 : projectDrawPosition.getBoundingClientRect();
    return x - (rect ? rect.x : 0);
}
function calcPositionCursorY(y) {
    var projectDrawPosition = document.getElementById("project_draw_position");
    var rect = projectDrawPosition === null || projectDrawPosition === void 0 ? void 0 : projectDrawPosition.getBoundingClientRect();
    return y - (rect ? rect.y : 0);
}
function initSelectionBox() {
    if (selectionBox) {
        isSelecting = true;
        var x = calcPositionCursorX(M_INIT_X);
        var y = calcPositionCursorY(M_INIT_Y);
        selectionBox.style.left = "".concat(x);
        selectionBox.style.top = "".concat(y);
        selectionBox.style.width = "0px";
        selectionBox.style.height = "0px";
        selectionBox.style.display = "block";
    }
}
function updateSelectionBox() {
    if (selectionBox) {
        var width = Math.abs(M_DELTA_X);
        var height = Math.abs(M_DELTA_Y);
        selectionBox.style.left = "".concat(Math.min(calcPositionCursorX(M_X), calcPositionCursorX(M_INIT_X)), "px");
        selectionBox.style.top = "".concat(Math.min(calcPositionCursorY(M_Y), calcPositionCursorY(M_INIT_Y)), "px");
        selectionBox.style.width = "".concat(width, "px");
        selectionBox.style.height = "".concat(height, "px");
    }
}
function finishSelectionBox() {
    if (selectionBox) {
        selectionBox.style.display = "none";
        isSelecting = false;
    }
}
window.addEventListener("keydown", function (e) {
    if (e.ctrlKey) {
        setMoveMode();
    }
    switch (e.key) {
        case " ":
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
    if (isSelecting) {
        updateSelectionBox();
    }
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
            switch (SCROLL_STATE) {
                case "UP":
                    if (current_project) {
                        if (current_project.zoom) {
                            setScaleDraw(current_project.zoom + SCALE_JUMP);
                            setScaleProject(current_project.zoom + SCALE_JUMP);
                        }
                    }
                    break;
                case "DOWN":
                    if (current_project) {
                        if (current_project.zoom) {
                            setScaleDraw(current_project.zoom - SCALE_JUMP);
                            setScaleProject(current_project.zoom - SCALE_JUMP);
                        }
                    }
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    if (isSelecting) {
        updateSelectionBox();
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
        default:
            break;
    }
    if (isSelecting) {
        finishSelectionBox();
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
            initSelectionBox();
            e.preventDefault();
            break;
        default:
            break;
    }
});
