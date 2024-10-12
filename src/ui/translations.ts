const translations = {
  en: {
    project_name: "Project Name",
    user_name: "Username",
    html: "Html",
    css: "Css",
    javascript: "javascript",
    assets: "Assets",
    design: "Design",
    prototype: "Prototype"
  },
  pt_br: {
    project_name: "Nome do Projeto",
    user_name: "Nome de usuário",
    html: "Html",
    css: "Css",
    javascript: "javascript",
    assets: "Assets",
    design: "Design",
    prototype: "Prototipo"
  }
}
function setLanguate(lang) {
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    element.textContent = translations[lang][key];
  });
}
setLanguate("pt_br")
