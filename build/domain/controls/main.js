"use strict";
//actions
//selectionBox
//move
//modes
var MainControls = /** @class */ (function () {
    function MainControls(actions, projectHistory) {
        this.W_WIDTH = window.innerWidth;
        this.W_HEIGHT = window.innerHeight;
        this.JUMP_SCROLL_MOVE = 50;
        this.M_X = 0;
        this.M_Y = 0;
        this.M_INIT_X = 0;
        this.M_INIT_Y = 0;
        this.M_DELTA_X = 0;
        this.M_DELTA_Y = 0;
        this.M_BUTTON_LEFT = false;
        this.M_BUTTON_MIDDLE = false;
        this.M_BUTTON_RIGHT = false;
        this.SCROLL_STATE = "STOP";
        this.SCALE_JUMP = 0.1;
        this.isScrolling = 0;
        this.addEventListener();
        this.actions = actions;
        this.zoom = new Zoom(this, projectHistory);
        this.move = new Move(this, projectHistory);
        this.selectionBox = new SelectionBox(this, this.move);
        this.modes = new Modes(this.selectionBox, this.actions);
    }
    MainControls.prototype.addEventListener = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            switch (_this.actions.EDIT_MODE) {
                case "SELECTION":
                    _this.modes.onSelectionModeActionsKeyDown(e);
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", function (e) {
            _this.modes.onActionsKeyUp(e);
        });
        window.addEventListener("mousemove", function (e) {
            _this.M_X = e.clientX;
            _this.M_Y = e.clientY;
            _this.M_DELTA_X = _this.M_X - _this.M_INIT_X;
            _this.M_DELTA_Y = _this.M_Y - _this.M_INIT_Y;
            switch (_this.actions.EDIT_MODE) {
                case "SELECTION":
                    _this.selectionBox.updateSelectionBox();
                    break;
                case "MOVE":
                    _this.move.moveProject(e);
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("wheel", function (e) {
            if (e.deltaY < 0) {
                _this.SCROLL_STATE = "UP";
            }
            else if (e.deltaY > 0) {
                _this.SCROLL_STATE = "DOWN";
            }
            clearTimeout(_this.isScrolling);
            _this.isScrolling = setTimeout(function () {
                _this.SCROLL_STATE = "STOP";
            }, 300);
            switch (_this.actions.EDIT_MODE) {
                case "SELECTION":
                    _this.move.moveProjectOnOneDirection(e);
                    _this.selectionBox.updateSelectionBox();
                    break;
                case "ZOOM":
                    _this.zoom.updateZoomState();
                    break;
                default:
                    break;
            }
            e.preventDefault();
        }, { passive: false });
        window.addEventListener("mouseup", function (e) {
            if (e.button === 0) {
                _this.M_BUTTON_LEFT = false;
            }
            else if (e.button === 1) {
                _this.M_BUTTON_MIDDLE = false;
            }
            else if (e.button === 2) {
                _this.M_BUTTON_RIGHT = false;
            }
            switch (_this.actions.EDIT_MODE) {
                case "SELECTION":
                    _this.selectionBox.finishSelectionBox();
                    break;
                case "MOVE":
                    _this.move.finishMove();
                    break;
                default:
                    break;
            }
            _this.M_INIT_X = 0;
            _this.M_INIT_Y = 0;
            _this.M_DELTA_Y = 0;
            _this.M_DELTA_Y = 0;
        });
        window.addEventListener("mousedown", function (e) {
            if (e.button === 0) {
                _this.M_BUTTON_LEFT = true;
            }
            else if (e.button === 1) {
                _this.M_BUTTON_MIDDLE = true;
            }
            else if (e.button === 2) {
                _this.M_BUTTON_RIGHT = true;
            }
            _this.M_INIT_X = e.clientX;
            _this.M_INIT_Y = e.clientY;
            switch (_this.actions.EDIT_MODE) {
                case "SELECTION":
                    if (_this.M_BUTTON_LEFT && e.button === 0) {
                        _this.selectionBox.initSelectionBox();
                        e.preventDefault();
                    }
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
    };
    return MainControls;
}());
