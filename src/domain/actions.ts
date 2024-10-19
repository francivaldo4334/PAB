import Bihavior from "./bihavior"
class Actions {
	EDIT_MODE = "SELECTION";
	projectDrawScope = document.getElementById("project_draw_rect");
	bihavior: Bihavior;
	constructor(bihavior: Bihavior){
		this.bihavior = bihavior;
	}
	openMenuFile() {
		console.log("TODO");
	}

	openRecentProjects() {
		console.log("TODO");
	}

	openMenuNewElement() {
		const menuNewElement = document.getElementById("menu_new_element");
		if (menuNewElement) {
			this.bihavior.selectElement(menuNewElement);
			this.bihavior.toggleIsOpen(menuNewElement);
		}
	}

	closeMenuNewElement() {
		const menuNewElement = document.getElementById("menu_new_element");
		if (menuNewElement) {
			this.bihavior.decelElement(menuNewElement);
			this.bihavior.toggleIsOpen(menuNewElement);
		}
	}

	addNewElement(type: string) {
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
		this.closeMenuNewElement();
	}

	setSelectionMode() {
		const btnMode = document.getElementById("btn_selection_mode");
		if (btnMode) {
			this.bihavior.selectElement(btnMode);
			this.EDIT_MODE = "SELECTION";
		}
	}

	setMoveMode() {
		const btnMode = document.getElementById("btn_move_mode");
		if (btnMode && this.projectDrawScope) {
			this.bihavior.selectElement(btnMode);
			this.EDIT_MODE = "MOVE";
			this.projectDrawScope.setAttribute("selected", "move");
		}
	}

	setZoomMode() {
		const btnMode = document.getElementById("btn_zoom_mode");
		if (btnMode && this.projectDrawScope) {
			this.bihavior.selectElement(btnMode);
			this.EDIT_MODE = "ZOOM";
			this.projectDrawScope.setAttribute("selected", "zoom");
		}
	}

	openMenuPlugins() {
		const btnMode = document.getElementById("btn_plugin");
		if (btnMode) {
			this.bihavior.selectElement(btnMode);
		}
	}

	openFolder(path: string) {
		console.log("TODO");
	}

	setEditMode(mode: string) {
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

	addNewProp(type: string) {
		switch (type) {
			case "HTML":
				this.bihavior.addPropertieHTML();
				break;
			case "CSS":
				this.bihavior.addPropertieCSS();
				break;
			default:
				break;
		}
	}

	removePropretie(prop_id: string) {
		const prop = document.getElementById(prop_id);
		if (prop) {
			this.bihavior.removeUiPropretie(prop);
		}
	}
}
export default Actions;
