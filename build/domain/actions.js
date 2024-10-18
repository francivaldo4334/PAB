"use strict";
var Actions = /** @class */ (function () {
    function Actions() {
        this.EDIT_MODE = "SELECTION";
        this.projectDrawScope = document.getElementById("project_draw_rect");
    }
    Actions.prototype.openMenuFile = function () {
        console.log("TODO");
    };
    Actions.prototype.openRecentProjects = function () {
        console.log("TODO");
    };
    Actions.prototype.openMenuNewElement = function () {
        var menuNewElement = document.getElementById("menu_new_element");
        if (menuNewElement) {
            selectElement(menuNewElement);
            toggleIsOpen(menuNewElement);
        }
    };
    Actions.prototype.closeMenuNewElement = function () {
        var menuNewElement = document.getElementById("menu_new_element");
        if (menuNewElement) {
            decelElement(menuNewElement);
            toggleIsOpen(menuNewElement);
        }
    };
    Actions.prototype.addNewElement = function (type) {
        switch (type) {
            case "OVAL":
                console.log("TODO");
                break;
            case "RECT":
                console.log("TODO");
                break;
            case "FRAME":
                console.log("TODO");
                break;
            case "IMAGE":
                console.log("TODO");
                break;
            default:
                break;
        }
        this.closeMenuNewElement();
    };
    Actions.prototype.setSelectionMode = function () {
        var btnMode = document.getElementById("btn_selection_mode");
        if (btnMode) {
            selectElement(btnMode);
            this.EDIT_MODE = "SELECTION";
        }
    };
    Actions.prototype.setMoveMode = function () {
        var btnMode = document.getElementById("btn_move_mode");
        if (btnMode && this.projectDrawScope) {
            selectElement(btnMode);
            this.EDIT_MODE = "MOVE";
            this.projectDrawScope.setAttribute("selected", "move");
        }
    };
    Actions.prototype.setZoomMode = function () {
        var btnMode = document.getElementById("btn_zoom_mode");
        if (btnMode && this.projectDrawScope) {
            selectElement(btnMode);
            this.EDIT_MODE = "ZOOM";
            this.projectDrawScope.setAttribute("selected", "zoom");
        }
    };
    Actions.prototype.openMenuPlugins = function () {
        var btnMode = document.getElementById("btn_plugin");
        if (btnMode) {
            selectElement(btnMode);
        }
    };
    Actions.prototype.openFolder = function (path) {
        console.log("TODO");
    };
    Actions.prototype.setEditMode = function (mode) {
        switch (mode) {
            case "DESIGN":
                console.log("TODO");
                break;
            case "PROTOTYPE":
                console.log("TODO");
                break;
            default:
                break;
        }
    };
    Actions.prototype.addNewProp = function (type) {
        switch (type) {
            case "HTML":
                addPropertieHTML();
                break;
            case "CSS":
                addPropertieCSS();
                break;
            default:
                break;
        }
    };
    Actions.prototype.removePropretie = function (prop_id) {
        var prop = document.getElementById(prop_id);
        if (prop) {
            removeUiPropretie(prop);
        }
    };
    return Actions;
}());
