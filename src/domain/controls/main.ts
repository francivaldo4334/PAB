import SelectionBox from "./selection";
import Move from "./move";
import Modes from "./mode-manager";
import Zoom from "./zoom";
import Main from "../main";
import Actions from "../project-manager/actions";
import Bihavior from "../project-manager/bihavior";
import { MainProjectManager } from "../project-manager/main";
import Keybinds from "./keybinds";
import ProjectHistory from "../project-manager/project-history";


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
	keybinds: Keybinds;
	mainProjectManager: MainProjectManager;
	drawRect = document.getElementById("project_draw_rect");
	sideBars = document.getElementsByClassName("side_bar_border");
	sideBarLeft = document.getElementById("side_bar_right")?.parentElement?.querySelector("[is_open]");

	constructor(main: Main, mainProjectManager: MainProjectManager, actions: Actions, bihavior: Bihavior, projectHistory: ProjectHistory) {
		this.mainProjectManager = mainProjectManager;
		this.actions = actions;
		this.bihavior = bihavior;
		this.main = main;
		this.move = new Move(this, projectHistory);
		this.zoom = new Zoom(this, projectHistory);
		this.keybinds = new Keybinds(actions, bihavior);
		this.selectionBox = new SelectionBox(this, this.move);
		this.modes = new Modes(this.selectionBox, actions, this.zoom, this.move, bihavior, projectHistory);
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
		this.mainProjectManager.cleanAllSelectables();
	}
	handleKeyDown(e: KeyboardEvent) {
		if (e.altKey && e.key === "1") {
			this.actions.toggleWithDrawAndPropsFocus()
			e.preventDefault();
		}
		if (e.ctrlKey && e.key == "\\") {
			if (this.sideBars && this.sideBars.length > 0) {
				const isCloneAllSideBars = this.sideBarLeft?.getAttribute("is_open")
				Array.from(this.sideBars).forEach(bar => {
					if (isCloneAllSideBars === "false") {
						bar.setAttribute("is_open", "true");
					}
					else {
						bar.setAttribute("is_open", "false");
					}
				})
			}
		} else
			switch (this.actions.EDIT_MODE) {
				case "SELECTION":
					if (this.main.FOCUS === "PROPS") {
						//TODO: Props actions
					}
					else if (this.main.FOCUS === "DRAW") {
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
