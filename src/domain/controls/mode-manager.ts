import Move from "./move";
import Zoom from "./zoom";
import MainControls from "./main";
import SelectionBox from "./selection";
import Actions from "../actions"
import Bihavior from "../bihavior"

class Modes {
	body = document.querySelector("body");
	selectionBox: SelectionBox;
	actions: Actions;
	zoom: Zoom;
	move: Move;
	bihavior: Bihavior;
	constructor(controls: MainControls) {
		this.selectionBox = controls.selectionBox;
		this.actions = controls.actions;
		this.zoom = controls.zoom;
		this.move = controls.move;
		this.bihavior = controls.bihavior;
	}
	onSelectionModeActionsKeyDown(e: KeyboardEvent) {
		if (e.shiftKey && this.body) {
			this.body.setAttribute("selected", "move-h");
		}
		if (e.key === " " && !this.selectionBox.isSelecting) {
			this.actions.setMoveMode();
			this.move.initMove()
		}
		if (e.ctrlKey && !this.selectionBox.isSelecting) {
			this.actions.setZoomMode();
			this.zoom.initZoomMode();
		}
		if (e.key === "Tab") {
			if (e.shiftKey) {
				this.actions.toPrevComponent();
			}
			else {
				this.actions.toNextComponent();
			}
			e.preventDefault();
		}
		if (e.key === "Enter") {
			this.actions.toInnerComponent();
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
