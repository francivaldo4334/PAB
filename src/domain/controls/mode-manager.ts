import Move from "./move";
import Zoom from "./zoom";
import MainControls from "./main";
import SelectionBox from "./selection";
import Actions from "../actions"
import Bihavior from "../bihavior"
import ProjectHistory from "../project-history-manager";

class Modes {
	body = document.querySelector("body");
	selectionBox: SelectionBox;
	actions: Actions;
	zoom: Zoom;
	move: Move;
	bihavior: Bihavior;
	projectHistory: ProjectHistory
	constructor(controls: MainControls) {
		this.selectionBox = controls.selectionBox;
		this.actions = controls.actions;
		this.zoom = controls.zoom;
		this.move = controls.move;
		this.bihavior = controls.bihavior;
		this.projectHistory = controls.main.projectHistory;
	}
	onSelectionModeActionsKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
			this.projectHistory.undo();
			e.preventDefault();
		} else if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
			this.projectHistory.redo();
			e.preventDefault();
		} else if (e.ctrlKey) {
			this.actions.setZoomMode();
			this.zoom.initZoomMode();
		} else if (e.shiftKey && e.key === 'Tab') {
			this.actions.toPrevComponent();
			e.preventDefault();
		} else if (e.key === 'Tab') {
			this.actions.toNextComponent();
			e.preventDefault();
		} else if (e.shiftKey) {
			if (this.body) {
				this.body.setAttribute("selected", "move-h");
			}
		} else if (e.key === 'Enter') {
			this.actions.toInnerComponent();
			e.preventDefault();
		} else if (e.key === ' ') {
			if (!this.selectionBox.isSelecting) {
				this.actions.setMoveMode();
				this.move.initMove()
			}
			e.preventDefault();
		}
	}
	onActionsKeyUp(e: KeyboardEvent) {
		if (this.actions.EDIT_MODE === "ZOOM") {
			this.zoom.finishZoomMode();
		}
		this.bihavior.decelAllElement();
		this.actions.setSelectionMode();
		e.preventDefault();
	}
}

export default Modes;
