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

let isSelecting = false;
const selectionBox = document.getElementById("selection_box");
let selectionBoxX = 0;
let selectionBoxY = 0;
const drawPosition = document.getElementById("project_draw_position");
const drawRect = document.getElementById("project_draw_rect");
const draw = document.getElementById("project_draw");
const body = document.querySelector("body");
let isScrolling: number;

function setPositionDraw(x: number, y: number) {
	if (drawPosition) {
		drawPosition.style.transform = `translate(${x}px, ${y}px)`;
	}
}
function setPositionProject(x: number, y: number) {
	if (current_project) {
		if (current_project.position) {
			current_project.position.x = x;
			current_project.position.y = y;
		}
	}
}
function calcPositionCursorX(x: number) {
	const rect = drawPosition?.getBoundingClientRect();
	return x - (rect ? rect.left : 0);
}
function calcPositionCursorY(y: number) {
	const rect = drawPosition?.getBoundingClientRect();
	return y - (rect ? rect.top : 0);
}
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

function initSelectionBox() {
	if (selectionBox) {
		isSelecting = true;
		selectionBoxX = calcPositionCursorX(M_INIT_X);
		selectionBoxY = calcPositionCursorY(M_INIT_Y);
		selectionBox.style.left = `${selectionBoxX}`;
		selectionBox.style.top = `${selectionBoxY}`;
		selectionBox.style.width = "0px";
		selectionBox.style.height = "0px";
		selectionBox.style.display = "block";
	}
}
function updateSelectionBox() {
	if (selectionBox) {
		const currentX = calcPositionCursorX(M_X);
		const currentY = calcPositionCursorY(M_Y);
		const width = Math.abs(currentX - selectionBoxX);
		const height = Math.abs(currentY - selectionBoxY);
		const x = Math.min(currentX, selectionBoxX);
		const y = Math.min(currentY, selectionBoxY);
		selectionBox.style.left = `${x}px`;
		selectionBox.style.top = `${y}px`;
		selectionBox.style.width = `${width}px`;
		selectionBox.style.height = `${height}px`;
	}
}
function finishSelectionBox() {
	if (selectionBox) {
		selectionBox.style.display = "none";
		isSelecting = false;
	}
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
	const rect = document
		.getElementById("project_draw_rect")
		?.getBoundingClientRect();
	const isInside =
		rect &&
		e.clientX >= rect.left &&
		e.clientX <= rect.right &&
		e.clientY >= rect.top &&
		e.clientY <= rect.bottom;
	if (EDIT_MODE === "MOVE" && M_BUTTON_LEFT && isInside) {
		if (current_project) {
			if (current_project.position) {
				setPositionDraw(
					current_project.position.x + M_DELTA_X,
					current_project.position.y + M_DELTA_Y,
				);
			}
		}
	}
	if (isSelecting) {
		updateSelectionBox();
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
				switch (SCROLL_STATE) {
					case "UP":
						if (current_project) {
							if (current_project.position) {
								if (e.shiftKey) {
									setPositionDraw(
										current_project.position.x + JUMP_SCROLL_MOVE,
										current_project.position.y,
									);
									setPositionProject(
										current_project.position.x + JUMP_SCROLL_MOVE,
										current_project.position.y,
									);
								} else {
									setPositionDraw(
										current_project.position.x,
										current_project.position.y + JUMP_SCROLL_MOVE,
									);
									setPositionProject(
										current_project.position.x,
										current_project.position.y + JUMP_SCROLL_MOVE,
									);
								}
							}
						}
						break;
					case "DOWN":
						if (current_project) {
							if (current_project.position) {
								if (e.shiftKey) {
									setPositionDraw(
										current_project.position.x - JUMP_SCROLL_MOVE,
										current_project.position.y,
									);
									setPositionProject(
										current_project.position.x - JUMP_SCROLL_MOVE,
										current_project.position.y,
									);
								} else {
									setPositionDraw(
										current_project.position.x,
										current_project.position.y - JUMP_SCROLL_MOVE,
									);
									setPositionProject(
										current_project.position.x,
										current_project.position.y - JUMP_SCROLL_MOVE,
									);
								}
							}
						}
						break;
					default:
						break;
				}
				break;
			case "ZOOM":
				scaleJump = SCROLL_STATE === "UP" ? SCALE_JUMP : -SCALE_JUMP;
				newScle = getScale() + scaleJump;
				setScaleDraw(newScle);
				setScaleProject(newScle);
				break;
			default:
				break;
		}
		if (isSelecting) {
			updateSelectionBox();
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
			if (current_project) {
				if (current_project.position) {
					setPositionProject(
						current_project.position.x + M_DELTA_X,
						current_project.position.y + M_DELTA_Y,
					);
				}
			}
			break;

		default:
			break;
	}
	if (isSelecting && !M_BUTTON_LEFT) {
		finishSelectionBox();
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
				initSelectionBox();
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
