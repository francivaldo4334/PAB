import ProjectHistory from "../project-history-manager";
import MainControls from "./main";

class Zoom {
    private draw: HTMLElement | null;
    private projectHistory: ProjectHistory;
    private controls: MainControls;
    private readonly MIN_ZOOM: number = 0.1;
    private readonly MAX_ZOOM: number = 3.0;
    private readonly NORMAL_SCALE: number = 1.0;
    private point: { x: number; y: number } = { x: 0, y: 0 };
    private elPoint: { x: number; y: number } = { x: 0, y: 0 };
    private deltaPoint: { x: number; y: number } = { x: 0, y: 0 };

    constructor(controls: MainControls, projectHistory: ProjectHistory) {
        this.controls = controls;
        this.projectHistory = projectHistory;
        this.draw = document.getElementById("project_draw");
    }

    initZoomMode() {
        // const { move, M_X, M_Y } = this.controls;
        // this.point = {
        //     x: move.calcPositionCursorX(M_X),
        //     y: move.calcPositionCursorY(M_Y)
        // };
        // this.elPoint = move.getPositionProjectPoint();
        // this.deltaPoint = {
        //     x: this.elPoint.x - this.point.x,
        //     y: this.elPoint.y - this.point.y
        // };
    }
    finishZoomMode(){
    //     const { move } = this.controls;
    //     const newPosition = this.getUpdatePositionWithScale(this.getScale());
	   //  move.setPositionDraw(newPosition.x, newPosition.y)
    //     this.point = { x: 0, y: 0 };
    //     this.deltaPoint = { x: 0, y: 0 };
    }

    // private getUpdatePositionWithScale(scale: number) : {x: number, y: number}{
    //     const scaleFactor = scale; 
    //     const w = this.deltaPoint.x * scaleFactor;
    //     const h = this.deltaPoint.y * scaleFactor;
	   //  return {x:this.elPoint.x - this.deltaPoint.x + w, y:this.elPoint.y - this.deltaPoint.y + h};
    // }

    updateZoomState() {
        const { move } = this.controls;
        const scaleJump = this.controls.SCROLL_STATE === "UP"
            ? this.controls.SCALE_JUMP
            : -this.controls.SCALE_JUMP;
        const newScale = this.getScale() + scaleJump;
     //    const newPosition = this.getUpdatePositionWithScale(newScale);
	    // move.setPositionDraw(newPosition.x, newPosition.y)
        this.setScale(newScale);
    }

    private setScaleDraw(scale: number) {
        if (this.draw && scale <= this.MAX_ZOOM && scale >= this.MIN_ZOOM) {
            this.draw.style.transform = `scale(${scale})`; // Use transform for scaling
        }
    }

    private setScaleProject(scale: number) {
        if (this.projectHistory.current_project && scale <= this.MAX_ZOOM && scale >= this.MIN_ZOOM) {
            this.projectHistory.current_project.zoom = scale;
        }
    }

    private setScale(scale: number) {
        this.setScaleDraw(scale);
        this.setScaleProject(scale);
    }

    getScale(): number {
        return this.projectHistory.current_project?.zoom ?? this.NORMAL_SCALE;
    }
}

export default Zoom;
