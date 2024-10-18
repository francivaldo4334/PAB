"use strict";
var Move = /** @class */ (function () {
    function Move(controls, projectHistory) {
        this.drawPosition = document.getElementById("project_draw_position");
        this.drawRect = document.getElementById("project_draw_rect");
        this.controls = controls;
        this.projectHistory = projectHistory;
    }
    Move.prototype.setPositionDraw = function (x, y) {
        if (this.drawPosition) {
            this.drawPosition.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
        }
    };
    Move.prototype.setPositionProject = function (x, y) {
        if (this.projectHistory.current_project) {
            if (this.projectHistory.current_project.position) {
                this.projectHistory.current_project.position.x = x;
                this.projectHistory.current_project.position.y = y;
            }
        }
    };
    Move.prototype.calcPositionCursorX = function (x) {
        var _a;
        var rect = (_a = this.drawPosition) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        return x - (rect ? rect.left : 0);
    };
    Move.prototype.calcPositionCursorY = function (y) {
        var _a;
        var rect = (_a = this.drawPosition) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        return y - (rect ? rect.top : 0);
    };
    Move.prototype.moveProject = function (e) {
        var _a;
        var rect = (_a = this.drawRect) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var isInside = rect &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
        if (this.controls.M_BUTTON_LEFT && isInside) {
            if (this.projectHistory.current_project) {
                if (this.projectHistory.current_project.position) {
                    this.setPositionDraw(this.projectHistory.current_project.position.x +
                        this.controls.M_DELTA_X, this.projectHistory.current_project.position.y +
                        this.controls.M_DELTA_Y);
                }
            }
        }
    };
    Move.prototype.moveProjectOnOneDirection = function (e) {
        var updateJumpScrollMove = this.controls.SCROLL_STATE === "UP"
            ? this.controls.JUMP_SCROLL_MOVE
            : -this.controls.JUMP_SCROLL_MOVE;
        if (this.projectHistory.current_project) {
            if (this.projectHistory.current_project.position) {
                if (e.shiftKey) {
                    this.setPositionDraw(this.projectHistory.current_project.position.x +
                        updateJumpScrollMove, this.projectHistory.current_project.position.y);
                    this.setPositionProject(this.projectHistory.current_project.position.x +
                        updateJumpScrollMove, this.projectHistory.current_project.position.y);
                }
                else {
                    this.setPositionDraw(this.projectHistory.current_project.position.x, this.projectHistory.current_project.position.y +
                        updateJumpScrollMove);
                    this.setPositionProject(this.projectHistory.current_project.position.x, this.projectHistory.current_project.position.y +
                        updateJumpScrollMove);
                }
            }
        }
    };
    Move.prototype.finishMove = function () {
        if (this.projectHistory.current_project) {
            if (this.projectHistory.current_project.position) {
                this.setPositionProject(this.projectHistory.current_project.position.x +
                    this.controls.M_DELTA_X, this.projectHistory.current_project.position.y +
                    this.controls.M_DELTA_Y);
            }
        }
    };
    return Move;
}());
