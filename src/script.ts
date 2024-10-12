function togleeFolder(element) {
  const attributeName = "is_open"
  const currentValue = element.getAttribute(attributeName);
  if (currentValue === "true") {
    element.setAttribute(attributeName, "false");
  }
  else {
    element.setAttribute(attributeName, "true");
  }
}
