type Project = {
	name: string;
	is_view: boolean;
	tag: string;
	template: string;
	position?: {
		x: number;
		y: number;
	};
	zoom?: number;
	props: {
		name: string;
		value: string;
	}[];
	content: object[] | string;
};

const past: Project[] = [];
let current_project: Project | undefined;
let future: Project[] = [];

function updateText(newText: Project) {
	if (current_project) {
		past.push(current_project);
	}
	current_project = newText;
	future = [];
}

function undo() {
	if (past.length > 0) {
		if (current_project) {
			future.push(current_project);
		}
		current_project = past.pop();
	}
}

function redo() {
	if (future.length > 0) {
		if (current_project) {
			past.push(current_project);
		}
		current_project = future.pop();
	}
}
