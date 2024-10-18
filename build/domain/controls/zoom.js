"use strict";
var Zoom = /** @class */ (function () {
    function Zoom(controls, projectHistory) {
        this.draw = document.getElementById("project_draw");
        this.MIN_ZOOM = 0.1;
        this.MAX_ZOOM = 3.0;
        this.NORMAL_SCALE = 1.0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.controls = controls;
        this.projectHistory = projectHistory;
    }
    Zoom.prototype.getReverseScale = function () {
        return this.NORMAL_SCALE - this.getScale();
    };
    Zoom.prototype.updatePositionWithScale = function () {
        var move = this.controls.move;
        var reverseScale = this.getReverseScale();
        move.setPositionDrawWithCurrentPosition(this.deltaX * reverseScale, this.deltaY * reverseScale);
    };
    Zoom.prototype.setScaleDraw = function (scale) {
        if (this.draw) {
            if (scale < this.MAX_ZOOM && scale > this.MIN_ZOOM) {
                this.draw.style.scale = String(scale);
                // this.updatePositionWithScale();
            }
        }
    };
    Zoom.prototype.initZoomMode = function () {
        var _a = this.controls, move = _a.move, M_X = _a.M_X, M_Y = _a.M_Y;
        this.deltaX = M_X - move.getPositionDrawX();
        this.deltaY = M_Y - move.getPositionDrawY();
    };
    Zoom.prototype.setScaleProject = function (scale) {
        if (this.projectHistory.current_project && scale < 3.0 && scale > 0.1) {
            this.projectHistory.current_project.zoom = scale;
        }
    };
    Zoom.prototype.getScale = function () {
        var _a;
        var project = this.projectHistory.current_project;
        return (_a = project === null || project === void 0 ? void 0 : project.zoom) !== null && _a !== void 0 ? _a : this.NORMAL_SCALE;
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
