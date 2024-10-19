import Main from "./domain/main"
const main = new Main();
main.initNewProject();
main.buildProject(true);
declare global {
	interface Window {
		main: Main;
	}
}
window.main = main;
