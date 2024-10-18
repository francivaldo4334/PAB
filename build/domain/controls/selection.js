"use strict";
var SelectionBox = /** @class */ (function () {
    function SelectionBox(controls, move) {
        this.isSelecting = false;
        this.selectionBox = document.getElementById("selection_box");
        this.selectionBoxX = 0;
        this.selectionBoxY = 0;
        this.controls = controls;
        this.move = move;
    }
    SelectionBox.prototype.initSelectionBox = function () {
        if (this.selectionBox) {
            this.isSelecting = true;
            this.selectionBoxX = this.move.calcPositionCursorX(this.controls.M_INIT_X);
            this.selectionBoxY = this.move.calcPositionCursorY(this.controls.M_INIT_Y);
            this.selectionBox.style.left = "".concat(this.selectionBoxX);
            this.selectionBox.style.top = "".concat(this.selectionBoxY);
            this.selectionBox.style.width = "0px";
            this.selectionBox.style.height = "0px";
            this.selectionBox.style.display = "block";
        }
    };
    SelectionBox.prototype.updateSelectionBox = function () {
        if (this.selectionBox && this.isSelecting) {
            var currentX = this.move.calcPositionCursorX(this.controls.M_X);
            var currentY = this.move.calcPositionCursorY(this.controls.M_Y);
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
        if (this.isSelecting && !this.controls.M_BUTTON_LEFT && this.selectionBox) {
            this.selectionBox.style.display = "none";
            this.isSelecting = false;
        }
    };
    return SelectionBox;
}());
