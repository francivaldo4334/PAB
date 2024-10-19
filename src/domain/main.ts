import ProjectHistory from "./project-history-manager";
import MainControls from "./controls/main";
import Actions from "./actions";
import Keybinds from "./keybinds"
import Bihavior from "./bihavior"
import { Common, Prop, Component } from "./common";
import Translation from "./translations";

class Main {
	projectHistory: ProjectHistory;
	common: Common;
	controls: MainControls;
	actions: Actions;
	keybinds: Keybinds;
	bihavior: Bihavior;
	translations: Translation;
	readonly RENDER_LABEL = "BAB_project__";
	constructor() {
		this.common = new Common();
		this.bihavior = new Bihavior(this);
		this.actions = new Actions(this.bihavior);
		this.keybinds = new Keybinds(this.actions, this.bihavior);
		this.projectHistory = new ProjectHistory();
		this.controls = new MainControls(this);
		this.translations = new Translation(this.common, "pt_br");
	}
	initNewProject() {
		this.projectHistory.updateText(this.common.base_json_template);
	}
	cleanAllSelectables() {
		const allElementsOfProject = document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);
		if (allElementsOfProject) {
			allElementsOfProject.forEach((el) => {
				el.setAttribute(`${this.RENDER_LABEL}selected`, "false");
			});
		}
	}
	loadOnclickEvents() {
		const allElementsOfProject = document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);
		if (allElementsOfProject) {
			allElementsOfProject.forEach((el) => {
				(el as HTMLElement).onclick = (e) => {
					const target = e.target as HTMLElement;
					this.cleanAllSelectables();
					target.setAttribute(`${this.RENDER_LABEL}selected`, "true");
					e.stopPropagation();
				}
			});
		}
	}
	updateCssProp(cssStr: string, prop: string, value: string): string {
		const regex = new RegExp(`${prop}:\\s*[^;]+;`, "g");
		const newProp = `${prop}: ${value};`;
		return regex.test(cssStr)
			? cssStr.replace(regex, newProp)
			: `${cssStr} ${newProp}`;
	}
	getProp(props: Prop[], name: string): Prop | undefined {
		return props.find((it) => it.name === name);
	}
	addProp(props: Prop[], prop: Prop): Prop[] {
		let add = false
		const result = props.map((it) => {
			if (it.name === prop.name) {
				add = true
				return prop;
			}
			return it;
		});
		if (!add) {
			result.push(prop)
		}
		return result;
	}
	buildBodyRenderMode(component: Component) {
		const baseBodyTemplate: Component = { ...this.common.base_view_body };
		const baseStyle = this.getProp(baseBodyTemplate.props, "style");
		const compStyle = this.getProp(component.props, "style");
		let newStyle = (compStyle?.value ?? "") + (baseStyle?.value ?? "");
		const position = component.position ?? baseBodyTemplate.position
		if (position) {
			newStyle = this.updateCssProp(newStyle, "left", `${position.x}px`);
			newStyle = this.updateCssProp(newStyle, "top", `${position.y}px`);
			baseBodyTemplate.props = this.addProp(component.props.concat(baseBodyTemplate.props), {
				name: "style",
				value: newStyle
			});
			baseBodyTemplate.props = this.addProp(component.props.concat(baseBodyTemplate.props), {
				name: `${this.RENDER_LABEL}body`,
				value: ""
			});
		}
		baseBodyTemplate.content = component.content;
		return baseBodyTemplate;
	}
	propsTosString(props: Prop[]) {
		return props
			? props.map((it: Prop) => `${it.name}="${it.value}"`).join(" ")
			: "";
	}
	generateTag(component: Component, renderMode: boolean): string {
		const TAG = component.tag;
		let props = [...component.props];
		if (renderMode) {
			props = props.map((it) => {
				if (it.name === "class") {
					it.value = it.value.split(' ').map((cls) => {
						if (!cls.startsWith(this.RENDER_LABEL))
							return `${this.RENDER_LABEL}${cls}`;
						return cls;
					}).join(" ");
				}
				return it;
			});
			props.push({
				name: `${this.RENDER_LABEL}selectable`,
				value: ""
			})
		}
		else {
			props = props.filter((prop) =>
				prop.name !== `${this.RENDER_LABEL}selected` &&
				prop.name !== `${this.RENDER_LABEL}selectable`
			);
		}
		const PROPS = this.propsTosString(props);
		const INNER = component.content
			? !Array.isArray(component.content)
				? component.content
				: component.content.map((it) => this.buildTag(it, renderMode)).join("\n")
			: "";
		return `<${TAG} ${PROPS}>${INNER}</${TAG}>`;
	}
	buildTag(content: Component | string | object, renderMode = false): string {
		if (typeof content === "string") return content;
		let component = content as Component;
		if (renderMode && component.tag === "body") {
			component = this.buildBodyRenderMode(component);
		}
		return this.generateTag(component, renderMode);
	}
	buildProject(devMode = false) {
		let builded_project = "";
		if (this.projectHistory.current_project) {
			if (devMode) {
				const my_body = document.getElementById("project_draw") as HTMLElement;
				builded_project += this.buildTag(this.projectHistory.current_project.content[1], true);
				my_body.innerHTML = builded_project;
				this.loadOnclickEvents();
			}
			else {
				builded_project = "<!DOCTYPE html>";
				builded_project += this.buildTag(this.projectHistory.current_project);
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
