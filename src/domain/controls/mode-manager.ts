class Modes {
	body = document.querySelector("body");
	selectionBox: SelectionBox;
	actions: Actions;
	zoom: Zoom;
	constructor(controls: MainControls) {
		this.selectionBox = controls.selectionBox;
		this.actions = controls.actions;
		this.zoom = controls.zoom;
	}
	onSelectionModeActionsKeyDown(e: KeyboardEvent) {
		if (e.shiftKey && this.body) {
			this.body.setAttribute("selected", "move-h");
		}
		if (e.key === " " && !this.selectionBox.isSelecting) {
			this.actions.setMoveMode();
		}
		if (e.ctrlKey && !this.selectionBox.isSelecting) {
			this.actions.setZoomMode();
			this.zoom.initZoomMode();
		}
	}
	onActionsKeyUp(e: KeyboardEvent) {
		decelAllElement();
		this.actions.setSelectionMode();
		e.preventDefault();
	}
}
