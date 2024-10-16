function generateSlug() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function toggleIsOpen(element: HTMLElement) {
	const attributeName = "is_open";
	const currentValue = element.getAttribute(attributeName);
	if (currentValue === "true") {
		element.setAttribute(attributeName, "false");
	} else {
		element.setAttribute(attributeName, "true");
	}
}

function selectElement(element: HTMLElement) {
	decelAllElement();
	element.setAttribute("selected", "true");
}

function decelAllElement() {
	const elementsSelections = Array.from(
		document.querySelectorAll<HTMLElement>(".selection"),
	);
	for (const it of elementsSelections) {
		decelElement(it);
	}
}

function decelElement(element: HTMLElement) {
	element.setAttribute("selected", "false");
}

function addPropertieHTML() {
	const listProps = document.getElementById("list_props_html");
	const template = document
		.getElementById("item_prop_template")
		?.cloneNode(true);
	if (template && listProps) {
		(template as HTMLElement).removeAttribute("visible");
		(template as HTMLElement).setAttribute("id", generateSlug());
		(listProps as HTMLElement).appendChild(template);
	}
}

function addPropertieCSS() {
	const listProps = document.getElementById("list_props_css");
	const template = document
		.getElementById("item_prop_template")
		?.cloneNode(true);
	if (template && listProps) {
		(template as HTMLElement).removeAttribute("visible");
		(template as HTMLElement).setAttribute("id", generateSlug());
		(listProps as HTMLElement).appendChild(template);
	}
}

function removeUiPropretie(element: HTMLElement) {
	if (element) {
		element.remove();
	}
}

function closePopovers() {
	const element = document.querySelector(".popover");
	if (element) {
		element.setAttribute("is_open", "false");
	}
}

document.addEventListener("click", (e) => {
	const element = document.querySelector(".popover");
	if (element && e.target instanceof Node && !element.contains(e.target)) {
		closeMenuNewElement();
		closePopovers();
	}
});
