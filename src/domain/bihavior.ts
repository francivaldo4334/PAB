import Main from "./main"
class Bihavior{
	constructor(main: Main) {
		document.addEventListener("click", (e) => {
			const element = document.querySelector(".popover");
			if (element && e.target instanceof Node && !element.contains(e.target)) {
				main.actions.closeMenuNewElement();
				this.closePopovers();
			}
		});
	}
	generateSlug() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
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
	addPropertieHTML() {
		const listProps = document.getElementById("list_props_html");
		const template = document
			.getElementById("item_prop_template")
			?.cloneNode(true);
		if (template && listProps) {
			(template as HTMLElement).removeAttribute("visible");
			(template as HTMLElement).setAttribute("id", this.generateSlug());
			(listProps as HTMLElement).appendChild(template);
		}
	}
	addPropertieCSS() {
		const listProps = document.getElementById("list_props_css");
		const template = document
			.getElementById("item_prop_template")
			?.cloneNode(true);
		if (template && listProps) {
			(template as HTMLElement).removeAttribute("visible");
			(template as HTMLElement).setAttribute("id", this.generateSlug());
			(listProps as HTMLElement).appendChild(template);
		}
	}
	removeUiPropretie(element: HTMLElement) {
		if (element) {
			element.remove();
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
