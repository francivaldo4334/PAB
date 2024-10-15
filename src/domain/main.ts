function initNewProject() {
  current_project = base_json_template 
}

function buildTag(component_json, mode_prod=false) {
  if (typeof component_json === "string")
    return component_json;
  let comp = {...base_view_body}
  const is_tag_comp = mode_prod && component_json.tag === "body";
  if (is_tag_comp){
    const prop_style = comp.props.find(it => it.name === "style");

    comp.props = (component_json.props && component_json.props.length > 0) ? component_json.props.map(it => {
      if (it.name === "style") {
        return {"name": "style","value": prop_style.value + it.value}
      }
      return it
    }): comp.props;
    comp.content = component_json.content;
  }
  else {
    comp = component_json
  }
  const tag_name = comp.tag
  const tag_props = (comp.props)? comp.props.map(it => `${it.name}="${it.value}"`).join(" ") : "";
  const tag_content = (comp.content)?
      (!Array.isArray(comp.content))? comp.content
      : comp.content.map(it => buildTag(it)).join("")
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
