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
function initNewProject() {
    current_project = base_json_template;
}
function buildTag(component_json, mode_prod) {
    if (mode_prod === void 0) { mode_prod = false; }
    if (typeof component_json === "string")
        return component_json;
    var comp = __assign({}, base_view_body);
    var is_tag_comp = mode_prod && component_json.tag === "body";
    if (is_tag_comp) {
        var prop_style_1 = comp.props.find(function (it) { return it.name === "style"; });
        comp.props = (component_json.props && component_json.props.length > 0) ? component_json.props.map(function (it) {
            if (it.name === "style") {
                return { "name": "style", "value": prop_style_1.value + it.value };
            }
            return it;
        }) : comp.props;
        comp.content = component_json.content;
    }
    else {
        comp = component_json;
    }
    var tag_name = comp.tag;
    var tag_props = (comp.props) ? comp.props.map(function (it) { return "".concat(it.name, "=\"").concat(it.value, "\""); }).join(" ") : "";
    var tag_content = (comp.content) ?
        (!Array.isArray(comp.content)) ? comp.content
            : comp.content.map(function (it) { return buildTag(it); }).join("")
        : "";
    return "<".concat(tag_name, " ").concat(tag_props, ">").concat(tag_content, "</").concat(tag_name, ">");
}
function buildProject() {
    var builded_project = "<!DOCTYPE html>";
    builded_project += buildTag(current_project);
    return builded_project;
}
function exportProject() {
    initNewProject();
    var blob = new Blob([buildProject()], { type: "text/html" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_project.html";
    link.click();
    URL.revokeObjectURL(link.href);
    console.log();
}
initNewProject();
var my_body = document.getElementById("project_draw");
my_body.innerHTML = buildTag(current_project.content[1], true);
