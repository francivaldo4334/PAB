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
		if (this.drawPosition) {
			const rect = this.drawPosition.getBoundingClientRect();
			return rect ? rect.left : 0;
		}
		return 0;
	}
	getPositionDrawY(): number {
		if (this.drawPosition) {
			const rect = this.drawPosition.getBoundingClientRect();
			return rect ? rect.top : 0;
		}
		return 0;
	}
	setPositionDrawWithCurrentPosition(x: number, y: number) {
		if (this.projectHistory.current_project) {
			if (this.projectHistory.current_project.position) {
				this.setPositionDraw(
					this.projectHistory.current_project.position.x + x,
					this.projectHistory.current_project.position.y + y,
				);
			}
		}
	}
	setPositionProject(x: number, y: number) {
		if (this.projectHistory.current_project) {
			if (this.projectHistory.current_project.position) {
				this.projectHistory.current_project.position.x = x;
				this.projectHistory.current_project.position.y = y;
			}
		}
	}
	calcPositionCursorX(x: number) {
		const rect = this.drawPosition?.getBoundingClientRect();
		return x - (rect ? rect.left : 0);
	}
	calcPositionCursorY(y: number) {
		const rect = this.drawPosition?.getBoundingClientRect();
		return y - (rect ? rect.top : 0);
	}
	moveProject(e: MouseEvent) {
		const rect = this.drawRect?.getBoundingClientRect();
		const isInside =
			rect &&
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom;
		if (this.controls.M_BUTTON_LEFT && isInside) {
			if (this.projectHistory.current_project) {
				if (this.projectHistory.current_project.position) {
					this.setPositionDraw(
						this.projectHistory.current_project.position.x +
							this.controls.M_DELTA_X,
						this.projectHistory.current_project.position.y +
							this.controls.M_DELTA_Y,
					);
				}
			}
		}
	}
	moveProjectOnOneDirection(e: WheelEvent) {
		const updateJumpScrollMove =
			this.controls.SCROLL_STATE === "UP"
				? this.controls.JUMP_SCROLL_MOVE
				: -this.controls.JUMP_SCROLL_MOVE;
		if (this.projectHistory.current_project) {
			if (this.projectHistory.current_project.position) {
				if (e.shiftKey) {
					this.setPosition(
						this.projectHistory.current_project.position.x +
							updateJumpScrollMove,
						this.projectHistory.current_project.position.y,
					);
				} else {
					this.setPosition(
						this.projectHistory.current_project.position.x,
						this.projectHistory.current_project.position.y +
							updateJumpScrollMove,
					);
				}
			}
		}
	}
	finishMove() {
		if (this.projectHistory.current_project) {
			if (this.projectHistory.current_project.position) {
				this.setPositionProject(
					this.projectHistory.current_project.position.x +
						this.controls.M_DELTA_X,
					this.projectHistory.current_project.position.y +
						this.controls.M_DELTA_Y,
				);
			}
		}
	}
}
