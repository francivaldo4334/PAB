"use strict";
var SelectionBox = /** @class */ (function () {
    function SelectionBox() {
        this.isSelecting = false;
        this.selectionBoxX = 0;
        this.selectionBoxY = 0;
        this.selectionBox = document.getElementById("selection_box");
    }
    SelectionBox.prototype.actionsSelectionModeMouseDown = function (event) {
        this.initSelectionBox();
        event.preventDefault();
    };
    SelectionBox.prototype.actionsSelectionModeMouseUp = function () {
        if (this.isSelecting && !M_BUTTON_LEFT) {
            this.finishSelectionBox();
        }
    };
    SelectionBox.prototype.actionsSelectionModeMouseMove = function () {
        if (this.isSelecting) {
            this.updateSelectionBox();
        }
    };
    SelectionBox.prototype.actionsSelectionModeWheel = function () {
        if (this.isSelecting) {
            this.updateSelectionBox();
        }
    };
    SelectionBox.prototype.initSelectionBox = function () {
        if (this.selectionBox) {
            this.isSelecting = true;
            this.selectionBoxX = calcPositionCursorX(M_INIT_X);
            this.selectionBoxY = calcPositionCursorY(M_INIT_Y);
            this.selectionBox.style.left = "".concat(this.selectionBoxX);
            this.selectionBox.style.top = "".concat(this.selectionBoxY);
            this.selectionBox.style.width = "0px";
            this.selectionBox.style.height = "0px";
            this.selectionBox.style.display = "block";
        }
    };
    SelectionBox.prototype.updateSelectionBox = function () {
        if (this.selectionBox) {
            var currentX = calcPositionCursorX(M_X);
            var currentY = calcPositionCursorY(M_Y);
            var width = Math.abs(currentX - this.selectionBoxX);
            var height = Math.abs(currentY - this.selectionBoxY);
            var x = Math.min(currentX, this.selectionBoxX);
            var y = Math.min(currentY, this.selectionBoxY);
            this.selectionBox.style.left = "".concat(x, "px");
            this.selectionBox.style.top = "".concat(y, "px");
            this.selectionBox.style.width = "".concat(width, "px");
            this.selectionBox.style.height = "".concat(height, "px");
        }
    };
    SelectionBox.prototype.finishSelectionBox = function () {
        if (this.selectionBox) {
            this.selectionBox.style.display = "none";
            this.isSelecting = false;
        }
    };
    return SelectionBox;
}());
