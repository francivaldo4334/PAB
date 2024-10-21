import Actions from "../actions";
import Bihavior from "../bihavior";
import SelectionBox from "./selection";
import Move from "./move";
import Modes from "./mode-manager";
import Zoom from "./zoom";
import Main from "../main";


class MainControls {
	W_WIDTH = window.innerWidth;
	W_HEIGHT = window.innerHeight;
	JUMP_SCROLL_MOVE = 50;
	M_X = 0;
	M_Y = 0;
	M_INIT_X = 0;
	M_INIT_Y = 0;
	M_DELTA_X = 0;
	M_DELTA_Y = 0;
	M_BUTTON_LEFT = false;
	M_BUTTON_MIDDLE = false;
	M_BUTTON_RIGHT = false;
	FOCUS = "DRAW";
	SCROLL_STATE = "STOP";
	SCALE_JUMP = 0.1;
	isScrolling: any = 0;
	actions: Actions;
	selectionBox: SelectionBox;
	move: Move;
	modes: Modes;
	zoom: Zoom;
	bihavior: Bihavior;
	main: Main;
	drawRect = document.getElementById("project_draw_rect");

	constructor(main: Main) {
		this.main = main;
		this.actions = main.actions;
		this.move = new Move(this, main.projectHistory);
		this.zoom = new Zoom(this, main.projectHistory);
		this.selectionBox = new SelectionBox(this, this.move);
		this.bihavior = main.bihavior;
		this.modes = new Modes(this);
		this.addEventListeners();
	}

	addEventListeners() {
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
		window.addEventListener("mousemove", this.handleMouseMove.bind(this));
		window.addEventListener("wheel", this.handleScroll.bind(this), {
			passive: false,
		});
		window.addEventListener("mouseup", this.handleMouseUp.bind(this));
		this.drawRect?.addEventListener("mousedown", this.handleMouseDown.bind(this));
		window.addEventListener("contextmenu", (e) => e.preventDefault());
		this.drawRect?.addEventListener("click", this.handleClick.bind(this));
	}
	handleClick(e: MouseEvent) {
		this.main.cleanAllSelectables();
	}
	handleKeyDown(e: KeyboardEvent) {
		if (e.altKey && e.key === "1") {
			this.actions.toggleWithDrawAndPropsFocus()
			e.preventDefault();
		}
		switch (this.actions.EDIT_MODE) {
			case "SELECTION":
				if (this.FOCUS === "PROPS") {
					//TODO: Props actions
				}
				else if (this.FOCUS === "DRAW") {
					this.modes.onSelectionModeActionsKeyDown(e);
				}
				break;
			default:
				break;
		}
	}

	handleKeyUp(e: KeyboardEvent) {
		this.modes.onActionsKeyUp(e);
	}

	handleMouseMove(e: MouseEvent) {
		this.M_X = e.clientX;
		this.M_Y = e.clientY;
		this.M_DELTA_X = this.M_X - this.M_INIT_X;
		this.M_DELTA_Y = this.M_Y - this.M_INIT_Y;

		switch (this.actions.EDIT_MODE) {
			case "SELECTION":
				this.selectionBox.updateSelectionBox();
				break;
			case "MOVE":
				this.move.moveProject(e);
				break;
			default:
				break;
		}
	}

	handleScroll(e: WheelEvent) {
		this.SCROLL_STATE = e.deltaY < 0 ? "UP" : "DOWN";

		clearTimeout(this.isScrolling);
		this.isScrolling = setTimeout(() => {
			this.SCROLL_STATE = "STOP";
		}, 300);

		switch (this.actions.EDIT_MODE) {
			case "SELECTION":
				this.move.moveProjectOnOneDirection(e);
				this.selectionBox.updateSelectionBox();
				break;
			case "ZOOM":
				this.zoom.updateZoomState();
				break;
			default:
				break;
		}

		e.preventDefault();
	}

	handleMouseUp(e: MouseEvent) {
		this.updateMouseButtons(e, false);

		switch (this.actions.EDIT_MODE) {
			case "SELECTION":
				this.selectionBox.finishSelectionBox();
				break;
			case "MOVE":
				this.move.finishMove();
				break;
			default:
				break;
		}

		this.resetMousePosition();
	}

	handleMouseDown(e: MouseEvent) {
		this.updateMouseButtons(e, true);

		this.M_INIT_X = e.clientX;
		this.M_INIT_Y = e.clientY;

		if (
			this.actions.EDIT_MODE === "SELECTION" &&
			this.M_BUTTON_LEFT &&
			e.button === 0
		) {
			this.selectionBox.initSelectionBox();
			e.preventDefault();
		}
	}

	updateMouseButtons(e: MouseEvent, isPressed: boolean) {
		if (e.button === 0) {
			this.M_BUTTON_LEFT = isPressed;
		} else if (e.button === 1) {
			this.M_BUTTON_MIDDLE = isPressed;
		} else if (e.button === 2) {
			this.M_BUTTON_RIGHT = isPressed;
		}
	}

	resetMousePosition() {
		this.M_INIT_X = 0;
		this.M_INIT_Y = 0;
		this.M_DELTA_X = 0;
		this.M_DELTA_Y = 0;
	}
}

export default MainControls;
