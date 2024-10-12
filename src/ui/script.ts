function toggleIsOpen(element) {
  const attributeName = "is_open"
  const currentValue = element.getAttribute(attributeName);
  if (currentValue === "true") {
    element.setAttribute(attributeName, "false");
  }
  else {
    element.setAttribute(attributeName, "true");
  }
}

function addPropertieHTML() {
  const listProps = document.getElementById("list_props_html")
  const template = document.getElementById("item_prop_template").cloneNode(true);
  template.removeAttribute("visible")
  template.removeAttribute("id")
  listProps.appendChild(template);
}

function addPropertieCSS() {
  const listProps = document.getElementById("list_props_css")
  const template = document.getElementById("item_prop_template").cloneNode(true);
  template.removeAttribute("visible")
  template.removeAttribute("id")
  listProps.appendChild(template);
}

function removeElement(element) {
  let item = element.parentNode; 
  if (item) {
    item.remove(); 
  }
}
