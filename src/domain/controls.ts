const W_WIDTH = window.innerWidth;
const W_HEIGHT = window.innerHeight;
const JUMP_SCROLL_MOVE = 50;
let M_X = 0;
let M_Y = 0;
let M_INIT_X = 0;
let M_INIT_Y = 0;
let M_DELTA_X = 0;
let M_DELTA_Y = 0;
let M_BUTTON_LEFT = false;
let M_BUTTON_MIDDLE = false;
let M_BUTTON_RIGHT = false;
let SCROLL_STATE = "STOP";
const SCALE_JUMP = 0.1;
const drawRect = document.getElementById("project_draw_rect");
const draw = document.getElementById("project_draw");
const body = document.querySelector("body");
let isScrolling: number;
const selectionBox  = new SelectionBox();
const movimentation = new Movimentation();

function setScaleDraw(scale: number) {
	if (draw) {
		if (scale < 3.0 && scale > 0.1) {
			draw.style.scale = String(scale);
		}
	}
}
function setScaleProject(scale: number) {
	if (current_project && scale < 3.0 && scale > 0.1) {
		current_project.zoom = scale;
	}
}
function getScale(): number {
	if (current_project) {
		if (current_project.zoom) {
			return current_project.zoom;
		}
	}
	return 1;
}
window.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.shiftKey && EDIT_MODE === "SELECTION" && body) {
		body.setAttribute("selected", "move-h");
	}
	switch (e.key) {
		case " ":
			setMoveMode();
			break;
		default:
			break;
	}
});
window.addEventListener("keyup", (e) => {
	decelAllElement();
	setSelectionMode();
	e.preventDefault();
});
window.addEventListener("mousemove", (e) => {
	M_X = e.clientX;
	M_Y = e.clientY;
	M_DELTA_X = M_X - M_INIT_X;
	M_DELTA_Y = M_Y - M_INIT_Y;
	switch(EDIT_MODE) {
		case "SELECTION":
			selectionBox.actionsSelectionModeMouseMove();
			break;
		case "MOVE":
			movimentation.actionsMoveModeMouseMove(e);
			break;
		default:
			break;
	}
});
window.addEventListener(
	"wheel",
	(e) => {
		if (e.ctrlKey) {
			setZoomMode();
			e.preventDefault();
		}
		if (e.deltaY < 0) {
			SCROLL_STATE = "UP";
		} else if (e.deltaY > 0) {
			SCROLL_STATE = "DOWN";
		}
		clearTimeout(isScrolling);
		isScrolling = setTimeout(() => {
			SCROLL_STATE = "STOP";
		}, 300);
		let scaleJump: number;
		let newScle: number;
		switch (EDIT_MODE) {
			case "SELECTION":
				movimentation.actionsSelectionModeMouseWheel(e);		
				break;
			case "ZOOM":
				scaleJump = SCROLL_STATE === "UP" ? SCALE_JUMP : -SCALE_JUMP;
				newScle = getScale() + scaleJump;
				setScaleDraw(newScle);
				setScaleProject(newScle);
				break;
			case "SELECTION":
				selectionBox.actionsSelectionModeWheel();
				break;
			default:
				break;
		}
	},
	{ passive: false },
);
window.addEventListener("mouseup", (e) => {
	if (e.button === 0) {
		M_BUTTON_LEFT = false;
	} else if (e.button === 1) {
		M_BUTTON_MIDDLE = false;
	} else if (e.button === 2) {
		M_BUTTON_RIGHT = false;
	}
	switch (EDIT_MODE) {
		case "MOVE":
			movimentation.actionsMoveModeMouseUp()
			break;
		case "SELECTION":
			selectionBox.actionsSelectionModeMouseUp();
			break;
		default:
			break;
	}
	M_INIT_X = 0;
	M_INIT_Y = 0;
	M_DELTA_Y = 0;
	M_DELTA_Y = 0;
});
window.addEventListener("mousedown", (e) => {
	if (e.button === 0) {
		M_BUTTON_LEFT = true;
	} else if (e.button === 1) {
		M_BUTTON_MIDDLE = true;
	} else if (e.button === 2) {
		M_BUTTON_RIGHT = true;
	}
	M_INIT_X = e.clientX;
	M_INIT_Y = e.clientY;
	switch (EDIT_MODE) {
		case "SELECTION":
			if (M_BUTTON_LEFT && e.button === 0) {
				selectionBox.actionsSelectionModeMouseDown(e);
			}
			break;

		default:
			break;
	}
});

window.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});
