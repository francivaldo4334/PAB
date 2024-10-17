class Movimentation{
    documentRect = document.getElementById("project_draw_rect");
    drawPosition = document.getElementById("project_draw_position");
    setPositionDraw(x: number, y: number) {
        if (this.drawPosition) {
            this.drawPosition.style.transform = `translate(${x}px, ${y}px)`;
        }
    };
    setPositionProject(x: number, y: number) {
        if (current_project) {
            if (current_project.position) {
                current_project.position.x = x;
                current_project.position.y = y;
            }
        }
    }
    actionsMoveModeMouseMove(e: MouseEvent) {
        const rect = this.documentRect?.getBoundingClientRect();
        const isInside =
	        rect &&
		    e.clientX >= rect.left &&
		    e.clientX <= rect.right &&
		    e.clientY >= rect.top &&
		    e.clientY <= rect.bottom;
        if (e.button === 0 && isInside) {
            if (current_project) {
                if (current_project.position) {
                    this.setPositionDraw(
                        current_project.position.x + M_DELTA_X,
                        current_project.position.y + M_DELTA_Y,
                    );
                }
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
    actionsSelectionModeMouseWheel(e: WheelEvent){
        const newPosition = e.deltaY>0? JUMP_SCROLL_MOVE : -JUMP_SCROLL_MOVE;
        if (current_project) {
            if (current_project.position) {
                if (e.shiftKey) {
                    this.setPositionDraw(
                        current_project.position.x + newPosition,
                        current_project.position.y,
                    );
                    this.setPositionProject(
                        current_project.position.x + newPosition,
                        current_project.position.y,
                    );
                } else {
                    this.setPositionDraw(
                        current_project.position.x,
                        current_project.position.y + newPosition,
                    );
                    this.setPositionProject(
                        current_project.position.x,
                        current_project.position.y + newPosition,
                    );
                }
            }
        }
    }
    actionsMoveModeMouseUp() {
        if (current_project) {
            if (current_project.position) {
                this.setPositionProject(
                    current_project.position.x + M_DELTA_X,
                    current_project.position.y + M_DELTA_Y,
                );
            }
        }
    }
}