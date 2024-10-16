type Translations = {
	en: Record<string, string>;
	pt_br: Record<string, string>;
};

const translations: Translations = {
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

function setLanguage(lang: "en" | "pt_br") {
	const dataElements = Array.from(
		document.querySelectorAll<HTMLElement>("[data-translate]"),
	);
	if (dataElements) {
		for (const element of dataElements) {
			const key = element.getAttribute("data-translate");
			if (key && translations[lang][key]) {
				element.textContent = translations[lang][key];
			}
		}
	}
}

setLanguage("pt_br");
