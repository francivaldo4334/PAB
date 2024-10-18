"use strict";
var Modes = /** @class */ (function () {
    function Modes(controls) {
        this.body = document.querySelector("body");
        this.selectionBox = controls.selectionBox;
        this.actions = controls.actions;
        this.zoom = controls.zoom;
    }
    Modes.prototype.onSelectionModeActionsKeyDown = function (e) {
        if (e.shiftKey && this.body) {
            this.body.setAttribute("selected", "move-h");
        }
        if (e.key === " " && !this.selectionBox.isSelecting) {
            this.actions.setMoveMode();
        }
        if (e.ctrlKey && !this.selectionBox.isSelecting) {
            this.actions.setZoomMode();
            this.zoom.initZoomMode();
        }
    };
    Modes.prototype.onActionsKeyUp = function (e) {
        decelAllElement();
        this.actions.setSelectionMode();
        e.preventDefault();
    };
    return Modes;
}());
