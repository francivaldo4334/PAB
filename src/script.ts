import Main from "./domain/main"
const my_body = document.getElementById("project_draw") as HTMLElement;
const main = new Main();
main.initNewProject();
if ( main.projectHistory.current_project && main.projectHistory.current_project.content.length > 1) {
	const el = main.buildTag(
		main.projectHistory.current_project.content[1],
		true,
	);
	my_body.innerHTML = el;
}

declare global {
	interface Window {
		main: Main;
	}
}
window.main = main;
