"use strict";
var currentKeybind = [];
var keymaps = {
    Control: {
        action: function () {
            setMoveMode();
        }
    },
    Insert: {
        mode: true,
        f: {
            action: function () {
                addNewElement("FRAME");
            }
        },
        action: function () {
            openMenuNewElement();
        },
        s: {
            mode: true,
            c: {
                action: function () {
                    addNewElement("OVAL");
                }
            },
            r: {
                action: function () {
                    addNewElement("RECT");
                }
            },
            i: {
                action: function () {
                    addNewElement("IMAGE");
                }
            }
        }
    },
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
                checkKeybind(map[key]);
            }
        }
    }
}
function keyMode(map, index, key) {
    if (map[key] && map[key].mode) {
        currentKeybind.push(key);
    }
    if (map[key] && map[key].action) {
        map[key].action();
    }
    if (index < currentKeybind.length) {
        var keyMap = currentKeybind[index];
        keyMode(map[keyMap], index + 1, key);
        return;
    }
    if (map[key] && map[key].action) {
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
