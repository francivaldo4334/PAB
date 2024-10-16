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
    for (var key in map) {
        if (keydown[key]) {
            if (map[key].mode) {
                currentKeybind.push(key);
            }
            if (map[key].action) {
                map[key].action();
                event.preventDefault();
            }
            else {
                checkKeybind(map[key], event);
            }
        }
    }
}
function keyMode(map, index, key) {
    if (key && map[key].mode) {
        currentKeybind.push(key);
    }
    if (key && map[key].action) {
        map[key].action();
    }
    if (index < currentKeybind.length) {
        var keyMap = currentKeybind[index];
        keyMode(map[keyMap], index + 1, key);
        return;
    }
    if (key && map[key].action) {
        currentKeybind = [];
    }
}
window.addEventListener("keydown", function (e) {
    if (e.key === "F5") {
        window.location.reload(e.ctrlKey);
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
