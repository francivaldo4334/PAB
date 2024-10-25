import Move from "./move";
import Zoom from "./zoom";
import SelectionBox from "./selection";
import Actions from "../project-manager/actions";
import Bihavior from "../project-manager/bihavior";
import ProjectHistory from "../project-manager/project-history";

class Modes {
	body = document.querySelector("body");
	selectionBox: SelectionBox;
	actions: Actions;
	zoom: Zoom;
	move: Move;
	bihavior: Bihavior;
	projectHistory: ProjectHistory
	constructor(selectionBox: SelectionBox, actions: Actions, zoom: Zoom, move: Move, bihavior: Bihavior, projectHistory: ProjectHistory) {
		this.selectionBox = selectionBox;
		this.actions = actions;
		this.zoom = zoom;
		this.move = move;
		this.bihavior = bihavior;
		this.projectHistory = projectHistory;
	}
	onSelectionModeActionsKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
			this.projectHistory.undo();
			e.preventDefault();
		} else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
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
				this.body.setAttribute("data-pab-project-selected", "move-h");
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
		if (e.key === "Control" || e.key === " ")
			this.actions.setSelectionMode();
		e.preventDefault();
	}
}

export default Modes;
