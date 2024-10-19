import { Translations, Common } from "./common";
class Translation {
	translations: Translations;
	constructor(common: Common, language: string) {
		this.translations = common.translations;
		this.setLanguage(language);
	}
	setLanguage(lang: string) {
		const dataElements = Array.from(
			document.querySelectorAll<HTMLElement>("[data-translate]"),
		);
		if (dataElements) {
			for (const element of dataElements) {
				const key = element.getAttribute("data-translate");
				if (key && this.translations[lang][key]) {
					element.textContent = this.translations[lang][key];
				}
			}
		}
	}
}

export default Translation;
