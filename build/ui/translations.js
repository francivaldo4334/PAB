"use strict";
var translations = {
    en: {
        project_name: "Project Name",
        user_name: "Username",
        html: "Html",
        css: "Css",
        javascript: "javascript",
        assets: "Assets",
        design: "Design",
        prototype: "Prototype",
    },
    pt_br: {
        project_name: "Nome do Projeto",
        user_name: "Nome de usuário",
        html: "Html",
        css: "Css",
        javascript: "javascript",
        assets: "Assets",
        design: "Design",
        prototype: "Prototipo",
    },
};
function setLanguage(lang) {
    var dataElements = Array.from(document.querySelectorAll("[data-translate]"));
    if (dataElements) {
        for (var _i = 0, dataElements_1 = dataElements; _i < dataElements_1.length; _i++) {
            var element = dataElements_1[_i];
            var key = element.getAttribute("data-translate");
            if (key && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        }
    }
}
setLanguage("pt_br");
