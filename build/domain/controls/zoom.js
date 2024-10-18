"use strict";
var Zoom = /** @class */ (function () {
    function Zoom(controls, projectHistory) {
        this.draw = document.getElementById("project_draw");
        this.controls = controls;
        this.projectHistory = projectHistory;
    }
    Zoom.prototype.setScaleDraw = function (scale) {
        if (this.draw) {
            if (scale < 3.0 && scale > 0.1) {
                this.draw.style.scale = String(scale);
            }
        }
    };
    Zoom.prototype.setScaleProject = function (scale) {
        if (this.projectHistory.current_project && scale < 3.0 && scale > 0.1) {
            this.projectHistory.current_project.zoom = scale;
        }
    };
    Zoom.prototype.getScale = function () {
        if (this.projectHistory.current_project) {
            if (this.projectHistory.current_project.zoom) {
                return this.projectHistory.current_project.zoom;
            }
        }
        return 1;
    };
    Zoom.prototype.updateZoomState = function () {
        var scaleJump = this.controls.SCROLL_STATE === "UP"
            ? this.controls.SCALE_JUMP
            : -this.controls.SCALE_JUMP;
        var newScle = this.getScale() + scaleJump;
        this.setScaleDraw(newScle);
        this.setScaleProject(newScle);
    };
    return Zoom;
}());
