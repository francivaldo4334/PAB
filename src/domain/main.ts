import MainControls from "./controls/main";
import { Common, Component } from "./common";
import Translation from "./project-manager/translations";
import ProjectHistory from "./project-manager/project-history";
import { Utils } from "./utils";
import { MainProjectManager } from "./project-manager/main";
import Actions from "./project-manager/actions";

class Main {
	projectHistory: ProjectHistory;
	controls: MainControls;
	translations: Translation;
	mainProjectManager: MainProjectManager;
	actions: Actions;
	FOCUS = "DRAW";
	constructor() {
		this.translations = new Translation("pt_br");
		this.mainProjectManager = new MainProjectManager(this)
		this.controls = new MainControls(this, this.mainProjectManager, this.mainProjectManager.actions, this.mainProjectManager.bihavior, this.mainProjectManager.projectHistory);
		this.projectHistory = this.mainProjectManager.projectHistory;
		this.actions = this.mainProjectManager.actions;
	}
	initNewProject() {
		this.projectHistory.updateText(Common.base_json_template);
	}
	loadOnclickEvents() {
		const allElementsOfProject = document.querySelectorAll(`[${Common.RENDER_LABEL}selectable]`);
		if (allElementsOfProject) {
			allElementsOfProject.forEach((el) => {
				(el as HTMLElement).onclick = (e) => {
					const target = e.target as HTMLElement;
					this.mainProjectManager.onSelectComponente(target)
					e.stopPropagation();
				}
			});
		}
	}
	buildBodyRenderMode(component: Component) {
		const TEMPLATE: Component = JSON.parse(JSON.stringify(Common.base_view_body));
		const position = component.position ?? TEMPLATE.position
		if (position) {
			TEMPLATE.styles.push({ name: "left", value: `${position.x}px`, id: Utils.generateSlug() });
			TEMPLATE.styles.push({ name: "top", value: `${position.y}px`, id: Utils.generateSlug() });
		}
		TEMPLATE.props = component.props.concat(TEMPLATE.props);
		TEMPLATE.props.push({ name: `${Common.RENDER_LABEL}body`, value: "", id: Utils.generateSlug() });
		TEMPLATE.styles = component.props.concat(TEMPLATE.styles);
		TEMPLATE.content = component.content;
		return TEMPLATE;
	}
	generateTag(component: Component, renderMode: boolean, setUndo = true): string {
		const TAG = component.tag;
		let props = [...component.props];
		if (renderMode) {
			props = props.map((it) => {
				if (it.name === "class") {
					it.value = it.value.split(' ').map((cls) => {
						return (!cls.startsWith(Common.RENDER_LABEL)) ? `${Common.RENDER_LABEL}${cls}` : cls;
					}).join(" ");
				}
				return it;
			});
			props.push({
				name: `${Common.RENDER_LABEL}selectable`,
				value: ""
			})
			props.push({
				name: `${Common.RENDER_LABEL}selected`,
				value: String(component.selected)
			})
			props.push({
				name: `${Common.RENDER_LABEL}id`,
				value: component.id ?? ""
			})
		}
		else {
			props = props.filter((prop) => !prop.name.startsWith(Common.RENDER_LABEL));
		}
		component.styles = component.styles.map(it => {
			if (!it.id)
				it.id = Utils.generateSlug()
			return it
		})
		if (component.id) {
			this.mainProjectManager.setComponentProjectById(component.id, component, false)
		}
		props.push({ name: "style", value: Utils.propsTosStringCss(component.styles), id: Utils.generateSlug() })
		const PROPS = Utils.propsTosString(props);
		const INNER = component.content
			? !Array.isArray(component.content)
				? component.content
				: component.content.map((it) => this.buildTag(it, renderMode, setUndo)).join("\n")
			: "";
		return `<${TAG} ${PROPS}>${INNER}</${TAG}>`;
	}
	buildTag(content: Component | string | object, renderMode = false, setUndo = true): string {
		if (typeof content === "string") return content;
		let component = content as Component;
		if (renderMode && component.tag === "body") {
			component = this.buildBodyRenderMode(component);
		}
		if (component.id) this.mainProjectManager.setComponentProjectById(component.id, component, setUndo)
		return this.generateTag(component, renderMode, setUndo);
	}
	buildItemTheeWithComponent(component: Component, templateItemThee: HTMLElement): HTMLElement {
		const newItemThee = templateItemThee.cloneNode() as HTMLElement
		newItemThee.removeAttribute("id");
		newItemThee.setAttribute("pab_project__visible", "true");
		if (Array.isArray(component.content) && component.content.length > 0) {
			for (const item of component.content as Component[]) {
				const contentItemThee = newItemThee.querySelector(".content");
				if (contentItemThee) {
					contentItemThee.appendChild(this.buildItemTheeWithComponent(item, templateItemThee))
				}
			}
		}
		return newItemThee;
	}
	buildProject(devMode = false, updateListOfProp = true, setUndo = true) {
		let builded_project = "";
		if (this.projectHistory.current_project) {
			if (devMode) {
				const my_body = document.getElementById("project_draw") as HTMLElement;
				builded_project += this.buildTag(this.projectHistory.current_project.content[1], true, setUndo);
				my_body.innerHTML = builded_project;
				this.loadOnclickEvents();
				this.mainProjectManager.onSelectComponente(this.mainProjectManager.getComponentSelected(), updateListOfProp)
			}
			else {
				builded_project = "<!DOCTYPE html>";
				builded_project += this.buildTag(this.projectHistory.current_project, false, setUndo);
			}
		}
		return builded_project;
	}
	exportProject() {
		this.initNewProject();
		const blob = new Blob([this.buildProject()], { type: "text/html" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "index.html";
		link.click();
		URL.revokeObjectURL(link.href);
	}
}
export default Main;
