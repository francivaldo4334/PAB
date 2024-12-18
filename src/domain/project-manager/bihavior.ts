import { Common, Prop } from "../common";
import Main from "../main"
import { Utils } from "../utils";
import { MainProjectManager } from "./main";
class Bihavior {
	mainProjectManager: MainProjectManager;
	main: Main;
	constructor(mainProjectManager: MainProjectManager, main: Main) {
		this.mainProjectManager = mainProjectManager;
		this.main = main
		document.addEventListener("click", (e) => {
			const element = document.querySelector(".popover");
			if (element && e.target instanceof Node && !element.contains(e.target)) {
				mainProjectManager.actions.closeMenuNewElement();
				this.closePopovers();
			}
		});
	}
	toggleIsOpen(element: HTMLElement) {
		const currentValue = element.getAttribute("data-pab-project-is-open");
		if (currentValue === "true") {
			element.setAttribute("data-pab-project-is-open", "false");
		} else {
			element.setAttribute("data-pab-project-is-open", "true");
		}
	}
	selectElement(element: HTMLElement) {
		this.decelAllElement();
		element.setAttribute("data-pab-project-selected", "true");
	}
	decelAllElement() {
		const elementsSelections = Array.from(
			document.querySelectorAll<HTMLElement>(".selection"),
		);
		for (const it of elementsSelections) {
			this.decelElement(it);
		}
	}
	decelElement(element: HTMLElement) {
		element.setAttribute("data-pab-project-selected", "false");
	}
	newPropertie(prop?: Prop): HTMLElement | undefined {
		const template = document
			.getElementById("item_prop_template")
			?.cloneNode(true) as HTMLElement;
		if (template) {
			(template as HTMLElement).removeAttribute("data-pab-project-visible");
			(template as HTMLElement).setAttribute("id", prop?.id ?? Utils.generateSlug());
		}
		return template
	}
	loadPropertieInput(input: HTMLElement, listProps: string, prop?: Prop) {
		const jumpShort = 1;
		const jumpLoog = 10;
		const inputName = input.querySelector(`.data-pab-project-prop_input_name input`) as HTMLInputElement;
		const inputValue = input.querySelector(`.data-pab-project-prop_input_value input`) as HTMLInputElement;
		inputName?.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement
			this.mainProjectManager.setPropertyInSelectedComponent(prop?.id ?? input.id, "name", target.value, listProps)
		})
		inputValue?.addEventListener("keydown", event => {
			let value = inputValue.value.trim();
			let numericValue = parseFloat(value);
			if (!isNaN(numericValue)) {
				const jump = event.shiftKey ? jumpLoog : jumpShort;
				const newJump = (event.key === "ArrowUp") ? jump : (event.key === "ArrowDown") ? -jump : undefined;
				if (newJump) {
					numericValue += newJump;
					const unit = value.replace(/-?[0-9.]+/g, "").trim();
					inputValue.value = numericValue + unit;
					this.mainProjectManager.setPropertyInSelectedComponent(
						prop?.id ?? input.id,
						"value",
						inputValue.value,
						listProps
					);
				}
			}
		});
		inputValue?.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement
			this.mainProjectManager.setPropertyInSelectedComponent(prop?.id ?? input.id, "value", target.value, listProps)
		})
		if (prop) {
			inputName.value = prop.name;
			inputValue.value = prop.value;
		}
	}
	addPropertieHTML(_prop?: Prop) {
		const prop: Prop | undefined = _prop ? { ..._prop, id: _prop.id ?? Utils.generateSlug() } : undefined
		const listProps = document.getElementById("list_props_html");
		const newPropertie = this.newPropertie(prop);
		if (newPropertie) {
			listProps?.appendChild(newPropertie);
			this.loadPropertieInput(newPropertie, "HTML", prop);
		}
	}
	addPropertieCSS(_prop?: Prop) {
		const prop: Prop | undefined = _prop ? { ..._prop, id: _prop.id ?? Utils.generateSlug() } : undefined
		const listProps = document.getElementById("list_props_css");
		const newPropertie = this.newPropertie(prop);
		if (newPropertie) {
			listProps?.appendChild(newPropertie);
			this.loadPropertieInput(newPropertie, "CSS", prop);
		}
	}

	removeProprety(propId: string) {
		this.mainProjectManager.removeProprety(propId)
	}
	removeUiPropretie(element: HTMLElement) {
		if (element) {
			this.removeProprety(element.id)
			element.remove();
			this.main.buildProject(true)
		}
	}
	closePopovers() {
		const element = document.querySelector(".popover");
		if (element) {
			element.setAttribute("data-pab-project-is-open", "false");
		}
	}
}

export default Bihavior;
