class Zoom {
	draw = document.getElementById("project_draw");
	projectHistory: ProjectHistory;
	controls: MainControls;
	constructor(controls: MainControls, projectHistory: ProjectHistory) {
		this.controls = controls;
		this.projectHistory = projectHistory;
	}
	setScaleDraw(scale: number) {
		if (this.draw) {
			if (scale < 3.0 && scale > 0.1) {
				this.draw.style.scale = String(scale);
			}
		}
	}
	setScaleProject(scale: number) {
		if (this.projectHistory.current_project && scale < 3.0 && scale > 0.1) {
			this.projectHistory.current_project.zoom = scale;
		}
	}
	getScale(): number {
		if (this.projectHistory.current_project) {
			if (this.projectHistory.current_project.zoom) {
				return this.projectHistory.current_project.zoom;
			}
		}
		return 1;
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
