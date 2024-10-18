//actions
//selectionBox
//move
//modes
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
	isScrolling = 0;
	actions: Actions;
	selectionBox: SelectionBox;
	move: Move;
	modes: Modes;
	zoom: Zoom;
	constructor(actions: Actions, projectHistory: ProjectHistory) {
		this.addEventListener();
		this.actions = actions;
		this.zoom = new Zoom(this, projectHistory);
		this.move = new Move(this, projectHistory);
		this.selectionBox = new SelectionBox(this, this.move);
		this.modes = new Modes(this.selectionBox, this.actions);
	}
	addEventListener() {
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			switch (this.actions.EDIT_MODE) {
				case "SELECTION":
					this.modes.onSelectionModeActionsKeyDown(e);
					break;
				default:
					break;
			}
		});
		window.addEventListener("keyup", (e: KeyboardEvent) => {
			this.modes.onActionsKeyUp(e);
		});
		window.addEventListener("mousemove", (e) => {
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
		});
		window.addEventListener(
			"wheel",
			(e) => {
				if (e.deltaY < 0) {
					this.SCROLL_STATE = "UP";
				} else if (e.deltaY > 0) {
					this.SCROLL_STATE = "DOWN";
				}
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
			},
			{ passive: false },
		);
		window.addEventListener("mouseup", (e) => {
			if (e.button === 0) {
				this.M_BUTTON_LEFT = false;
			} else if (e.button === 1) {
				this.M_BUTTON_MIDDLE = false;
			} else if (e.button === 2) {
				this.M_BUTTON_RIGHT = false;
			}
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
			this.M_INIT_X = 0;
			this.M_INIT_Y = 0;
			this.M_DELTA_Y = 0;
			this.M_DELTA_Y = 0;
		});
		window.addEventListener("mousedown", (e) => {
			if (e.button === 0) {
				this.M_BUTTON_LEFT = true;
			} else if (e.button === 1) {
				this.M_BUTTON_MIDDLE = true;
			} else if (e.button === 2) {
				this.M_BUTTON_RIGHT = true;
			}
			this.M_INIT_X = e.clientX;
			this.M_INIT_Y = e.clientY;
			switch (this.actions.EDIT_MODE) {
				case "SELECTION":
					if (this.M_BUTTON_LEFT && e.button === 0) {
						this.selectionBox.initSelectionBox();
						e.preventDefault();
					}
					break;
				default:
					break;
			}
		});
		window.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});
	}
}
