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
        var regex = new RegExp("".concat(prop, ":\\s*[^;]+;"), "g");
        var newProp = "".concat(prop, ": ").concat(value, ";");
        return regex.test(cssStr)
            ? cssStr.replace(regex, newProp)
            : "".concat(cssStr, " ").concat(newProp);
    };
    Main.prototype.getProp = function (props, name) {
        return props.find(function (it) { return it.name === name; });
    };
    Main.prototype.addProp = function (props, prop) {
        return props.map(function (it) {
            if (it.name === prop.name) {
                return prop;
            }
            return it;
        });
    };
    Main.prototype.buildBodyRenderMode = function (component) {
        var _this = this;
        var _a, _b;
        var baseBodyTemplate = __assign({}, this.common.base_view_body);
        var baseBodyTemplateStyle = this.getProp(baseBodyTemplate.props, "style");
        var componentStyle = this.getProp(component.props, "style");
        var newStyle = (_a = componentStyle === null || componentStyle === void 0 ? void 0 : componentStyle.value) !== null && _a !== void 0 ? _a : "";
        newStyle += (_b = baseBodyTemplateStyle === null || baseBodyTemplateStyle === void 0 ? void 0 : baseBodyTemplateStyle.value) !== null && _b !== void 0 ? _b : "";
        this.updateCssProp(newStyle, "");
        comp.props =
            component_json.props && component_json.props.length > 0
                ? component_json.props.map(function (it) {
                    if (it.name === "style" && prop_style) {
                        var newStyle_1 = prop_style.value + it.value;
                        return { name: "style", value: newStyle_1 };
                    }
                    return it;
                })
                : comp.props;
        comp.props = comp.props.map(function (it) {
            if (it.name === "style") {
                var newStyle_2 = it.value;
                if (comp.position) {
                    newStyle_2 = _this.updateCssProp(newStyle_2, "left", String(comp.position.x));
                    newStyle_2 = _this.updateCssProp(newStyle_2, "top", String(comp.position.y));
                }
                return { name: "style", value: newStyle_2 };
            }
            return it;
        });
        comp.content = component_json.content;
    };
    Main.prototype.propsTosString = function (props) {
        return comp.props
            ? comp.props.map(function (it) { return "".concat(it.name, "=\"").concat(it.value, "\""); }).join(" ")
            : "";
    };
    Main.prototype.generateTag = function (component) {
        var _this = this;
        var TAG = component.tag;
        var PROPS = this.propsTosString(component.props);
        var INNER = component.content
            ? !Array.isArray(component.content)
                ? component.content
                : component.content.map(function (it) { return _this.buildTag(it); }).join("\n")
            : "";
        return "<".concat(tag_name, " ").concat(tag_props, ">").concat(tag_content, "</").concat(tag_name, ">");
    };
    Main.prototype.buildTag = function (content, renderMode) {
        if (renderMode === void 0) { renderMode = false; }
        if (typeof content === "string")
            return content;
        var component = content;
        var is_tag_comp = mode_prod && component_json.tag === "body";
        if (renderMode && compo) {
            component = buildBodyRenderMode(component);
        }
        return this.generateTag(component);
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
        link.download = "index.html";
        link.click();
        URL.revokeObjectURL(link.href);
    };
    return Main;
}());
var main = new Main();
