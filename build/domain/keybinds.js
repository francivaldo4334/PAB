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
var Keybinds = /** @class */ (function () {
    function Keybinds(actions) {
        var _this = this;
        this.currentKeybind = [];
        this.newElement = {
            action: function () {
                _this.actions.openMenuNewElement();
            },
            f: {
                action: function () {
                    _this.actions.addNewElement("FRAME");
                },
            },
            c: {
                action: function () {
                    _this.actions.addNewElement("OVAL");
                },
            },
            r: {
                action: function () {
                    _this.actions.addNewElement("RECT");
                },
            },
            i: {
                action: function () {
                    _this.actions.addNewElement("IMAGE");
                },
            },
        };
        this.keymaps = {
            Control: {
                n: __assign({ mode: true }, this.newElement),
            },
            Insert: __assign({ mode: true }, this.newElement),
        };
        this.keydown = {};
        this.actions = actions;
        this.addEventListener();
    }
    Keybinds.prototype.isKeybind = function (obj) {
        return (typeof obj.action === "undefined" ||
            (typeof obj.action === "function" && typeof obj.mode === "undefined") ||
            typeof obj.mode === "boolean");
    };
    Keybinds.prototype.isRecordOfObject = function (variable) {
        return (typeof variable === "object" &&
            variable !== null &&
            !Array.isArray(variable));
    };
    Keybinds.prototype.checkKeybind = function (map, event, thiskey) {
        if (thiskey === void 0) { thiskey = ""; }
        if (map.action && typeof map.action === "function") {
            map.action();
            event.preventDefault();
        }
        if (map.mode) {
            this.currentKeybind.push(thiskey);
        }
        if (this.isRecordOfObject(map)) {
            for (var key in map) {
                if (this.keydown[key]) {
                    this.checkKeybind(map[key], event, key);
                }
            }
        }
    };
    Keybinds.prototype.keyMode = function (map, index, key) {
        var cleanKeybind = false;
        if (this.isKeybind(map)) {
            if (map.action && typeof map.action === "function") {
                map.action();
                cleanKeybind = true;
            }
            if (map.mode) {
                this.currentKeybind.push(key);
            }
        }
        if (index < this.currentKeybind.length) {
            var keyMap = this.currentKeybind[index];
            if (this.isRecordOfObject(map[keyMap])) {
                this.keyMode(map[keyMap], index + 1, key);
            }
        }
        if (cleanKeybind) {
            this.currentKeybind = [];
        }
    };
    Keybinds.prototype.addEventListener = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            _this.keydown[e.key] = true;
        });
        window.addEventListener("keyup", function (e) {
            _this.keydown[e.key] = false;
        });
        window.addEventListener("keydown", function (e) {
            if (e.key === "F5") {
                return;
            }
            if (_this.currentKeybind.length > 0) {
                _this.keyMode(_this.keymaps, 0, e.key);
            }
            else {
                _this.checkKeybind(_this.keymaps, e);
            }
            if (e.key === "Escape") {
                _this.actions.closeMenuNewElement();
                closePopovers();
                _this.currentKeybind = [];
            }
        });
    };
    return Keybinds;
}());
