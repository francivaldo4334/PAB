class ProjectHistory {
	past: Project[] = [];
	current_project: Project | undefined;
	future: Project[] = [];
	updateText(newText: Project) {
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
