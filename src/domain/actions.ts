class Actions {
	EDIT_MODE = "SELECTION";
	projectDrawScope = document.getElementById("project_draw_rect");
	openMenuFile() {
		console.log("TODO");
	}

	openRecentProjects() {
		console.log("TODO");
	}

	openMenuNewElement() {
		const menuNewElement = document.getElementById("menu_new_element");
		if (menuNewElement) {
			selectElement(menuNewElement);
			toggleIsOpen(menuNewElement);
		}
	}

	closeMenuNewElement() {
		const menuNewElement = document.getElementById("menu_new_element");
		if (menuNewElement) {
			decelElement(menuNewElement);
			toggleIsOpen(menuNewElement);
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
			selectElement(btnMode);
			this.EDIT_MODE = "SELECTION";
		}
	}

	setMoveMode() {
		const btnMode = document.getElementById("btn_move_mode");
		if (btnMode && this.projectDrawScope) {
			selectElement(btnMode);
			this.EDIT_MODE = "MOVE";
			this.projectDrawScope.setAttribute("selected", "move");
		}
	}

	setZoomMode() {
		const btnMode = document.getElementById("btn_zoom_mode");
		if (btnMode && this.projectDrawScope) {
			selectElement(btnMode);
			this.EDIT_MODE = "ZOOM";
			this.projectDrawScope.setAttribute("selected", "zoom");
		}
	}

	openMenuPlugins() {
		const btnMode = document.getElementById("btn_plugin");
		if (btnMode) {
			selectElement(btnMode);
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
				addPropertieHTML();
				break;
			case "CSS":
				addPropertieCSS();
				break;
			default:
				break;
		}
	}

	removePropretie(prop_id: string) {
		const prop = document.getElementById(prop_id);
		if (prop) {
			removeUiPropretie(prop);
		}
	}
}
