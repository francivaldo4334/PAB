"use strict";
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
        this.actions = actions;
        this.move = new Move(this, projectHistory);
        this.zoom = new Zoom(this, projectHistory);
        this.selectionBox = new SelectionBox(this, this.move);
        this.modes = new Modes(this);
        this.addEventListeners();
    }
    MainControls.prototype.addEventListeners = function () {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        window.addEventListener("wheel", this.handleScroll.bind(this), {
            passive: false,
        });
        window.addEventListener("mouseup", this.handleMouseUp.bind(this));
        window.addEventListener("mousedown", this.handleMouseDown.bind(this));
        window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
    };
    MainControls.prototype.handleKeyDown = function (e) {
        switch (this.actions.EDIT_MODE) {
            case "SELECTION":
                this.modes.onSelectionModeActionsKeyDown(e);
                break;
            default:
                break;
        }
    };
    MainControls.prototype.handleKeyUp = function (e) {
        this.modes.onActionsKeyUp(e);
    };
    MainControls.prototype.handleMouseMove = function (e) {
        this.M_X = e.clientX;
        this.M_Y = e.clientY;
        this.M_DELTA_X = this.M_X - this.M_INIT_X;
        this.M_DELTA_Y = this.M_Y - this.M_INIT_Y;
        switch (this.actions.EDIT_MODE) {
            case "SELECTION":
                this.selectionBox.updateSelectionBox();
                break;
            case "MOVE":
                this.move.moveProject(e);
                break;
            default:
                break;
        }
    };
    MainControls.prototype.handleScroll = function (e) {
        var _this = this;
        this.SCROLL_STATE = e.deltaY < 0 ? "UP" : "DOWN";
        clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(function () {
            _this.SCROLL_STATE = "STOP";
        }, 300);
        switch (this.actions.EDIT_MODE) {
            case "SELECTION":
                this.move.moveProjectOnOneDirection(e);
                this.selectionBox.updateSelectionBox();
                break;
            case "ZOOM":
                this.zoom.updateZoomState();
                break;
            default:
                break;
        }
        e.preventDefault();
    };
    MainControls.prototype.handleMouseUp = function (e) {
        this.updateMouseButtons(e, false);
        switch (this.actions.EDIT_MODE) {
            case "SELECTION":
                this.selectionBox.finishSelectionBox();
                break;
            case "MOVE":
                this.move.finishMove();
                break;
            default:
                break;
        }
        this.resetMousePosition();
    };
    MainControls.prototype.handleMouseDown = function (e) {
        this.updateMouseButtons(e, true);
        this.M_INIT_X = e.clientX;
        this.M_INIT_Y = e.clientY;
        if (this.actions.EDIT_MODE === "SELECTION" &&
            this.M_BUTTON_LEFT &&
            e.button === 0) {
            this.selectionBox.initSelectionBox();
            e.preventDefault();
        }
    };
    MainControls.prototype.updateMouseButtons = function (e, isPressed) {
        if (e.button === 0) {
            this.M_BUTTON_LEFT = isPressed;
        }
        else if (e.button === 1) {
            this.M_BUTTON_MIDDLE = isPressed;
        }
        else if (e.button === 2) {
            this.M_BUTTON_RIGHT = isPressed;
        }
    };
    MainControls.prototype.resetMousePosition = function () {
        this.M_INIT_X = 0;
        this.M_INIT_Y = 0;
        this.M_DELTA_X = 0;
        this.M_DELTA_Y = 0;
    };
    return MainControls;
}());
