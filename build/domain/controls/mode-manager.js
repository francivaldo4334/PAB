"use strict";
var Modes = /** @class */ (function () {
    function Modes(selectionBox, actions) {
        this.body = document.querySelector("body");
        this.selectionBox = selectionBox;
        this.actions = actions;
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
        }
    };
    Modes.prototype.onActionsKeyUp = function (e) {
        decelAllElement();
        this.actions.setSelectionMode();
        e.preventDefault();
    };
    return Modes;
}());
