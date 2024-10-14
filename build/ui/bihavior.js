"use strict";
function generateSlug() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
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
function addPropertieHTML() {
    var listProps = document.getElementById("list_props_html");
    var template = document.getElementById("item_prop_template").cloneNode(true);
    template.removeAttribute("visible");
    template.setAttribute("id", generateSlug());
    listProps.appendChild(template);
}
function addPropertieCSS() {
    var listProps = document.getElementById("list_props_css");
    var template = document.getElementById("item_prop_template").cloneNode(true);
    template.removeAttribute("visible");
    template.setAttribute("id", generateSlug());
    listProps.appendChild(template);
}
function removeUiPropretie(element) {
    if (element) {
        element.remove();
    }
}
function closePopovers(e) {
    var element = document.querySelector(".popover");
    if (element) {
        element.setAttribute("is_open", "false");
    }
}
document.addEventListener('click', function (e) {
    var element = document.querySelector(".popover");
    if (element && !element.contains(e.target)) {
        closePopovers();
    }
});
