function generateSlug() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

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
  template.removeAttribute("visible");
  template.setAttribute("id",generateSlug());
  listProps.appendChild(template);
}

function addPropertieCSS() {
  const listProps = document.getElementById("list_props_css")
  const template = document.getElementById("item_prop_template").cloneNode(true);
  template.removeAttribute("visible");
  template.setAttribute("id",generateSlug());
  listProps.appendChild(template);
}

function removeUiPropretie(element) {
  if (element) {
    element.remove(); 
  }
}

document.addEventListener('click', (e) => {
  const element = document.querySelector(".popover");
  if (element && !element.contains(e.target)) {
    element.setAttribute("is_open", "false");
  }
});
