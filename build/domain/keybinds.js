"use strict";
var keymaps = {
    Control: {
        p: {
            action: function () {
                console.log("PRESS");
            }
        }
    }
};
var keydown = {};
var currentKeybind = {};
window.addEventListener("keydown", function (e) {
    keydown[e.key] = true;
});
window.addEventListener("keyup", function (e) {
    keydown[e.key] = false;
});
function checkKeybind(map, event) {
    for (var key in map) {
        console.log(key);
        if (keydown[key]) {
            console.log(typeof map[key]);
            if ("action" in map[key]) {
                map[key].action();
                event.preventDefault();
            }
            else {
                checkKeybind(map[key], event);
            }
        }
    }
}
window.addEventListener("keydown", function (e) {
    checkKeybind(keymaps, e);
});
