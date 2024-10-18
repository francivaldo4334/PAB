class SelectionBox {
	isSelecting = false;
	selectionBox = document.getElementById("selection_box");
	selectionBoxX = 0;
	selectionBoxY = 0;
	move: Move;
	controls: MainControls;
	constructor(controls: MainControls, move: Move) {
		this.controls = controls;
		this.move = move;
	}
	initSelectionBox() {
		if (this.selectionBox) {
			this.isSelecting = true;
			this.selectionBoxX = this.move.calcPositionCursorX(
				this.controls.M_INIT_X,
			);
			this.selectionBoxY = this.move.calcPositionCursorY(
				this.controls.M_INIT_Y,
			);
			this.selectionBox.style.left = `${this.selectionBoxX}`;
			this.selectionBox.style.top = `${this.selectionBoxY}`;
			this.selectionBox.style.width = "0px";
			this.selectionBox.style.height = "0px";
			this.selectionBox.style.display = "block";
		}
	}
	updateSelectionBox() {
		if (this.selectionBox && this.isSelecting) {
			const currentX = this.move.calcPositionCursorX(this.controls.M_X);
			const currentY = this.move.calcPositionCursorY(this.controls.M_Y);
			const width = Math.abs(currentX - this.selectionBoxX);
			const height = Math.abs(currentY - this.selectionBoxY);
			const x = Math.min(currentX, this.selectionBoxX);
			const y = Math.min(currentY, this.selectionBoxY);
			this.selectionBox.style.left = `${x}px`;
			this.selectionBox.style.top = `${y}px`;
			this.selectionBox.style.width = `${width}px`;
			this.selectionBox.style.height = `${height}px`;
		}
	}
	finishSelectionBox() {
		if (this.isSelecting && !this.controls.M_BUTTON_LEFT && this.selectionBox) {
			this.selectionBox.style.display = "none";
			this.isSelecting = false;
		}
	}
}
