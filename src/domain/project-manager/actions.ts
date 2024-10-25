import Main from "../main";
import Bihavior from "./bihavior"
import { Common, Prop } from "../common";
import { MainProjectManager } from "./main";
import { Utils } from "../utils";
class Actions {
	EDIT_MODE = "SELECTION";
	projectDrawScope = document.getElementById("project_draw_rect");
	mainProjectManager: MainProjectManager;
	bihavior: Bihavior;
	main: Main;
	drawRect = document.getElementById("project_draw_rect");
	sideRight = document.getElementById("side_bar_right");
	menuNewElement = document.getElementById("data-pab-project-menu-add-elements");
	menuActions = document.getElementById("data-pab-project-menu-actions");
	constructor(mainProjectManager: MainProjectManager, main: Main, bihavior: Bihavior) {
		this.mainProjectManager = mainProjectManager
		this.bihavior = bihavior;
		this.main = main;
	}
	toggleWithDrawAndPropsFocus() {
		if (this.main.FOCUS === "DRAW") {
			this.main.FOCUS = "PROPS";
			this.drawRect?.setAttribute("data-pab-project-focus", "false")
			this.sideRight?.setAttribute("data-pab-project-focus", "true")
			this.sideRight?.parentElement?.querySelector("[data-pab-project-is-open]")?.setAttribute("data-pab-project-is-open", "true")
		}
		else {
			this.main.FOCUS = "DRAW";
			this.drawRect?.setAttribute("data-pab-project-focus", "true")
			this.sideRight?.setAttribute("data-pab-project-focus", "false")
		}
	}
	openMenuFile() {
		const dropDownId = this.menuActions?.getAttribute("data-pab-project-drop-down-id")
		if (dropDownId) {
			const dropDown = document.getElementById(dropDownId)
			if (dropDown) {
				this.bihavior.toggleIsOpen(dropDown);
			}
		}
	}
	closeMenuFile() {
		const dropDownId = this.menuActions?.getAttribute("data-pab-project-drop-down-id");
		if (dropDownId) {
			const dropDown = document.getElementById(dropDownId)
			dropDown?.setAttribute('data-pab-project-is-open', "false");
		}
	}

	openRecentProjects() {
		console.log("TODO");
	}

	openMenuNewElement() {
		const dropDownId = this.menuNewElement?.getAttribute("data-pab-project-drop-down-id");
		if (dropDownId && this.menuNewElement) {
			const dropDown = document.getElementById(dropDownId)
			this.bihavior.selectElement(this.menuNewElement);
			this.bihavior.toggleIsOpen(dropDown as HTMLElement);
		}
	}

	closeMenuNewElement() {
		const dropDownId = this.menuNewElement?.getAttribute("data-pab-project-drop-down-id");
		if (dropDownId) {
			const dropDown = document.getElementById(dropDownId)
			dropDown?.setAttribute('data-pab-project-is-open', "false");
		}
	}
	toPrevComponent() {
		this.mainProjectManager.toPrevComponent();
	}
	toNextComponent() {
		this.mainProjectManager.toNextComponent();
	}
	toInnerComponent() {
		this.mainProjectManager.toInnerComponent();
	}
	removeSelectedComponent() {
		this.mainProjectManager.removeSelectedComponent();
	}
	addNewElement(type: string) {
		switch (type) {
			case "OVAL":
				this.mainProjectManager.setComponentProjectInSelectedComponent(
					Common.oval_json_template
				)
				this.main.buildProject(true)
				break;
			case "RECT":
				this.mainProjectManager.setComponentProjectInSelectedComponent(
					Common.rect_json_template
				)
				this.main.buildProject(true)
				break;
			case "TEXT":
				this.mainProjectManager.setComponentProjectInSelectedComponent(
					Common.text_json_template
				)
				this.main.buildProject(true)
				break;
			case "FRAME":
				console.log("TODO");
				break;
			case "IMAGE":
				this.mainProjectManager.setComponentProjectInSelectedComponent(
					Common.image_json_template
				)
				this.main.buildProject(true)
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
			this.projectDrawScope.setAttribute("data-pab-project-selected", "move");
		}
	}

	setZoomMode() {
		const btnMode = document.getElementById("btn_zoom_mode");
		if (btnMode && this.projectDrawScope) {
			this.bihavior.selectElement(btnMode);
			this.EDIT_MODE = "ZOOM";
			this.projectDrawScope.setAttribute("data-pab-project-selected", "zoom");
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

	copySelectedComponent() {
		const componet = this.mainProjectManager.getSelectedComponentJson();
		console.log(componet)
		Utils.setClipboard(componet)
	}
	pasteComponetInSelectedComponent() {
		Utils.getClipboard(txt => {
			this.mainProjectManager.setComponetJsonInSelectedComponent(txt);
		})
	}
	exportIndexHtml() {
		this.main.exportProject();
	}
}
export default Actions;
