function initNewProject() {
  current_project = base_json_template 
}

function buildTag(component_json, mode_prod=false) {
  if (typeof component_json === "string")
    return component_json;
  const is_tag_body = mode_prod && component_json.tag === "body";
  const tag_name = (is_tag_body)? "div" : component_json.tag
  const tag_props = (component_json.props)? component_json.props.map(it => `${it.name}="${it.value}"`).join(" ") : "";
  const tag_content = (component_json.content)?
      (!Array.isArray(component_json.content))? component_json.content
      : component_json.content.map(it => buildTag(it)).join("")
    : "";
  return `<${tag_name} ${tag_props}>${tag_content}</${tag_name}>`
}

function buildProject() {
  let builded_project = "<!DOCTYPE html>";
  builded_project += buildTag(current_project)   
  return builded_project
}

function exportProject() {
  initNewProject();
  const blob = new Blob([buildProject()], {type: "text/html"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my_project.html";
  link.click();
  URL.revokeObjectURL(link.href);
  console.log();
}

initNewProject();
const my_body = document.getElementById("project_draw");
my_body.innerHTML = buildTag(current_project.content[1], true);
