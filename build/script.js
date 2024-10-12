"use strict";
function togleeFolder(element) {
    var attributeName = "is_open";
    var currentValue = element.getAttribute(attributeName);
    if (currentValue === "true") {
        element.setAttribute(attributeName, "false");
    }
    else {
        element.setAttribute(attributeName, "true");
    }
}
