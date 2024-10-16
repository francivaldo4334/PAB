"use strict";
function generateSlug() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function toggleIsOpen(element) {
    var attributeName = "is_open";
    var currentValue = element.getAttribute(attributeName);
    if (currentValue === "true") {
        element.setAttribute(attributeName, "false");
    }
    else {
        element.setAttribute(attributeName, "true");
    }
}
function selectElement(element) {
    decelAllElement();
    element.setAttribute("selected", "true");
}
function decelAllElement() {
    var elementsSelections = Array.from(document.querySelectorAll(".selection"));
    for (var _i = 0, elementsSelections_1 = elementsSelections; _i < elementsSelections_1.length; _i++) {
        var it = elementsSelections_1[_i];
        decelElement(it);
    }
}
function decelElement(element) {
    element.setAttribute("selected", "false");
}
function addPropertieHTML() {
    var _a;
    var listProps = document.getElementById("list_props_html");
    var template = (_a = document
        .getElementById("item_prop_template")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    if (template && listProps) {
        template.removeAttribute("visible");
        template.setAttribute("id", generateSlug());
        listProps.appendChild(template);
    }
}
function addPropertieCSS() {
    var _a;
    var listProps = document.getElementById("list_props_css");
    var template = (_a = document
        .getElementById("item_prop_template")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    if (template && listProps) {
        template.removeAttribute("visible");
        template.setAttribute("id", generateSlug());
        listProps.appendChild(template);
    }
}
function removeUiPropretie(element) {
    if (element) {
        element.remove();
    }
}
function closePopovers() {
    var element = document.querySelector(".popover");
    if (element) {
        element.setAttribute("is_open", "false");
    }
}
document.addEventListener("click", function (e) {
    var element = document.querySelector(".popover");
    if (element && e.target instanceof Node && !element.contains(e.target)) {
        closeMenuNewElement();
        closePopovers();
    }
});
