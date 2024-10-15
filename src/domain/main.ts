function initNewProject() {
  current_project = base_json_template 
}

function buildTag(component_json) {
  if (typeof component_json === "string")
    return component_json;
  const tag_name = component_json.tag
  const tag_props = (component_json.props)? component_json.props.map(it => `${it.name}=${it.value}`).join(" ") : "";
  const tag_content = 
    (component_json.content)?
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
//
initNewProject();
console.log(buildProject());
