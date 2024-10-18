class Modes {
	body = document.querySelector("body");
	selectionBox: SelectionBox;
	actions: Actions;
	constructor(selectionBox: SelectionBox, actions: Actions) {
		this.selectionBox = selectionBox;
		this.actions = actions;
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
		}
	}
	onActionsKeyUp(e: KeyboardEvent) {
		decelAllElement();
		this.actions.setSelectionMode();
		e.preventDefault();
	}
}
