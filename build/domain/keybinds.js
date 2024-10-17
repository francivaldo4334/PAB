"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var currentKeybind = [];
function isKeybind(obj) {
    return (typeof obj.action === "undefined" ||
        (typeof obj.action === "function" && typeof obj.mode === "undefined") ||
        typeof obj.mode === "boolean");
}
function isRecordOfObject(variable) {
    return (typeof variable === "object" &&
        variable !== null &&
        !Array.isArray(variable) &&
        Object.values(variable).every(function (value) { return typeof value === "object" && value !== null; }));
}
var newElement = {
    f: {
        action: function () {
            addNewElement("FRAME");
        },
    },
    action: function () {
        openMenuNewElement();
    },
    c: {
        action: function () {
            addNewElement("OVAL");
        },
    },
    r: {
        action: function () {
            addNewElement("RECT");
        },
    },
    i: {
        action: function () {
            addNewElement("IMAGE");
        },
    },
};
var keymaps = {
    Control: {
        n: __assign({ mode: true }, newElement),
    },
    Insert: __assign({ mode: true }, newElement),
};
var keydown = {};
window.addEventListener("keydown", function (e) {
    keydown[e.key] = true;
});
window.addEventListener("keyup", function (e) {
    keydown[e.key] = false;
});
function checkKeybind(map, event) {
    if (isRecordOfObject(map)) {
        for (var key in map) {
            if (keydown[key] && isKeybind(map)) {
                if (map.action && typeof map.action === "function") {
                    map.action();
                    event.preventDefault();
                }
                if (map.mode) {
                    currentKeybind.push(key);
                }
            }
            if (isRecordOfObject(map[key])) {
                checkKeybind(map[key], event);
            }
        }
    }
    else {
        checkKeybind(map, event);
    }
}
function keyMode(map, index, key) {
    var cleanKeybind = false;
    if (isKeybind(map)) {
        if (map.action && typeof map.action === "function") {
            map.action();
            cleanKeybind = true;
        }
        if (map.mode) {
            currentKeybind.push(key);
        }
    }
    if (index < currentKeybind.length) {
        var keyMap = currentKeybind[index];
        if (isRecordOfObject(map[keyMap])) {
            keyMode(map[keyMap], index + 1, key);
        }
    }
    if (cleanKeybind) {
        currentKeybind = [];
    }
}
window.addEventListener("keydown", function (e) {
    if (e.key === "F5") {
        return;
    }
    if (currentKeybind.length > 0) {
        keyMode(keymaps, 0, e.key);
    }
    else {
        checkKeybind(keymaps, e);
    }
});
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeMenuNewElement();
        closePopovers();
        currentKeybind = [];
    }
});
