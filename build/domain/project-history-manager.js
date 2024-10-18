"use strict";
var ProjectHistory = /** @class */ (function () {
    function ProjectHistory() {
        this.past = [];
        this.future = [];
    }
    ProjectHistory.prototype.updateText = function (newText) {
        if (this.current_project) {
            this.past.push(this.current_project);
        }
        this.current_project = newText;
        this.future = [];
    };
    ProjectHistory.prototype.undo = function () {
        if (this.past.length > 0) {
            if (this.current_project) {
                this.future.push(this.current_project);
            }
            this.current_project = this.past.pop();
        }
    };
    ProjectHistory.prototype.redo = function () {
        if (this.future.length > 0) {
            if (this.current_project) {
                this.past.push(this.current_project);
            }
            this.current_project = this.future.pop();
        }
    };
    return ProjectHistory;
}());
