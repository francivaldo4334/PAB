class SelectionBox {
    isSelecting = false;
    selectionBoxX = 0;
    selectionBoxY = 0;
    selectionBox = document.getElementById("selection_box");
    constructor() {
    
    }
    actionsSelectionModeMouseDown(event: MouseEvent){
        this.initSelectionBox();
	    event.preventDefault();
    }
    actionsSelectionModeMouseUp(){
        if (this.isSelecting && !M_BUTTON_LEFT) {
            this.finishSelectionBox();
        }
    }
    actionsSelectionModeMouseMove(){
        if (this.isSelecting) {
            this.updateSelectionBox();
        }
    }
    actionsSelectionModeWheel(){
        if (this.isSelecting) {
			this.updateSelectionBox();
		}
    }
    initSelectionBox() {
        if (this.selectionBox) {
            this.isSelecting = true;
            this.selectionBoxX = calcPositionCursorX(M_INIT_X);
            this.selectionBoxY = calcPositionCursorY(M_INIT_Y);
            this.selectionBox.style.left = `${this.selectionBoxX}`;
            this.selectionBox.style.top = `${this.selectionBoxY}`;
            this.selectionBox.style.width = "0px";
            this.selectionBox.style.height = "0px";
            this.selectionBox.style.display = "block";
        }
    }
    updateSelectionBox() {
        if (this.selectionBox) {
            const currentX = calcPositionCursorX(M_X);
            const currentY = calcPositionCursorY(M_Y);
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
        if (this.selectionBox) {
            this.selectionBox.style.display = "none";
            this.isSelecting = false;
        }
    }
}