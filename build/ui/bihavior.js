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
    template.setAttribute(generateSlug());
    listProps.appendChild(template);
}
function addPropertieCSS() {
    var listProps = document.getElementById("list_props_css");
    var template = document.getElementById("item_prop_template").cloneNode(true);
    template.removeAttribute("visible");
    template.setAttribute(generateSlug());
    listProps.appendChild(template);
}
function removeElement(element) {
    var item = element.parentNode;
    if (item) {
        item.remove();
    }
}
