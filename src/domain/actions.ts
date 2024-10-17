let EDIT_MODE = "SELECTION";
const projectDrawScope = document.getElementById("project_draw_rect");

function openMenuFile() {
	console.log("TODO");
}

function openRecentProjects() {
	console.log("TODO");
}

function openMenuNewElement() {
	const menuNewElement = document.getElementById("menu_new_element");
	if (menuNewElement) {
		selectElement(menuNewElement);
		toggleIsOpen(menuNewElement);
	}
}

function closeMenuNewElement() {
	const menuNewElement = document.getElementById("menu_new_element");
	if (menuNewElement) {
		decelElement(menuNewElement);
		toggleIsOpen(menuNewElement);
	}
}

function addNewElement(type: string) {
	switch (type) {
		case "OVAL":
			console.log("TODO");
			break;
		case "RECT":
			console.log("TODO");
			break;
		case "FRAME":
			console.log("TODO");
			break;
		case "IMAGE":
			console.log("TODO");
			break;
		default:
			break;
	}
	closeMenuNewElement();
}

function setSelectionMode() {
	const btnMode = document.getElementById("btn_selection_mode");
	if (btnMode) {
		selectElement(btnMode);
		EDIT_MODE = "SELECTION";
	}
}

function setMoveMode() {
	const btnMode = document.getElementById("btn_move_mode");
	if (btnMode && projectDrawScope) {
		selectElement(btnMode);
		EDIT_MODE = "MOVE";
		projectDrawScope.setAttribute("selected", "move");
	}
}

function setZoomMode() {
	const btnMode = document.getElementById("btn_zoom_mode");
	if (btnMode && projectDrawScope) {
		selectElement(btnMode);
		EDIT_MODE = "ZOOM";
		projectDrawScope.setAttribute("selected", "zoom");
	}
}

function openMenuPlugins() {
	const btnMode = document.getElementById("btn_plugin");
	if (btnMode) {
		selectElement(btnMode);
	}
}

function openFolder(path: string) {
	console.log("TODO");
}

function setEditMode(mode: string) {
	switch (mode) {
		case "DESIGN":
			console.log("TODO");
			break;
		case "PROTOTYPE":
			console.log("TODO");
			break;
		default:
			break;
	}
}

function addNewProp(type: string) {
	switch (type) {
		case "HTML":
			addPropertieHTML();
			break;
		case "CSS":
			addPropertieCSS();
			break;
		default:
			break;
	}
}

function removePropretie(prop_id: string) {
	const prop = document.getElementById(prop_id);
	if (prop) {
		removeUiPropretie(prop);
	}
}
