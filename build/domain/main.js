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
var Main = /** @class */ (function () {
    function Main() {
        this.common = new Common();
        this.actions = new Actions();
        this.keybinds = new Keybinds(this.actions);
        this.projectHistory = new ProjectHistory();
        this.controls = new MainControls(this.actions, this.projectHistory);
        this.initNewProject();
        var my_body = document.getElementById("project_draw");
        if (this.projectHistory.current_project &&
            this.projectHistory.current_project.content.length > 1) {
            my_body.innerHTML = this.buildTag(this.projectHistory.current_project.content[1], true);
        }
    }
    Main.prototype.initNewProject = function () {
        this.projectHistory.updateText(this.common.base_json_template);
    };
    Main.prototype.updateCssProp = function (cssStr, prop, value) {
        var regex = new RegExp("".concat(prop, ":\\s*[^;]+;"));
        var newProp = "".concat(prop, ": ").concat(value, ";");
        return cssStr.match(regex)
            ? cssStr.replace(regex, newProp)
            : "".concat(cssStr, " ").concat(newProp);
    };
    Main.prototype.buildTag = function (_component_json, mode_prod) {
        var _this = this;
        if (mode_prod === void 0) { mode_prod = false; }
        var component_json = _component_json;
        if (typeof component_json === "string")
            return component_json;
        var comp = __assign({}, this.common.base_view_body);
        var is_tag_comp = mode_prod && component_json.tag === "body";
        if (is_tag_comp) {
            var prop_style_1 = comp.props.find(function (it) { return it.name === "style"; });
            comp.props =
                component_json.props && component_json.props.length > 0
                    ? component_json.props.map(function (it) {
                        if (it.name === "style" && prop_style_1) {
                            return { name: "style", value: prop_style_1.value + it.value };
                        }
                        return it;
                    })
                    : comp.props;
            comp.content = component_json.content;
        }
        else {
            comp = component_json;
        }
        var tag_name = comp.tag;
        var tag_props = comp.props
            ? comp.props
                .map(function (it) { return "".concat(it.name, "=\"").concat(it.value, "\""); })
                .join(" ")
            : "";
        var tag_content = comp.content
            ? !Array.isArray(comp.content)
                ? comp.content
                : comp.content.map(function (it) { return _this.buildTag(it); }).join("")
            : "";
        return "<".concat(tag_name, " ").concat(tag_props, ">").concat(tag_content, "</").concat(tag_name, ">");
    };
    Main.prototype.buildProject = function () {
        var builded_project = "<!DOCTYPE html>";
        if (this.projectHistory.current_project) {
            builded_project += this.buildTag(this.projectHistory.current_project);
        }
        return builded_project;
    };
    Main.prototype.exportProject = function () {
        this.initNewProject();
        var blob = new Blob([this.buildProject()], { type: "text/html" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "my_project.html";
        link.click();
        URL.revokeObjectURL(link.href);
    };
    return Main;
}());
var main = new Main();
