"use strict";
function openMenuFile() {
    console.log("TODO");
}
function openRecentProjects() {
    console.log("TODO");
}
function openMenuNewElement() {
    var menuNewElement = document.getElementById("menu_new_element");
    toggleIsOpen(menuNewElement);
}
function closeMenuNewElement() {
    var menuNewElement = document.getElementById("menu_new_element");
    toggleIsOpen(menuNewElement);
}
function addNewElement(type) {
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
    closeMenuNewElement();
}
function setMoveMode() {
    console.log("TODO");
}
function setZoomMode() {
    console.log("TODO");
}
function openMenuPlugins() {
    console.log("TODO");
}
function openFolder(path) {
    console.log("TODO");
}
function setEditMode(mode) {
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
}
function addNewProp(type) {
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
}
function removePropretie(prop_id) {
    var prop = document.getElementById(prop_id);
    removeUiPropretie(prop);
}
