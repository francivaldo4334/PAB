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
	readonly RENDER_LABEL = "PAB";
	constructor() {
		this.common = new Common();
		this.bihavior = new Bihavior(this);
		this.actions = new Actions(this.bihavior);
		this.keybinds = new Keybinds(this.actions, this.bihavior);
		this.projectHistory = new ProjectHistory();
		this.controls = new MainControls(this.actions, this.projectHistory, this.bihavior);
		this.translations = new Translation(this.common, "pt_br");
	}
	initNewProject() {
		this.projectHistory.updateText(this.common.base_json_template);
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
							return `${this.RENDER_LABEL}__${cls}`;
						return cls;
					}).join(" ");
				}
				return it;
			});
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
	buildProject() {
		let builded_project = "<!DOCTYPE html>";
		if (this.projectHistory.current_project) {
			builded_project += this.buildTag(this.projectHistory.current_project);
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
