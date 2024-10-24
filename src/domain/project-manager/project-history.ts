import { Component } from "../common"
import Main from "../main";
class ProjectHistory {
	past: Component[] = [];
	main: Main;
	constructor(main: Main) {
		this.main = main;
	}
	private _current_project: Component | undefined;
	set current_project(value: Component | undefined) {
		this._current_project = value;
		if (this._current_project) {
			this.updateText(this._current_project)
		}
	}
	get current_project(): Component | undefined {
		return JSON.parse(JSON.stringify(this._current_project)) as Component | undefined;
	}
	future: Component[] = [];
	updateText(newText: Component, setUndo = true) {
		if (this._current_project && setUndo) {
			this.past.push(this._current_project);
		}
		this._current_project = newText;
		if (setUndo) {
			this.future = [];
		}
	}

	undo() {
		if (this.past.length > 0) {
			if (this._current_project) {
				this.future.push(this._current_project);
			}
			this._current_project = this.past.pop();
			this.main.buildProject(true, true, false);
		}
	}

	redo() {
		if (this.future.length > 0) {
			if (this._current_project) {
				this.past.push(this._current_project);
			}
			this._current_project = this.future.pop();
			this.main.buildProject(true, true, false);
		}
	}
}

export default ProjectHistory;
