import Bihavior from "./bihavior"
import { Prop } from "./common";
class Actions {
	EDIT_MODE = "SELECTION";
	projectDrawScope = document.getElementById("project_draw_rect");
	bihavior: Bihavior;
	constructor(bihavior: Bihavior) {
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
			menuNewElement.setAttribute('is_open', "false");
		}
	}
	toPrevComponent() {
		this.bihavior.main.toPrevComponent();
	}
	toNextComponent() {
		this.bihavior.main.toNextComponent();
	}
	toInnerComponent() {
		this.bihavior.main.toInnerComponent();
	}
	addNewElement(type: string) {
		switch (type) {
			case "OVAL":
				this.bihavior.main.setComponentProjectInSelectedComponent(
					this.bihavior.main.common.oval_json_template
				)
				this.bihavior.main.buildProject(true)
				break;
			case "RECT":
				this.bihavior.main.setComponentProjectInSelectedComponent(
					this.bihavior.main.common.rect_json_template
				)
				this.bihavior.main.buildProject(true)
				break;
			case "TEXT":
				this.bihavior.main.setComponentProjectInSelectedComponent(
					this.bihavior.main.common.text_json_template
				)
				this.bihavior.main.buildProject(true)
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

	addNewProp(type: string, prop?: Prop) {
		switch (type) {
			case "HTML":
				this.bihavior.addPropertieHTML(prop);
				break;
			case "CSS":
				this.bihavior.addPropertieCSS(prop);
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
