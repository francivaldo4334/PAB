"use strict";
var currentKeybind = [];
var keymaps = {
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
function checkKeybind(map) {
    for (var key in map) {
        if (keydown[key]) {
            if (map[key].mode) {
                currentKeybind.push(key);
            }
            if (map[key].action) {
                map[key].action();
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
    if (currentKeybind.length > 0) {
        keyMode(keymaps, 0, e.key);
    }
    else {
        checkKeybind(keymaps);
    }
});
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closePopovers();
        currentKeybind = [];
    }
});
window.addEventListener("keydown", function (e) {
    e.preventDefault();
});
window.addEventListener("keyup", function (e) {
    e.preventDefault();
});
