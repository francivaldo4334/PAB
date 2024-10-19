import { Component } from "./common"
class ProjectHistory {
	past: Component[] = [];
	current_project: Component | undefined;
	future: Component[] = [];
	updateText(newText: Component) {
		if (this.current_project) {
			this.past.push(this.current_project);
		}
		this.current_project = newText;
		this.future = [];
	}

	undo() {
		if (this.past.length > 0) {
			if (this.current_project) {
				this.future.push(this.current_project);
			}
			this.current_project = this.past.pop();
		}
	}

	redo() {
		if (this.future.length > 0) {
			if (this.current_project) {
				this.past.push(this.current_project);
			}
			this.current_project = this.future.pop();
		}
	}
}

export default ProjectHistory;
