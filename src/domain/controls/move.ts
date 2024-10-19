import MainControls from "./main";
import ProjectHistory from "../project-history-manager";

class Move {
	drawPosition = document.getElementById("project_draw_position");
	drawRect = document.getElementById("project_draw_rect");
	projectHistory: ProjectHistory;
	controls: MainControls;

	constructor(controls: MainControls, projectHistory: ProjectHistory) {
		this.controls = controls;
		this.projectHistory = projectHistory;
	}

	setPositionDraw(x: number, y: number) {
		if (this.drawPosition) {
			this.drawPosition.style.transform = `translate(${x}px, ${y}px)`;
		}
	}

	setPosition(x: number, y: number) {
		this.setPositionDraw(x, y);
		this.setPositionProject(x, y);
	}
	
	getPositionDrawX(): number {
		const rect = this.drawPosition?.getBoundingClientRect();
		return rect ? rect.left : 0;
	}

	getPositionDrawY(): number {
		const rect = this.drawPosition?.getBoundingClientRect();
		return rect ? rect.top : 0;
	}

	getPositionDrawPoint(): { x: number, y: number } {
		const rect = this.drawPosition?.getBoundingClientRect();
		return { x: rect?.left ?? 0, y: rect?.top ?? 0 };
	}
	getPositionDrawPointXY(): { x: number, y: number } {
		const rect = this.drawPosition?.getBoundingClientRect();
		return { x: rect?.x ?? 0, y: rect?.y ?? 0 };
	}

	getPositionProjectPoint(): { x: number, y: number } {
		return this.projectHistory.current_project?.position ?? {x: 0, y: 0}
	}

	setPositionProject(x: number, y: number) {
		const position = this.projectHistory.current_project?.position;
		if (position) {
			position.x = x;
			position.y = y;
		}
	}

	calcPositionCursorX(x: number): number {
		const rect = this.drawPosition?.getBoundingClientRect();
		return x - (rect?.left ?? 0);
	}

	calcPositionCursorY(y: number): number {
		const rect = this.drawPosition?.getBoundingClientRect();
		return y - (rect?.top ?? 0);
	}

	moveProject(e: MouseEvent) {
		const rect = this.drawRect?.getBoundingClientRect();
		const isInside = rect
			&& e.clientX >= rect.left
			&& e.clientX <= rect.right
			&& e.clientY >= rect.top
			&& e.clientY <= rect.bottom;

		if (this.controls.M_BUTTON_LEFT && isInside) {
			const position = this.getPositionProjectPoint();
			this.setPositionDraw(
				position.x + this.controls.M_DELTA_X,
				position.y + this.controls.M_DELTA_Y
			);
		}
	}

	moveProjectOnOneDirection(e: WheelEvent) {
		const updateJumpScrollMove = this.controls.SCROLL_STATE === "UP"
			? this.controls.JUMP_SCROLL_MOVE
			: -this.controls.JUMP_SCROLL_MOVE;

		const position = this.projectHistory.current_project?.position;
		if (position) {
			if (e.shiftKey) {
				this.setPosition(position.x + updateJumpScrollMove, position.y);
			} else {
				this.setPosition(position.x, position.y + updateJumpScrollMove);
			}
		}
	}
	initMove(){
	}

	finishMove() {
		const position = this.projectHistory.current_project?.position;
		if (position) {
			this.setPositionProject(
				position.x + this.controls.M_DELTA_X,
				position.y + this.controls.M_DELTA_Y
			);
		}
	}
}

export default Move;
