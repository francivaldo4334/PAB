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
let current_project: Project | null = null;
let future = [];

function updateText(newText) {
	past.push(current_project);
	current_project = newText;
	future = [];
}

function undo() {
	if (past.length > 0) {
		future.push(current_project);
		current_project = past.pop();
	}
}

function redo() {
	if (future.length > 0) {
		past.push(current_project);
		current_project = future.pop();
	}
}
