class Zoom {
	draw = document.getElementById("project_draw");
	projectHistory: ProjectHistory;
	controls: MainControls;
	MIN_ZOOM = 0.1;
	MAX_ZOOM = 3.0;
	NORMAL_SCALE = 1.0;
	deltaX = 0;
	deltaY = 0;

	constructor(controls: MainControls, projectHistory: ProjectHistory) {
		this.controls = controls;
		this.projectHistory = projectHistory;
	}
	getReverseScale(): number {
		return this.NORMAL_SCALE - this.getScale();
	}
	updatePositionWithScale() {
		const { move } = this.controls;
		const reverseScale = this.getReverseScale();
		move.setPositionDrawWithCurrentPosition(
			this.deltaX * reverseScale,
			this.deltaY * reverseScale,
		);
	}
	setScaleDraw(scale: number) {
		if (this.draw) {
			if (scale < this.MAX_ZOOM && scale > this.MIN_ZOOM) {
				this.draw.style.scale = String(scale);
				// this.updatePositionWithScale();
			}
		}
	}
	initZoomMode() {
		const { move, M_X, M_Y } = this.controls;
		this.deltaX = M_X - move.getPositionDrawX();
		this.deltaY = M_Y - move.getPositionDrawY();
	}
	setScaleProject(scale: number) {
		if (this.projectHistory.current_project && scale < 3.0 && scale > 0.1) {
			this.projectHistory.current_project.zoom = scale;
		}
	}
	getScale(): number {
		const project = this.projectHistory.current_project;
		return project?.zoom ?? this.NORMAL_SCALE;
	}
	updateZoomState() {
		const scaleJump =
			this.controls.SCROLL_STATE === "UP"
				? this.controls.SCALE_JUMP
				: -this.controls.SCALE_JUMP;
		const newScle = this.getScale() + scaleJump;
		this.setScaleDraw(newScle);
		this.setScaleProject(newScle);
	}
}
