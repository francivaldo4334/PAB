"use strict";
function initNewProject() {
    current_project = base_json_template;
}
function buildTag(component_json) {
    if (typeof component_json === "string")
        return component_json;
    var tag_name = component_json.tag;
    var tag_props = (component_json.props) ? component_json.props.map(function (it) { return "".concat(it.name, "=").concat(it.value); }).join(" ") : "";
    var tag_content = (component_json.content) ?
        (!Array.isArray(component_json.content)) ? component_json.content
            : component_json.content.map(function (it) { return buildTag(it); }).join("")
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
