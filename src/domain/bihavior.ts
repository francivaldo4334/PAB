import { Prop } from "./common";
import Main from "./main"
class Bihavior {
	main: Main;
	constructor(main: Main) {
		this.main = main;
		document.addEventListener("click", (e) => {
			const element = document.querySelector(".popover");
			if (element && e.target instanceof Node && !element.contains(e.target)) {
				main.actions.closeMenuNewElement();
				this.closePopovers();
			}
		});
	}
	tryGenerateSlug() {
		return "pab__id__xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
	generateSlug() {
		let id = this.tryGenerateSlug();
		while (this.main.getElementByComponentId(id)) {
			id = this.tryGenerateSlug()
		}
		return id;
	}
	toggleIsOpen(element: HTMLElement) {
		const attributeName = "is_open";
		const currentValue = element.getAttribute(attributeName);
		if (currentValue === "true") {
			element.setAttribute(attributeName, "false");
		} else {
			element.setAttribute(attributeName, "true");
		}
	}
	selectElement(element: HTMLElement) {
		this.decelAllElement();
		element.setAttribute("selected", "true");
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
		element.setAttribute("selected", "false");
	}
	newPropertie(prop?: Prop): HTMLElement | undefined {
		const template = document
			.getElementById("item_prop_template")
			?.cloneNode(true);
		if (template) {
			(template as HTMLElement).removeAttribute("visible");
			(template as HTMLElement).setAttribute("id", prop?.id ?? this.generateSlug());
		}
		return template as HTMLElement
	}
	loadPropertieInput(input: HTMLElement, listProps: string, prop?: Prop) {
		const inputName = input.querySelector(`.prop_input_name input`) as HTMLInputElement;
		const inputValue = input.querySelector(`.prop_input_value input`) as HTMLInputElement;
		inputName?.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement
			this.main.setPropertyInSelectedComponent(prop?.id ?? input.id, "name", target.value, listProps)
		})
		inputValue?.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement
			this.main.setPropertyInSelectedComponent(prop?.id ?? input.id, "value", target.value, listProps)
		})
		if (prop) {
			inputName.value = prop.name;
			inputValue.value = prop.value;
		}
	}
	addPropertieHTML(_prop?: Prop) {
		const prop: Prop | undefined = _prop ? { ..._prop, id: _prop.id ?? this.generateSlug() } : undefined
		const listProps = document.getElementById("list_props_html");
		const newPropertie = this.newPropertie(prop);
		if (newPropertie) {
			listProps?.appendChild(newPropertie);
			this.loadPropertieInput(newPropertie, "HTML", prop);
		}
	}
	addPropertieCSS(_prop?: Prop) {
		const prop: Prop | undefined = _prop ? { ..._prop, id: _prop.id ?? this.generateSlug() } : undefined
		const listProps = document.getElementById("list_props_css");
		const newPropertie = this.newPropertie(prop);
		if (newPropertie) {
			listProps?.appendChild(newPropertie);
			this.loadPropertieInput(newPropertie, "CSS", prop);
		}
	}

	removeProprety(propId: string) {
		this.main.removeProprety(propId)
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
			element.setAttribute("is_open", "false");
		}
	}
}

export default Bihavior;
